import { RequestOptions as HttpRequestOptions } from 'http';
import { RequestOptions as HttpsRequestOptions } from 'https';
import * as url from 'url';
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
 * Represents a response with parsed body.
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
    headers : Array<{key : string, value : string}>;
    body? : any;
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
 * Default implementation of {@link ApiClient} which uses the native HTTP/HTTPS library of Node.JS.
 */
export class DefaultApiClient implements ApiClient {
    /**
     * Dispatches a request to an API endpoint described in the request.
     * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
     * status code. The responsibility of translating a particular response code to an error lies with the
     * caller to invoke.
     * @param {ApiClientRequest} request request to dispatch to the ApiClient
     * @returns {Promise<ApiClientResponse>} response from the ApiClient
     */

    public invoke(request : ApiClientRequest) : Promise<ApiClientResponse> {
        const urlObj = url.parse(request.url);

        const clientRequestOptions : HttpRequestOptions | HttpsRequestOptions = {
            // tslint:disable:object-literal-sort-keys
            hostname : urlObj.hostname,
            path : urlObj.path,
            port : urlObj.port,
            protocol : urlObj.protocol,
            auth : urlObj.auth,
            headers : this.arrayToObjectHeader(request.headers),
            method : request.method,
        };

        const client = clientRequestOptions.protocol === 'https:' ? require('https') : require('http');

        return new Promise<ApiClientResponse>((resolve, reject) => {
            const clientRequest = client.request(clientRequestOptions, (response) => {
                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const responseStr = chunks.join('');
                    const responseObj : ApiClientResponse = {
                        statusCode : response.statusCode,
                        body : responseStr,
                        headers : this.objectToArrayHeader(response.headers),
                    };

                    resolve(responseObj);
                });
            });

            clientRequest.on('error', (err) => {
                reject(this.createAskSdkModelRuntimeError(this.constructor.name, err.message));
            });

            if (request.body) {
                clientRequest.write(request.body);
            }

            clientRequest.end();
        });
    }

    /**
     * Converts the header array in {@link ApiClientRequest} to compatible JSON object.
     * @private
     * @param {{key : string, value : string}[]} header header array from ApiClientRequest}
     * @returns {Object.<string, string[]>} header object to pass into HTTP client
     */
    private arrayToObjectHeader(header : Array<{key : string, value : string}>) : {[key : string] : string[]} {
        const reducer = (obj : {[key : string] : string[]}, item : {key : string, value : string})
            : {[key : string] : string[]} => {
            if (obj[item.key]) {
                obj[item.key].push(item.value);
            } else {
                obj[item.key] = [item.value];
            }

            return obj;
        };

        return header.reduce(reducer, {});
    }

    /**
     * Converts JSON header object to header array required for {ApiClientResponse}
     * @private
     * @param {Object.<string, (string|string[])>} header JSON header object returned by HTTP client
     * @returns {{key : string, value : string}[]}
     */
    private objectToArrayHeader(header : {[key : string] : string | string[]}) : Array<{key : string, value : string}> {
        const arrayHeader = <Array<{key : string, value : string}>> [];

        Object.keys(header).forEach((key : string) => {
            const headerArray = Array.isArray(header[key]) ? header[key] : [header[key]];
            for (const value of <string[]> headerArray) {
                arrayHeader.push({
                    key,
                    value,
                });
            }
        });

        return arrayHeader;
    }

    /**
     * function creating an AskSdk error.
     * @param {string} errorScope
     * @param {string} errorMessage
     * @returns {Error}
     */
    private createAskSdkModelRuntimeError(errorScope : string, errorMessage : string) : Error {
        const error = new Error(errorMessage);
        error.name = `AskSdkModelRuntime.${errorScope} Error`;

        return error;
    }

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
            const apiResponse : ApiResponse = {
                headers : response.headers,
                body,
                statusCode : response.statusCode,
            };

            return apiResponse;
        }

        const err = new Error('Unknown error');
        err.name = 'ServiceError';
        err['statusCode'] = response.statusCode; // tslint:disable-line:no-string-literal
        err['headers'] = response.headers;  // tslint:disable-line:no-string-literal
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
    scope? : string;
    refreshToken? : string;
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
    refreshToken? : string;
}

