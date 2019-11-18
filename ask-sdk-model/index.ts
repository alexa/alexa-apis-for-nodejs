export namespace services {
    /**
     * Represents the interface between ApiClient and a Service Client.
     * @export
     * @interface ApiClientMessage
     */
    export interface ApiClientMessage {
        headers : Array<{key : string, value : string}>;
        body? : string;
    }

    /**
     * Represents a request sent from Service Clients to an ApiClient implementation.
     * @export
     * @interface ApiClientRequest
     * @extends {ApiClientMessage}
     */
    export interface ApiClientRequest extends ApiClientMessage {
        url : string;
        method : string;
    }

    /**
     * Represents a response returned by ApiClient implementation to a Service Client.
     * @export
     * @interface ApiClientResponse
     * @extends {ApiClientMessage}
     */
    export interface ApiClientResponse extends ApiClientMessage {
        /**
         * Result code of the attempt to satisfy the request. Normally this
         * corresponds to the HTTP status code returned by the server.
         */
        statusCode : number;
    }

    /**
     * Represents a basic contract for API request execution
     * @export
     * @interface ApiClient
     */
    export interface ApiClient {
        /**
         * Dispatches a request to an API endpoint described in the request.
         * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
         * status code. The responsibility of translating a particular response code to an error lies with the
         * caller to invoke.
         * @param {ApiClientRequest} request request to dispatch to the ApiClient
         * @returns {Promise<ApiClientResponse>} Response from the ApiClient
         * @memberof ApiClient
         */
        invoke(request : ApiClientRequest) : Promise<ApiClientResponse>;
    }

    /**
     * Represents an interface that provides API configuration options needed by service clients.
     * @interface ApiConfiguration
     */
    export interface ApiConfiguration {
        /**
         * Configured ApiClient implementation
         */
        apiClient : ApiClient;
        /**
         * Authorization value to be used on any calls of the service client instance
         */
        authorizationValue : string;
        /**
         * Endpoint to hit by the service client instance
         */
        apiEndpoint : string;
    }

    /**
     * Class to be used as the base class for the generated service clients.
     */
    export abstract class BaseServiceClient {
        private static isCodeSuccessful( responseCode : number ) : boolean {
            return responseCode >= 200 && responseCode < 300;
        }

        private static buildUrl(
            endpoint : string,
            path : string,
            queryParameters : Array<{ key : string, value : string }>,
            pathParameters : Map<string, string>,
        ) : string {
            const processedEndpoint : string = endpoint.endsWith('/') ? endpoint.substr(0, endpoint.length - 1) : endpoint;
            const pathWithParams : string = this.interpolateParams(path, pathParameters);
            const isConstantQueryPresent : boolean = pathWithParams.includes('?');
            const queryString : string = this.buildQueryString(queryParameters, isConstantQueryPresent);

            return processedEndpoint + pathWithParams + queryString;
        }

        private static interpolateParams(path : string, params : Map<string, string>) : string {
            if (!params) {
                return path;
            }

            let result : string = path;

            params.forEach((paramValue : string, paramName : string) => {
                result = result.replace('{' + paramName + '}', encodeURIComponent(paramValue));
            });

            return result;
        }

        private static buildQueryString(params : Array<{ key : string, value : string }>, isQueryStart : boolean) : string {
            if (!params) {
                return '';
            }

            const sb : string[] = [];

            if (isQueryStart) {
                sb.push('&');
            } else {
                sb.push('?');
            }

            params.forEach((obj) => {
                sb.push(encodeURIComponent(obj.key));
                sb.push('=');
                sb.push(encodeURIComponent(obj.value));
                sb.push('&');
            });
            sb.pop();

            return sb.join('');
        }

        /**
         * ApiConfiguration instance to provide dependencies for this service client
         */
        protected apiConfiguration : ApiConfiguration;

        /**
         * Creates new instance of the BaseServiceClient
         * @param {ApiConfiguration} apiConfiguration configuration parameter to provide dependencies to service client instance
         */
        protected constructor(apiConfiguration : ApiConfiguration) {
            this.apiConfiguration = apiConfiguration;
        }

        /**
         * Invocation wrapper to implement service operations in generated classes
         * @param method HTTP method, such as 'POST', 'GET', 'DELETE', etc.
         * @param endpoint base API url
         * @param path the path pattern with possible placeholders for path parameters in form {paramName}
         * @param pathParams path parameters collection
         * @param queryParams query parameters collection
         * @param headerParams headers collection
         * @param bodyParam if body parameter is present it is provided here, otherwise null or undefined
         * @param errors maps recognized status codes to messages
         * @param nonJsonBody if the body is in JSON format
         */
        protected async invoke(
            method : string,
            endpoint : string,
            path : string,
            pathParams : Map<string, string>,
            queryParams : Array<{ key : string, value : string }>,
            headerParams : Array<{ key : string, value : string }>,
            bodyParam : any,
            errors : Map<number, string>,
            nonJsonBody? : boolean,
        ) : Promise<any> {
            const request : ApiClientRequest = {
                url : BaseServiceClient.buildUrl(endpoint, path, queryParams, pathParams),
                method,
                headers : headerParams,
            };
            if (bodyParam != null) {
                request.body = nonJsonBody ? bodyParam : JSON.stringify(bodyParam);
            }

            const apiClient = this.apiConfiguration.apiClient;
            let response : ApiClientResponse;
            try {
                response = await apiClient.invoke(request);
            } catch (err) {
                err.message = `Call to service failed: ${err.message}`;

                throw err;
            }

            let body;

            try {
                body = response.body ? JSON.parse(response.body) : undefined;
            } catch (err) {
                throw new SyntaxError(`Failed trying to parse the response body: ${response.body}`);
            }

            if (BaseServiceClient.isCodeSuccessful(response.statusCode)) {
                return body;
            }

            const err = new Error('Unknown error');
            err.name = 'ServiceError';
            err['statusCode'] = response.statusCode; // tslint:disable-line:no-string-literal
            err['response'] = body; // tslint:disable-line:no-string-literal
            if (errors && errors.has(response.statusCode)) {
                err.message = errors.get(response.statusCode);
            }

            throw err;
        }
    }

    /**
     * Represents a Login With Amazon(LWA) access token
     */
    export interface AccessToken {
        token : string;
        expiry : Number;
    }

    /**
     * Represents a request for retrieving a Login With Amazon(LWA) access token
     */
    export interface AccessTokenRequest {
        clientId : string;
        clientSecret : string;
        scope : string;
    }

    /**
     * Represents a response returned by LWA containing a Login With Amazon(LWA) access token
     */
    export interface AccessTokenResponse {
        access_token : string;
        expires_in : number;
        scope : string;
        token_type : string;
    }

    /**
     * Represents the authentication configuration for a client ID and client secret
     */
    export interface AuthenticationConfiguration {
        clientId : string;
        clientSecret : string;
    }

    /**
     * Class to be used to call Amazon LWA to retrieve access tokens.
     */
    export class LwaServiceClient extends BaseServiceClient {
        protected static EXPIRY_OFFSET_MILLIS : number = 60000;

        protected authenticationConfiguration : AuthenticationConfiguration;
        protected scopeTokenStore : {[scope : string] : AccessToken};

        constructor(options : {
            apiConfiguration : ApiConfiguration,
            authenticationConfiguration : AuthenticationConfiguration,
        }) {
            super(options.apiConfiguration);
            if (options.authenticationConfiguration == null) {
                throw new Error('AuthenticationConfiguration cannot be null or undefined.');
            }
            this.authenticationConfiguration = options.authenticationConfiguration;
            this.scopeTokenStore = {};
        }

        public async getAccessTokenForScope(scope : string) : Promise<string> {
            if (scope == null) {
                throw new Error('Scope cannot be null or undefined.');
            }

            const accessToken = this.scopeTokenStore[scope];

            if (accessToken && accessToken.expiry > Date.now() + LwaServiceClient.EXPIRY_OFFSET_MILLIS) {
                return accessToken.token;
            }

            const accessTokenRequest : AccessTokenRequest = {
                clientId : this.authenticationConfiguration.clientId,
                clientSecret : this.authenticationConfiguration.clientSecret,
                scope,
            };

            const accessTokenResponse : AccessTokenResponse = await this.generateAccessToken(accessTokenRequest);

            this.scopeTokenStore[scope] = {
                token : accessTokenResponse.access_token,
                expiry : Date.now() + accessTokenResponse.expires_in * 1000,
            };

            return accessTokenResponse.access_token;
        }

        protected async generateAccessToken(accessTokenRequest : AccessTokenRequest) : Promise<AccessTokenResponse> {
            if (accessTokenRequest == null) {
                throw new Error(`Required parameter accessTokenRequest was null or undefined when calling generateAccessToken.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{key : string, value : string}> = [];
            headerParams.push({key : 'Content-type', value : 'application/x-www-form-urlencoded'});

            const pathParams : Map<string, string> = new Map<string, string>();

            const bodyParams : string = `grant_type=client_credentials&client_secret=${accessTokenRequest.clientSecret}&client_id=${accessTokenRequest.clientId}&scope=${accessTokenRequest.scope}`;

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, 'Token request sent.');
            errorDefinitions.set(400, 'Bad Request');
            errorDefinitions.set(401, 'Authentication Failed');
            errorDefinitions.set(500, 'Internal Server Error');

            return this.invoke(
                'POST',
                'https://api.amazon.com',
                '/auth/O2/token',
                pathParams,
                queryParams,
                headerParams,
                bodyParams,
                errorDefinitions,
                true,
            );
        }
    }
}

export namespace services.proactiveEvents {
    export type SkillStage = 'DEVELOPMENT' | 'LIVE';
}

/*
* Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
* except in compliance with the License. A copy of the License is located at
*
* http://aws.amazon.com/apache2.0/
*
* or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
* the specific language governing permissions and limitations under the License.
*/

/* tslint:disable */

/**
 * An object containing an application ID. This is used to verify that the request was intended for your service.
 * @interface
 */
export interface Application {
    'applicationId': string;
}

/**
 * Describes the type of the Cause.
 * @interface
 */
export type Cause = ConnectionCompleted;

/**
 *
 * @interface
 */
export interface Context {
    'System': interfaces.system.SystemState;
    'Alexa.Presentation.APL'?: interfaces.alexa.presentation.apl.RenderedDocumentState;
    'AudioPlayer'?: interfaces.audioplayer.AudioPlayerState;
    'Automotive'?: interfaces.automotive.AutomotiveState;
    'Display'?: interfaces.display.DisplayState;
    'Geolocation'?: interfaces.geolocation.GeolocationState;
    'Viewport'?: interfaces.viewport.ViewportState;
    'Viewports'?: Array<interfaces.viewport.TypedViewportState>;
}

/**
 * An object providing information about the device used to send the request. The device object contains both deviceId and supportedInterfaces properties. The deviceId property uniquely identifies the device. The supportedInterfaces property lists each interface that the device supports. For example, if supportedInterfaces includes AudioPlayer {}, then you know that the device supports streaming audio using the AudioPlayer interface.
 * @interface
 */
export interface Device {
    'deviceId': string;
    'supportedInterfaces': SupportedInterfaces;
}

/**
 * Enumeration indicating the status of the multi-turn dialog. This property is included if the skill meets the requirements to use the Dialog directives. Note that COMPLETED is only possible when you use the Dialog.Delegate directive. If you use intent confirmation, dialogState is considered COMPLETED if the user denies the entire intent (for instance, by answering “no” when asked the confirmation prompt). Be sure to also check the confirmationStatus property on the Intent object before fulfilling the user’s request.
 * @enum
 */
export type DialogState = 'STARTED' | 'IN_PROGRESS' | 'COMPLETED';

/**
 *
 * @interface
 */
export type Directive = interfaces.customInterfaceController.StopEventHandlerDirective | interfaces.navigation.assistance.AnnounceRoadRegulation | interfaces.connections.SendRequestDirective | dialog.DynamicEntitiesDirective | interfaces.customInterfaceController.StartEventHandlerDirective | interfaces.gadgetController.SetLightDirective | dialog.DelegateDirective | dialog.ConfirmIntentDirective | interfaces.customInterfaceController.SendDirectiveDirective | interfaces.alexa.presentation.html.HandleMessageDirective | dialog.ElicitSlotDirective | interfaces.alexa.presentation.html.StartDirective | interfaces.audioplayer.StopDirective | dialog.ConfirmSlotDirective | interfaces.audioplayer.PlayDirective | interfaces.alexa.presentation.apl.ExecuteCommandsDirective | interfaces.display.RenderTemplateDirective | interfaces.display.HintDirective | interfaces.connections.V1.StartConnectionDirective | interfaces.alexa.presentation.aplt.RenderDocumentDirective | interfaces.gameEngine.StartInputHandlerDirective | interfaces.videoapp.LaunchDirective | interfaces.alexa.presentation.aplt.ExecuteCommandsDirective | interfaces.gameEngine.StopInputHandlerDirective | interfaces.tasks.CompleteTaskDirective | interfaces.alexa.presentation.apl.RenderDocumentDirective | interfaces.connections.SendResponseDirective | interfaces.audioplayer.ClearQueueDirective;

/**
 * An object that represents what the user wants.
 * @interface
 */
export interface Intent {
    'name': string;
    'slots'?: { [key: string]: Slot; };
    'confirmationStatus': IntentConfirmationStatus;
}

/**
 * Indication of whether an intent or slot has been explicitly confirmed or denied by the user, or neither.
 * @enum
 */
export type IntentConfirmationStatus = 'NONE' | 'DENIED' | 'CONFIRMED';

/**
 * This denotes the status of the permission scope.
 * @enum
 */
export type PermissionStatus = 'GRANTED' | 'DENIED';

/**
 * Contains a consentToken allowing the skill access to information that the customer has consented to provide, such as address information. Note that the consentToken is deprecated. Use the apiAccessToken available in the context object to determine the user’s permissions.
 * @interface
 */
export interface Permissions {
    'consentToken'?: string;
    'scopes'?: { [key: string]: Scope; };
}

/**
 * An object that describes the user (person) who is making the request.
 * @interface
 */
export interface Person {
    'personId'?: string;
    'accessToken'?: string;
}

/**
 * A request object that provides the details of the user’s request. The request body contains the parameters necessary for the service to perform its logic and generate a response.
 * @interface
 */
export type Request = events.skillevents.SkillEnabledRequest | services.listManagement.ListUpdatedEventRequest | interfaces.alexa.presentation.apl.UserEvent | events.skillevents.SkillDisabledRequest | services.listManagement.ListItemsCreatedEventRequest | SessionResumedRequest | SessionEndedRequest | interfaces.audioplayer.PlaybackFailedRequest | canfulfill.CanFulfillIntentRequest | interfaces.customInterfaceController.ExpiredRequest | interfaces.alexa.presentation.html.MessageRequest | LaunchRequest | services.reminderManagement.ReminderCreatedEventRequest | interfaces.alexa.presentation.aplt.UserEvent | services.listManagement.ListItemsUpdatedEventRequest | services.listManagement.ListCreatedEventRequest | interfaces.audioplayer.PlaybackStartedRequest | interfaces.audioplayer.PlaybackNearlyFinishedRequest | interfaces.customInterfaceController.EventsReceivedRequest | services.reminderManagement.ReminderStatusChangedEventRequest | services.listManagement.ListItemsDeletedEventRequest | services.reminderManagement.ReminderDeletedEventRequest | interfaces.connections.ConnectionsResponse | services.listManagement.ListDeletedEventRequest | interfaces.gameEngine.InputHandlerEventRequest | interfaces.playbackcontroller.PauseCommandIssuedRequest | interfaces.playbackcontroller.PlayCommandIssuedRequest | interfaces.audioplayer.PlaybackFinishedRequest | events.skillevents.ProactiveSubscriptionChangedRequest | interfaces.display.ElementSelectedRequest | events.skillevents.PermissionChangedRequest | services.reminderManagement.ReminderUpdatedEventRequest | IntentRequest | services.reminderManagement.ReminderStartedEventRequest | interfaces.audioplayer.PlaybackStoppedRequest | interfaces.playbackcontroller.PreviousCommandIssuedRequest | events.skillevents.AccountLinkedRequest | interfaces.messaging.MessageReceivedRequest | interfaces.connections.ConnectionsRequest | interfaces.system.ExceptionEncounteredRequest | events.skillevents.PermissionAcceptedRequest | interfaces.playbackcontroller.NextCommandIssuedRequest;

/**
 * Request wrapper for all requests sent to your Skill.
 * @interface
 */
export interface RequestEnvelope {
    'version': string;
    'session'?: Session;
    'context': Context;
    'request': Request;
}

/**
 *
 * @interface
 */
export interface Response {
    'outputSpeech'?: ui.OutputSpeech;
    'card'?: ui.Card;
    'reprompt'?: ui.Reprompt;
    'directives'?: Array<Directive>;
    'shouldEndSession'?: boolean;
    'canFulfillIntent'?: canfulfill.CanFulfillIntent;
}

/**
 *
 * @interface
 */
export interface ResponseEnvelope {
    'version': string;
    'sessionAttributes'?: { [key: string]: any; };
    'userAgent'?: string;
    'response': Response;
}

/**
 * This is the value of LoginWithAmazon(LWA) consent scope. This object is used as in the key-value pairs that are provided in user.permissions.scopes object
 * @interface
 */
export interface Scope {
    'status'?: PermissionStatus;
}

/**
 * Represents a single execution of the alexa service
 * @interface
 */
export interface Session {
    'new': boolean;
    'sessionId': string;
    'user': User;
    'attributes'?: { [key: string]: any; };
    'application': Application;
}

/**
 * An error object providing more information about the error that occurred.
 * @interface
 */
export interface SessionEndedError {
    'type': SessionEndedErrorType;
    'message': string;
}

/**
 * A string indicating the type of error that occurred.
 * @enum
 */
export type SessionEndedErrorType = 'INVALID_RESPONSE' | 'DEVICE_COMMUNICATION_ERROR' | 'INTERNAL_SERVICE_ERROR' | 'ENDPOINT_TIMEOUT';

/**
 * The reason why session ended when not initiated from the Skill itself.
 * @enum
 */
export type SessionEndedReason = 'USER_INITIATED' | 'ERROR' | 'EXCEEDED_MAX_REPROMPTS';

/**
 *
 * @interface
 */
export interface Slot {
    'name': string;
    'value'?: string;
    'confirmationStatus': SlotConfirmationStatus;
    'resolutions'?: slu.entityresolution.Resolutions;
}

/**
 * An enumeration indicating whether the user has explicitly confirmed or denied the value of this slot.
 * @enum
 */
export type SlotConfirmationStatus = 'NONE' | 'DENIED' | 'CONFIRMED';

/**
 * Status indicates a high level understanding of the result of an execution.
 * @interface
 */
export interface Status {
    'code': string;
    'message': string;
}

/**
 * An object listing each interface that the device supports. For example, if supportedInterfaces includes AudioPlayer {}, then you know that the device supports streaming audio using the AudioPlayer interface.
 * @interface
 */
export interface SupportedInterfaces {
    'Alexa.Presentation.APL'?: interfaces.alexa.presentation.apl.AlexaPresentationAplInterface;
    'Alexa.Presentation.APLT'?: interfaces.alexa.presentation.aplt.AlexaPresentationApltInterface;
    'Alexa.Presentation.HTML'?: interfaces.alexa.presentation.html.AlexaPresentationHtmlInterface;
    'AudioPlayer'?: interfaces.audioplayer.AudioPlayerInterface;
    'Display'?: interfaces.display.DisplayInterface;
    'VideoApp'?: interfaces.videoapp.VideoAppInterface;
    'Geolocation'?: interfaces.geolocation.GeolocationInterface;
    'Navigation'?: interfaces.navigation.NavigationInterface;
}

/**
 * This object encapsulates a specific functionality.
 * @interface
 */
export interface Task {
    'name': string;
    'version': string;
    'input'?: any;
}

/**
 * An object that describes the Amazon account for which the skill is enabled.
 * @interface
 */
export interface User {
    'userId': string;
    'accessToken'?: string;
    'permissions'?: Permissions;
}

export namespace canfulfill {
    /**
     * CanFulfillIntent represents the response to canFulfillIntentRequest includes the details about whether the skill can understand and fulfill the intent request with detected slots.
     * @interface
     */
    export interface CanFulfillIntent {
        'canFulfill': canfulfill.CanFulfillIntentValues;
        'slots'?: { [key: string]: canfulfill.CanFulfillSlot; };
    }
}

export namespace canfulfill {
    /**
     * Overall if skill can understand and fulfill the intent with detected slots. Respond YES when skill understands all slots, can fulfill all slots, and can fulfill the request in its entirety. Respond NO when skill either cannot understand the intent, cannot understand all the slots, or cannot fulfill all the slots. Respond MAYBE when skill can understand the intent, can partially or fully understand the slots, and can partially or fully fulfill the slots. The only cases where should respond MAYBE is when skill partially understand the request and can potentially complete the request if skill get more data, either through callbacks or through a multi-turn conversation with the user.
     * @enum
     */
    export type CanFulfillIntentValues = 'YES' | 'NO' | 'MAYBE';
}

export namespace canfulfill {
    /**
     * This represents skill's capability to understand and fulfill each detected slot.
     * @interface
     */
    export interface CanFulfillSlot {
        'canUnderstand': canfulfill.CanUnderstandSlotValues;
        'canFulfill'?: canfulfill.CanFulfillSlotValues;
    }
}

export namespace canfulfill {
    /**
     * This field indicates whether skill can fulfill relevant action for the slot, that has been partially or fully understood. The definition of fulfilling the slot is dependent on skill and skill is required to have logic in place to determine whether a slot value can be fulfilled in the context of skill or not. Return YES if Skill can certainly fulfill the relevant action for this slot value. Return NO if skill cannot fulfill the relevant action for this slot value. For specific recommendations to set the value refer to the developer docs for more details.
     * @enum
     */
    export type CanFulfillSlotValues = 'YES' | 'NO';
}

export namespace canfulfill {
    /**
     * This field indicates whether skill has understood the slot value. In most typical cases, skills will do some form of entity resolution by looking up a catalog or list to determine whether they recognize the slot or not. Return YES if skill have a perfect match or high confidence match (for eg. synonyms) with catalog or list maintained by skill. Return NO if skill cannot understand or recognize the slot value. Return MAYBE if skill have partial confidence or partial match. This will be true when the slot value doesn’t exist as is, in the catalog, but a variation or a fuzzy match may exist. For specific recommendations to set the value refer to the developer docs for more details.
     * @enum
     */
    export type CanUnderstandSlotValues = 'YES' | 'NO' | 'MAYBE';
}

export namespace er.dynamic {
    /**
     * Represents an entity that the skill wants to store. An entity has an optional Id and the value and the synonyms for the entity
     * @interface
     */
    export interface Entity {
        'id'?: string;
        'name': er.dynamic.EntityValueAndSynonyms;
    }
}

export namespace er.dynamic {
    /**
     * Represents an array of entities of a particular type.
     * @interface
     */
    export interface EntityListItem {
        'name': string;
        'values': Array<er.dynamic.Entity>;
    }
}

export namespace er.dynamic {
    /**
     * A container object with value and synomyms for the entity
     * @interface
     */
    export interface EntityValueAndSynonyms {
        'value': string;
        'synonyms'?: Array<string>;
    }
}

export namespace er.dynamic {
    /**
     * Replace the existing dynamic entities or clear them from the catalog
     * @enum
     */
    export type UpdateBehavior = 'REPLACE' | 'CLEAR';
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface AccountLinkedBody {
        'accessToken'?: string;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface Permission {
        'scope'?: string;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface PermissionBody {
        'acceptedPermissions'?: Array<events.skillevents.Permission>;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface ProactiveSubscriptionChangedBody {
        'subscriptions'?: Array<events.skillevents.ProactiveSubscriptionEvent>;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface ProactiveSubscriptionEvent {
        'eventName'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface AlexaPresentationAplInterface {
        'runtime'?: interfaces.alexa.presentation.apl.Runtime;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The alignment of the item after scrolling. Defaults to visible.
     * @enum
     */
    export type Align = 'center' | 'first' | 'last' | 'visible';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * How repeated animations will play.
     * @enum
     */
    export type AnimateItemRepeatMode = 'restart' | 'reverse';
}

export namespace interfaces.alexa.presentation.apl {
   /**
    *
    * @interface
    */
    export type AnimatedProperty = interfaces.alexa.presentation.apl.AnimatedOpacityProperty | interfaces.alexa.presentation.apl.AnimatedTransformProperty;
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The audio track to play on. Defaults to “foreground”
     * @enum
     */
    export type AudioTrack = 'foreground';
}

export namespace interfaces.alexa.presentation.apl {
   /**
    * A message that can change the visual or audio presentation of the content on the screen.
    * @interface
    */
    export type Command = interfaces.alexa.presentation.apl.SetPageCommand | interfaces.alexa.presentation.apl.ControlMediaCommand | interfaces.alexa.presentation.apl.AutoPageCommand | interfaces.alexa.presentation.apl.PlayMediaCommand | interfaces.alexa.presentation.apl.ScrollCommand | interfaces.alexa.presentation.apl.IdleCommand | interfaces.alexa.presentation.apl.AnimateItemCommand | interfaces.alexa.presentation.apl.SendEventCommand | interfaces.alexa.presentation.apl.SpeakListCommand | interfaces.alexa.presentation.apl.SequentialCommand | interfaces.alexa.presentation.apl.SetStateCommand | interfaces.alexa.presentation.apl.SpeakItemCommand | interfaces.alexa.presentation.apl.ParallelCommand | interfaces.alexa.presentation.apl.OpenUrlCommand | interfaces.alexa.presentation.apl.ClearFocusCommand | interfaces.alexa.presentation.apl.ScrollToIndexCommand | interfaces.alexa.presentation.apl.SetValueCommand | interfaces.alexa.presentation.apl.SetFocusCommand;
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The entity context data which was attached to an element.
     * @interface
     */
    export interface ComponentEntity {
        'type'?: string;
        'value'?: string;
        'id'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Component state.
     * @enum
     */
    export type ComponentState = 'checked' | 'disabled' | 'focused';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Definition of a visible APL element shown on screen.
     * @interface
     */
    export interface ComponentVisibleOnScreen {
        'children'?: Array<interfaces.alexa.presentation.apl.ComponentVisibleOnScreen>;
        'entities'?: Array<interfaces.alexa.presentation.apl.ComponentEntity>;
        'id': string;
        'position': string;
        'tags': interfaces.alexa.presentation.apl.ComponentVisibleOnScreenTags;
        'transform'?: Array<number>;
        'type': string;
        'uid': string;
        'visibility'?: number;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * An element in a scrolling list
     * @interface
     */
    export interface ComponentVisibleOnScreenListItemTag {
        'index'?: number;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * An ordered list of items
     * @interface
     */
    export interface ComponentVisibleOnScreenListTag {
        'itemCount'?: number;
        'lowestIndexSeen'?: number;
        'highestIndexSeen'?: number;
        'lowestOrdinalSeen'?: number;
        'highestOrdinalSeen'?: number;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Media player
     * @interface
     */
    export interface ComponentVisibleOnScreenMediaTag {
        'positionInMilliseconds'?: number;
        'state'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenMediaTagStateEnum;
        'allowAdjustSeekPositionForward'?: boolean;
        'allowAdjustSeekPositionBackwards'?: boolean;
        'allowNext'?: boolean;
        'allowPrevious'?: boolean;
        'entities'?: Array<interfaces.alexa.presentation.apl.ComponentEntity>;
        'url'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Media player stage posible states
     * @enum
     */
    export type ComponentVisibleOnScreenMediaTagStateEnum = 'idle' | 'playing' | 'paused';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * A collection of items that are displayed one at a time.
     * @interface
     */
    export interface ComponentVisibleOnScreenPagerTag {
        'index'?: number;
        'pageCount'?: number;
        'allowForward'?: boolean;
        'allowBackwards'?: boolean;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * A scrollable region.
     * @interface
     */
    export interface ComponentVisibleOnScreenScrollableTag {
        'direction'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenScrollableTagDirectionEnum;
        'allowForward'?: boolean;
        'allowBackward'?: boolean;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Scrolling direction
     * @enum
     */
    export type ComponentVisibleOnScreenScrollableTagDirectionEnum = 'horizontal' | 'vertical';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The tags which were attached to an element.
     * @interface
     */
    export interface ComponentVisibleOnScreenTags {
        'checked'?: boolean;
        'clickable'?: boolean;
        'disabled'?: boolean;
        'focused'?: boolean;
        'list'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenListTag;
        'listItem'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenListItemTag;
        'media'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenMediaTag;
        'ordinal'?: number;
        'pager'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenPagerTag;
        'scrollable'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenScrollableTag;
        'spoken'?: boolean;
        'viewport'?: interfaces.alexa.presentation.apl.ComponentVisibleOnScreenViewportTag;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The entire screen in which a document is rendered.
     * @interface
     */
    export interface ComponentVisibleOnScreenViewportTag {
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * How highlighting is applied: on a line-by-line basis, or to the entire block. Defaults to block.
     * @enum
     */
    export type HighlightMode = 'block' | 'line';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The command enumerated value is the operation that should be performed on the media player.
     * @enum
     */
    export type MediaCommandType = 'play' | 'pause' | 'next' | 'previous' | 'rewind' | 'seek' | 'setTrack';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Whether the value is a relative or absolute offset. Defaults to absolute.
     * @enum
     */
    export type Position = 'absolute' | 'relative';
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Provides context for any APL content shown on screen.
     * @interface
     */
    export interface RenderedDocumentState {
        'token': string;
        'version'?: string;
        'componentsVisibleOnScreen'?: Array<interfaces.alexa.presentation.apl.ComponentVisibleOnScreen>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Contains the runtime information for the interface.
     * @interface
     */
    export interface Runtime {
        'maxVersion'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
   /**
    * Transform property to apply to a component.
    * @interface
    */
    export type TransformProperty = interfaces.alexa.presentation.apl.MoveTransformProperty | interfaces.alexa.presentation.apl.ScaleTransformProperty | interfaces.alexa.presentation.apl.RotateTransformProperty | interfaces.alexa.presentation.apl.SkewTransformProperty;
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The source property holds the video clip or sequence of video clips to play.
     * @interface
     */
    export interface VideoSource {
        'description'?: string;
        'duration'?: number | string;
        'url': string;
        'repeatCount'?: number | string;
        'offset'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     *
     * @interface
     */
    export interface AlexaPresentationApltInterface {
        'runtime'?: interfaces.alexa.presentation.aplt.Runtime;
    }
}

export namespace interfaces.alexa.presentation.aplt {
   /**
    * A message that can change the visual or audio presentation of the content on the screen.
    * @interface
    */
    export type Command = interfaces.alexa.presentation.aplt.SetValueCommand | interfaces.alexa.presentation.aplt.IdleCommand | interfaces.alexa.presentation.aplt.AutoPageCommand | interfaces.alexa.presentation.aplt.ScrollCommand | interfaces.alexa.presentation.aplt.SendEventCommand | interfaces.alexa.presentation.aplt.ParallelCommand | interfaces.alexa.presentation.aplt.SetPageCommand | interfaces.alexa.presentation.aplt.SequentialCommand;
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Whether the value is a relative or absolute offset. Defaults to absolute.
     * @enum
     */
    export type Position = 'absolute' | 'relative';
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Contains the runtime information for the interface.
     * @interface
     */
    export interface Runtime {
        'maxVersion'?: string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Name of a supported profile on character display.
     * @enum
     */
    export type TargetProfile = 'FOUR_CHARACTER_CLOCK' | 'NONE';
}

export namespace interfaces.alexa.presentation.html {
    /**
     *
     * @interface
     */
    export interface AlexaPresentationHtmlInterface {
        'runtime'?: interfaces.alexa.presentation.html.Runtime;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     *
     * @interface
     */
    export interface Configuration {
        'timeoutInSeconds'?: number;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     * Contains the runtime information for the interface.
     * @interface
     */
    export interface Runtime {
        'maxVersion': string;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     *
     * @interface
     */
    export interface StartRequest {
        'method': interfaces.alexa.presentation.html.StartRequestMethod;
        'uri'?: string;
        'headers'?: any;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     *
     * @enum
     */
    export type StartRequestMethod = 'GET';
}

export namespace interfaces.alexa.presentation.html {
    /**
     * Properties for performing text to speech transformations. These are the same properties that [APL transformers](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-source.html#transformer-properties-and-conversion-rules) use. 
     * @interface
     */
    export interface Transformer {
        'transformer': interfaces.alexa.presentation.html.TransformerType;
        'inputPath': string;
        'outputName'?: string;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     *
     * @enum
     */
    export type TransformerType = 'ssmlToSpeech' | 'textToSpeech' | 'textToHint' | 'ssmlToText';
}

export namespace interfaces.amazonpay.model.request {
   /**
    *
    * @interface
    */
    export type BaseAmazonPayEntity = interfaces.amazonpay.model.request.SellerBillingAgreementAttributes | interfaces.amazonpay.model.request.Price | interfaces.amazonpay.request.ChargeAmazonPayRequest | interfaces.amazonpay.model.request.BillingAgreementAttributes | interfaces.amazonpay.model.request.SellerOrderAttributes | interfaces.amazonpay.model.request.ProviderAttributes | interfaces.amazonpay.model.request.AuthorizeAttributes | interfaces.amazonpay.request.SetupAmazonPayRequest | interfaces.amazonpay.model.request.ProviderCredit;
}

export namespace interfaces.amazonpay.model.request {
    /**
     * * This is used to specify applicable billing agreement type. * CustomerInitiatedTransaction – customer is present at the time of processing payment for the order. * MerchantInitiatedTransaction – customer is not present at the time of processing payment for the order. 
     * @enum
     */
    export type BillingAgreementType = 'CustomerInitiatedTransaction' | 'MerchantInitiatedTransaction';
}

export namespace interfaces.amazonpay.model.request {
    /**
     * * This is used to specify applicable payment action. * Authorize – you want to confirm the order and authorize a certain amount, but you do not want to capture at this time. * AuthorizeAndCapture – you want to confirm the order, authorize for the given amount, and capture the funds. 
     * @enum
     */
    export type PaymentAction = 'Authorize' | 'AuthorizeAndCapture';
}

export namespace interfaces.amazonpay.model.response {
    /**
     * Indicates if the contract is for a Live (Production) or Sandbox environment.
     * @enum
     */
    export type ReleaseEnvironment = 'LIVE' | 'SANDBOX';
}

export namespace interfaces.amazonpay.model.response {
    /**
     * Indicates the state that the Authorization object is in. For more information see “Authorization states and reason codes” under “States and reason codes” section in Amazon Pay API Reference Guide.
     * @enum
     */
    export type State = 'Pending' | 'Open' | 'Declined' | 'Closed';
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * This object encapsulates details about an Authorization object including the status, amount captured and fee charged.
     * @interface
     */
    export interface AuthorizationDetails {
        'amazonAuthorizationId'?: string;
        'authorizationReferenceId'?: string;
        'sellerAuthorizationNote'?: string;
        'authorizationAmount'?: interfaces.amazonpay.model.v1.Price;
        'capturedAmount'?: interfaces.amazonpay.model.v1.Price;
        'authorizationFee'?: interfaces.amazonpay.model.v1.Price;
        'idList'?: Array<string>;
        'creationTimestamp'?: string;
        'expirationTimestamp'?: string;
        'authorizationStatus'?: interfaces.amazonpay.model.v1.AuthorizationStatus;
        'softDecline'?: boolean;
        'captureNow'?: boolean;
        'softDescriptor'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Indicates the current status of an Authorization object, a Capture object, or a Refund object.
     * @interface
     */
    export interface AuthorizationStatus {
        'state'?: interfaces.amazonpay.model.v1.State;
        'reasonCode'?: string;
        'reasonDescription'?: string;
        'lastUpdateTimestamp'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * This is an object to set the attributes specified in the AuthorizeAttributes table. See the “AuthorizationDetails” section of the Amazon Pay API reference guide for details about this object.
     * @interface
     */
    export interface AuthorizeAttributes {
        'authorizationReferenceId': string;
        'authorizationAmount': interfaces.amazonpay.model.v1.Price;
        'transactionTimeout'?: number;
        'sellerAuthorizationNote'?: string;
        'softDescriptor'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * The merchant can choose to set the attributes specified in the BillingAgreementAttributes.
     * @interface
     */
    export interface BillingAgreementAttributes {
        'platformId'?: string;
        'sellerNote'?: string;
        'sellerBillingAgreementAttributes'?: interfaces.amazonpay.model.v1.SellerBillingAgreementAttributes;
        'billingAgreementType'?: interfaces.amazonpay.model.v1.BillingAgreementType;
        'subscriptionAmount'?: interfaces.amazonpay.model.v1.Price;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * The result attributes from successful SetupAmazonPay call.
     * @interface
     */
    export interface BillingAgreementDetails {
        'billingAgreementId': string;
        'creationTimestamp'?: string;
        'destination'?: interfaces.amazonpay.model.v1.Destination;
        'checkoutLanguage'?: string;
        'releaseEnvironment': interfaces.amazonpay.model.v1.ReleaseEnvironment;
        'billingAgreementStatus': interfaces.amazonpay.model.v1.BillingAgreementStatus;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Indicates the current status of the billing agreement. For more information about the State and ReasonCode response elements, see Billing agreement states and reason codes - https://pay.amazon.com/us/developer/documentation/apireference/201752870
     * @enum
     */
    export type BillingAgreementStatus = 'CANCELED' | 'CLOSED' | 'DRAFT' | 'OPEN' | 'SUSPENDED';
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * * This is used to specify applicable billing agreement type. * CustomerInitiatedTransaction – customer is present at the time of processing payment for the order. * MerchantInitiatedTransaction – customer is not present at the time of processing payment for the order. 
     * @enum
     */
    export type BillingAgreementType = 'CustomerInitiatedTransaction' | 'MerchantInitiatedTransaction';
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Destination object containing the details of an Address.
     * @interface
     */
    export interface Destination {
        'name'?: string;
        'companyName'?: string;
        'addressLine1'?: string;
        'addressLine2'?: string;
        'addressLine3'?: string;
        'city'?: string;
        'districtOrCounty'?: string;
        'stateOrRegion'?: string;
        'postalCode'?: string;
        'countryCode'?: string;
        'phone'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * * This is used to specify applicable payment action. * Authorize – you want to confirm the order and authorize a certain amount, but you do not want to capture at this time. * AuthorizeAndCapture – you want to confirm the order, authorize for the given amount, and capture the funds. 
     * @enum
     */
    export type PaymentAction = 'Authorize' | 'AuthorizeAndCapture';
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * This object specifies amount and currency authorized/captured.
     * @interface
     */
    export interface Price {
        'amount': string;
        'currencyCode': string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * This is required only for Ecommerce provider (Solution provider) use cases.
     * @interface
     */
    export interface ProviderAttributes {
        'providerId': string;
        'providerCreditList': Array<interfaces.amazonpay.model.v1.ProviderCredit>;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     *
     * @interface
     */
    export interface ProviderCredit {
        'providerId'?: string;
        'credit'?: interfaces.amazonpay.model.v1.Price;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Indicates if the order is for a Live (Production) or Sandbox environment.
     * @enum
     */
    export type ReleaseEnvironment = 'LIVE' | 'SANDBOX';
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Provides more context about the billing agreement that is represented by this Billing Agreement object.
     * @interface
     */
    export interface SellerBillingAgreementAttributes {
        'sellerBillingAgreementId'?: string;
        'storeName'?: string;
        'customInformation'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * This object includes elements shown to buyers in emails and in their transaction history. See the “SellerOrderAttributes” section of the Amazon Pay API reference guide for details about this object.
     * @interface
     */
    export interface SellerOrderAttributes {
        'sellerOrderId'?: string;
        'storeName'?: string;
        'customInformation'?: string;
        'sellerNote'?: string;
    }
}

export namespace interfaces.amazonpay.model.v1 {
    /**
     * Indicates the state that the Authorization object, Capture object, or Refund object is in. For more information see - https://pay.amazon.com/us/developer/documentation/apireference/201752950
     * @enum
     */
    export type State = 'Pending' | 'Open' | 'Declined' | 'Closed' | 'Completed';
}

export namespace interfaces.amazonpay.response {
    /**
     * Setup Amazon Pay Result Object. It is sent as part of the response to SetupAmazonPayRequest.
     * @interface
     */
    export interface SetupAmazonPayResult {
        'billingAgreementDetails': interfaces.amazonpay.model.response.BillingAgreementDetails;
    }
}

export namespace interfaces.amazonpay.v1 {
    /**
     * Error response for SetupAmazonPay and ChargeAmazonPay calls.
     * @interface
     */
    export interface AmazonPayErrorResponse {
        'errorCode': string;
        'errorMessage': string;
    }
}

export namespace interfaces.amazonpay.v1 {
    /**
     * Charge Amazon Pay Request Object
     * @interface
     */
    export interface ChargeAmazonPay {
        'consentToken'?: string;
        'sellerId': string;
        'billingAgreementId': string;
        'paymentAction': interfaces.amazonpay.model.v1.PaymentAction;
        'authorizeAttributes': interfaces.amazonpay.model.v1.AuthorizeAttributes;
        'sellerOrderAttributes'?: interfaces.amazonpay.model.v1.SellerOrderAttributes;
        'providerAttributes'?: interfaces.amazonpay.model.v1.ProviderAttributes;
    }
}

export namespace interfaces.amazonpay.v1 {
    /**
     * Charge Amazon Pay Result Object. It is sent as part of the reponse to ChargeAmazonPay request.
     * @interface
     */
    export interface ChargeAmazonPayResult {
        'amazonOrderReferenceId': string;
        'authorizationDetails': interfaces.amazonpay.model.v1.AuthorizationDetails;
    }
}

export namespace interfaces.amazonpay.v1 {
    /**
     * Setup Amazon Pay Request Object
     * @interface
     */
    export interface SetupAmazonPay {
        'consentToken'?: string;
        'sellerId': string;
        'countryOfEstablishment': string;
        'ledgerCurrency': string;
        'checkoutLanguage'?: string;
        'billingAgreementAttributes'?: interfaces.amazonpay.model.v1.BillingAgreementAttributes;
        'needAmazonShippingAddress'?: boolean;
        'sandboxMode'?: boolean;
        'sandboxCustomerEmailId'?: string;
    }
}

export namespace interfaces.amazonpay.v1 {
    /**
     * Setup Amazon Pay Result Object. It is sent as part of the reponse to SetupAmazonPay request.
     * @interface
     */
    export interface SetupAmazonPayResult {
        'billingAgreementDetails': interfaces.amazonpay.model.v1.BillingAgreementDetails;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface AudioItem {
        'stream'?: interfaces.audioplayer.Stream;
        'metadata'?: interfaces.audioplayer.AudioItemMetadata;
    }
}

export namespace interfaces.audioplayer {
    /**
     * Encapsulates the metadata about an AudioItem.
     * @interface
     */
    export interface AudioItemMetadata {
        'title'?: string;
        'subtitle'?: string;
        'art'?: interfaces.display.Image;
        'backgroundImage'?: interfaces.display.Image;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface AudioPlayerInterface {
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface AudioPlayerState {
        'offsetInMilliseconds'?: number;
        'token'?: string;
        'playerActivity'?: interfaces.audioplayer.PlayerActivity;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @enum
     */
    export type ClearBehavior = 'CLEAR_ALL' | 'CLEAR_ENQUEUED';
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface CurrentPlaybackState {
        'offsetInMilliseconds'?: number;
        'playerActivity'?: interfaces.audioplayer.PlayerActivity;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface Error {
        'message'?: string;
        'type'?: interfaces.audioplayer.ErrorType;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @enum
     */
    export type ErrorType = 'MEDIA_ERROR_INTERNAL_DEVICE_ERROR' | 'MEDIA_ERROR_INTERNAL_SERVER_ERROR' | 'MEDIA_ERROR_INVALID_REQUEST' | 'MEDIA_ERROR_SERVICE_UNAVAILABLE' | 'MEDIA_ERROR_UNKNOWN';
}

export namespace interfaces.audioplayer {
    /**
     *
     * @enum
     */
    export type PlayBehavior = 'ENQUEUE' | 'REPLACE_ALL' | 'REPLACE_ENQUEUED';
}

export namespace interfaces.audioplayer {
    /**
     *
     * @enum
     */
    export type PlayerActivity = 'PLAYING' | 'PAUSED' | 'FINISHED' | 'BUFFER_UNDERRUN' | 'IDLE' | 'STOPPED';
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface Stream {
        'expectedPreviousToken'?: string;
        'token': string;
        'url': string;
        'offsetInMilliseconds': number;
    }
}

export namespace interfaces.automotive {
    /**
     * This object contains the automotive specific information of the device
     * @interface
     */
    export interface AutomotiveState {
    }
}

export namespace interfaces.connections {
    /**
     * Connection Status indicates a high level understanding of the result of ConnectionsRequest.
     * @interface
     */
    export interface ConnectionsStatus {
        'code': string;
        'message'?: string;
    }
}

export namespace interfaces.connections.entities {
   /**
    *
    * @interface
    */
    export type BaseEntity = interfaces.connections.entities.PostalAddress | interfaces.connections.entities.Restaurant;
}

export namespace interfaces.connections.requests {
   /**
    *
    * @interface
    */
    export type BaseRequest = interfaces.connections.requests.ScheduleFoodEstablishmentReservationRequest | interfaces.connections.requests.PrintImageRequest | interfaces.connections.requests.PrintWebPageRequest | interfaces.connections.requests.PrintPDFRequest | interfaces.connections.requests.ScheduleTaxiReservationRequest;
}

export namespace interfaces.customInterfaceController {
    /**
     * The endpoint of a gadget.
     * @interface
     */
    export interface Endpoint {
        'endpointId': string;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * An Event object defining a single event sent by an endpoint
     * @interface
     */
    export interface Event {
        'header': interfaces.customInterfaceController.Header;
        'payload': any;
        'endpoint': interfaces.customInterfaceController.Endpoint;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * Defines the Jsonlogic event filter expression and its corresponding match action.  This filter is applied to all events during the event handler's duration.  Events that are rejected by the filter expression are not sent to the skill.
     * @interface
     */
    export interface EventFilter {
        'filterExpression': any;
        'filterMatchAction': interfaces.customInterfaceController.FilterMatchAction;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * This object defines the duration of the Event Handler and the optional JSON payload that is delivered to the skill when the timer expires.
     * @interface
     */
    export interface Expiration {
        'durationInMilliseconds': number;
        'expirationPayload'?: any;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * The behavior to be performed by the platform on a successful filter expression match.
     * @enum
     */
    export type FilterMatchAction = 'SEND_AND_TERMINATE' | 'SEND';
}

export namespace interfaces.customInterfaceController {
    /**
     * Endpoint Event header
     * @interface
     */
    export interface Header {
        'namespace': string;
        'name': string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @enum
     */
    export type BackButtonBehavior = 'HIDDEN' | 'VISIBLE';
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface DisplayInterface {
        'templateVersion'?: string;
        'markupVersion'?: string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface DisplayState {
        'token'?: string;
    }
}

export namespace interfaces.display {
   /**
    *
    * @interface
    */
    export type Hint = interfaces.display.PlainTextHint;
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface Image {
        'contentDescription'?: string;
        'sources'?: Array<interfaces.display.ImageInstance>;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface ImageInstance {
        'url': string;
        'size'?: interfaces.display.ImageSize;
        'widthPixels'?: number;
        'heightPixels'?: number;
    }
}

export namespace interfaces.display {
    /**
     *
     * @enum
     */
    export type ImageSize = 'X_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'X_LARGE';
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface ListItem {
        'token': string;
        'image'?: interfaces.display.Image;
        'textContent'?: interfaces.display.TextContent;
    }
}

export namespace interfaces.display {
   /**
    *
    * @interface
    */
    export type Template = interfaces.display.ListTemplate2 | interfaces.display.ListTemplate1 | interfaces.display.BodyTemplate7 | interfaces.display.BodyTemplate6 | interfaces.display.BodyTemplate3 | interfaces.display.BodyTemplate2 | interfaces.display.BodyTemplate1;
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface TextContent {
        'primaryText'?: interfaces.display.TextField;
        'secondaryText'?: interfaces.display.TextField;
        'tertiaryText'?: interfaces.display.TextField;
    }
}

export namespace interfaces.display {
   /**
    *
    * @interface
    */
    export type TextField = interfaces.display.RichText | interfaces.display.PlainText;
}

export namespace interfaces.geolocation {
    /**
     * A string representing if Alexa has access to location services running on the hostOS of device.
     * @enum
     */
    export type Access = 'ENABLED' | 'DISABLED' | 'UNKNOWN';
}

export namespace interfaces.geolocation {
    /**
     * An object containing the altitude information of the device.
     * @interface
     */
    export interface Altitude {
        'altitudeInMeters': number;
        'accuracyInMeters': number;
    }
}

export namespace interfaces.geolocation {
    /**
     * An object containing the location information of the device.
     * @interface
     */
    export interface Coordinate {
        'latitudeInDegrees': number;
        'longitudeInDegrees': number;
        'accuracyInMeters': number;
    }
}

export namespace interfaces.geolocation {
    /**
     *
     * @interface
     */
    export interface GeolocationInterface {
    }
}

export namespace interfaces.geolocation {
    /**
     *
     * @interface
     */
    export interface GeolocationState {
        'timestamp'?: string;
        'coordinate'?: interfaces.geolocation.Coordinate;
        'altitude'?: interfaces.geolocation.Altitude;
        'heading'?: interfaces.geolocation.Heading;
        'speed'?: interfaces.geolocation.Speed;
        'locationServices'?: interfaces.geolocation.LocationServices;
    }
}

export namespace interfaces.geolocation {
    /**
     * An object containing the heading direction information of the device.
     * @interface
     */
    export interface Heading {
        'directionInDegrees': number;
        'accuracyInDegrees'?: number;
    }
}

export namespace interfaces.geolocation {
    /**
     * An object containing status and access.
     * @interface
     */
    export interface LocationServices {
        'status': interfaces.geolocation.Status;
        'access': interfaces.geolocation.Access;
    }
}

export namespace interfaces.geolocation {
    /**
     * An object containing the speed information of the device.
     * @interface
     */
    export interface Speed {
        'speedInMetersPerSecond': number;
        'accuracyInMetersPerSecond'?: number;
    }
}

export namespace interfaces.geolocation {
    /**
     * A string representing the status of whether location services is currently running or not on the host OS of device.
     * @enum
     */
    export type Status = 'RUNNING' | 'STOPPED';
}

export namespace interfaces.monetization.v1 {
    /**
     * Entity to define In Skill Product over which actions will be performed.
     * @interface
     */
    export interface InSkillProduct {
        'productId': string;
    }
}

export namespace interfaces.monetization.v1 {
    /**
     * Response from purchase directives:   * ACCEPTED - User have accepted the offer to purchase the product   * DECLINED - User have declined the offer to purchase the product   * NOT_ENTITLED - User tries to cancel/return a product he/she is  not entitled to.   * ALREADY_PURCHASED - User has already purchased the product   * ERROR - An internal error occurred 
     * @enum
     */
    export type PurchaseResult = 'ACCEPTED' | 'DECLINED' | 'NOT_ENTITLED' | 'ERROR' | 'ALREADY_PURCHASED';
}

export namespace interfaces.navigation {
    /**
     *
     * @interface
     */
    export interface NavigationInterface {
    }
}

export namespace interfaces.system {
    /**
     *
     * @interface
     */
    export interface Error {
        'type': interfaces.system.ErrorType;
        'message'?: string;
    }
}

export namespace interfaces.system {
    /**
     *
     * @interface
     */
    export interface ErrorCause {
        'requestId': string;
    }
}

export namespace interfaces.system {
    /**
     *
     * @enum
     */
    export type ErrorType = 'INVALID_RESPONSE' | 'DEVICE_COMMUNICATION_ERROR' | 'INTERNAL_SERVICE_ERROR';
}

export namespace interfaces.system {
    /**
     *
     * @interface
     */
    export interface SystemState {
        'application': Application;
        'user': User;
        'device'?: Device;
        'person'?: Person;
        'apiEndpoint': string;
        'apiAccessToken'?: string;
    }
}

export namespace interfaces.videoapp {
    /**
     *
     * @interface
     */
    export interface Metadata {
        'title'?: string;
        'subtitle'?: string;
    }
}

export namespace interfaces.videoapp {
    /**
     *
     * @interface
     */
    export interface VideoAppInterface {
    }
}

export namespace interfaces.videoapp {
    /**
     *
     * @interface
     */
    export interface VideoItem {
        'source': string;
        'metadata'?: interfaces.videoapp.Metadata;
    }
}

export namespace interfaces.viewport {
    /**
     * An experience represents a viewing mode used to interact with the device.
     * @interface
     */
    export interface Experience {
        'arcMinuteWidth'?: number;
        'arcMinuteHeight'?: number;
        'canRotate'?: boolean;
        'canResize'?: boolean;
    }
}

export namespace interfaces.viewport {
    /**
     * Represents a physical button input mechanism which can be used to interact with elements shown on the viewport.
     * @enum
     */
    export type Keyboard = 'DIRECTION';
}

export namespace interfaces.viewport {
    /**
     * The expected use case of the device's viewport, encapsulating the available input mechanisms and user viewing distance.
     * @enum
     */
    export type Mode = 'AUTO' | 'HUB' | 'MOBILE' | 'PC' | 'TV';
}

export namespace interfaces.viewport {
    /**
     * Type of the viewport.   * `STANDARD` Indicates that this viewport occupies an exclusive area of the screen.   * `OVERLAY` Indicates that the viewport is an overlay, sharing the screen with other experiences.
     * @enum
     */
    export type PresentationType = 'STANDARD' | 'OVERLAY';
}

export namespace interfaces.viewport {
    /**
     * The shape of the viewport.
     * @enum
     */
    export type Shape = 'RECTANGLE' | 'ROUND';
}

export namespace interfaces.viewport {
    /**
     * Represents a type of touch input suppported by the device.
     * @enum
     */
    export type Touch = 'SINGLE';
}

export namespace interfaces.viewport {
   /**
    *
    * @interface
    */
    export type TypedViewportState = interfaces.viewport.APLViewportState | interfaces.viewport.APLTViewportState;
}

export namespace interfaces.viewport {
    /**
     * This object contains the characteristics related to the device's viewport.
     * @interface
     */
    export interface ViewportState {
        'experiences'?: Array<interfaces.viewport.Experience>;
        'mode'?: interfaces.viewport.Mode;
        'shape'?: interfaces.viewport.Shape;
        'pixelWidth'?: number;
        'pixelHeight'?: number;
        'dpi'?: number;
        'currentPixelWidth'?: number;
        'currentPixelHeight'?: number;
        'touch'?: Array<interfaces.viewport.Touch>;
        'keyboard'?: Array<interfaces.viewport.Keyboard>;
        'video'?: interfaces.viewport.ViewportStateVideo;
    }
}

export namespace interfaces.viewport {
    /**
     * Details of the technologies which are available for playing video on the device.
     * @interface
     */
    export interface ViewportStateVideo {
        'codecs'?: Array<interfaces.viewport.video.Codecs>;
    }
}

export namespace interfaces.viewport {
    /**
     * Details of the technologies which are available for playing video on the device.
     * @interface
     */
    export interface ViewportVideo {
        'codecs'?: Array<interfaces.viewport.video.Codecs>;
    }
}

export namespace interfaces.viewport.apl {
    /**
     * The viewport configuration at the time of the request.
     * @interface
     */
    export interface CurrentConfiguration {
        'mode': interfaces.viewport.Mode;
        'video'?: interfaces.viewport.ViewportVideo;
        'size': interfaces.viewport.size.ViewportSize;
    }
}

export namespace interfaces.viewport.apl {
    /**
     *
     * @interface
     */
    export interface ViewportConfiguration {
        'current': interfaces.viewport.apl.CurrentConfiguration;
    }
}

export namespace interfaces.viewport.aplt {
    /**
     * Supported character set on a text display   * `SEVEN_SEGMENT` - 7-segment display 
     * @enum
     */
    export type CharacterFormat = 'SEVEN_SEGMENT';
}

export namespace interfaces.viewport.aplt {
    /**
     *
     * @interface
     */
    export interface InterSegment {
        'x': number;
        'y': number;
        'characters': string;
    }
}

export namespace interfaces.viewport.aplt {
    /**
     * name of viewport's profile
     * @enum
     */
    export type ViewportProfile = 'FOUR_CHARACTER_CLOCK';
}

export namespace interfaces.viewport.size {
   /**
    * Information regarding the range of sizes for a configuration.
    * @interface
    */
    export type ViewportSize = interfaces.viewport.size.ContinuousViewportSize | interfaces.viewport.size.DiscreteViewportSize;
}

export namespace interfaces.viewport.video {
    /**
     * A named bundle of codecs which are available for playing video on the viewport.
     * @enum
     */
    export type Codecs = 'H_264_41' | 'H_264_42';
}

export namespace services.deviceAddress {
    /**
     * Represents the full address response from the service.
     * @interface
     */
    export interface Address {
        'addressLine1'?: string;
        'addressLine2'?: string;
        'addressLine3'?: string;
        'countryCode'?: string;
        'stateOrRegion'?: string;
        'city'?: string;
        'districtOrCounty'?: string;
        'postalCode'?: string;
    }
}

export namespace services.deviceAddress {
    /**
     *
     * @interface
     */
    export interface Error {
        'type'?: string;
        'message'?: string;
    }
}

export namespace services.deviceAddress {
    /**
     *
     * @interface
     */
    export interface ShortAddress {
        'countryCode'?: string;
        'postalCode'?: string;
    }
}

export namespace services.directive {
   /**
    *
    * @interface
    */
    export type Directive = services.directive.SpeakDirective;
}

export namespace services.directive {
    /**
     *
     * @interface
     */
    export interface Error {
        'code': number;
        'message': string;
    }
}

export namespace services.directive {
    /**
     *
     * @interface
     */
    export interface Header {
        'requestId': string;
    }
}

export namespace services.directive {
    /**
     * Send Directive Request payload.
     * @interface
     */
    export interface SendDirectiveRequest {
        'header': services.directive.Header;
        'directive': services.directive.Directive;
    }
}

export namespace services.endpointEnumeration {
    /**
     *
     * @interface
     */
    export interface EndpointCapability {
        'interface'?: string;
        'type'?: string;
        'version'?: string;
    }
}

export namespace services.endpointEnumeration {
    /**
     * Contains the list of endpoints.
     * @interface
     */
    export interface EndpointEnumerationResponse {
        'endpoints'?: Array<services.endpointEnumeration.EndpointInfo>;
    }
}

export namespace services.endpointEnumeration {
    /**
     * Contains the list of connected endpoints and their declared capabilities.
     * @interface
     */
    export interface EndpointInfo {
        'endpointId'?: string;
        'friendlyName'?: string;
        'capabilities'?: Array<services.endpointEnumeration.EndpointCapability>;
    }
}

export namespace services.endpointEnumeration {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: string;
        'message'?: string;
    }
}

export namespace services.gadgetController {
    /**
     * The action that triggers the animation. Possible values are as follows   * `buttonDown` - Play the animation when the button is pressed.   * `buttonUp` - Play the animation when the button is released.   * `none` - Play the animation as soon as it arrives. 
     * @enum
     */
    export type TriggerEventType = 'buttonDown' | 'buttonUp' | 'none';
}

export namespace services.gadgetController {
    /**
     *
     * @interface
     */
    export interface AnimationStep {
        'durationMs': number;
        'color': string;
        'blend': boolean;
    }
}

export namespace services.gadgetController {
    /**
     *
     * @interface
     */
    export interface LightAnimation {
        'repeat'?: number;
        'targetLights'?: Array<string>;
        'sequence'?: Array<services.gadgetController.AnimationStep>;
    }
}

export namespace services.gadgetController {
    /**
     * Arguments that pertain to animating the buttons.
     * @interface
     */
    export interface SetLightParameters {
        'triggerEvent'?: services.gadgetController.TriggerEventType;
        'triggerEventTimeMs'?: number;
        'animations'?: Array<services.gadgetController.LightAnimation>;
    }
}

export namespace services.gameEngine {
    /**
     * Specifies what raw button presses to put in the inputEvents field of the event.  * history - All button presses since this Input Handler was started. * matches - Just the button presses that contributed to this event (that is, were in the recognizers). To receive no raw button presses, leave this array empty or do not specify it at all. 
     * @enum
     */
    export type EventReportingType = 'history' | 'matches';
}

export namespace services.gameEngine {
    /**
     *
     * @interface
     */
    export interface InputEvent {
        'gadgetId'?: string;
        'timestamp'?: string;
        'action'?: services.gameEngine.InputEventActionType;
        'color'?: string;
        'feature'?: string;
    }
}

export namespace services.gameEngine {
    /**
     * Either \"down\" for a button pressed or \"up\" for a button released.
     * @enum
     */
    export type InputEventActionType = 'down' | 'up';
}

export namespace services.gameEngine {
    /**
     *
     * @interface
     */
    export interface InputHandlerEvent {
        'name'?: string;
        'inputEvents'?: Array<services.gameEngine.InputEvent>;
    }
}

export namespace services.gameEngine {
    /**
     * Where the pattern must appear in the history of this input handler. * `start` -  (Default) The first event in the pattern must be the first event in the history of raw Echo Button events. * `end` - The last event in the pattern must be the last event in the history of raw Echo Button events. * `anywhere` - The pattern may appear anywhere in the history of raw Echo Button events. 
     * @enum
     */
    export type PatternRecognizerAnchorType = 'start' | 'end' | 'anywhere';
}

export namespace services.gameEngine {
    /**
     * The events object is where you define the conditions that must be met for your skill to be notified of Echo Button input. You must define at least one event.
     * @interface
     */
    export interface Event {
        'shouldEndInputHandler': boolean;
        'meets': Array<string>;
        'fails'?: Array<string>;
        'reports'?: services.gameEngine.EventReportingType;
        'maximumInvocations'?: number;
        'triggerTimeMilliseconds'?: number;
    }
}

export namespace services.gameEngine {
    /**
     * An object that provides all of the events that need to occur, in a specific order, for this recognizer to be true. Omitting any parameters in this object means \"match anything\".
     * @interface
     */
    export interface Pattern {
        'gadgetIds'?: Array<string>;
        'colors'?: Array<string>;
        'action'?: services.gameEngine.InputEventActionType;
        'repeat'?: number;
    }
}

export namespace services.gameEngine {
   /**
    * Recognizers are conditions that, at any moment, are either true or false, based on all the raw button events that the Input Handler has received in the time elapsed since the Input Handler session started.
    * @interface
    */
    export type Recognizer = services.gameEngine.PatternRecognizer | services.gameEngine.DeviationRecognizer | services.gameEngine.ProgressRecognizer;
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface AlexaList {
        'listId'?: string;
        'name'?: string;
        'state'?: services.listManagement.ListState;
        'version'?: number;
        'items'?: Array<services.listManagement.AlexaListItem>;
        'links'?: services.listManagement.Links;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface AlexaListItem {
        'id'?: string;
        'version'?: number;
        'value'?: string;
        'status'?: services.listManagement.ListItemState;
        'createdTime'?: string;
        'updatedTime'?: string;
        'href'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface AlexaListMetadata {
        'listId'?: string;
        'name'?: string;
        'state'?: services.listManagement.ListState;
        'version'?: number;
        'statusMap'?: Array<services.listManagement.Status>;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface AlexaListsMetadata {
        'lists'?: Array<services.listManagement.AlexaListMetadata>;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface CreateListItemRequest {
        'value'?: string;
        'status'?: services.listManagement.ListItemState;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface CreateListRequest {
        'name'?: string;
        'state'?: services.listManagement.ListState;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface Error {
        'type'?: string;
        'message'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ForbiddenError {
        'Message'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface Links {
        'next'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListBody {
        'listId'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListItemBody {
        'listId'?: string;
        'listItemIds'?: Array<string>;
    }
}

export namespace services.listManagement {
    /**
     *
     * @enum
     */
    export type ListItemState = 'active' | 'completed';
}

export namespace services.listManagement {
    /**
     *
     * @enum
     */
    export type ListState = 'active' | 'archived';
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface Status {
        'url'?: string;
        'status'?: services.listManagement.ListItemState;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface UpdateListItemRequest {
        'value'?: string;
        'status'?: services.listManagement.ListItemState;
        'version'?: number;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface UpdateListRequest {
        'name'?: string;
        'state'?: services.listManagement.ListState;
        'version'?: number;
    }
}

export namespace services.monetization {
    /**
     * State determining if the user is entitled to the product. Note - Any new values introduced later should be treated as 'NOT_ENTITLED'. * 'ENTITLED' - The user is entitled to the product. * 'NOT_ENTITLED' - The user is not entitled to the product.
     * @enum
     */
    export type EntitledState = 'ENTITLED' | 'NOT_ENTITLED';
}

export namespace services.monetization {
    /**
     * Reason for the entitlement status. * 'PURCHASED' - The user is entitled to the product because they purchased it. * 'NOT_PURCHASED' - The user is not entitled to the product because they have not purchased it. * 'AUTO_ENTITLED' - The user is auto entitled to the product because they have subscribed to a broader service.
     * @enum
     */
    export type EntitlementReason = 'PURCHASED' | 'NOT_PURCHASED' | 'AUTO_ENTITLED';
}

export namespace services.monetization {
    /**
     * Describes error detail
     * @interface
     */
    export interface Error {
        'message'?: string;
    }
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface InSkillProduct {
        'productId': string;
        'referenceName': string;
        'name': string;
        'type': services.monetization.ProductType;
        'summary': string;
        'purchasable': services.monetization.PurchasableState;
        'entitled': services.monetization.EntitledState;
        'entitlementReason': services.monetization.EntitlementReason;
        'activeEntitlementCount': number;
        'purchaseMode': services.monetization.PurchaseMode;
    }
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface InSkillProductTransactionsResponse {
        'results': Array<services.monetization.Transactions>;
        'metadata': services.monetization.Metadata;
    }
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface InSkillProductsResponse {
        'inSkillProducts': Array<services.monetization.InSkillProduct>;
        'isTruncated': boolean;
        'nextToken': string;
    }
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface Metadata {
        'resultSet'?: services.monetization.ResultSet;
    }
}

export namespace services.monetization {
    /**
     * Product type. * 'SUBSCRIPTION' - Once purchased, customers will own the content for the subscription period. * 'ENTITLEMENT' - Once purchased, customers will own the content forever. * 'CONSUMABLE' - Once purchased, customers will be entitled to the content until it is consumed. It can also be re-purchased.
     * @enum
     */
    export type ProductType = 'SUBSCRIPTION' | 'ENTITLEMENT' | 'CONSUMABLE';
}

export namespace services.monetization {
    /**
     * State determining if the product is purchasable by the user. Note - Any new values introduced later should be treated as 'NOT_PURCHASABLE'. * 'PURCHASABLE' - The product is purchasable by the user. * 'NOT_PURCHASABLE' - The product is not purchasable by the user.
     * @enum
     */
    export type PurchasableState = 'PURCHASABLE' | 'NOT_PURCHASABLE';
}

export namespace services.monetization {
    /**
     * Indicates if the entitlements are for TEST or LIVE purchases. * 'TEST' - test purchases made by developers or beta testers. Purchase not sent to payment processing. * 'LIVE' - purchases made by live customers. Purchase sent to payment processing.
     * @enum
     */
    export type PurchaseMode = 'TEST' | 'LIVE';
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface ResultSet {
        'nextToken'?: string;
    }
}

export namespace services.monetization {
    /**
     * Transaction status for in skill product purchases. * 'PENDING_APPROVAL_BY_PARENT' - The transaction is pending approval from parent. * 'APPROVED_BY_PARENT' - The transaction was approved by parent and fulfilled successfully.. * 'DENIED_BY_PARENT' - The transaction was declined by parent and hence not fulfilled. * 'EXPIRED_NO_ACTION_BY_PARENT' - The transaction was expired due to no response from parent and hence not fulfilled. * 'ERROR' - The transaction was not fullfiled as there was an error while processing the transaction.
     * @enum
     */
    export type Status = 'PENDING_APPROVAL_BY_PARENT' | 'APPROVED_BY_PARENT' | 'DENIED_BY_PARENT' | 'EXPIRED_NO_ACTION_BY_PARENT' | 'ERROR';
}

export namespace services.monetization {
    /**
     *
     * @interface
     */
    export interface Transactions {
        'status'?: services.monetization.Status;
        'productId'?: string;
        'createdTime'?: string;
        'lastModifiedTime'?: string;
    }
}

export namespace services.proactiveEvents {
    /**
     *
     * @interface
     */
    export interface CreateProactiveEventRequest {
        'timestamp': string;
        'referenceId': string;
        'expiryTime': string;
        'event': services.proactiveEvents.Event;
        'localizedAttributes': Array<any>;
        'relevantAudience': services.proactiveEvents.RelevantAudience;
    }
}

export namespace services.proactiveEvents {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: number;
        'message'?: string;
    }
}

export namespace services.proactiveEvents {
    /**
     * The event data to be sent to customers, conforming to the schema associated with this event.
     * @interface
     */
    export interface Event {
        'name': string;
        'payload': any;
    }
}

export namespace services.proactiveEvents {
    /**
     * The audience for this event.
     * @interface
     */
    export interface RelevantAudience {
        'type': services.proactiveEvents.RelevantAudienceType;
        'payload': any;
    }
}

export namespace services.proactiveEvents {
    /**
     * The audience for this event. Use Multicast to target information to all customers subscribed to that event, or use Unicast to target information containing the actual userId for individual events. 
     * @enum
     */
    export type RelevantAudienceType = 'Unicast' | 'Multicast';
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: string;
        'message'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface Event {
        'status'?: services.reminderManagement.Status;
        'alertToken'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     * Response object for get reminders request
     * @interface
     */
    export interface GetRemindersResponse {
        'totalCount'?: string;
        'alerts'?: Array<services.reminderManagement.Reminder>;
        'links'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     * Reminder object
     * @interface
     */
    export interface Reminder {
        'alertToken'?: string;
        'createdTime'?: string;
        'updatedTime'?: string;
        'status'?: services.reminderManagement.Status;
        'trigger'?: services.reminderManagement.Trigger;
        'alertInfo'?: services.reminderManagement.AlertInfo;
        'pushNotification'?: services.reminderManagement.PushNotification;
        'version'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderDeletedEvent {
        'alertTokens'?: Array<string>;
    }
}

export namespace services.reminderManagement {
    /**
     * Input request for creating a reminder
     * @interface
     */
    export interface ReminderRequest {
        'requestTime'?: string;
        'trigger'?: services.reminderManagement.Trigger;
        'alertInfo'?: services.reminderManagement.AlertInfo;
        'pushNotification'?: services.reminderManagement.PushNotification;
    }
}

export namespace services.reminderManagement {
    /**
     * Response object for post/put/delete reminder request
     * @interface
     */
    export interface ReminderResponse {
        'alertToken'?: string;
        'createdTime'?: string;
        'updatedTime'?: string;
        'status'?: services.reminderManagement.Status;
        'version'?: string;
        'href'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     * Alert info for VUI / GUI
     * @interface
     */
    export interface AlertInfo {
        'spokenInfo'?: services.reminderManagement.AlertInfoSpokenInfo;
    }
}

export namespace services.reminderManagement {
    /**
     * Parameters for VUI presentation of the reminder
     * @interface
     */
    export interface AlertInfoSpokenInfo {
        'content': Array<services.reminderManagement.SpokenText>;
    }
}

export namespace services.reminderManagement {
    /**
     * Enable / disable reminders push notifications to Alexa mobile apps
     * @interface
     */
    export interface PushNotification {
        'status'?: services.reminderManagement.PushNotificationStatus;
    }
}

export namespace services.reminderManagement {
    /**
     * Push notification status - Enabled/Disabled
     * @enum
     */
    export type PushNotificationStatus = 'ENABLED' | 'DISABLED';
}

export namespace services.reminderManagement {
    /**
     * Recurring date/time using the RFC 5545 standard in JSON object form
     * @interface
     */
    export interface Recurrence {
        'freq'?: services.reminderManagement.RecurrenceFreq;
        'byDay'?: Array<services.reminderManagement.RecurrenceDay>;
        'interval'?: number;
    }
}

export namespace services.reminderManagement {
    /**
     * Day of recurrence
     * @enum
     */
    export type RecurrenceDay = 'SU' | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA';
}

export namespace services.reminderManagement {
    /**
     * Frequency of recurrence
     * @enum
     */
    export type RecurrenceFreq = 'WEEKLY' | 'DAILY';
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface SpokenText {
        'locale'?: string;
        'ssml'?: string;
        'text'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     * Status of reminder
     * @enum
     */
    export type Status = 'ON' | 'COMPLETED';
}

export namespace services.reminderManagement {
    /**
     * Trigger information for Reminder
     * @interface
     */
    export interface Trigger {
        'type'?: services.reminderManagement.TriggerType;
        'scheduledTime'?: string;
        'offsetInSeconds'?: number;
        'timeZoneId'?: string;
        'recurrence'?: services.reminderManagement.Recurrence;
    }
}

export namespace services.reminderManagement {
    /**
     * Type of reminder - Absolute / Relative
     * @enum
     */
    export type TriggerType = 'SCHEDULED_ABSOLUTE' | 'SCHEDULED_RELATIVE';
}

export namespace services.skillMessaging {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: number;
        'message'?: string;
    }
}

export namespace services.skillMessaging {
    /**
     * The message that needs to be sent to the skill 
     * @interface
     */
    export interface SendSkillMessagingRequest {
        'data': any;
        'expiresAfterSeconds'?: number;
    }
}

export namespace services.ups {
    /**
     *
     * @enum
     */
    export type DistanceUnits = 'METRIC' | 'IMPERIAL';
}

export namespace services.ups {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: services.ups.ErrorCode;
        'message'?: string;
    }
}

export namespace services.ups {
    /**
     * A more precise error code. Some of these codes may not apply to some APIs. - INVALID_KEY: the setting key is not supported - INVALID_VALUE: the setting value is not valid - INVALID_TOKEN: the token is invalid - INVALID_URI: the uri is invalid - DEVICE_UNREACHABLE: the device is offline - UNKNOWN_ERROR: internal service error
     * @enum
     */
    export type ErrorCode = 'INVALID_KEY' | 'INVALID_VALUE' | 'INVALID_TOKEN' | 'INVALID_URI' | 'DEVICE_UNREACHABLE' | 'UNKNOWN_ERROR';
}

export namespace services.ups {
    /**
     *
     * @interface
     */
    export interface PhoneNumber {
        'countryCode'?: string;
        'phoneNumber'?: string;
    }
}

export namespace services.ups {
    /**
     *
     * @enum
     */
    export type TemperatureUnit = 'CELSIUS' | 'FAHRENHEIT';
}

export namespace slu.entityresolution {
    /**
     * Represents a possible authority for entity resolution
     * @interface
     */
    export interface Resolution {
        'authority': string;
        'status': slu.entityresolution.Status;
        'values': Array<slu.entityresolution.ValueWrapper>;
    }
}

export namespace slu.entityresolution {
    /**
     * Represents the results of resolving the words captured from the user's utterance. This is included for slots that use a custom slot type or a built-in slot type that you have extended with your own values. Note that resolutions is not included for built-in slot types that you have not extended.
     * @interface
     */
    export interface Resolutions {
        'resolutionsPerAuthority'?: Array<slu.entityresolution.Resolution>;
    }
}

export namespace slu.entityresolution {
    /**
     *
     * @interface
     */
    export interface Status {
        'code': slu.entityresolution.StatusCode;
    }
}

export namespace slu.entityresolution {
    /**
     * Indication of the results of attempting to resolve the user utterance against the defined slot types.
     * @enum
     */
    export type StatusCode = 'ER_SUCCESS_MATCH' | 'ER_SUCCESS_NO_MATCH' | 'ER_ERROR_TIMEOUT' | 'ER_ERROR_EXCEPTION';
}

export namespace slu.entityresolution {
    /**
     * Represents the resolved value for the slot, based on the user’s utterance and slot type definition.
     * @interface
     */
    export interface Value {
        'name': string;
        'id': string;
    }
}

export namespace slu.entityresolution {
    /**
     * A wrapper class for an entity resolution value used for JSON serialization.
     * @interface
     */
    export interface ValueWrapper {
        'value': slu.entityresolution.Value;
    }
}

export namespace ui {
   /**
    *
    * @interface
    */
    export type Card = ui.AskForPermissionsConsentCard | ui.LinkAccountCard | ui.StandardCard | ui.SimpleCard;
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface Image {
        'smallImageUrl'?: string;
        'largeImageUrl'?: string;
    }
}

export namespace ui {
   /**
    *
    * @interface
    */
    export type OutputSpeech = ui.SsmlOutputSpeech | ui.PlainTextOutputSpeech;
}

export namespace ui {
    /**
     * Determines whether Alexa will queue or play this output speech immediately interrupting other speech
     * @enum
     */
    export type PlayBehavior = 'ENQUEUE' | 'REPLACE_ALL' | 'REPLACE_ENQUEUED';
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface Reprompt {
        'outputSpeech': ui.OutputSpeech;
    }
}

/**
 * Represents the status and result needed to resume a skill's suspended session.
 * @interface
 */
export interface ConnectionCompleted {
    'type' : 'ConnectionCompleted';
    'token'?: string;
    'status'?: Status;
    'result'?: any;
}

/**
 * An IntentRequest is an object that represents a request made to a skill based on what the user wants to do.
 * @interface
 */
export interface IntentRequest {
    'type' : 'IntentRequest';
    'requestId': string;
    'timestamp': string;
    'locale'?: string;
    'dialogState': DialogState;
    'intent': Intent;
}

/**
 * Represents that a user made a request to an Alexa skill, but did not provide a specific intent.
 * @interface
 */
export interface LaunchRequest {
    'type' : 'LaunchRequest';
    'requestId': string;
    'timestamp': string;
    'locale'?: string;
    'task'?: Task;
}

/**
 * A SessionEndedRequest is an object that represents a request made to an Alexa skill to notify that a session was ended. Your service receives a SessionEndedRequest when a currently open session is closed for one of the following reasons: <ol><li>The user says “exit”</li><li>the user does not respond or says something that does not match an intent defined in your voice interface while the device is listening for the user’s response</li><li>an error occurs</li></ol>
 * @interface
 */
export interface SessionEndedRequest {
    'type' : 'SessionEndedRequest';
    'requestId': string;
    'timestamp': string;
    'locale'?: string;
    'reason': SessionEndedReason;
    'error'?: SessionEndedError;
}

/**
 * The request to resume a skill's session and tells the skill why it is resumed.
 * @interface
 */
export interface SessionResumedRequest {
    'type' : 'SessionResumedRequest';
    'requestId': string;
    'timestamp': string;
    'locale'?: string;
    'cause'?: Cause;
}

export namespace canfulfill {
    /**
     * An object that represents a request made to skill to query whether the skill can understand and fulfill the intent request with detected slots, before actually asking the skill to take action. Skill should be aware this is not to actually take action, skill should handle this request without causing side-effect, skill should not modify some state outside its scope or has an observable interaction with its calling functions or the outside world besides returning a value, such as playing sound,turning on/off lights, committing a transaction or a charge.
     * @interface
     */
    export interface CanFulfillIntentRequest {
        'type' : 'CanFulfillIntentRequest';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'dialogState'?: DialogState;
        'intent': Intent;
    }
}

export namespace dialog {
    /**
     *
     * @interface
     */
    export interface ConfirmIntentDirective {
        'type' : 'Dialog.ConfirmIntent';
        'updatedIntent'?: Intent;
    }
}

export namespace dialog {
    /**
     *
     * @interface
     */
    export interface ConfirmSlotDirective {
        'type' : 'Dialog.ConfirmSlot';
        'updatedIntent'?: Intent;
        'slotToConfirm': string;
    }
}

export namespace dialog {
    /**
     *
     * @interface
     */
    export interface DelegateDirective {
        'type' : 'Dialog.Delegate';
        'updatedIntent'?: Intent;
    }
}

export namespace dialog {
    /**
     *
     * @interface
     */
    export interface DynamicEntitiesDirective {
        'type' : 'Dialog.UpdateDynamicEntities';
        'updateBehavior': er.dynamic.UpdateBehavior;
        'types'?: Array<er.dynamic.EntityListItem>;
    }
}

export namespace dialog {
    /**
     *
     * @interface
     */
    export interface ElicitSlotDirective {
        'type' : 'Dialog.ElicitSlot';
        'updatedIntent'?: Intent;
        'slotToElicit': string;
    }
}

export namespace events.skillevents {
    /**
     * This event indicates that a customer has linked an account in a third-party application with the Alexa app. This event is useful for an application that support out-of-session (non-voice) user interactions so that this application can be notified when the internal customer can be associated with the Alexa customer. This event is required for many applications that synchronize customer Alexa lists with application lists. During the account linking process, the Alexa app directs the user to the skill website where the customer logs in. When the customer logs in, the skill then provides an access token and a consent token to Alexa. The event includes the same access token and consent token.
     * @interface
     */
    export interface AccountLinkedRequest {
        'type' : 'AlexaSkillEvent.SkillAccountLinked';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body': events.skillevents.AccountLinkedBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface PermissionAcceptedRequest {
        'type' : 'AlexaSkillEvent.SkillPermissionAccepted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: events.skillevents.PermissionBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface PermissionChangedRequest {
        'type' : 'AlexaSkillEvent.SkillPermissionChanged';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: events.skillevents.PermissionBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace events.skillevents {
    /**
     * This event indicates a customer subscription to receive events from your skill and contains information for that user. You need this information to know the userId in order to send events to individual users. Note that these events can arrive out of order, so ensure that your skill service uses the timestamp in the event to correctly record the latest subscription state for a customer. 
     * @interface
     */
    export interface ProactiveSubscriptionChangedRequest {
        'type' : 'AlexaSkillEvent.ProactiveSubscriptionChanged';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body': events.skillevents.ProactiveSubscriptionChangedBody;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface SkillDisabledRequest {
        'type' : 'AlexaSkillEvent.SkillDisabled';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace events.skillevents {
    /**
     *
     * @interface
     */
    export interface SkillEnabledRequest {
        'type' : 'AlexaSkillEvent.SkillEnabled';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Runs a fixed-duration animation sequence on one or more properties of a single component.
     * @interface
     */
    export interface AnimateItemCommand {
        'type' : 'AnimateItem';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId': string;
        'duration': number | string;
        'easing'?: string;
        'repeatCount'?: number | string;
        'repeatMode'?: interfaces.alexa.presentation.apl.AnimateItemRepeatMode;
        'value': Array<interfaces.alexa.presentation.apl.AnimatedProperty>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface AnimatedOpacityProperty {
        'property' : 'opacity';
        'from'?: number | string;
        'to': number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface AnimatedTransformProperty {
        'property' : 'transform';
        'from': Array<interfaces.alexa.presentation.apl.TransformProperty>;
        'to': Array<interfaces.alexa.presentation.apl.TransformProperty>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Automatically progress through a series of pages displayed in a Pager component. The AutoPage command finishes after the last page has been displayed for the requested time period.
     * @interface
     */
    export interface AutoPageCommand {
        'type' : 'AutoPage';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId': string;
        'count'?: number | string;
        'duration'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Removes focus from the component that is currently in focus.
     * @interface
     */
    export interface ClearFocusCommand {
        'type' : 'ClearFocus';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Control a media player to play, pause, change tracks, or perform some other common action.
     * @interface
     */
    export interface ControlMediaCommand {
        'type' : 'ControlMedia';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'command': interfaces.alexa.presentation.apl.MediaCommandType;
        'componentId'?: string;
        'value'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Alexa.Presentation.APL.ExecuteCommands directive used to send APL commands to a device.
     * @interface
     */
    export interface ExecuteCommandsDirective {
        'type' : 'Alexa.Presentation.APL.ExecuteCommands';
        'commands': Array<interfaces.alexa.presentation.apl.Command>;
        'token': string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The idle command does nothing. It may be a placeholder or used to insert a calculated delay in a longer series of commands.
     * @interface
     */
    export interface IdleCommand {
        'type' : 'Idle';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface MoveTransformProperty {
        'translateX'?: string;
        'translateY'?: string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Opens a url with web browser or other application on the device. The APL author is responsible for providing a suitable URL that works on the current device.
     * @interface
     */
    export interface OpenUrlCommand {
        'type' : 'OpenURL';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'source': string;
        'onFail'?: Array<interfaces.alexa.presentation.apl.Command>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Execute a series of commands in parallel. The parallel command starts executing all child command simultaneously. The parallel command is considered finished when all of its child commands have finished. When the parallel command is terminated early, all currently executing commands are terminated.
     * @interface
     */
    export interface ParallelCommand {
        'type' : 'Parallel';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'commands': Array<interfaces.alexa.presentation.apl.Command>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Plays media on a media player (currently only a Video player; audio may be added in the future). The media may be on the background audio track or may be sequenced with speak directives).
     * @interface
     */
    export interface PlayMediaCommand {
        'type' : 'PlayMedia';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'audioTrack'?: interfaces.alexa.presentation.apl.AudioTrack;
        'componentId'?: string;
        'source': Array<interfaces.alexa.presentation.apl.VideoSource>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface RenderDocumentDirective {
        'type' : 'Alexa.Presentation.APL.RenderDocument';
        'token'?: string;
        'document'?: { [key: string]: any; };
        'datasources'?: { [key: string]: any; };
        'packages'?: Array<any>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface RotateTransformProperty {
        'rotate'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface ScaleTransformProperty {
        'scale'?: number | string;
        'scaleX'?: number | string;
        'scaleY'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Scroll a ScrollView or Sequence forward or backward by a number of pages. The Scroll command has the following properties in addition to the regular command properties.
     * @interface
     */
    export interface ScrollCommand {
        'type' : 'Scroll';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'distance'?: number | string;
        'componentId': string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Scroll forward or backward through a ScrollView or Sequence to ensure that a particular child component is in view.
     * @interface
     */
    export interface ScrollToIndexCommand {
        'type' : 'ScrollToIndex';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'align'?: interfaces.alexa.presentation.apl.Align;
        'componentId': string;
        'index': number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The SendEvent command allows the APL author to generate and send an event to Alexa.
     * @interface
     */
    export interface SendEventCommand {
        'type' : 'SendEvent';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'arguments'?: Array<string>;
        'components'?: Array<string>;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * A sequential command executes a series of commands in order. The sequential command executes the command list in order, waiting for the previous command to finish before executing the next. The sequential command is finished when all of its child commands have finished. When the Sequential command is terminated early, the currently executing command is terminated and no further commands are executed.
     * @interface
     */
    export interface SequentialCommand {
        'type' : 'Sequential';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'catch'?: Array<interfaces.alexa.presentation.apl.Command>;
        'commands': Array<interfaces.alexa.presentation.apl.Command>;
        'finally'?: Array<interfaces.alexa.presentation.apl.Command>;
        'repeatCount'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Changes the actionable component that is in focus. Only one component may have focus at a time.
     * @interface
     */
    export interface SetFocusCommand {
        'type' : 'SetFocus';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId': string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Change the page displayed in a Pager component. The SetPage command finishes when the item is fully in view.
     * @interface
     */
    export interface SetPageCommand {
        'type' : 'SetPage';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId': string;
        'position'?: interfaces.alexa.presentation.apl.Position;
        'value': number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * The SetState command changes one of the component’s state settings. The SetState command can be used to change the checked, disabled, and focused states. The karaoke and pressed states may not be directly set; use the Select command or SpeakItem commands to change those states. Also, note that the focused state may only be set - it can’t be cleared.
     * @interface
     */
    export interface SetStateCommand {
        'type' : 'SetState';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId'?: string;
        'state': interfaces.alexa.presentation.apl.ComponentState;
        'value': boolean | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Change a dynamic property of a component without redrawing the screen.
     * @interface
     */
    export interface SetValueCommand {
        'type' : 'SetValue';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'componentId'?: string;
        'property': string;
        'value': string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface SkewTransformProperty {
        'skewX'?: number | string;
        'skewY'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Reads the contents of a single item on the screen. By default the item will be scrolled into view if it is not currently visible.
     * @interface
     */
    export interface SpeakItemCommand {
        'type' : 'SpeakItem';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'align'?: interfaces.alexa.presentation.apl.Align;
        'componentId': string;
        'highlightMode'?: interfaces.alexa.presentation.apl.HighlightMode;
        'minimumDwellTime'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     * Read the contents of a range of items inside a common container. Each item will scroll into view before speech. Each item should have a speech property, but it is not required.
     * @interface
     */
    export interface SpeakListCommand {
        'type' : 'SpeakList';
        'delay'?: number | string;
        'description'?: string;
        'when'?: boolean;
        'align'?: interfaces.alexa.presentation.apl.Align;
        'componentId': string;
        'count': number | string;
        'minimumDwellTime'?: number | string;
        'start': number | string;
    }
}

export namespace interfaces.alexa.presentation.apl {
    /**
     *
     * @interface
     */
    export interface UserEvent {
        'type' : 'Alexa.Presentation.APL.UserEvent';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'token'?: string;
        'arguments'?: Array<any>;
        'source'?: any;
        'components'?: any;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Automatically progress through a series of pages displayed in a Pager component. The AutoPage command finishes after the last page has been displayed for the requested time period.
     * @interface
     */
    export interface AutoPageCommand {
        'type' : 'AutoPage';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'componentId': string;
        'count'?: number | string;
        'duration'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Alexa.Presentation.APLT.ExecuteCommands directive used to send APL-T commands to a device.
     * @interface
     */
    export interface ExecuteCommandsDirective {
        'type' : 'Alexa.Presentation.APLT.ExecuteCommands';
        'commands': Array<interfaces.alexa.presentation.aplt.Command>;
        'token': string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * The idle command does nothing. It may be a placeholder or used to insert a calculated delay in a longer series of commands.
     * @interface
     */
    export interface IdleCommand {
        'type' : 'Idle';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Execute a series of commands in parallel. The parallel command starts executing all child command simultaneously. The parallel command is considered finished when all of its child commands have finished. When the parallel command is terminated early, all currently executing commands are terminated.
     * @interface
     */
    export interface ParallelCommand {
        'type' : 'Parallel';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'commands': Array<interfaces.alexa.presentation.aplt.Command>;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     *
     * @interface
     */
    export interface RenderDocumentDirective {
        'type' : 'Alexa.Presentation.APLT.RenderDocument';
        'token'?: string;
        'targetProfile'?: interfaces.alexa.presentation.aplt.TargetProfile;
        'document'?: { [key: string]: any; };
        'datasources'?: { [key: string]: any; };
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Scroll a ScrollView or Sequence forward or backward by a number of pages. The Scroll command has the following properties in addition to the regular command properties.
     * @interface
     */
    export interface ScrollCommand {
        'type' : 'Scroll';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'distance'?: number | string;
        'componentId': string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * The SendEvent command allows the APL author to generate and send an event to Alexa.
     * @interface
     */
    export interface SendEventCommand {
        'type' : 'SendEvent';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'arguments'?: Array<string>;
        'components'?: Array<string>;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * A sequential command executes a series of commands in order. The sequential command executes the command list in order, waiting for the previous command to finish before executing the next. The sequential command is finished when all of its child commands have finished. When the Sequential command is terminated early, the currently executing command is terminated and no further commands are executed.
     * @interface
     */
    export interface SequentialCommand {
        'type' : 'Sequential';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'catch'?: Array<interfaces.alexa.presentation.aplt.Command>;
        'commands': Array<interfaces.alexa.presentation.aplt.Command>;
        'finally'?: Array<interfaces.alexa.presentation.aplt.Command>;
        'repeatCount'?: number | string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Change the page displayed in a Pager component. The SetPage command finishes when the item is fully in view.
     * @interface
     */
    export interface SetPageCommand {
        'type' : 'SetPage';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'componentId': string;
        'position'?: interfaces.alexa.presentation.aplt.Position;
        'value': number | string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     * Change a dynamic property of a component without redrawing the screen.
     * @interface
     */
    export interface SetValueCommand {
        'type' : 'SetValue';
        'delay'?: number;
        'description'?: string;
        'screenLock'?: boolean;
        'when'?: boolean | string;
        'componentId'?: string;
        'property': string;
        'value': string;
    }
}

export namespace interfaces.alexa.presentation.aplt {
    /**
     *
     * @interface
     */
    export interface UserEvent {
        'type' : 'Alexa.Presentation.APLT.UserEvent';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'token'?: string;
        'arguments'?: Array<any>;
        'source'?: any;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     * The HandleMessage directive sends a message to a skill's web application that runs on the device browser. To use this directive, [apply to participate](https://build.amazonalexadev.com/AlexaWebAPIforGamesDeveloperPreview_AlexaWebAPIforGames.html) in the Alexa Web API for Games developer preview. 
     * @interface
     */
    export interface HandleMessageDirective {
        'type' : 'Alexa.Presentation.HTML.HandleMessage';
        'message': any;
        'transformers'?: Array<interfaces.alexa.presentation.html.Transformer>;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     * The Message request sends a message to the skill lambda. To use this request, [apply to participate](https://build.amazonalexadev.com/AlexaWebAPIforGamesDeveloperPreview_AlexaWebAPIforGames.html) in the Alexa Web API for Games developer preview. 
     * @interface
     */
    export interface MessageRequest {
        'type' : 'Alexa.Presentation.html.Message';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'message': any;
    }
}

export namespace interfaces.alexa.presentation.html {
    /**
     * The Start directive provides the data necessary to load an HTML page on the target device. To use this directive, [apply to participate](https://build.amazonalexadev.com/AlexaWebAPIforGamesDeveloperPreview_AlexaWebAPIforGames.html) in the Alexa Web API for Games developer preview. 
     * @interface
     */
    export interface StartDirective {
        'type' : 'Alexa.Presentation.HTML.Start';
        'data'?: any;
        'transformers'?: Array<interfaces.alexa.presentation.html.Transformer>;
        'request': interfaces.alexa.presentation.html.StartRequest;
        'configuration': interfaces.alexa.presentation.html.Configuration;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * This is an object to set the attributes specified in the AuthorizeAttributes table. See the “AuthorizationDetails” section of the Amazon Pay API reference guide for details about this object.
     * @interface
     */
    export interface AuthorizeAttributes {
        '@type' : 'AuthorizeAttributes';
        'authorizationReferenceId': string;
        'authorizationAmount': interfaces.amazonpay.model.request.Price;
        'transactionTimeout'?: number;
        'sellerAuthorizationNote'?: string;
        'softDescriptor'?: string;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * The merchant can choose to set the attributes specified in the BillingAgreementAttributes.
     * @interface
     */
    export interface BillingAgreementAttributes {
        '@type' : 'BillingAgreementAttributes';
        'platformId'?: string;
        'sellerNote'?: string;
        'sellerBillingAgreementAttributes'?: interfaces.amazonpay.model.request.SellerBillingAgreementAttributes;
        'billingAgreementType'?: interfaces.amazonpay.model.request.BillingAgreementType;
        'subscriptionAmount'?: interfaces.amazonpay.model.request.Price;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * This request object specifies amount and currency authorized/captured.
     * @interface
     */
    export interface Price {
        '@type' : 'Price';
        'amount': string;
        'currencyCode': string;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * This is required only for Ecommerce provider (Solution provider) use cases.
     * @interface
     */
    export interface ProviderAttributes {
        '@type' : 'ProviderAttributes';
        'providerId': string;
        'providerCreditList': Array<interfaces.amazonpay.model.request.ProviderCredit>;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     *
     * @interface
     */
    export interface ProviderCredit {
        '@type' : 'ProviderCredit';
        'providerId'?: string;
        'credit'?: interfaces.amazonpay.model.request.Price;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * Provides more context about the billing agreement that is represented by this Billing Agreement object.
     * @interface
     */
    export interface SellerBillingAgreementAttributes {
        '@type' : 'SellerBillingAgreementAttributes';
        'sellerBillingAgreementId'?: string;
        'storeName'?: string;
        'customInformation'?: string;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.request {
    /**
     * This object includes elements shown to buyers in emails and in their transaction history. See the “SellerOrderAttributes” section of the Amazon Pay API reference guide for details about this object.
     * @interface
     */
    export interface SellerOrderAttributes {
        '@type' : 'SellerOrderAttributes';
        'sellerOrderId'?: string;
        'storeName'?: string;
        'customInformation'?: string;
        'sellerNote'?: string;
        '@version': string;
    }
}

export namespace interfaces.amazonpay.model.response {
    /**
     * This object encapsulates details about an Authorization object including the status, amount captured and fee charged.
     * @interface
     */
    export interface AuthorizationDetails {
        'amazonAuthorizationId'?: string;
        'authorizationReferenceId'?: string;
        'sellerAuthorizationNote'?: string;
        'authorizationAmount'?: interfaces.amazonpay.model.response.Price;
        'capturedAmount'?: interfaces.amazonpay.model.response.Price;
        'authorizationFee'?: interfaces.amazonpay.model.response.Price;
        'idList'?: Array<string>;
        'creationTimestamp'?: string;
        'expirationTimestamp'?: string;
        'authorizationStatus'?: interfaces.amazonpay.model.response.AuthorizationStatus;
        'softDecline'?: boolean;
        'captureNow'?: boolean;
        'softDescriptor'?: string;
        'authorizationBillingAddress'?: interfaces.amazonpay.model.response.Destination;
    }
}

export namespace interfaces.amazonpay.model.response {
    /**
     * Indicates the current status of an Authorization object, a Capture object, or a Refund object.
     * @interface
     */
    export interface AuthorizationStatus {
        'state'?: interfaces.amazonpay.model.response.State;
        'reasonCode'?: string;
        'reasonDescription'?: string;
        'lastUpdateTimestamp'?: string;
    }
}

export namespace interfaces.amazonpay.model.response {
    /**
     * The result attributes from successful SetupAmazonPay call.
     * @interface
     */
    export interface BillingAgreementDetails {
        'billingAgreementId': string;
        'creationTimestamp'?: string;
        'destination'?: interfaces.amazonpay.model.v1.Destination;
        'checkoutLanguage'?: string;
        'releaseEnvironment': interfaces.amazonpay.model.response.ReleaseEnvironment;
        'billingAgreementStatus': interfaces.amazonpay.model.v1.BillingAgreementStatus;
        'billingAddress'?: interfaces.amazonpay.model.response.Destination;
    }
}

export namespace interfaces.amazonpay.model.response {
    /**
     *
     * @interface
     */
    export interface Destination {
        'name'?: string;
        'companyName'?: string;
        'addressLine1'?: string;
        'addressLine2'?: string;
        'addressLine3'?: string;
        'city'?: string;
        'districtOrCounty'?: string;
        'stateOrRegion'?: string;
        'postalCode'?: string;
        'countryCode'?: string;
        'phone'?: string;
    }
}

export namespace interfaces.amazonpay.model.response {
    /**
     * This response object specifies amount and currency authorized/captured.
     * @interface
     */
    export interface Price {
        'amount': string;
        'currencyCode': string;
    }
}

export namespace interfaces.amazonpay.request {
    /**
     * Charge Amazon Pay Request Object.
     * @interface
     */
    export interface ChargeAmazonPayRequest {
        '@type' : 'ChargeAmazonPayRequest';
        '@version': string;
        'sellerId': string;
        'billingAgreementId': string;
        'paymentAction': interfaces.amazonpay.model.request.PaymentAction;
        'authorizeAttributes': interfaces.amazonpay.model.request.AuthorizeAttributes;
        'sellerOrderAttributes'?: interfaces.amazonpay.model.request.SellerOrderAttributes;
        'providerAttributes'?: interfaces.amazonpay.model.request.ProviderAttributes;
    }
}

export namespace interfaces.amazonpay.request {
    /**
     * Setup Amazon Pay Request Object.
     * @interface
     */
    export interface SetupAmazonPayRequest {
        '@type' : 'SetupAmazonPayRequest';
        '@version': string;
        'sellerId': string;
        'countryOfEstablishment': string;
        'ledgerCurrency': string;
        'checkoutLanguage'?: string;
        'billingAgreementAttributes'?: interfaces.amazonpay.model.request.BillingAgreementAttributes;
        'needAmazonShippingAddress'?: boolean;
        'sandboxMode'?: boolean;
        'sandboxCustomerEmailId'?: string;
    }
}

export namespace interfaces.amazonpay.response {
    /**
     * Error response for SetupAmazonPay and ChargeAmazonPay calls.
     * @interface
     */
    export interface AmazonPayErrorResponse {
        'errorCode': string;
        'errorMessage': string;
    }
}

export namespace interfaces.amazonpay.response {
    /**
     * Charge Amazon Pay Result Object. It is sent as part of the response to ChargeAmazonPayRequest.
     * @interface
     */
    export interface ChargeAmazonPayResult {
        'amazonOrderReferenceId': string;
        'authorizationDetails': interfaces.amazonpay.model.response.AuthorizationDetails;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface ClearQueueDirective {
        'type' : 'AudioPlayer.ClearQueue';
        'clearBehavior'?: interfaces.audioplayer.ClearBehavior;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlayDirective {
        'type' : 'AudioPlayer.Play';
        'playBehavior'?: interfaces.audioplayer.PlayBehavior;
        'audioItem'?: interfaces.audioplayer.AudioItem;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlaybackFailedRequest {
        'type' : 'AudioPlayer.PlaybackFailed';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'currentPlaybackState'?: interfaces.audioplayer.CurrentPlaybackState;
        'error'?: interfaces.audioplayer.Error;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlaybackFinishedRequest {
        'type' : 'AudioPlayer.PlaybackFinished';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'offsetInMilliseconds'?: number;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlaybackNearlyFinishedRequest {
        'type' : 'AudioPlayer.PlaybackNearlyFinished';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'offsetInMilliseconds'?: number;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlaybackStartedRequest {
        'type' : 'AudioPlayer.PlaybackStarted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'offsetInMilliseconds'?: number;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface PlaybackStoppedRequest {
        'type' : 'AudioPlayer.PlaybackStopped';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'offsetInMilliseconds'?: number;
        'token'?: string;
    }
}

export namespace interfaces.audioplayer {
    /**
     *
     * @interface
     */
    export interface StopDirective {
        'type' : 'AudioPlayer.Stop';
    }
}

export namespace interfaces.connections {
    /**
     * This is the request object that a skill will receive as a result of Connections.SendRequest directive from sender skill.
     * @interface
     */
    export interface ConnectionsRequest {
        'type' : 'Connections.Request';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'name'?: string;
        'payload'?: { [key: string]: any; };
    }
}

export namespace interfaces.connections {
    /**
     * This is the request object that a skill will receive as a result of Connections.SendResponse directive from referrer skill.
     * @interface
     */
    export interface ConnectionsResponse {
        'type' : 'Connections.Response';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'status'?: interfaces.connections.ConnectionsStatus;
        'name'?: string;
        'payload'?: { [key: string]: any; };
        'token'?: string;
    }
}

export namespace interfaces.connections {
    /**
     * This is the directive that a skill can send as part of their response to a session based request to execute a predefined Connections. This will also return a result to the referring skill. (No Guarantee response will be returned)
     * @interface
     */
    export interface SendRequestDirective {
        'type' : 'Connections.SendRequest';
        'name': string;
        'payload'?: { [key: string]: any; };
        'token': string;
    }
}

export namespace interfaces.connections {
    /**
     * This is the directive that a skill can send as part of their response to a session based request to return a response to ConnectionsRequest.
     * @interface
     */
    export interface SendResponseDirective {
        'type' : 'Connections.SendResponse';
        'status': interfaces.connections.ConnectionsStatus;
        'payload'?: { [key: string]: any; };
    }
}

export namespace interfaces.connections.V1 {
    /**
     * This is the directive that a skill can send as part of their response to a session based request to start a connection. A response will be returned to the skill when the connection is handled.
     * @interface
     */
    export interface StartConnectionDirective {
        'type' : 'Connections.StartConnection';
        'uri': string;
        'input'?: { [key: string]: any; };
        'token'?: string;
    }
}

export namespace interfaces.connections.entities {
    /**
     * Postal Address
     * @interface
     */
    export interface PostalAddress {
        '@type' : 'PostalAddress';
        '@version': string;
        'streetAddress'?: string;
        'locality'?: string;
        'region'?: string;
        'postalCode'?: string;
        'country'?: string;
    }
}

export namespace interfaces.connections.entities {
    /**
     * Restaurant entity
     * @interface
     */
    export interface Restaurant {
        '@type' : 'Restaurant';
        '@version': string;
        'name': string;
        'location': interfaces.connections.entities.PostalAddress;
    }
}

export namespace interfaces.connections.requests {
    /**
     * Payload Request object for PrintImage
     * @interface
     */
    export interface PrintImageRequest {
        '@type' : 'PrintImageRequest';
        '@version': string;
        'title': string;
        'url': string;
        'description'?: string;
        'imageType': string;
    }
}

export namespace interfaces.connections.requests {
    /**
     * Payload Request object for PrintPDF
     * @interface
     */
    export interface PrintPDFRequest {
        '@type' : 'PrintPDFRequest';
        '@version': string;
        'title': string;
        'url': string;
        'description'?: string;
    }
}

export namespace interfaces.connections.requests {
    /**
     * Payload Request object for PrintWebPage
     * @interface
     */
    export interface PrintWebPageRequest {
        '@type' : 'PrintWebPageRequest';
        '@version': string;
        'title': string;
        'url': string;
        'description'?: string;
    }
}

export namespace interfaces.connections.requests {
    /**
     * ScheduleFoodEstablishmentReservationRequest for booking restaurant reservation
     * @interface
     */
    export interface ScheduleFoodEstablishmentReservationRequest {
        '@type' : 'ScheduleFoodEstablishmentReservationRequest';
        '@version': string;
        'startTime'?: string;
        'partySize'?: string;
        'restaurant': interfaces.connections.entities.Restaurant;
    }
}

export namespace interfaces.connections.requests {
    /**
     * ScheduleTaxiReservationRequest for booking taxi reservation
     * @interface
     */
    export interface ScheduleTaxiReservationRequest {
        '@type' : 'ScheduleTaxiReservationRequest';
        '@version': string;
        'pickupTime'?: string;
        'partySize'?: string;
        'pickupLocation'?: interfaces.connections.entities.PostalAddress;
        'dropOffLocation'?: interfaces.connections.entities.PostalAddress;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * Skill receives this type of event when an event meets the filter  conditions provided in the StartEventHandlerDirective.
     * @interface
     */
    export interface EventsReceivedRequest {
        'type' : 'CustomInterfaceController.EventsReceived';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'token'?: string;
        'events'?: Array<interfaces.customInterfaceController.Event>;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * This is the event received by the skill at expiry of an Event Handler.
     * @interface
     */
    export interface ExpiredRequest {
        'type' : 'CustomInterfaceController.Expired';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'token'?: string;
        'expirationPayload'?: any;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * The directive to be delivered to the gadgets. Each directive is targeted to one gadget  (that is, one endpointId). To target the same directive to multiple gadgets, include one  directive for each gadget in the response.
     * @interface
     */
    export interface SendDirectiveDirective {
        'type' : 'CustomInterfaceController.SendDirective';
        'header'?: interfaces.customInterfaceController.Header;
        'payload'?: any;
        'endpoint'?: interfaces.customInterfaceController.Endpoint;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * This directive configures and starts an event handler. This will enable the skill to receive Custom Events. A skill can only have one active Event Handler at a time.
     * @interface
     */
    export interface StartEventHandlerDirective {
        'type' : 'CustomInterfaceController.StartEventHandler';
        'token'?: string;
        'eventFilter'?: interfaces.customInterfaceController.EventFilter;
        'expiration'?: interfaces.customInterfaceController.Expiration;
    }
}

export namespace interfaces.customInterfaceController {
    /**
     * This directive stops a running Event Handler associated with the provided token. The Expiration payload will not be sent if this executed before the Event Handler duration expired.
     * @interface
     */
    export interface StopEventHandlerDirective {
        'type' : 'CustomInterfaceController.StopEventHandler';
        'token'?: string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface BodyTemplate1 {
        'type' : 'BodyTemplate1';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'title'?: string;
        'textContent'?: interfaces.display.TextContent;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface BodyTemplate2 {
        'type' : 'BodyTemplate2';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'image'?: interfaces.display.Image;
        'title'?: string;
        'textContent'?: interfaces.display.TextContent;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface BodyTemplate3 {
        'type' : 'BodyTemplate3';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'image'?: interfaces.display.Image;
        'title'?: string;
        'textContent'?: interfaces.display.TextContent;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface BodyTemplate6 {
        'type' : 'BodyTemplate6';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'textContent'?: interfaces.display.TextContent;
        'image'?: interfaces.display.Image;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface BodyTemplate7 {
        'type' : 'BodyTemplate7';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'title'?: string;
        'image'?: interfaces.display.Image;
        'backgroundImage'?: interfaces.display.Image;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface ElementSelectedRequest {
        'type' : 'Display.ElementSelected';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'token': string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface HintDirective {
        'type' : 'Hint';
        'hint': interfaces.display.Hint;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface ListTemplate1 {
        'type' : 'ListTemplate1';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'title'?: string;
        'listItems'?: Array<interfaces.display.ListItem>;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface ListTemplate2 {
        'type' : 'ListTemplate2';
        'token'?: string;
        'backButton'?: interfaces.display.BackButtonBehavior;
        'backgroundImage'?: interfaces.display.Image;
        'title'?: string;
        'listItems'?: Array<interfaces.display.ListItem>;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface PlainText {
        'type' : 'PlainText';
        'text': string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface PlainTextHint {
        'type' : 'PlainText';
        'text': string;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface RenderTemplateDirective {
        'type' : 'Display.RenderTemplate';
        'template'?: interfaces.display.Template;
    }
}

export namespace interfaces.display {
    /**
     *
     * @interface
     */
    export interface RichText {
        'type' : 'RichText';
        'text': string;
    }
}

export namespace interfaces.gadgetController {
    /**
     * Sends Alexa a command to modify the behavior of connected Echo Buttons.
     * @interface
     */
    export interface SetLightDirective {
        'type' : 'GadgetController.SetLight';
        'version'?: number;
        'targetGadgets'?: Array<string>;
        'parameters'?: services.gadgetController.SetLightParameters;
    }
}

export namespace interfaces.gameEngine {
    /**
     * Sent when the conditions of an Echo Button event that your skill defined were met.
     * @interface
     */
    export interface InputHandlerEventRequest {
        'type' : 'GameEngine.InputHandlerEvent';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'originatingRequestId'?: string;
        'events'?: Array<services.gameEngine.InputHandlerEvent>;
    }
}

export namespace interfaces.gameEngine {
    /**
     *
     * @interface
     */
    export interface StartInputHandlerDirective {
        'type' : 'GameEngine.StartInputHandler';
        'timeout'?: number;
        'proxies'?: Array<string>;
        'recognizers'?: { [key: string]: services.gameEngine.Recognizer; };
        'events'?: { [key: string]: services.gameEngine.Event; };
    }
}

export namespace interfaces.gameEngine {
    /**
     *
     * @interface
     */
    export interface StopInputHandlerDirective {
        'type' : 'GameEngine.StopInputHandler';
        'originatingRequestId'?: string;
    }
}

export namespace interfaces.messaging {
    /**
     *
     * @interface
     */
    export interface MessageReceivedRequest {
        'type' : 'Messaging.MessageReceived';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'message': { [key: string]: any; };
    }
}

export namespace interfaces.navigation.assistance {
    /**
     * New directive that Alexa will send to navigation engine to query road regulations about the road segments that the user is on.
     * @interface
     */
    export interface AnnounceRoadRegulation {
        'type' : 'Navigation.Assistance.AnnounceRoadRegulation';
    }
}

export namespace interfaces.playbackcontroller {
    /**
     *
     * @interface
     */
    export interface NextCommandIssuedRequest {
        'type' : 'PlaybackController.NextCommandIssued';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
    }
}

export namespace interfaces.playbackcontroller {
    /**
     *
     * @interface
     */
    export interface PauseCommandIssuedRequest {
        'type' : 'PlaybackController.PauseCommandIssued';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
    }
}

export namespace interfaces.playbackcontroller {
    /**
     *
     * @interface
     */
    export interface PlayCommandIssuedRequest {
        'type' : 'PlaybackController.PlayCommandIssued';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
    }
}

export namespace interfaces.playbackcontroller {
    /**
     *
     * @interface
     */
    export interface PreviousCommandIssuedRequest {
        'type' : 'PlaybackController.PreviousCommandIssued';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
    }
}

export namespace interfaces.system {
    /**
     *
     * @interface
     */
    export interface ExceptionEncounteredRequest {
        'type' : 'System.ExceptionEncountered';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'error': interfaces.system.Error;
        'cause': interfaces.system.ErrorCause;
    }
}

export namespace interfaces.tasks {
    /**
     * This is the directive that a skill can send as part of their response to a session based request. The response will contain the result of the task that the skill is launched for.
     * @interface
     */
    export interface CompleteTaskDirective {
        'type' : 'Tasks.CompleteTask';
        'status': Status;
        'result'?: { [key: string]: any; };
    }
}

export namespace interfaces.videoapp {
    /**
     *
     * @interface
     */
    export interface LaunchDirective {
        'type' : 'VideoApp.Launch';
        'videoItem': interfaces.videoapp.VideoItem;
    }
}

export namespace interfaces.viewport {
    /**
     * This object contains the characteristics related to the text device's viewport.
     * @interface
     */
    export interface APLTViewportState {
        'type' : 'APLT';
        'id'?: string;
        'supportedProfiles': Array<interfaces.viewport.aplt.ViewportProfile>;
        'lineLength': number;
        'lineCount': number;
        'characterFormat': interfaces.viewport.aplt.CharacterFormat;
        'interSegments'?: Array<interfaces.viewport.aplt.InterSegment>;
    }
}

export namespace interfaces.viewport {
    /**
     * This object contains the characteristics related to the APL device's viewport.
     * @interface
     */
    export interface APLViewportState {
        'type' : 'APL';
        'id'?: string;
        'shape': interfaces.viewport.Shape;
        'dpi': number;
        'presentationType': interfaces.viewport.PresentationType;
        'canRotate': boolean;
        'configuration': interfaces.viewport.apl.ViewportConfiguration;
    }
}

export namespace interfaces.viewport.size {
    /**
     * Defines range of size with minimum and maximum values for with and height.
     * @interface
     */
    export interface ContinuousViewportSize {
        'type' : 'CONTINUOUS';
        'minPixelWidth': number;
        'minPixelHeight': number;
        'maxPixelWidth': number;
        'maxPixelHeight': number;
    }
}

export namespace interfaces.viewport.size {
    /**
     * Defines a fixed size of viewport.
     * @interface
     */
    export interface DiscreteViewportSize {
        'type' : 'DISCRETE';
        'pixelWidth': number;
        'pixelHeight': number;
    }
}

export namespace services.directive {
    /**
     *
     * @interface
     */
    export interface SpeakDirective {
        'type' : 'VoicePlayer.Speak';
        'speech'?: string;
    }
}

export namespace services.gameEngine {
    /**
     * The deviation recognizer returns true when another specified recognizer reports that the player has deviated from its expected pattern.
     * @interface
     */
    export interface DeviationRecognizer {
        'type' : 'deviation';
        'recognizer'?: string;
    }
}

export namespace services.gameEngine {
    /**
     * This recognizer is true when all of the specified events have occurred in the specified order.
     * @interface
     */
    export interface PatternRecognizer {
        'type' : 'match';
        'anchor'?: services.gameEngine.PatternRecognizerAnchorType;
        'fuzzy'?: boolean;
        'gadgetIds'?: Array<string>;
        'actions'?: Array<string>;
        'pattern'?: Array<services.gameEngine.Pattern>;
    }
}

export namespace services.gameEngine {
    /**
     * This recognizer consults another recognizer for the degree of completion, and is true if that degree is above the specified threshold. The completion parameter is specified as a decimal percentage.
     * @interface
     */
    export interface ProgressRecognizer {
        'type' : 'progress';
        'recognizer'?: string;
        'completion'?: number;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListCreatedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ListCreated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListDeletedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ListDeleted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListItemsCreatedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ItemsCreated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListItemBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListItemsDeletedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ItemsDeleted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListItemBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListItemsUpdatedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ItemsUpdated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListItemBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.listManagement {
    /**
     *
     * @interface
     */
    export interface ListUpdatedEventRequest {
        'type' : 'AlexaHouseholdListEvent.ListUpdated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.listManagement.ListBody;
        'eventCreationTime'?: string;
        'eventPublishingTime'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     * Response object for get reminder request
     * @interface
     */
    export interface GetReminderResponse {
        'alertToken'?: string;
        'createdTime'?: string;
        'updatedTime'?: string;
        'status'?: services.reminderManagement.Status;
        'trigger'?: services.reminderManagement.Trigger;
        'alertInfo'?: services.reminderManagement.AlertInfo;
        'pushNotification'?: services.reminderManagement.PushNotification;
        'version'?: string;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderCreatedEventRequest {
        'type' : 'Reminders.ReminderCreated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.reminderManagement.Event;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderDeletedEventRequest {
        'type' : 'Reminders.ReminderDeleted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.reminderManagement.ReminderDeletedEvent;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderStartedEventRequest {
        'type' : 'Reminders.ReminderStarted';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.reminderManagement.Event;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderStatusChangedEventRequest {
        'type' : 'Reminders.ReminderStatusChanged';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.reminderManagement.Event;
    }
}

export namespace services.reminderManagement {
    /**
     *
     * @interface
     */
    export interface ReminderUpdatedEventRequest {
        'type' : 'Reminders.ReminderUpdated';
        'requestId': string;
        'timestamp': string;
        'locale'?: string;
        'body'?: services.reminderManagement.Event;
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface AskForPermissionsConsentCard {
        'type' : 'AskForPermissionsConsent';
        'permissions': Array<string>;
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface LinkAccountCard {
        'type' : 'LinkAccount';
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface PlainTextOutputSpeech {
        'type' : 'PlainText';
        'playBehavior'?: ui.PlayBehavior;
        'text': string;
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface SimpleCard {
        'type' : 'Simple';
        'title'?: string;
        'content'?: string;
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface SsmlOutputSpeech {
        'type' : 'SSML';
        'playBehavior'?: ui.PlayBehavior;
        'ssml': string;
    }
}

export namespace ui {
    /**
     *
     * @interface
     */
    export interface StandardCard {
        'type' : 'Standard';
        'title'?: string;
        'text'?: string;
        'image'?: ui.Image;
    }
}


export namespace services.deviceAddress {

    /**
     *
     */
    export class DeviceAddressServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         * @param {string} deviceId The device Id for which to get the country and postal code
         */
        async getCountryAndPostalCode(deviceId : string) : Promise<services.deviceAddress.ShortAddress> {
            const __operationId__ = 'getCountryAndPostalCode';
            // verify required parameter 'deviceId' is not null or undefined
            if (deviceId == null) {
                throw new Error(`Required parameter deviceId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('deviceId', deviceId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/devices/{deviceId}/settings/address/countryAndPostalCode";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully get the country and postal code of the deviceId");
            errorDefinitions.set(204, "No content could be queried out");
            errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
            errorDefinitions.set(405, "The method is not supported");
            errorDefinitions.set(429, "The request is throttled");
            errorDefinitions.set(0, "Unexpected error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} deviceId The device Id for which to get the address
         */
        async getFullAddress(deviceId : string) : Promise<services.deviceAddress.Address> {
            const __operationId__ = 'getFullAddress';
            // verify required parameter 'deviceId' is not null or undefined
            if (deviceId == null) {
                throw new Error(`Required parameter deviceId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('deviceId', deviceId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/devices/{deviceId}/settings/address";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully get the address of the device");
            errorDefinitions.set(204, "No content could be queried out");
            errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
            errorDefinitions.set(405, "The method is not supported");
            errorDefinitions.set(429, "The request is throttled");
            errorDefinitions.set(0, "Unexpected error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
    }
}

export namespace services.directive {

    /**
     *
     */
    export class DirectiveServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         * @param {services.directive.SendDirectiveRequest} sendDirectiveRequest Represents the request object to send in the payload.
         */
        async enqueue(sendDirectiveRequest : services.directive.SendDirectiveRequest) : Promise<void> {
            const __operationId__ = 'enqueue';
            // verify required parameter 'sendDirectiveRequest' is not null or undefined
            if (sendDirectiveRequest == null) {
                throw new Error(`Required parameter sendDirectiveRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/directives";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Directive sent successfully.");
            errorDefinitions.set(400, "Directive not valid.");
            errorDefinitions.set(401, "Not Authorized.");
            errorDefinitions.set(403, "The skill is not allowed to send directives at the moment.");
            errorDefinitions.set(0, "Unexpected error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, sendDirectiveRequest, errorDefinitions);
        }
    }
}

export namespace services.endpointEnumeration {

    /**
     *
     */
    export class EndpointEnumerationServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         */
        async getEndpoints() : Promise<services.endpointEnumeration.EndpointEnumerationResponse> {
            const __operationId__ = 'getEndpoints';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/endpoints/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved the list of connected endpoints.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present or badly formatted.");
            errorDefinitions.set(401, "Unauthenticated. Returned when the request is not authenticated.");
            errorDefinitions.set(403, "Forbidden. Returned when the request is authenticated but does not have sufficient permission.");
            errorDefinitions.set(500, "Server Error. Returned when the server encountered an error processing the request.");
            errorDefinitions.set(503, "Service Unavailable. Returned when the server is not ready to handle the request.");
            errorDefinitions.set(0, "Unexpected error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
    }
}

export namespace services.listManagement {

    /**
     *
     */
    export class ListManagementServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         */
        async getListsMetadata() : Promise<services.listManagement.AlexaListsMetadata> {
            const __operationId__ = 'getListsMetadata';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call
         */
        async deleteList(listId : string) : Promise<void> {
            const __operationId__ = 'deleteList';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("DELETE", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} listId The customer’s listId is retrieved from a getListsMetadata call.
         * @param {string} itemId The customer’s itemId is retrieved from a GetList call.
         */
        async deleteListItem(listId : string, itemId : string) : Promise<void> {
            const __operationId__ = 'deleteListItem';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'itemId' is not null or undefined
            if (itemId == null) {
                throw new Error(`Required parameter itemId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);
            pathParams.set('itemId', itemId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/items/{itemId}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("DELETE", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} listId Retrieved from a call to getListsMetadata
         * @param {string} itemId itemId within a list is retrieved from a getList call
         */
        async getListItem(listId : string, itemId : string) : Promise<services.listManagement.AlexaListItem> {
            const __operationId__ = 'getListItem';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'itemId' is not null or undefined
            if (itemId == null) {
                throw new Error(`Required parameter itemId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);
            pathParams.set('itemId', itemId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/items/{itemId}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("GET", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} listId Customer’s listId
         * @param {string} itemId itemId to be updated in the list
         * @param {services.listManagement.UpdateListItemRequest} updateListItemRequest 
         */
        async updateListItem(listId : string, itemId : string, updateListItemRequest : services.listManagement.UpdateListItemRequest) : Promise<services.listManagement.AlexaListItem> {
            const __operationId__ = 'updateListItem';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'itemId' is not null or undefined
            if (itemId == null) {
                throw new Error(`Required parameter itemId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateListItemRequest' is not null or undefined
            if (updateListItemRequest == null) {
                throw new Error(`Required parameter updateListItemRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);
            pathParams.set('itemId', itemId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/items/{itemId}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(409, "Conflict");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("PUT", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, updateListItemRequest, errorDefinitions);
        }
        /**
         *
         * @param {string} listId The customer’s listId retrieved from a getListsMetadata call.
         * @param {services.listManagement.CreateListItemRequest} createListItemRequest 
         */
        async createListItem(listId : string, createListItemRequest : services.listManagement.CreateListItemRequest) : Promise<services.listManagement.AlexaListItem> {
            const __operationId__ = 'createListItem';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'createListItemRequest' is not null or undefined
            if (createListItemRequest == null) {
                throw new Error(`Required parameter createListItemRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/items/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(201, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not found");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("POST", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, createListItemRequest, errorDefinitions);
        }
        /**
         *
         * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call. 
         * @param {services.listManagement.UpdateListRequest} updateListRequest 
         */
        async updateList(listId : string, updateListRequest : services.listManagement.UpdateListRequest) : Promise<services.listManagement.AlexaListMetadata> {
            const __operationId__ = 'updateList';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateListRequest' is not null or undefined
            if (updateListRequest == null) {
                throw new Error(`Required parameter updateListRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "List not found");
            errorDefinitions.set(409, "Conflict");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("PUT", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, updateListRequest, errorDefinitions);
        }
        /**
         *
         * @param {string} listId Retrieved from a call to GetListsMetadata to specify the listId in the request path. 
         * @param {string} status Specify the status of the list. 
         */
        async getList(listId : string, status : string) : Promise<services.listManagement.AlexaList> {
            const __operationId__ = 'getList';
            // verify required parameter 'listId' is not null or undefined
            if (listId == null) {
                throw new Error(`Required parameter listId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'status' is not null or undefined
            if (status == null) {
                throw new Error(`Required parameter status was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('listId', listId);
            pathParams.set('status', status);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/{listId}/{status}/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("GET", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {services.listManagement.CreateListRequest} createListRequest 
         */
        async createList(createListRequest : services.listManagement.CreateListRequest) : Promise<services.listManagement.AlexaListMetadata> {
            const __operationId__ = 'createList';
            // verify required parameter 'createListRequest' is not null or undefined
            if (createListRequest == null) {
                throw new Error(`Required parameter createListRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/householdlists/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(201, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(409, "Conflict");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(0, "Internal Server Error");

            return this.invoke("POST", "https://api.amazonalexa.com/", path,
                    pathParams, queryParams, headerParams, createListRequest, errorDefinitions);
        }
    }
}

export namespace services.monetization {

    /**
     *
     */
    export class MonetizationServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         * @param {string} acceptLanguage User&#39;s locale/language in context
         * @param {string} purchasable Filter products based on whether they are purchasable by the user or not. * &#39;PURCHASABLE&#39; - Products that are purchasable by the user. * &#39;NOT_PURCHASABLE&#39; - Products that are not purchasable by the user.
         * @param {string} entitled Filter products based on whether they are entitled to the user or not. * &#39;ENTITLED&#39; - Products that the user is entitled to. * &#39;NOT_ENTITLED&#39; - Products that the user is not entitled to.
         * @param {string} productType Product type. * &#39;SUBSCRIPTION&#39; - Once purchased, customers will own the content for the subscription period. * &#39;ENTITLEMENT&#39; - Once purchased, customers will own the content forever. * &#39;CONSUMABLE&#39; - Once purchased, customers will be entitled to the content until it is consumed. It can also be re-purchased.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
         * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains isTruncated &#x3D; true.
         */
        async getInSkillProducts(acceptLanguage : string, purchasable? : string, entitled? : string, productType? : string, nextToken? : string, maxResults? : number) : Promise<services.monetization.InSkillProductsResponse> {
            const __operationId__ = 'getInSkillProducts';
            // verify required parameter 'acceptLanguage' is not null or undefined
            if (acceptLanguage == null) {
                throw new Error(`Required parameter acceptLanguage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(purchasable != null) {
                queryParams.push({ key: 'purchasable', value: purchasable });
            }
            if(entitled != null) {
                queryParams.push({ key: 'entitled', value: entitled });
            }
            if(productType != null) {
                queryParams.push({ key: 'productType', value: productType });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'Accept-Language', value : acceptLanguage });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/users/~current/skills/~current/inSkillProducts";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns a list of In-Skill products on success.");
            errorDefinitions.set(400, "Invalid request");
            errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} acceptLanguage User&#39;s locale/language in context
         * @param {string} productId Product Id.
         */
        async getInSkillProduct(acceptLanguage : string, productId : string) : Promise<services.monetization.InSkillProduct> {
            const __operationId__ = 'getInSkillProduct';
            // verify required parameter 'acceptLanguage' is not null or undefined
            if (acceptLanguage == null) {
                throw new Error(`Required parameter acceptLanguage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'Accept-Language', value : acceptLanguage });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/users/~current/skills/~current/inSkillProducts/{productId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns an In-Skill Product on success.");
            errorDefinitions.set(400, "Invalid request.");
            errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} acceptLanguage User&#39;s locale/language in context
         * @param {string} productId Product Id.
         * @param {string} status Transaction status for in skill product purchases. * &#39;PENDING_APPROVAL_BY_PARENT&#39; - The transaction is pending approval from parent. * &#39;APPROVED_BY_PARENT&#39; - The transaction was approved by parent and fulfilled successfully.. * &#39;DENIED_BY_PARENT&#39; - The transaction was declined by parent and hence not fulfilled. * &#39;EXPIRED_NO_ACTION_BY_PARENT&#39; - The transaction was expired due to no response from parent and hence not fulfilled. * &#39;ERROR&#39; - The transaction was not fullfiled as there was an error while processing the transaction.
         * @param {string} fromLastModifiedTime Filter transactions based on last modified time stamp, FROM duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
         * @param {string} toLastModifiedTime Filter transactions based on last modified time stamp, TO duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
         * @param {string} nextToken When response to this API call is truncated, the response also includes the nextToken in metadata, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
         * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains nextToken which can be used to fetch next set of result.
         */
        async getInSkillProductsTransactions(acceptLanguage : string, productId? : string, status? : string, fromLastModifiedTime? : string, toLastModifiedTime? : string, nextToken? : string, maxResults? : number) : Promise<services.monetization.InSkillProductTransactionsResponse> {
            const __operationId__ = 'getInSkillProductsTransactions';
            // verify required parameter 'acceptLanguage' is not null or undefined
            if (acceptLanguage == null) {
                throw new Error(`Required parameter acceptLanguage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(productId != null) {
                queryParams.push({ key: 'productId', value: productId });
            }
            if(status != null) {
                queryParams.push({ key: 'status', value: status });
            }
            if(fromLastModifiedTime != null) {
                queryParams.push({ key: 'fromLastModifiedTime', value: fromLastModifiedTime.toString() });
            }
            if(toLastModifiedTime != null) {
                queryParams.push({ key: 'toLastModifiedTime', value: toLastModifiedTime.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'Accept-Language', value : acceptLanguage });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/users/~current/skills/~current/inSkillProductsTransactions";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns a list of transactions of all in skill products purchases in last 30 days on success.");
            errorDefinitions.set(400, "Invalid request");
            errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
            errorDefinitions.set(403, "Forbidden request");
            errorDefinitions.set(404, "Product id doesn&#39;t exist / invalid / not found.");
            errorDefinitions.set(412, "Non-Child Directed Skill is not supported.");
            errorDefinitions.set(429, "The request is throttled.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         */
        async getVoicePurchaseSetting() : Promise<boolean> {
            const __operationId__ = 'getVoicePurchaseSetting';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/users/~current/skills/~current/settings/voicePurchasing.enabled";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns a boolean value for voice purchase setting on success.");
            errorDefinitions.set(400, "Invalid request.");
            errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
    }
}

export namespace services.proactiveEvents {

    /**
     *
     */
    export class ProactiveEventsServiceClient extends BaseServiceClient {

        private lwaServiceClient : LwaServiceClient;

        constructor(apiConfiguration : ApiConfiguration, authenticationConfiguration : AuthenticationConfiguration) {
            super(apiConfiguration);
            this.lwaServiceClient = new LwaServiceClient({
                apiConfiguration,
                authenticationConfiguration,
            });
        }

        /**
         *
         * @param {services.proactiveEvents.CreateProactiveEventRequest} createProactiveEventRequest Request to create a new proactive event.
         */
        async createProactiveEvent(createProactiveEventRequest : services.proactiveEvents.CreateProactiveEventRequest, stage : services.proactiveEvents.SkillStage) : Promise<void> {
            const __operationId__ = 'createProactiveEvent';
            // verify required parameter 'createProactiveEventRequest' is not null or undefined
            if (createProactiveEventRequest == null) {
                throw new Error(`Required parameter createProactiveEventRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessTokenForScope("alexa::proactive_events");
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/proactiveEvents";
            if (stage === 'DEVELOPMENT') {
                path += '/stages/development';
            }

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Request accepted");
            errorDefinitions.set(400, "A required parameter is not present or is incorrectly formatted, or the requested creation of a resource has already been completed by a previous request. ");
            errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have authentication to access the resource");
            errorDefinitions.set(409, "A skill attempts to create duplicate events using the same referenceId for the same customer.");
            errorDefinitions.set(429, "The client has made more calls than the allowed limit.");
            errorDefinitions.set(500, "The ProactiveEvents service encounters an internal error for a valid request.");
            errorDefinitions.set(0, "Unexpected error");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createProactiveEventRequest, errorDefinitions);
        }
    }
}

export namespace services.reminderManagement {

    /**
     *
     */
    export class ReminderManagementServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         * @param {string} alertToken 
         */
        async deleteReminder(alertToken : string) : Promise<void> {
            const __operationId__ = 'deleteReminder';
            // verify required parameter 'alertToken' is not null or undefined
            if (alertToken == null) {
                throw new Error(`Required parameter alertToken was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('alertToken', alertToken);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/alerts/reminders/{alertToken}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
            errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} alertToken 
         */
        async getReminder(alertToken : string) : Promise<services.reminderManagement.GetReminderResponse> {
            const __operationId__ = 'getReminder';
            // verify required parameter 'alertToken' is not null or undefined
            if (alertToken == null) {
                throw new Error(`Required parameter alertToken was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('alertToken', alertToken);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/alerts/reminders/{alertToken}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
            errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} alertToken 
         * @param {services.reminderManagement.ReminderRequest} reminderRequest 
         */
        async updateReminder(alertToken : string, reminderRequest : services.reminderManagement.ReminderRequest) : Promise<services.reminderManagement.ReminderResponse> {
            const __operationId__ = 'updateReminder';
            // verify required parameter 'alertToken' is not null or undefined
            if (alertToken == null) {
                throw new Error(`Required parameter alertToken was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'reminderRequest' is not null or undefined
            if (reminderRequest == null) {
                throw new Error(`Required parameter reminderRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('alertToken', alertToken);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/alerts/reminders/{alertToken}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(404, "NotFoundException e.g. Retured when reminder is not found");
            errorDefinitions.set(409, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
            errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, reminderRequest, errorDefinitions);
        }
        /**
         *
         */
        async getReminders() : Promise<services.reminderManagement.GetRemindersResponse> {
            const __operationId__ = 'getReminders';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/alerts/reminders/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
            errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {services.reminderManagement.ReminderRequest} reminderRequest 
         */
        async createReminder(reminderRequest : services.reminderManagement.ReminderRequest) : Promise<services.reminderManagement.ReminderResponse> {
            const __operationId__ = 'createReminder';
            // verify required parameter 'reminderRequest' is not null or undefined
            if (reminderRequest == null) {
                throw new Error(`Required parameter reminderRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/alerts/reminders/";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success");
            errorDefinitions.set(400, "Bad Request");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
            errorDefinitions.set(500, "Internal Server Error");
            errorDefinitions.set(503, "Service Unavailable");
            errorDefinitions.set(504, "Gateway Timeout");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, reminderRequest, errorDefinitions);
        }
    }
}

export namespace services.skillMessaging {

    /**
     *
     */
    export class SkillMessagingServiceClient extends BaseServiceClient {

        private lwaServiceClient : LwaServiceClient;

        constructor(apiConfiguration : ApiConfiguration, authenticationConfiguration : AuthenticationConfiguration) {
            super(apiConfiguration);
            this.lwaServiceClient = new LwaServiceClient({
                apiConfiguration,
                authenticationConfiguration,
            });
        }

        /**
         *
         * @param {string} userId The user Id for the specific user to send the message
         * @param {services.skillMessaging.SendSkillMessagingRequest} sendSkillMessagingRequest Message Request to be sent to the skill.
         */
        async sendSkillMessage(userId : string, sendSkillMessagingRequest : services.skillMessaging.SendSkillMessagingRequest) : Promise<void> {
            const __operationId__ = 'sendSkillMessage';
            // verify required parameter 'userId' is not null or undefined
            if (userId == null) {
                throw new Error(`Required parameter userId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'sendSkillMessagingRequest' is not null or undefined
            if (sendSkillMessagingRequest == null) {
                throw new Error(`Required parameter sendSkillMessagingRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('userId', userId);

            const accessToken : string = await this.lwaServiceClient.getAccessTokenForScope("alexa:skill_messaging");
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skillmessages/users/{userId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Message has been successfully accepted, and will be sent to the skill ");
            errorDefinitions.set(400, "Data is missing or not valid ");
            errorDefinitions.set(403, "The skill messaging authentication token is expired or not valid ");
            errorDefinitions.set(404, "The passed userId does not exist ");
            errorDefinitions.set(429, "The requester has exceeded their maximum allowable rate of messages ");
            errorDefinitions.set(500, "The SkillMessaging service encountered an internal error for a valid request. ");
            errorDefinitions.set(0, "Unexpected error");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, sendSkillMessagingRequest, errorDefinitions);
        }
    }
}

export namespace services.ups {

    /**
     *
     */
    export class UpsServiceClient extends BaseServiceClient {

        constructor(apiConfiguration : ApiConfiguration) {
            super(apiConfiguration);
        }

        /**
         *
         */
        async getProfileEmail() : Promise<string> {
            const __operationId__ = 'getProfileEmail';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/accounts/~current/settings/Profile.email";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved the requested information.");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         */
        async getProfileGivenName() : Promise<string> {
            const __operationId__ = 'getProfileGivenName';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/accounts/~current/settings/Profile.givenName";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved the requested information.");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         */
        async getProfileMobileNumber() : Promise<services.ups.PhoneNumber> {
            const __operationId__ = 'getProfileMobileNumber';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/accounts/~current/settings/Profile.mobileNumber";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved the requested information.");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         */
        async getProfileName() : Promise<string> {
            const __operationId__ = 'getProfileName';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/accounts/~current/settings/Profile.name";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved the requested information.");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} deviceId The device Id
         */
        async getSystemDistanceUnits(deviceId : string) : Promise<services.ups.DistanceUnits> {
            const __operationId__ = 'getSystemDistanceUnits';
            // verify required parameter 'deviceId' is not null or undefined
            if (deviceId == null) {
                throw new Error(`Required parameter deviceId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('deviceId', deviceId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/devices/{deviceId}/settings/System.distanceUnits";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully get the setting");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} deviceId The device Id
         */
        async getSystemTemperatureUnit(deviceId : string) : Promise<services.ups.TemperatureUnit> {
            const __operationId__ = 'getSystemTemperatureUnit';
            // verify required parameter 'deviceId' is not null or undefined
            if (deviceId == null) {
                throw new Error(`Required parameter deviceId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('deviceId', deviceId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/devices/{deviceId}/settings/System.temperatureUnit";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully get the setting");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        /**
         *
         * @param {string} deviceId The device Id
         */
        async getSystemTimeZone(deviceId : string) : Promise<string> {
            const __operationId__ = 'getSystemTimeZone';
            // verify required parameter 'deviceId' is not null or undefined
            if (deviceId == null) {
                throw new Error(`Required parameter deviceId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('deviceId', deviceId);

            const authorizationValue = "Bearer " +  this.apiConfiguration.authorizationValue;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/devices/{deviceId}/settings/System.timeZone";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully get the setting");
            errorDefinitions.set(204, "The query did not return any results.");
            errorDefinitions.set(401, "The authentication token is malformed or invalid.");
            errorDefinitions.set(403, "The authentication token does not have access to resource.");
            errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
            errorDefinitions.set(0, "An unexpected error occurred.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
    }
}

export namespace services {

    /**
     * Helper class that instantiates an ServiceClient implementation automatically resolving its
     * required ApiConfiguration.
     * @export
     * @class ServiceClientFactory
     */
    export class ServiceClientFactory {
        protected apiConfiguration : ApiConfiguration;

        constructor(apiConfiguration : ApiConfiguration) {
            this.apiConfiguration = apiConfiguration;
        }
        /*
         * Gets an instance of { deviceAddress.DeviceAddressService }.
         * @returns { deviceAddress.DeviceAddressService }
         */
        getDeviceAddressServiceClient() : deviceAddress.DeviceAddressServiceClient {
            try {
                return new deviceAddress.DeviceAddressServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing DeviceAddressServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { directive.DirectiveService }.
         * @returns { directive.DirectiveService }
         */
        getDirectiveServiceClient() : directive.DirectiveServiceClient {
            try {
                return new directive.DirectiveServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing DirectiveServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { endpointEnumeration.EndpointEnumerationService }.
         * @returns { endpointEnumeration.EndpointEnumerationService }
         */
        getEndpointEnumerationServiceClient() : endpointEnumeration.EndpointEnumerationServiceClient {
            try {
                return new endpointEnumeration.EndpointEnumerationServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing EndpointEnumerationServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { listManagement.ListManagementService }.
         * @returns { listManagement.ListManagementService }
         */
        getListManagementServiceClient() : listManagement.ListManagementServiceClient {
            try {
                return new listManagement.ListManagementServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing ListManagementServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { monetization.MonetizationService }.
         * @returns { monetization.MonetizationService }
         */
        getMonetizationServiceClient() : monetization.MonetizationServiceClient {
            try {
                return new monetization.MonetizationServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing MonetizationServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { reminderManagement.ReminderManagementService }.
         * @returns { reminderManagement.ReminderManagementService }
         */
        getReminderManagementServiceClient() : reminderManagement.ReminderManagementServiceClient {
            try {
                return new reminderManagement.ReminderManagementServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing ReminderManagementServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
        /*
         * Gets an instance of { ups.UpsService }.
         * @returns { ups.UpsService }
         */
        getUpsServiceClient() : ups.UpsServiceClient {
            try {
                return new ups.UpsServiceClient(this.apiConfiguration);
            } catch(e) {
                const factoryError = new Error(`ServiceClientFactory Error while initializing UpsServiceClient: ${e.message}`);
                factoryError['name'] = 'ServiceClientFactoryError';

                throw factoryError;
            }
        }
    }
}