/**
 * Class to be used to call Amazon LWA to retrieve access tokens.
 */
export class LwaServiceClient extends BaseServiceClient {
    protected static EXPIRY_OFFSET_MILLIS : number = 60000;
    protected static REFRESH_ACCESS_TOKEN : string = 'refresh_access_token';
    protected static CLIENT_CREDENTIALS_GRANT_TYPE : string = 'client_credentials';
    protected static LWA_CREDENTIALS_GRANT_TYPE : string = 'refresh_token';

    protected authenticationConfiguration : AuthenticationConfiguration;
    protected tokenStore : {[cacheKey : string] : AccessToken};
    protected grantType : string;

    constructor(options : {
        apiConfiguration : ApiConfiguration,
        authenticationConfiguration : AuthenticationConfiguration,
        grantType? : string,
    }) {
        super(options.apiConfiguration);
        if (options.authenticationConfiguration == null) {
            throw new Error('AuthenticationConfiguration cannot be null or undefined.');
        }
        this.grantType = options.grantType ? options.grantType : LwaServiceClient.CLIENT_CREDENTIALS_GRANT_TYPE;
        this.authenticationConfiguration = options.authenticationConfiguration;
        this.tokenStore = {};
    }

    public async getAccessTokenForScope(scope : string) : Promise<string> {
        if (scope == null) {
            throw new Error('Scope cannot be null or undefined.');
        }

        return this.getAccessToken(scope);
    }

    public async getAccessToken(scope? : string) : Promise<string> {
        const cacheKey : string = scope ? scope : LwaServiceClient.REFRESH_ACCESS_TOKEN;
        const accessToken = this.tokenStore[cacheKey];

        if (accessToken && accessToken.expiry > Date.now() + LwaServiceClient.EXPIRY_OFFSET_MILLIS) {
            return accessToken.token;
        }

        const accessTokenRequest : AccessTokenRequest = {
            clientId : this.authenticationConfiguration.clientId,
            clientSecret : this.authenticationConfiguration.clientSecret,
        };
        if (scope && this.authenticationConfiguration.refreshToken) {
            throw new Error('Cannot support both refreshToken and scope.');
        } else if (scope == null && this.authenticationConfiguration.refreshToken == null) {
            throw new Error('Either refreshToken or scope must be specified.');
        } else if (scope == null) {
            accessTokenRequest.refreshToken = this.authenticationConfiguration.refreshToken;
        } else {
            accessTokenRequest.scope = scope;
        }

        const accessTokenResponse : AccessTokenResponse = await this.generateAccessToken(accessTokenRequest);

        this.tokenStore[cacheKey] = {
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

        const paramInfo = this.grantType === LwaServiceClient.LWA_CREDENTIALS_GRANT_TYPE ? `&refresh_token=${accessTokenRequest.refreshToken}` : `&scope=${accessTokenRequest.scope}`;
        const bodyParams : string = `grant_type=${this.grantType}&client_secret=${accessTokenRequest.clientSecret}&client_id=${accessTokenRequest.clientId}` + paramInfo;

        const errorDefinitions : Map<number, string> = new Map<number, string>();
        errorDefinitions.set(200, 'Token request sent.');
        errorDefinitions.set(400, 'Bad Request');
        errorDefinitions.set(401, 'Authentication Failed');
        errorDefinitions.set(500, 'Internal Server Error');

        const apiResponse : ApiResponse = await this.invoke(
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

        const response : AccessTokenResponse = {
            access_token: apiResponse.body[`access_token`],
            expires_in: apiResponse.body[`expires_in`],
            scope: apiResponse.body[`scope`],
            token_type: apiResponse.body[`token_type`],
        };

        return response;
    }
}
