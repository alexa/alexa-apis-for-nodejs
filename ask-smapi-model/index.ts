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
import * as runtime from 'ask-sdk-model-runtime';
export { runtime }

import ApiConfiguration = runtime.ApiConfiguration;
import ApiResponse = runtime.ApiResponse;
import AuthenticationConfiguration = runtime.AuthenticationConfiguration;
import BaseServiceClient = runtime.BaseServiceClient;
import LwaServiceClient = runtime.LwaServiceClient;
import createUserAgent = runtime.createUserAgent;

export namespace v1 {
    /**
     *
     * @interface
     */
    export interface BadRequestError {
        'message'?: string;
        'violations'?: Array<v1.Error>;
    }
}

export namespace v1 {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: string;
        'message': string;
    }
}

export namespace v1 {
    /**
     *
     * @interface
     */
    export interface Link {
        'href'?: string;
    }
}

export namespace v1 {
    /**
     * Links for the API navigation.
     * @interface
     */
    export interface Links {
        'self'?: v1.Link;
        'next'?: v1.Link;
    }
}

export namespace v1 {
    /**
     *
     * @enum
     */
    export type StageType = 'development' | 'live';
}

export namespace v1 {
    /**
     *
     * @enum
     */
    export type StageV2Type = 'live' | 'certified' | 'development';
}

export namespace v1.auditLogs {
    /**
     *
     * @interface
     */
    export interface AuditLog {
        'xAmznRequestId'?: string;
        'timestamp'?: string;
        'client'?: v1.auditLogs.Client;
        'operation'?: v1.auditLogs.Operation;
        'resources'?: Array<v1.auditLogs.Resource>;
        'requester'?: v1.auditLogs.Requester;
        'httpResponseCode'?: number;
    }
}

export namespace v1.auditLogs {
    /**
     *
     * @interface
     */
    export interface AuditLogsRequest {
        'vendorId'?: string;
        'requestFilters'?: v1.auditLogs.RequestFilters;
        'sortDirection'?: v1.auditLogs.SortDirection;
        'sortField'?: v1.auditLogs.SortField;
        'paginationContext'?: v1.auditLogs.RequestPaginationContext;
    }
}

export namespace v1.auditLogs {
    /**
     * Response to the Query Audit Logs API. It contains the collection of audit logs for the vendor, nextToken and other metadata related to the search query.
     * @interface
     */
    export interface AuditLogsResponse {
        'paginationContext'?: v1.auditLogs.ResponsePaginationContext;
        'auditLogs'?: Array<v1.auditLogs.AuditLog>;
    }
}

export namespace v1.auditLogs {
    /**
     * Contains information about the Client that this request was performed by.
     * @interface
     */
    export interface Client {
        'id'?: string;
        'name'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Identifier for the application the developer used to manage their skills and skill-related resources. For OAuth applications, this is the OAuth Client Id.
     * @interface
     */
    export interface ClientFilter {
        'id'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Object containing name and version.
     * @interface
     */
    export interface Operation {
        'name'?: string;
        'version'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Name and version of the operation that the developer performed. For example, 'deleteSkill' and 'v1'. This is the same name used in the SMAPI SDK.
     * @interface
     */
    export interface OperationFilter {
        'name'?: string;
        'version'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Request Filters for filtering audit logs.
     * @interface
     */
    export interface RequestFilters {
        'clients'?: Array<v1.auditLogs.ClientFilter>;
        'operations'?: Array<v1.auditLogs.OperationFilter>;
        'resources'?: Array<v1.auditLogs.ResourceFilter>;
        'requesters'?: Array<v1.auditLogs.RequesterFilter>;
        'startTime'?: string;
        'endTime'?: string;
        'httpResponseCodes'?: Array<string>;
    }
}

export namespace v1.auditLogs {
    /**
     * This object includes nextToken and maxResults.
     * @interface
     */
    export interface RequestPaginationContext {
        'nextToken'?: string;
        'maxResults'?: number;
    }
}

export namespace v1.auditLogs {
    /**
     * The user that performed the operation.
     * @interface
     */
    export interface Requester {
        'userId'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Filter for the requester of the operation.
     * @interface
     */
    export interface RequesterFilter {
        'userId'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Resource that the developer operated on. This includes both the type and ID of the resource.
     * @interface
     */
    export interface Resource {
        'id'?: string;
        'type'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Resource that the developer operated on. Both do not need to be provided.
     * @interface
     */
    export interface ResourceFilter {
        'id'?: string;
        'type'?: v1.auditLogs.ResourceTypeEnum;
    }
}

export namespace v1.auditLogs {
    /**
     *
     * @enum
     */
    export type ResourceTypeEnum = 'Skill' | 'SkillCatalog' | 'InSkillProduct' | 'Import' | 'Export';
}

export namespace v1.auditLogs {
    /**
     * This object contains the next token used to load the next page of the result.
     * @interface
     */
    export interface ResponsePaginationContext {
        'nextToken'?: string;
    }
}

export namespace v1.auditLogs {
    /**
     * Sets the sorting direction of the result items. When set to 'ASC' these items are returned in ascending order of sortField value and when set to 'DESC' these items are returned in descending order of sortField value.
     * @enum
     */
    export type SortDirection = 'ASC' | 'DESC';
}

export namespace v1.auditLogs {
    /**
     * Sets the field on which the sorting would be applied.
     * @enum
     */
    export type SortField = 'timestamp' | 'operation' | 'resource.id' | 'resource.type' | 'requester.userId' | 'client.id' | 'httpResponseCode';
}

export namespace v1.catalog {
    /**
     *
     * @interface
     */
    export interface CreateContentUploadUrlRequest {
        'numberOfUploadParts'?: number;
    }
}

export namespace v1.catalog {
    /**
     *
     * @interface
     */
    export interface CreateContentUploadUrlResponse {
        'urlId': string;
        'preSignedUploadParts'?: Array<v1.catalog.PresignedUploadPartItems>;
    }
}

export namespace v1.catalog {
    /**
     *
     * @interface
     */
    export interface PresignedUploadPartItems {
        'url': string;
        'partNumber': number;
        'expiresAt': string;
    }
}

export namespace v1.catalog.upload {
   /**
    *
    * @interface
    */
    export type CatalogUploadBase = v1.catalog.upload.Location | v1.catalog.upload.PreSignedUrl;
}

export namespace v1.catalog.upload {
    /**
     *
     * @interface
     */
    export interface ContentUploadFileSummary {
        'downloadUrl': string;
        'expiresAt': string;
        'status': v1.catalog.upload.FileUploadStatus;
    }
}

export namespace v1.catalog.upload {
    /**
     * Value of status depends on if file is available for download or not.
     * @enum
     */
    export type FileUploadStatus = 'PENDING' | 'AVAILABLE' | 'PURGED' | 'UNAVAILABLE';
}

export namespace v1.catalog.upload {
    /**
     *
     * @interface
     */
    export interface GetContentUploadResponse {
        'id': string;
        'catalogId': string;
        'status': v1.catalog.upload.UploadStatus;
        'createdDate': string;
        'lastUpdatedDate': string;
        'file': v1.catalog.upload.ContentUploadFileSummary;
        'ingestionSteps': Array<v1.catalog.upload.UploadIngestionStep>;
    }
}

export namespace v1.catalog.upload {
    /**
     *
     * @enum
     */
    export type IngestionStatus = 'PENDING' | 'IN_PROGRESS' | 'FAILED' | 'SUCCEEDED' | 'CANCELLED';
}

export namespace v1.catalog.upload {
    /**
     *
     * @enum
     */
    export type IngestionStepName = 'UPLOAD' | 'SCHEMA_VALIDATION';
}

export namespace v1.catalog.upload {
    /**
     *
     * @interface
     */
    export interface PreSignedUrlItem {
        'eTag'?: string;
        'partNumber'?: number;
    }
}

export namespace v1.catalog.upload {
    /**
     * Represents a single step in the multi-step ingestion process of a new upload.
     * @interface
     */
    export interface UploadIngestionStep {
        'name': v1.catalog.upload.IngestionStepName;
        'status': v1.catalog.upload.IngestionStatus;
        'logUrl'?: string;
        'violations': Array<v1.Error>;
    }
}

export namespace v1.catalog.upload {
    /**
     * Status of the entire upload.
     * @enum
     */
    export type UploadStatus = 'PENDING' | 'IN_PROGRESS' | 'FAILED' | 'SUCCEEDED';
}

export namespace v1.isp {
    /**
     * In-skill product skill association details.
     * @interface
     */
    export interface AssociatedSkillResponse {
        'associatedSkillIds'?: Array<string>;
        '_links'?: v1.Links;
        'isTruncated'?: boolean;
        'nextToken'?: string;
    }
}

export namespace v1.isp {
    /**
     * Currency to use for in-skill product.
     * @enum
     */
    export type Currency = 'USD' | 'GBP' | 'EUR' | 'JPY';
}

export namespace v1.isp {
    /**
     * Custom prompts used for in-skill product purchasing options. Supports Speech Synthesis Markup Language (SSML), which can be used to control pronunciation, intonation, timing, and emotion.
     * @interface
     */
    export interface CustomProductPrompts {
        'purchasePromptDescription'?: string;
        'boughtConfirmationPrompt'?: string;
    }
}

export namespace v1.isp {
    /**
     *
     * @enum
     */
    export type DistributionCountries = 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CD' | 'CK' | 'CR' | 'HR' | 'CY' | 'CZ' | 'DK' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'VA' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'CI' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KR' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'AN' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'ES' | 'LK' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UM' | 'UY' | 'UZ' | 'VU' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';
}

export namespace v1.isp {
    /**
     * Whether or not the in-skill product is editable.
     * @enum
     */
    export type EditableState = 'EDITABLE' | 'NOT_EDITABLE';
}

export namespace v1.isp {
    /**
     * Defines the structure for an in-skill product.
     * @interface
     */
    export interface InSkillProductDefinition {
        'version'?: string;
        'type'?: v1.isp.ProductType;
        'referenceName'?: string;
        'purchasableState'?: v1.isp.PurchasableState;
        'subscriptionInformation'?: v1.isp.SubscriptionInformation;
        'publishingInformation'?: v1.isp.PublishingInformation;
        'privacyAndCompliance'?: v1.isp.PrivacyAndCompliance;
        'testingInstructions'?: string;
    }
}

export namespace v1.isp {
    /**
     * Defines In-skill product response.
     * @interface
     */
    export interface InSkillProductDefinitionResponse {
        'inSkillProductDefinition'?: v1.isp.InSkillProductDefinition;
    }
}

export namespace v1.isp {
    /**
     * Information about the in-skill product that is not editable.
     * @interface
     */
    export interface InSkillProductSummary {
        'type'?: v1.isp.ProductType;
        'productId'?: string;
        'referenceName'?: string;
        'lastUpdated'?: string;
        'nameByLocale'?: { [key: string]: string; };
        'status'?: v1.isp.Status;
        'stage'?: v1.isp.Stage;
        'editableState'?: v1.isp.EditableState;
        'purchasableState'?: v1.isp.PurchasableState;
        '_links'?: v1.isp.IspSummaryLinks;
        'pricing'?: { [key: string]: v1.isp.SummaryMarketplacePricing; };
    }
}

export namespace v1.isp {
    /**
     * In-skill product summary response.
     * @interface
     */
    export interface InSkillProductSummaryResponse {
        'inSkillProductSummary'?: v1.isp.InSkillProductSummary;
    }
}

export namespace v1.isp {
    /**
     *
     * @interface
     */
    export interface IspSummaryLinks {
        'self'?: v1.Link;
    }
}

export namespace v1.isp {
    /**
     * List of in-skill products.
     * @interface
     */
    export interface ListInSkillProduct {
        '_links'?: v1.Links;
        'inSkillProducts'?: Array<v1.isp.InSkillProductSummary>;
        'isTruncated'?: boolean;
        'nextToken'?: string;
    }
}

export namespace v1.isp {
    /**
     * List of in-skill product response.
     * @interface
     */
    export interface ListInSkillProductResponse {
        'inSkillProductSummaryList'?: v1.isp.ListInSkillProduct;
    }
}

export namespace v1.isp {
    /**
     * Defines the structure for localized privacy and compliance.
     * @interface
     */
    export interface LocalizedPrivacyAndCompliance {
        'privacyPolicyUrl'?: string;
    }
}

export namespace v1.isp {
    /**
     * Defines the structure for locale specific publishing information in the in-skill product definition.
     * @interface
     */
    export interface LocalizedPublishingInformation {
        'name'?: string;
        'smallIconUri'?: string;
        'largeIconUri'?: string;
        'summary'?: string;
        'description'?: string;
        'examplePhrases'?: Array<string>;
        'keywords'?: Array<string>;
        'customProductPrompts'?: v1.isp.CustomProductPrompts;
    }
}

export namespace v1.isp {
    /**
     * In-skill product pricing information for a marketplace.
     * @interface
     */
    export interface MarketplacePricing {
        'releaseDate'?: string;
        'defaultPriceListing'?: v1.isp.PriceListing;
    }
}

export namespace v1.isp {
    /**
     * Price listing information for in-skill product.
     * @interface
     */
    export interface PriceListing {
        'price'?: number;
        'currency'?: v1.isp.Currency;
    }
}

export namespace v1.isp {
    /**
     * Defines the structure for privacy and compliance.
     * @interface
     */
    export interface PrivacyAndCompliance {
        'locales'?: { [key: string]: v1.isp.LocalizedPrivacyAndCompliance; };
    }
}

export namespace v1.isp {
    /**
     * Product ID information.
     * @interface
     */
    export interface ProductResponse {
        'productId'?: string;
    }
}

export namespace v1.isp {
    /**
     * Type of in-skill product.
     * @enum
     */
    export type ProductType = 'SUBSCRIPTION' | 'ENTITLEMENT' | 'CONSUMABLE';
}

export namespace v1.isp {
    /**
     * Defines the structure for in-skill product publishing information.
     * @interface
     */
    export interface PublishingInformation {
        'locales'?: { [key: string]: v1.isp.LocalizedPublishingInformation; };
        'distributionCountries'?: Array<v1.isp.DistributionCountries>;
        'pricing'?: { [key: string]: v1.isp.MarketplacePricing; };
        'taxInformation'?: v1.isp.TaxInformation;
    }
}

export namespace v1.isp {
    /**
     * Whether or not the in-skill product is purchasable by customers. A product that is not purchasable will prevent new customers from being prompted to purchase the product. Customers who already own the product will see no effect and continue to have access to the product features.
     * @enum
     */
    export type PurchasableState = 'PURCHASABLE' | 'NOT_PURCHASABLE';
}

export namespace v1.isp {
    /**
     * Stage of in-skill product.
     * @enum
     */
    export type Stage = 'development' | 'live';
}

export namespace v1.isp {
    /**
     * Current status of in-skill product.
     * @enum
     */
    export type Status = 'INCOMPLETE' | 'COMPLETE' | 'CERTIFICATION' | 'PUBLISHED' | 'SUPPRESSED';
}

export namespace v1.isp {
    /**
     * Defines the structure for in-skill product subscription information.
     * @interface
     */
    export interface SubscriptionInformation {
        'subscriptionPaymentFrequency'?: v1.isp.SubscriptionPaymentFrequency;
        'subscriptionTrialPeriodDays'?: number;
    }
}

export namespace v1.isp {
    /**
     * Localized in-skill product pricing information.
     * @interface
     */
    export interface SummaryMarketplacePricing {
        'releaseDate'?: string;
        'defaultPriceListing'?: v1.isp.SummaryPriceListing;
    }
}

export namespace v1.isp {
    /**
     * Price listing information for in-skill product.
     * @interface
     */
    export interface SummaryPriceListing {
        'price'?: number;
        'primeMemberPrice'?: number;
        'currency'?: v1.isp.Currency;
    }
}

export namespace v1.isp {
    /**
     * Defines the structure for in-skill product tax information.
     * @interface
     */
    export interface TaxInformation {
        'category'?: v1.isp.TaxInformationCategory;
    }
}

export namespace v1.isp {
    /**
     * Select tax category that best describes in-skill product. Choice will be validated during certification process.
     * @enum
     */
    export type TaxInformationCategory = 'SOFTWARE' | 'STREAMING_AUDIO' | 'STREAMING_RADIO' | 'INFORMATION_SERVICES' | 'VIDEO' | 'PERIODICALS' | 'NEWSPAPERS';
}

export namespace v1.isp {
    /**
     *
     * @interface
     */
    export interface CreateInSkillProductRequest {
        'vendorId'?: string;
        'inSkillProductDefinition'?: v1.isp.InSkillProductDefinition;
    }
}

export namespace v1.isp {
    /**
     * The frequency in which payments are collected for the subscription.
     * @enum
     */
    export type SubscriptionPaymentFrequency = 'MONTHLY' | 'YEARLY';
}

export namespace v1.isp {
    /**
     *
     * @interface
     */
    export interface UpdateInSkillProductRequest {
        'inSkillProductDefinition'?: v1.isp.InSkillProductDefinition;
    }
}

export namespace v1.skill {
    /**
     * Action of a resource.
     * @enum
     */
    export type Action = 'CREATE' | 'UPDATE' | 'ASSOCIATE' | 'DISASSOCIATE';
}

export namespace v1.skill {
    /**
     * Type of the agreement that the customer must be compliant to.
     * @enum
     */
    export type AgreementType = 'EXPORT_COMPLIANCE';
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @interface
     */
    export interface HostedSkillInfo {
        'repository'?: v1.skill.AlexaHosted.HostedSkillRepositoryInfo;
        'runtime'?: v1.skill.AlexaHosted.HostedSkillRuntime;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     * Alexa Hosted skill's metadata
     * @interface
     */
    export interface HostedSkillMetadata {
        'alexaHosted'?: v1.skill.AlexaHosted.HostedSkillInfo;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     * Customer's permission about Hosted skill features.
     * @interface
     */
    export interface HostedSkillPermission {
        'permission'?: v1.skill.AlexaHosted.HostedSkillPermissionType;
        'status'?: v1.skill.AlexaHosted.HostedSkillPermissionStatus;
        'actionUrl'?: string;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @enum
     */
    export type HostedSkillPermissionStatus = 'ALLOWED' | 'NEW_USER_REGISTRATION_REQUIRED' | 'RESOURCE_LIMIT_EXCEEDED' | 'RATE_EXCEEDED';
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @enum
     */
    export type HostedSkillPermissionType = 'NEW_SKILL';
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @enum
     */
    export type HostedSkillRepository = 'GIT';
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @interface
     */
    export interface HostedSkillRepositoryCredentials {
        'username'?: string;
        'password'?: string;
        'expiresAt'?: string;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     * defines the structure for the hosted skill repository credentials response
     * @interface
     */
    export interface HostedSkillRepositoryCredentialsList {
        'repositoryCredentials'?: v1.skill.AlexaHosted.HostedSkillRepositoryCredentials;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     *
     * @interface
     */
    export interface HostedSkillRepositoryCredentialsRequest {
        'repository'?: v1.skill.AlexaHosted.HostedSkillRepositoryInfo;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     * Alexa Hosted Skill's Repository Information
     * @interface
     */
    export interface HostedSkillRepositoryInfo {
        'url'?: string;
        'type'?: v1.skill.AlexaHosted.HostedSkillRepository;
    }
}

export namespace v1.skill.AlexaHosted {
    /**
     * Hosted skill lambda runtime
     * @enum
     */
    export type HostedSkillRuntime = 'nodejs8.10' | 'python3.7';
}

export namespace v1.skill {
    /**
     * Contains array which describes steps involved in a build. Elements (or build steps) are added to this array as they become IN_PROGRESS. 
     * @interface
     */
    export interface BuildDetails {
        'steps'?: Array<v1.skill.BuildStep>;
    }
}

export namespace v1.skill {
    /**
     * Describes the status of a build step.
     * @interface
     */
    export interface BuildStep {
        'name'?: v1.skill.BuildStepName;
        'status'?: v1.skill.Status;
        'errors'?: Array<v1.skill.StandardizedError>;
    }
}

export namespace v1.skill {
    /**
     * Name of the build step. Possible values - * `DIALOG_MODEL_BUILD` - Build status for dialog model. * `LANGUAGE_MODEL_QUICK_BUILD` - Build status for FST model. * `LANGUAGE_MODEL_FULL_BUILD` - Build status for statistical model. 
     * @enum
     */
    export type BuildStepName = 'DIALOG_MODEL_BUILD' | 'LANGUAGE_MODEL_QUICK_BUILD' | 'LANGUAGE_MODEL_FULL_BUILD';
}

export namespace v1.skill {
    /**
     * SkillId information.
     * @interface
     */
    export interface CreateSkillResponse {
        'skillId'?: string;
    }
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface ExportResponse {
        'status'?: v1.skill.ResponseStatus;
        'skill'?: v1.skill.ExportResponseSkill;
    }
}

export namespace v1.skill {
    /**
     * Defines the structure of the GetExport response.
     * @interface
     */
    export interface ExportResponseSkill {
        'eTag'?: string;
        'location'?: string;
        'expiresAt'?: string;
    }
}

export namespace v1.skill {
    /**
     * Dimensions of an image.
     * @interface
     */
    export interface ImageDimension {
        'widthInPixels'?: number;
        'heightInPixels'?: number;
    }
}

export namespace v1.skill {
    /**
     * On disk storage size of image.
     * @interface
     */
    export interface ImageSize {
        'value'?: number;
        'unit'?: v1.skill.ImageSizeUnit;
    }
}

export namespace v1.skill {
    /**
     * Unit of measurement for size of image.
     * @enum
     */
    export type ImageSizeUnit = 'MB';
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface ImportResponse {
        'status'?: v1.skill.ResponseStatus;
        'errors'?: Array<v1.skill.StandardizedError>;
        'warnings'?: Array<v1.skill.StandardizedError>;
        'skill'?: v1.skill.ImportResponseSkill;
    }
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface ImportResponseSkill {
        'skillId'?: string;
        'eTag'?: string;
        'resources': Array<v1.skill.ResourceImportStatus>;
    }
}

export namespace v1.skill {
    /**
     * Structure representing properties of an instance of data. Definition will be either one of a booleanInstance, stringInstance, integerInstance, or compoundInstance.
     * @interface
     */
    export interface Instance {
        'propertyPath'?: string;
        'dataType'?: v1.skill.ValidationDataTypes;
        'value'?: string;
    }
}

export namespace v1.skill {
    /**
     * Interface related objects.
     * @interface
     */
    export interface InterfaceDefinition {
        'isGlobal'?: boolean;
        'locales'?: Array<string>;
        'intents'?: Array<v1.skill.InterfaceIntent>;
    }
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface InterfaceIntent {
        'isExtensible'?: boolean;
        'name'?: string;
        'isRequired'?: boolean;
    }
}

export namespace v1.skill {
    /**
     * Contains attributes related to last modification (create/update) request of a resource.
     * @interface
     */
    export interface LastUpdateRequest {
        'status'?: v1.skill.Status;
        'errors'?: Array<v1.skill.StandardizedError>;
        'warnings'?: Array<v1.skill.StandardizedError>;
        'buildDetails'?: v1.skill.BuildDetails;
    }
}

export namespace v1.skill {
    /**
     * List of skills for the vendor.
     * @interface
     */
    export interface ListSkillResponse {
        '_links'?: v1.Links;
        'skills'?: Array<v1.skill.SkillSummary>;
        'isTruncated'?: boolean;
        'nextToken'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of alexaForBusiness api in the skill manifest.
     * @interface
     */
    export interface AlexaForBusinessApis {
        'regions'?: { [key: string]: v1.skill.Manifest.Region; };
        'endpoint'?: v1.skill.Manifest.SkillManifestEndpoint;
        'interfaces'?: Array<v1.skill.Manifest.AlexaForBusinessInterface>;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface AlexaForBusinessInterface {
        'namespace'?: string;
        'version'?: v1.skill.Manifest.Version;
        'requests'?: Array<v1.skill.Manifest.Request>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Skill connection object.
     * @interface
     */
    export interface Connections {
        'name'?: string;
        'payload'?: v1.skill.Manifest.ConnectionsPayload;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Payload of the connection.
     * @interface
     */
    export interface ConnectionsPayload {
        'type'?: string;
        'version'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Contains the critical data related info.
     * @interface
     */
    export interface CriticalDataHandling {
        'dataProtectionProvider'?: v1.skill.Manifest.DataProtectionProvider;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for custom api of the skill.
     * @interface
     */
    export interface CustomApis {
        'regions'?: { [key: string]: v1.skill.Manifest.Region; };
        'endpoint'?: v1.skill.Manifest.SkillManifestEndpoint;
        'interfaces'?: Array<v1.skill.Manifest.Interface>;
        'tasks'?: Array<v1.skill.Manifest.SkillManifestCustomTask>;
        'connections'?: v1.skill.Manifest.CustomConnections;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Supported connections.
     * @interface
     */
    export interface CustomConnections {
        'requires'?: Array<v1.skill.Manifest.Connections>;
        'provides'?: Array<v1.skill.Manifest.Connections>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * The data protection provider.
     * @enum
     */
    export type DataProtectionProvider = 'KEY_MASTER' | 'AWS_KMS';
}

export namespace v1.skill.Manifest {
    /**
     * The minimum version of the APML specification supported by the skill. If a device does not support a version greater than or equal to the version specified her then apmlVersion will not be passed inside the Display interface in the ASK request.
     * @enum
     */
    export type DisplayInterfaceApmlVersion = '0.2';
}

export namespace v1.skill.Manifest {
    /**
     * The minimum version of pre-defined templates supported by the skill. If a device does not support a version greater than or equal to the version specified her then templateVersion will not be passed inside the Display interface in the ASK request.
     * @enum
     */
    export type DisplayInterfaceTemplateVersion = '1';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @enum
     */
    export type DistributionCountries = 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CD' | 'CK' | 'CR' | 'HR' | 'CY' | 'CZ' | 'DK' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'VA' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'CI' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KR' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'AN' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'ES' | 'LK' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UM' | 'UY' | 'UZ' | 'VU' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';
}

export namespace v1.skill.Manifest {
    /**
     * What audience the skill should be distributed to. \"PUBLIC\" - available to all users. Has ASIN and can be enabled. \"PRIVATE\" - available to entitled users. Has ASIN and can be enabled. \"INTERNAL\" - has no ASIN and cannot be enabled by users. Internally managed skills. 
     * @enum
     */
    export type DistributionMode = 'PRIVATE' | 'PUBLIC' | 'INTERNAL';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface EventName {
        'eventName'?: v1.skill.Manifest.EventNameType;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Name of the event to be subscribed to.
     * @enum
     */
    export type EventNameType = 'SKILL_ENABLED' | 'SKILL_DISABLED' | 'SKILL_PERMISSION_ACCEPTED' | 'SKILL_PERMISSION_CHANGED' | 'SKILL_ACCOUNT_LINKED' | 'ITEMS_CREATED' | 'ITEMS_UPDATED' | 'ITEMS_DELETED' | 'LIST_CREATED' | 'LIST_UPDATED' | 'LIST_DELETED' | 'ALL_LISTS_CHANGED' | 'REMINDER_STARTED' | 'REMINDER_CREATED' | 'REMINDER_UPDATED' | 'REMINDER_DELETED' | 'REMINDER_STATUS_CHANGED' | 'AUDIO_ITEM_PLAYBACK_STARTED' | 'AUDIO_ITEM_PLAYBACK_FINISHED' | 'AUDIO_ITEM_PLAYBACK_STOPPED' | 'AUDIO_ITEM_PLAYBACK_FAILED' | 'SKILL_PROACTIVE_SUBSCRIPTION_CHANGED' | 'IN_SKILL_PRODUCT_SUBSCRIPTION_STARTED' | 'IN_SKILL_PRODUCT_SUBSCRIPTION_RENEWED' | 'IN_SKILL_PRODUCT_SUBSCRIPTION_ENDED' | 'Legacy.ActivityManager.ActivityContextRemovedEvent' | 'Legacy.ActivityManager.ActivityInterrupted' | 'Legacy.ActivityManager.FocusChanged' | 'Legacy.AlertsController.DismissCommand' | 'Legacy.AlertsController.SnoozeCommand' | 'Legacy.AudioPlayer.AudioStutter' | 'Legacy.AudioPlayer.InitialPlaybackProgressReport' | 'Legacy.AudioPlayer.Metadata' | 'Legacy.AudioPlayer.PeriodicPlaybackProgressReport' | 'Legacy.AudioPlayer.PlaybackError' | 'Legacy.AudioPlayer.PlaybackFinished' | 'Legacy.AudioPlayer.PlaybackIdle' | 'Legacy.AudioPlayer.PlaybackInterrupted' | 'Legacy.AudioPlayer.PlaybackNearlyFinished' | 'Legacy.AudioPlayer.PlaybackPaused' | 'Legacy.AudioPlayer.PlaybackResumed' | 'Legacy.AudioPlayer.PlaybackStarted' | 'Legacy.AudioPlayer.PlaybackStutterFinished' | 'Legacy.AudioPlayer.PlaybackStutterStarted' | 'Legacy.AudioPlayerGui.ButtonClickedEvent' | 'Legacy.AudioPlayerGui.LyricsViewedEvent' | 'Legacy.AuxController.DirectionChanged' | 'Legacy.AuxController.EnabledStateChanged' | 'Legacy.AuxController.InputActivityStateChanged' | 'Legacy.AuxController.PluggedStateChanged' | 'Legacy.BluetoothNetwork.CancelPairingMode' | 'Legacy.BluetoothNetwork.DeviceConnectedFailure' | 'Legacy.BluetoothNetwork.DeviceConnectedSuccess' | 'Legacy.BluetoothNetwork.DeviceDisconnectedFailure' | 'Legacy.BluetoothNetwork.DeviceDisconnectedSuccess' | 'Legacy.BluetoothNetwork.DevicePairFailure' | 'Legacy.BluetoothNetwork.DevicePairSuccess' | 'Legacy.BluetoothNetwork.DeviceUnpairFailure' | 'Legacy.BluetoothNetwork.DeviceUnpairSuccess' | 'Legacy.BluetoothNetwork.EnterPairingModeFailure' | 'Legacy.BluetoothNetwork.EnterPairingModeSuccess' | 'Legacy.BluetoothNetwork.MediaControlFailure' | 'Legacy.BluetoothNetwork.MediaControlSuccess' | 'Legacy.BluetoothNetwork.ScanDevicesReport' | 'Legacy.BluetoothNetwork.SetDeviceCategoriesFailed' | 'Legacy.BluetoothNetwork.SetDeviceCategoriesSucceeded' | 'Legacy.ContentManager.ContentPlaybackTerminated' | 'Legacy.DeviceNotification.DeleteNotificationFailed' | 'Legacy.DeviceNotification.DeleteNotificationSucceeded' | 'Legacy.DeviceNotification.NotificationEnteredBackground' | 'Legacy.DeviceNotification.NotificationEnteredForground' | 'Legacy.DeviceNotification.NotificationStarted' | 'Legacy.DeviceNotification.NotificationStopped' | 'Legacy.DeviceNotification.NotificationSync' | 'Legacy.DeviceNotification.SetNotificationFailed' | 'Legacy.DeviceNotification.SetNotificationSucceeded' | 'Legacy.EqualizerController.EqualizerChanged' | 'Legacy.ExternalMediaPlayer.AuthorizationComplete' | 'Legacy.ExternalMediaPlayer.Error' | 'Legacy.ExternalMediaPlayer.Event' | 'Legacy.ExternalMediaPlayer.Login' | 'Legacy.ExternalMediaPlayer.Logout' | 'Legacy.ExternalMediaPlayer.ReportDiscoveredPlayers' | 'Legacy.ExternalMediaPlayer.RequestToken' | 'Legacy.FavoritesController.Error' | 'Legacy.FavoritesController.Response' | 'Legacy.GameEngine.GameInputEvent' | 'Legacy.HomeAutoWifiController.DeviceReconnected' | 'Legacy.HomeAutoWifiController.HttpNotified' | 'Legacy.HomeAutoWifiController.SsdpDiscoveryFinished' | 'Legacy.HomeAutoWifiController.SsdpServiceDiscovered' | 'Legacy.HomeAutoWifiController.SsdpServiceTerminated' | 'Legacy.ListModel.AddItemRequest' | 'Legacy.ListModel.DeleteItemRequest' | 'Legacy.ListModel.GetPageByOrdinalRequest' | 'Legacy.ListModel.GetPageByTokenRequest' | 'Legacy.ListModel.ListStateUpdateRequest' | 'Legacy.ListModel.UpdateItemRequest' | 'Legacy.ListRenderer.GetListPageByOrdinal' | 'Legacy.ListRenderer.GetListPageByToken' | 'Legacy.ListRenderer.ListItemEvent' | 'Legacy.MediaGrouping.GroupChangeNotificationEvent' | 'Legacy.MediaGrouping.GroupChangeResponseEvent' | 'Legacy.MediaGrouping.GroupSyncEvent' | 'Legacy.MediaPlayer.PlaybackError' | 'Legacy.MediaPlayer.PlaybackFinished' | 'Legacy.MediaPlayer.PlaybackIdle' | 'Legacy.MediaPlayer.PlaybackNearlyFinished' | 'Legacy.MediaPlayer.PlaybackPaused' | 'Legacy.MediaPlayer.PlaybackResumed' | 'Legacy.MediaPlayer.PlaybackStarted' | 'Legacy.MediaPlayer.PlaybackStopped' | 'Legacy.MediaPlayer.SequenceItemsRequested' | 'Legacy.MediaPlayer.SequenceModified' | 'Legacy.MeetingClientController.Event' | 'Legacy.Microphone.AudioRecording' | 'Legacy.PhoneCallController.Event' | 'Legacy.PlaybackController.ButtonCommand' | 'Legacy.PlaybackController.LyricsViewedEvent' | 'Legacy.PlaybackController.NextCommand' | 'Legacy.PlaybackController.PauseCommand' | 'Legacy.PlaybackController.PlayCommand' | 'Legacy.PlaybackController.PreviousCommand' | 'Legacy.PlaybackController.ToggleCommand' | 'Legacy.PlaylistController.ErrorResponse' | 'Legacy.PlaylistController.Response' | 'Legacy.Presentation.PresentationDismissedEvent' | 'Legacy.Presentation.PresentationUserEvent' | 'Legacy.SconeRemoteControl.Next' | 'Legacy.SconeRemoteControl.PlayPause' | 'Legacy.SconeRemoteControl.Previous' | 'Legacy.SconeRemoteControl.VolumeDown' | 'Legacy.SconeRemoteControl.VolumeUp' | 'Legacy.SipClient.Event' | 'Legacy.SoftwareUpdate.CheckSoftwareUpdateReport' | 'Legacy.SoftwareUpdate.InitiateSoftwareUpdateReport' | 'Legacy.Speaker.MuteChanged' | 'Legacy.Speaker.VolumeChanged' | 'Legacy.SpeechRecognizer.WakeWordChanged' | 'Legacy.SpeechSynthesizer.SpeechFinished' | 'Legacy.SpeechSynthesizer.SpeechInterrupted' | 'Legacy.SpeechSynthesizer.SpeechStarted' | 'Legacy.SpeechSynthesizer.SpeechSynthesizerError' | 'Legacy.Spotify.Event' | 'Legacy.System.UserInactivity' | 'Legacy.UDPController.BroadcastResponse' | 'LocalApplication.Alexa.Translation.LiveTranslation.Event' | 'LocalApplication.AlexaNotifications.Event' | 'LocalApplication.AlexaPlatformTestSpeechlet.Event' | 'LocalApplication.AlexaVision.Event' | 'LocalApplication.AlexaVoiceLayer.Event' | 'LocalApplication.AvaPhysicalShopping.Event' | 'LocalApplication.Calendar.Event' | 'LocalApplication.Closet.Event' | 'LocalApplication.Communications.Event' | 'LocalApplication.DeviceMessaging.Event' | 'LocalApplication.DigitalDash.Event' | 'LocalApplication.FireflyShopping.Event' | 'LocalApplication.Gallery.Event' | 'LocalApplication.HHOPhotos.Event' | 'LocalApplication.HomeAutomationMedia.Event' | 'LocalApplication.KnightContacts.Event' | 'LocalApplication.KnightHome.Event' | 'LocalApplication.KnightHomeThingsToTry.Event' | 'LocalApplication.LocalMediaPlayer.Event' | 'LocalApplication.LocalVoiceUI.Event' | 'LocalApplication.MShop.Event' | 'LocalApplication.MShopPurchasing.Event' | 'LocalApplication.NotificationsApp.Event' | 'LocalApplication.Photos.Event' | 'LocalApplication.Sentry.Event' | 'LocalApplication.SipClient.Event' | 'LocalApplication.SipUserAgent.Event' | 'LocalApplication.todoRenderer.Event' | 'LocalApplication.VideoExperienceService.Event' | 'LocalApplication.WebVideoPlayer.Event' | 'Alexa.Camera.PhotoCaptureController.CancelCaptureFailed' | 'Alexa.Camera.PhotoCaptureController.CancelCaptureFinished' | 'Alexa.Camera.PhotoCaptureController.CaptureFailed' | 'Alexa.Camera.PhotoCaptureController.CaptureFinished' | 'Alexa.Camera.VideoCaptureController.CancelCaptureFailed' | 'Alexa.Camera.VideoCaptureController.CancelCaptureFinished' | 'Alexa.Camera.VideoCaptureController.CaptureFailed' | 'Alexa.Camera.VideoCaptureController.CaptureFinished' | 'Alexa.Camera.VideoCaptureController.CaptureStarted' | 'Alexa.FileManager.UploadController.CancelUploadFailed' | 'Alexa.FileManager.UploadController.CancelUploadFinished' | 'Alexa.FileManager.UploadController.UploadFailed' | 'Alexa.FileManager.UploadController.UploadFinished' | 'Alexa.FileManager.UploadController.UploadStarted' | 'Alexa.Presentation.APL.UserEvent' | 'Alexa.Presentation.HTML.Event' | 'Alexa.Presentation.HTML.LifecycleStateChanged' | 'Alexa.Presentation.PresentationDismissed' | 'AudioPlayer.PlaybackFailed' | 'AudioPlayer.PlaybackFinished' | 'AudioPlayer.PlaybackNearlyFinished' | 'AudioPlayer.PlaybackStarted' | 'AudioPlayer.PlaybackStopped' | 'CardRenderer.DisplayContentFinished' | 'CardRenderer.DisplayContentStarted' | 'CardRenderer.ReadContentFinished' | 'CardRenderer.ReadContentStarted' | 'CustomInterfaceController.EventsReceived' | 'CustomInterfaceController.Expired' | 'DeviceSetup.SetupCompleted' | 'Display.ElementSelected' | 'Display.UserEvent' | 'FitnessSessionController.FitnessSessionEnded' | 'FitnessSessionController.FitnessSessionError' | 'FitnessSessionController.FitnessSessionPaused' | 'FitnessSessionController.FitnessSessionResumed' | 'FitnessSessionController.FitnessSessionStarted' | 'GameEngine.InputHandlerEvent' | 'Messaging.MessageReceived' | 'MessagingController.UpdateConversationsStatus' | 'MessagingController.UpdateMessagesStatusRequest' | 'MessagingController.UpdateSendMessageStatusRequest' | 'MessagingController.UploadConversations' | 'PlaybackController.NextCommandIssued' | 'PlaybackController.PauseCommandIssued' | 'PlaybackController.PlayCommandIssued' | 'PlaybackController.PreviousCommandIssued' | 'EffectsController.RequestEffectChangeRequest' | 'EffectsController.RequestGuiChangeRequest' | 'EffectsController.StateReceiptChangeRequest';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface EventPublications {
        'eventName'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for flash briefing api of the skill.
     * @interface
     */
    export interface FlashBriefingApis {
        'locales'?: { [key: string]: v1.skill.Manifest.LocalizedFlashBriefingInfo; };
    }
}

export namespace v1.skill.Manifest {
    /**
     * format of the feed content.
     * @enum
     */
    export type FlashBriefingContentType = 'TEXT' | 'AUDIO' | 'AUDIO_AND_VIDEO';
}

export namespace v1.skill.Manifest {
    /**
     * Type or subject of the content in the feed.
     * @enum
     */
    export type FlashBriefingGenre = 'HEADLINE_NEWS' | 'BUSINESS' | 'POLITICS' | 'ENTERTAINMENT' | 'TECHNOLOGY' | 'HUMOR' | 'LIFESTYLE' | 'SPORTS' | 'SCIENCE' | 'HEALTH_AND_FITNESS' | 'ARTS_AND_CULTURE' | 'PRODUCTIVITY_AND_UTILITIES' | 'OTHER';
}

export namespace v1.skill.Manifest {
    /**
     * Tells how often the feed has new content.
     * @enum
     */
    export type FlashBriefingUpdateFrequency = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'UNKNOWN';
}

export namespace v1.skill.Manifest {
    /**
     * Specifies if gadget support is required/optional for this skill to work.
     * @enum
     */
    export type GadgetSupport = 'REQUIRED' | 'OPTIONAL';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface HealthAlias {
        'name'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of health api in the skill manifest.
     * @interface
     */
    export interface HealthApis {
        'regions'?: { [key: string]: v1.skill.Manifest.Region; };
        'endpoint'?: v1.skill.Manifest.SkillManifestEndpoint;
        'protocolVersion'?: v1.skill.Manifest.HealthProtocolVersion;
        'interfaces'?: v1.skill.Manifest.HealthInterface;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface HealthInterface {
        'namespace'?: string;
        'version'?: v1.skill.Manifest.Version;
        'requests'?: Array<v1.skill.Manifest.HealthRequest>;
        'locales'?: { [key: string]: v1.skill.Manifest.LocalizedHealthInfo; };
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @enum
     */
    export type HealthProtocolVersion = '1' | '2';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface HealthRequest {
        'name'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of household list api in the skill manifest.
     * @interface
     */
    export interface HouseHoldList {
    }
}

export namespace v1.skill.Manifest {
   /**
    *
    * @interface
    */
    export type Interface = v1.skill.Manifest.AlexaPresentationAplInterface | v1.skill.Manifest.CustomInterface | v1.skill.Manifest.AlexaPresentationHtmlInterface | v1.skill.Manifest.AudioInterface | v1.skill.Manifest.GameEngineInterface | v1.skill.Manifest.DisplayInterface | v1.skill.Manifest.GadgetControllerInterface | v1.skill.Manifest.VideoAppInterface;
}

export namespace v1.skill.Manifest {
    /**
     * Contains the uri field. This sets the global default endpoint.
     * @interface
     */
    export interface LambdaEndpoint {
        'uri': string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of a regional information.
     * @interface
     */
    export interface LambdaRegion {
        'endpoint'?: v1.skill.Manifest.LambdaEndpoint;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the localized flash briefing api information.
     * @interface
     */
    export interface LocalizedFlashBriefingInfo {
        'feeds'?: Array<v1.skill.Manifest.LocalizedFlashBriefingInfoItems>;
        'customErrorMessage'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface LocalizedFlashBriefingInfoItems {
        'logicalName'?: string;
        'name'?: string;
        'url'?: string;
        'imageUri'?: string;
        'contentType'?: v1.skill.Manifest.FlashBriefingContentType;
        'genre'?: v1.skill.Manifest.FlashBriefingGenre;
        'updateFrequency'?: v1.skill.Manifest.FlashBriefingUpdateFrequency;
        'vuiPreamble'?: string;
        'isDefault'?: boolean;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for health skill locale specific publishing information in the skill manifest.
     * @interface
     */
    export interface LocalizedHealthInfo {
        'promptName'?: string;
        'aliases'?: Array<v1.skill.Manifest.HealthAlias>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of localized music information in the skill manifest.
     * @interface
     */
    export interface LocalizedMusicInfo {
        'promptName'?: string;
        'aliases'?: Array<v1.skill.Manifest.MusicAlias>;
        'features'?: Array<v1.skill.Manifest.MusicFeature>;
        'wordmarkLogos'?: Array<v1.skill.Manifest.MusicWordmark>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for gadget buttons support in the skill manifest.
     * @interface
     */
    export interface ManifestGadgetSupport {
        'requirement'?: v1.skill.Manifest.GadgetSupport;
        'minGadgetButtons'?: number;
        'maxGadgetButtons'?: number;
        'numPlayersMax'?: number;
        'numPlayersMin'?: number;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicAlias {
        'name'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of music api in the skill manifest.
     * @interface
     */
    export interface MusicApis {
        'regions'?: { [key: string]: v1.skill.Manifest.LambdaRegion; };
        'endpoint'?: v1.skill.Manifest.LambdaEndpoint;
        'capabilities'?: Array<v1.skill.Manifest.MusicCapability>;
        'interfaces'?: v1.skill.Manifest.MusicInterfaces;
        'locales'?: { [key: string]: v1.skill.Manifest.LocalizedMusicInfo; };
        'contentTypes'?: Array<v1.skill.Manifest.MusicContentType>;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicCapability {
        'namespace'?: string;
        'name'?: string;
        'version'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Name of the content type that's supported for the music skill.
     * @enum
     */
    export type MusicContentName = 'ON_DEMAND' | 'RADIO' | 'PODCAST';
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for content that can be provided by a music skill.
     * @interface
     */
    export interface MusicContentType {
        'name'?: v1.skill.Manifest.MusicContentName;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicFeature {
        'name'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicInterfaces {
        'namespace'?: string;
        'version'?: string;
        'requests'?: Array<v1.skill.Manifest.MusicRequest>;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicRequest {
        'name'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface MusicWordmark {
        'uri'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface PermissionItems {
        'name'?: v1.skill.Manifest.PermissionName;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Name of the required permission.
     * @enum
     */
    export type PermissionName = 'payments:autopay_consent' | 'alexa::async_event:write' | 'avs::distributed_audio' | 'alexa::devices:all:address:full:read' | 'alexa:devices:all:address:country_and_postal_code:read' | 'alexa::devices:all:geolocation:read' | 'alexa::health:profile:write' | 'alexa::household:lists:read' | 'alexa::household:lists:write' | 'alexa::personality:explicit:read' | 'alexa::personality:explicit:write' | 'alexa::profile:name:read' | 'alexa::profile:email:read' | 'alexa::profile:mobile_number:read' | 'alexa::profile:given_name:read' | 'alexa::customer_id:read' | 'alexa::person_id:read' | 'alexa::raw_person_id:read' | 'alexa::devices:all:notifications:write' | 'alexa::devices:all:notifications:urgent:write' | 'alexa::alerts:reminders:skill:readwrite' | 'alexa::alerts:timers:skill:readwrite' | 'alexa::skill:cds:monetization' | 'alexa::music:cast' | 'alexa::skill:products:entitlements' | 'alexa::skill:proactive_enablement' | 'alexa::authenticate:2:mandatory' | 'alexa::authenticate:2:optional' | 'alexa::user_experience_guidance:read' | 'alexa::device_id:read' | 'alexa::device_type:read';
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for regional information.
     * @interface
     */
    export interface Region {
        'endpoint'?: v1.skill.Manifest.SkillManifestEndpoint;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface Request {
        'name'?: v1.skill.Manifest.RequestName;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Name of the request.
     * @enum
     */
    export type RequestName = 'Search' | 'Create' | 'Update';
}

export namespace v1.skill.Manifest {
    /**
     * The SSL certificate type of the skill's HTTPS endpoint. Only valid for HTTPS endpoint not for AWS Lambda ARN.
     * @enum
     */
    export type SSLCertificateType = 'SelfSigned' | 'Wildcard' | 'Trusted';
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for a skill's metadata.
     * @interface
     */
    export interface SkillManifest {
        'manifestVersion'?: string;
        'publishingInformation'?: v1.skill.Manifest.SkillManifestPublishingInformation;
        'privacyAndCompliance'?: v1.skill.Manifest.SkillManifestPrivacyAndCompliance;
        'events'?: v1.skill.Manifest.SkillManifestEvents;
        'permissions'?: Array<v1.skill.Manifest.PermissionItems>;
        'apis'?: v1.skill.Manifest.SkillManifestApis;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for implemented apis information in the skill manifest.
     * @interface
     */
    export interface SkillManifestApis {
        'flashBriefing'?: v1.skill.Manifest.FlashBriefingApis;
        'custom'?: v1.skill.Manifest.CustomApis;
        'smartHome'?: v1.skill.Manifest.SmartHomeApis;
        'video'?: v1.skill.Manifest.VideoApis;
        'alexaForBusiness'?: v1.skill.Manifest.AlexaForBusinessApis;
        'health'?: v1.skill.Manifest.HealthApis;
        'householdList'?: v1.skill.Manifest.HouseHoldList;
        'music'?: v1.skill.Manifest.MusicApis;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the name and version of the task that the skill wants to handle.
     * @interface
     */
    export interface SkillManifestCustomTask {
        'name': string;
        'version': string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for endpoint information in the skill manifest.
     * @interface
     */
    export interface SkillManifestEndpoint {
        'uri'?: string;
        'requestEnvelopeVersionSupported'?: string;
        'sslCertificateType'?: v1.skill.Manifest.SSLCertificateType;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface SkillManifestEnvelope {
        'manifest'?: v1.skill.Manifest.SkillManifest;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for subscribed events information in the skill manifest.
     * @interface
     */
    export interface SkillManifestEvents {
        'subscriptions'?: Array<v1.skill.Manifest.EventName>;
        'publications'?: Array<v1.skill.Manifest.EventPublications>;
        'regions'?: { [key: string]: v1.skill.Manifest.Region; };
        'endpoint'?: v1.skill.Manifest.SkillManifestEndpoint;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for locale specific privacy & compliance information in the skill manifest.
     * @interface
     */
    export interface SkillManifestLocalizedPrivacyAndCompliance {
        'privacyPolicyUrl'?: string;
        'termsOfUseUrl'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for locale specific publishing information in the skill manifest.
     * @interface
     */
    export interface SkillManifestLocalizedPublishingInformation {
        'name'?: string;
        'smallIconUri'?: string;
        'largeIconUri'?: string;
        'summary'?: string;
        'description'?: string;
        'updatesDescription'?: string;
        'examplePhrases'?: Array<string>;
        'keywords'?: Array<string>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for privacy & compliance information in the skill manifest.
     * @interface
     */
    export interface SkillManifestPrivacyAndCompliance {
        'locales'?: { [key: string]: v1.skill.Manifest.SkillManifestLocalizedPrivacyAndCompliance; };
        'allowsPurchases'?: boolean;
        'usesPersonalInfo'?: boolean;
        'isChildDirected'?: boolean;
        'isExportCompliant'?: boolean;
        'containsAds'?: boolean;
        'usesHealthInfo'?: boolean;
        'criticalDataHandling'?: v1.skill.Manifest.CriticalDataHandling;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for publishing information in the skill manifest.
     * @interface
     */
    export interface SkillManifestPublishingInformation {
        'name'?: string;
        'description'?: string;
        'locales'?: { [key: string]: v1.skill.Manifest.SkillManifestLocalizedPublishingInformation; };
        'isAvailableWorldwide'?: boolean;
        'distributionMode'?: v1.skill.Manifest.DistributionMode;
        'gadgetSupport'?: v1.skill.Manifest.ManifestGadgetSupport;
        'testingInstructions'?: string;
        'category'?: string;
        'distributionCountries'?: Array<v1.skill.Manifest.DistributionCountries>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for smart home api of the skill.
     * @interface
     */
    export interface SmartHomeApis {
        'regions'?: { [key: string]: v1.skill.Manifest.LambdaRegion; };
        'endpoint'?: v1.skill.Manifest.LambdaEndpoint;
        'protocolVersion'?: v1.skill.Manifest.SmartHomeProtocol;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Version of the Smart Home API. Default and recommended value is '3'. You may create a skill with version '2' for testing migration to version '3', but a skill submission using version '2' will not be certified.
     * @enum
     */
    export type SmartHomeProtocol = '1' | '2' | '2.5' | '2.9' | '3';
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface UpChannelItems {
        'type'?: string;
        'uri'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Version of the interface.
     * @enum
     */
    export type Version = '1';
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for video api of the skill.
     * @interface
     */
    export interface VideoApis {
        'regions'?: { [key: string]: v1.skill.Manifest.VideoRegion; };
        'locales'?: { [key: string]: v1.skill.Manifest.VideoApisLocale; };
        'endpoint'?: v1.skill.Manifest.LambdaEndpoint;
        'countries'?: { [key: string]: v1.skill.Manifest.VideoCountryInfo; };
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for localized video api information.
     * @interface
     */
    export interface VideoApisLocale {
        'videoProviderTargetingNames'?: Array<string>;
        'videoProviderLogoUri'?: string;
        'catalogInformation'?: Array<v1.skill.Manifest.VideoCatalogInfo>;
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface VideoCatalogInfo {
        'sourceId'?: string;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure of per-country video info in the skill manifest.
     * @interface
     */
    export interface VideoCountryInfo {
        'catalogInformation'?: Array<v1.skill.Manifest.VideoCatalogInfo>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the structure for endpoint information.
     * @interface
     */
    export interface VideoRegion {
        'endpoint'?: v1.skill.Manifest.LambdaEndpoint;
        'upchannel'?: Array<v1.skill.Manifest.UpChannelItems>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Defines the mode of viewport that comply with this specification. E.g. HUB TV.
     * @enum
     */
    export type ViewportMode = 'HUB' | 'TV';
}

export namespace v1.skill.Manifest {
    /**
     * Defines the shape of the device's viewport.
     * @enum
     */
    export type ViewportShape = 'RECTANGLE' | 'ROUND';
}

export namespace v1.skill.Manifest {
    /**
     * Defines a viewport specification.
     * @interface
     */
    export interface ViewportSpecification {
        'mode': v1.skill.Manifest.ViewportMode;
        'shape': v1.skill.Manifest.ViewportShape;
        'minWidth'?: number;
        'maxWidth'?: number;
        'minHeight'?: number;
        'maxHeight'?: number;
    }
}

export namespace v1.skill.Private {
    /**
     * Enterprise IT administrators' action on the private distribution.
     * @enum
     */
    export type AcceptStatus = 'ACCEPTED' | 'PENDING';
}

export namespace v1.skill.Private {
    /**
     * Response of ListPrivateDistributionAccounts.
     * @interface
     */
    export interface ListPrivateDistributionAccountsResponse {
        '_links'?: v1.Links;
        'privateDistributionAccounts'?: Array<v1.skill.Private.PrivateDistributionAccount>;
        'nextToken'?: string;
    }
}

export namespace v1.skill.Private {
    /**
     * Contains information of the private distribution account with given id.
     * @interface
     */
    export interface PrivateDistributionAccount {
        'principal'?: string;
        'acceptStatus'?: v1.skill.Private.AcceptStatus;
    }
}

export namespace v1.skill {
    /**
     * Determines if the skill should be submitted only for certification and manually publish later or publish immediately after the skill is certified. Omitting the publication method will default to auto publishing.
     * @enum
     */
    export type PublicationMethod = 'MANUAL_PUBLISHING' | 'AUTO_PUBLISHING';
}

export namespace v1.skill {
    /**
     * Publication status of the skill. It is associated with the skill's stage. Skill in 'development' stage can have publication status as 'DEVELOPMENT' or 'CERTIFICATION'. Skill in 'certified' stage can have publication status as 'CERTIFIED'. 'Skill in 'live' stage can have publication status as 'PUBLISHED', 'HIDDEN' or 'REMOVED'. * `DEVELOPMENT` - The skill is available only to you. If you have enabled it for testing, you can test it on devices registered to your developer account. * `CERTIFICATION` - Amazon is currently reviewing the skill for publication. During this time, you cannot edit the configuration. * `CERTIFIED` - The skill has been certified and ready to be published. Skill can be either published immediately or an future release date can be set for the skill. You cannot edit the configuration for the certified skills. To start development, make your changes on the development version. * `PUBLISHED` - The skill has been published and is available to users. You cannot edit the configuration for live skills. To start development on an updated version, make your changes on the development version instead. * `HIDDEN` - The skill has been published but is no longer available to new users for activation. Existing users can still invoke this skill. * `REMOVED` - The skill has been published but removed for use, due to Amazon's policy violation. You can update your skill and publish a new version to live to address the policy violation. 
     * @enum
     */
    export type PublicationStatus = 'DEVELOPMENT' | 'CERTIFICATION' | 'CERTIFIED' | 'PUBLISHED' | 'HIDDEN' | 'REMOVED';
}

export namespace v1.skill {
    /**
     * The reason to withdraw.
     * @enum
     */
    export type Reason = 'TEST_SKILL' | 'MORE_FEATURES' | 'DISCOVERED_ISSUE' | 'NOT_RECEIVED_CERTIFICATION_FEEDBACK' | 'NOT_INTEND_TO_PUBLISH' | 'OTHER';
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface RegionalSSLCertificate {
        'sslCertificate'?: string;
    }
}

export namespace v1.skill {
    /**
     * Defines the structure for a resource deployment status.
     * @interface
     */
    export interface ResourceImportStatus {
        'name'?: string;
        'status': v1.skill.ResponseStatus;
        'action'?: v1.skill.Action;
        'errors'?: Array<v1.skill.StandardizedError>;
        'warnings'?: Array<v1.skill.StandardizedError>;
    }
}

export namespace v1.skill {
    /**
     * Defines the structure for a resource status.
     * @interface
     */
    export interface ResourceStatus {
        'lastUpdateRequest'?: v1.skill.LastUpdateRequest;
        'eTag'?: string;
        'version'?: string;
        'errors'?: Array<v1.skill.StandardizedError>;
        'warnings'?: Array<v1.skill.StandardizedError>;
    }
}

export namespace v1.skill {
    /**
     * Status for a Response resource.
     * @enum
     */
    export type ResponseStatus = 'FAILED' | 'IN_PROGRESS' | 'SUCCEEDED' | 'ROLLBACK_SUCCEEDED' | 'ROLLBACK_FAILED';
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface SSLCertificatePayload {
        'sslCertificate'?: string;
        'regions'?: { [key: string]: v1.skill.RegionalSSLCertificate; };
    }
}

export namespace v1.skill {
    /**
     * Status for available interaction models, keyed by locale. 
     * @interface
     */
    export interface SkillInteractionModel {
        'locale'?: { [key: string]: v1.skill.SkillInteractionModelStatus; };
    }
}

export namespace v1.skill {
    /**
     * Defines the structure for interaction model build status.
     * @interface
     */
    export interface SkillInteractionModelStatus {
        'lastUpdateRequest'?: v1.skill.LastUpdateRequest;
        'eTag'?: string;
        'version'?: string;
        'errors'?: Array<v1.skill.StandardizedError>;
        'warnings'?: Array<v1.skill.StandardizedError>;
    }
}

export namespace v1.skill {
    /**
     * Defines the structure for skill status response.
     * @interface
     */
    export interface SkillStatus {
        'manifest'?: v1.skill.ResourceStatus;
        'interactionModel'?: v1.skill.SkillInteractionModel;
    }
}

export namespace v1.skill {
    /**
     * Information about the skills.
     * @interface
     */
    export interface SkillSummary {
        'skillId'?: string;
        'apis'?: Array<v1.skill.SkillSummaryApis>;
        'publicationStatus'?: v1.skill.PublicationStatus;
        'lastUpdated'?: string;
        'nameByLocale'?: { [key: string]: string; };
        'asin'?: string;
        '_links'?: v1.Links;
    }
}

export namespace v1.skill {
    /**
     *
     * @enum
     */
    export type SkillSummaryApis = 'custom' | 'smartHome' | 'flashBriefing' | 'video' | 'music' | 'householdList' | 'health' | 'alexaForBusiness';
}

export namespace v1.skill {
    /**
     * Standardized structure which wraps machine parsable and human readable information about an error.
     * @interface
     */
    export interface StandardizedError {
        'code'?: v1.skill.StandardizedErrorCode;
        'message'?: string;
        'validationDetails'?: v1.skill.ValidationDetails;
    }
}

export namespace v1.skill {
    /**
     * Status of a resource.
     * @enum
     */
    export type Status = 'FAILED' | 'IN_PROGRESS' | 'SUCCEEDED';
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface SubmitSkillForCertificationRequest {
        'publicationMethod'?: v1.skill.PublicationMethod;
    }
}

export namespace v1.skill {
    /**
     * Defines the structure for skill upload response.
     * @interface
     */
    export interface UploadResponse {
        'uploadUrl'?: string;
        'expiresAt'?: string;
    }
}

export namespace v1.skill {
    /**
     *
     * @enum
     */
    export type ValidationDataTypes = 'object' | 'boolean' | 'integer' | 'array' | 'string' | 'null';
}

export namespace v1.skill {
    /**
     * Structure representing an endpoint.
     * @interface
     */
    export interface ValidationEndpoint {
        'propertyPath'?: string;
        'type'?: string;
        'value'?: string;
    }
}

export namespace v1.skill {
    /**
     * Structure representing a public feature.
     * @interface
     */
    export interface ValidationFeature {
        'name'?: string;
        'contact'?: string;
    }
}

export namespace v1.skill {
    /**
     * The payload for the withdraw operation.
     * @interface
     */
    export interface WithdrawRequest {
        'reason'?: v1.skill.Reason;
        'message'?: string;
    }
}

export namespace v1.skill.accountLinking {
    /**
     * The type of client authentication scheme.
     * @enum
     */
    export type AccessTokenSchemeType = 'HTTP_BASIC' | 'REQUEST_BODY_CREDENTIALS';
}

export namespace v1.skill.accountLinking {
    /**
     * The payload for creating the account linking partner.
     * @interface
     */
    export interface AccountLinkingRequest {
        'type'?: v1.skill.accountLinking.AccountLinkingType;
        'authorizationUrl'?: string;
        'domains'?: Array<string>;
        'clientId'?: string;
        'scopes'?: Array<string>;
        'accessTokenUrl'?: string;
        'clientSecret'?: string;
        'accessTokenScheme'?: v1.skill.accountLinking.AccessTokenSchemeType;
        'defaultTokenExpirationInSeconds'?: number;
        'reciprocalAccessTokenUrl'?: string;
        'redirectUrls'?: Array<string>;
    }
}

export namespace v1.skill.accountLinking {
    /**
     * The account linking information of a skill.
     * @interface
     */
    export interface AccountLinkingResponse {
        'type'?: v1.skill.accountLinking.AccountLinkingType;
        'authorizationUrl'?: string;
        'domains'?: Array<string>;
        'clientId'?: string;
        'scopes'?: Array<string>;
        'accessTokenUrl'?: string;
        'accessTokenScheme'?: v1.skill.accountLinking.AccessTokenSchemeType;
        'defaultTokenExpirationInSeconds'?: number;
        'redirectUrls'?: Array<string>;
    }
}

export namespace v1.skill.accountLinking {
    /**
     * The type of account linking.
     * @enum
     */
    export type AccountLinkingType = 'AUTH_CODE' | 'IMPLICIT';
}

export namespace v1.skill.betaTest {
    /**
     * Beta test for an Alexa skill.
     * @interface
     */
    export interface BetaTest {
        'expiryDate'?: string;
        'status'?: v1.skill.betaTest.Status;
        'feedbackEmail'?: string;
        'invitationUrl'?: string;
        'invitesRemaining'?: number;
    }
}

export namespace v1.skill.betaTest {
    /**
     * Status of the beta test.
     * @enum
     */
    export type Status = 'IN_DRAFT' | 'STARTING' | 'RUNNING' | 'STOPPING' | 'ENDED';
}

export namespace v1.skill.betaTest {
    /**
     * Beta test meta-data.
     * @interface
     */
    export interface TestBody {
        'feedbackEmail'?: string;
    }
}

export namespace v1.skill.betaTest.testers {
    /**
     * Indicates whether the tester has accepted the invitation.
     * @enum
     */
    export type InvitationStatus = 'ACCEPTED' | 'NOT_ACCEPTED';
}

export namespace v1.skill.betaTest.testers {
    /**
     *
     * @interface
     */
    export interface ListTestersResponse {
        'testers'?: Array<v1.skill.betaTest.testers.TesterWithDetails>;
        'isTruncated'?: boolean;
        'nextToken'?: string;
    }
}

export namespace v1.skill.betaTest.testers {
    /**
     *
     * @interface
     */
    export interface Tester {
        'emailId'?: string;
    }
}

export namespace v1.skill.betaTest.testers {
    /**
     * Tester information.
     * @interface
     */
    export interface TesterWithDetails {
        'emailId'?: string;
        'associationDate'?: string;
        'isReminderAllowed'?: boolean;
        'invitationStatus'?: v1.skill.betaTest.testers.InvitationStatus;
    }
}

export namespace v1.skill.betaTest.testers {
    /**
     * List of testers.
     * @interface
     */
    export interface TestersList {
        'testers'?: Array<v1.skill.betaTest.testers.Tester>;
    }
}

export namespace v1.skill.certification {
    /**
     *
     * @interface
     */
    export interface CertificationResponse {
        'id'?: string;
        'status'?: v1.skill.certification.CertificationStatus;
        'skillSubmissionTimestamp'?: string;
        'reviewTrackingInfo'?: v1.skill.certification.ReviewTrackingInfo;
        'result'?: v1.skill.certification.CertificationResult;
    }
}

export namespace v1.skill.certification {
    /**
     * Structure for the result for the outcomes of certification review for the skill. Currently provides the distribution information of a skill if the certification SUCCEEDED. 
     * @interface
     */
    export interface CertificationResult {
        'distributionInfo'?: v1.skill.certification.DistributionInfo;
    }
}

export namespace v1.skill.certification {
    /**
     * String that specifies the current status of skill's certification Possible values are \"IN_PROGRESS\", \"SUCCEEDED\", \"FAILED\" and \"CANCELLED\" 
     * @enum
     */
    export type CertificationStatus = 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED';
}

export namespace v1.skill.certification {
    /**
     * Summary of the certification resource. This is a leaner view of the certification resource for the collections API.
     * @interface
     */
    export interface CertificationSummary {
        'id'?: string;
        'status'?: v1.skill.certification.CertificationStatus;
        'skillSubmissionTimestamp'?: string;
        'reviewTrackingInfo'?: v1.skill.certification.ReviewTrackingInfoSummary;
    }
}

export namespace v1.skill.certification {
    /**
     * The distribution information for skill where Amazon distributed the skill
     * @interface
     */
    export interface DistributionInfo {
        'publishedCountries'?: Array<string>;
        'publicationFailures'?: Array<v1.skill.certification.PublicationFailure>;
    }
}

export namespace v1.skill.certification {
    /**
     * Structure for any updates to estimation completion time for certification review for the skill.
     * @interface
     */
    export interface EstimationUpdate {
        'originalEstimatedCompletionTimestamp'?: string;
        'revisedEstimatedCompletionTimestamp'?: string;
        'reason'?: string;
    }
}

export namespace v1.skill.certification {
    /**
     * List of certification summary for a skill.
     * @interface
     */
    export interface ListCertificationsResponse {
        '_links'?: v1.Links;
        'isTruncated'?: boolean;
        'nextToken'?: string;
        'totalCount'?: number;
        'items'?: Array<v1.skill.certification.CertificationSummary>;
    }
}

export namespace v1.skill.certification {
    /**
     * Information about why the skill was not published in certain countries.
     * @interface
     */
    export interface PublicationFailure {
        'reason'?: string;
        'countries'?: Array<string>;
    }
}

export namespace v1.skill.certification {
    /**
     * Structure for review tracking information of the skill.
     * @interface
     */
    export interface ReviewTrackingInfo {
        'estimatedCompletionTimestamp'?: string;
        'actualCompletionTimestamp'?: string;
        'lastUpdated'?: string;
        'estimationUpdates'?: Array<v1.skill.certification.EstimationUpdate>;
    }
}

export namespace v1.skill.certification {
    /**
     * Structure for summarised view of review tracking information of the skill. This does not have the estimationUpdates array field.
     * @interface
     */
    export interface ReviewTrackingInfoSummary {
        'estimatedCompletionTimestamp'?: string;
        'actualCompletionTimestamp'?: string;
        'lastUpdated'?: string;
    }
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface CreateSkillRequest {
        'vendorId'?: string;
        'manifest'?: v1.skill.Manifest.SkillManifest;
    }
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface CreateSkillWithPackageRequest {
        'vendorId'?: string;
        'location'?: string;
    }
}

export namespace v1.skill.evaluations {
    /**
     * An enumeration indicating whether the user has explicitly confirmed or denied the entire intent. Possible values: \"NONE\", \"CONFIRMED\", \"DENIED\". 
     * @enum
     */
    export type ConfirmationStatusType = 'NONE' | 'CONFIRMED' | 'DENIED';
}

export namespace v1.skill.evaluations {
    /**
     * A representation of question prompts to the user for multi-turn, which requires user to fill a slot value, or confirm a slot value, or confirm an intent. 
     * @interface
     */
    export interface DialogAct {
        'type'?: v1.skill.evaluations.DialogActType;
        'targetSlot'?: string;
    }
}

export namespace v1.skill.evaluations {
    /**
     *
     * @enum
     */
    export type DialogActType = 'Dialog.ElicitSlot' | 'Dialog.ConfirmSlot' | 'Dialog.ConfirmIntent';
}

export namespace v1.skill.evaluations {
    /**
     *
     * @interface
     */
    export interface Intent {
        'name'?: string;
        'confirmationStatus'?: v1.skill.evaluations.ConfirmationStatusType;
        'slots'?: { [key: string]: v1.skill.evaluations.Slot; };
    }
}

export namespace v1.skill.evaluations {
    /**
     * Included when the selected intent has dialog defined and the dialog is not completed.  To continue the dialog, provide the value of the token in the multiTurnToken field in the next request. 
     * @interface
     */
    export interface MultiTurn {
        'dialogAct'?: v1.skill.evaluations.DialogAct;
        'token'?: string;
        'prompt'?: string;
    }
}

export namespace v1.skill.evaluations {
    /**
     *
     * @interface
     */
    export interface ProfileNluRequest {
        'utterance': string;
        'multiTurnToken'?: string;
    }
}

export namespace v1.skill.evaluations {
    /**
     *
     * @interface
     */
    export interface ProfileNluResponse {
        'sessionEnded'?: boolean;
        'selectedIntent'?: v1.skill.evaluations.ProfileNluSelectedIntent;
        'consideredIntents'?: Array<v1.skill.evaluations.Intent>;
        'multiTurn'?: v1.skill.evaluations.MultiTurn;
    }
}

export namespace v1.skill.evaluations {
    /**
     *
     * @interface
     */
    export interface ResolutionsPerAuthorityItems {
        'authority'?: string;
        'status'?: v1.skill.evaluations.ResolutionsPerAuthorityStatus;
        'values'?: Array<v1.skill.evaluations.ResolutionsPerAuthorityValueItems>;
    }
}

export namespace v1.skill.evaluations {
    /**
     * An object representing the status of entity resolution for the slot.
     * @interface
     */
    export interface ResolutionsPerAuthorityStatus {
        'code'?: v1.skill.evaluations.ResolutionsPerAuthorityStatusCode;
    }
}

export namespace v1.skill.evaluations {
    /**
     * A code indicating the results of attempting to resolve the user utterance against the defined slot types. This can be one of the following: ER_SUCCESS_MATCH: The spoken value matched a value or synonym explicitly defined in your custom slot type. ER_SUCCESS_NO_MATCH: The spoken value did not match any values or synonyms explicitly defined in your custom slot type. ER_ERROR_TIMEOUT: An error occurred due to a timeout. ER_ERROR_EXCEPTION: An error occurred due to an exception during processing. 
     * @enum
     */
    export type ResolutionsPerAuthorityStatusCode = 'ER_SUCCESS_MATCH' | 'ER_SUCCESS_NO_MATCH' | 'ER_ERROR_TIMEOUT' | 'ER_ERROR_EXCEPTION';
}

export namespace v1.skill.evaluations {
    /**
     * An object representing the resolved value for the slot, based on the user's utterance and the slot type definition. 
     * @interface
     */
    export interface ResolutionsPerAuthorityValueItems {
        'name'?: string;
        'id'?: string;
    }
}

export namespace v1.skill.evaluations {
    /**
     *
     * @interface
     */
    export interface Slot {
        'name'?: string;
        'value'?: string;
        'confirmationStatus'?: v1.skill.evaluations.ConfirmationStatusType;
        'resolutions'?: v1.skill.evaluations.SlotResolutions;
    }
}

export namespace v1.skill.evaluations {
    /**
     * A resolutions object representing the results of resolving the words captured from the user's utterance. 
     * @interface
     */
    export interface SlotResolutions {
        'resolutionsPerAuthority'?: Array<v1.skill.evaluations.ResolutionsPerAuthorityItems>;
    }
}

export namespace v1.skill.history {
    /**
     * The hypothesized confidence for this interaction.
     * @interface
     */
    export interface Confidence {
        'bin'?: v1.skill.history.ConfidenceBin;
    }
}

export namespace v1.skill.history {
    /**
     * Intent confidence bin for this utterance. * `HIGH`: Intent was recognized with high confidence. * `MEDIUM`: Intent was recognized with medium confidence. * `LOW`: Intent was recognized with low confidence. Note: Low confidence intents are not sent to the skill. 
     * @enum
     */
    export type ConfidenceBin = 'HIGH' | 'MEDIUM' | 'LOW';
}

export namespace v1.skill.history {
    /**
     * The dialog act used in the interaction.
     * @interface
     */
    export interface DialogAct {
        'name'?: v1.skill.history.DialogActName;
    }
}

export namespace v1.skill.history {
    /**
     * Dialog act directive name. * `Dialog.ElicitSlot`: Alexa asked the user for the value of a specific slot. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#elicitslot) * `Dialog.ConfirmSlot`: Alexa confirmed the value of a specific slot before continuing with the dialog. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmslot) * `Dialog.ConfirmIntent`: Alexa confirmed the all the information the user has provided for the intent before the skill took action. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmintent) 
     * @enum
     */
    export type DialogActName = 'Dialog.ElicitSlot' | 'Dialog.ConfirmSlot' | 'Dialog.ConfirmIntent';
}

export namespace v1.skill.history {
    /**
     * Provides the intent name, slots and confidence of the intent used in this interaction.
     * @interface
     */
    export interface Intent {
        'name'?: string;
        'confidence'?: v1.skill.history.Confidence;
        'slots'?: { [key: string]: v1.skill.history.Slot; };
    }
}

export namespace v1.skill.history {
    /**
     * A filter used to retrieve items where the intent confidence bin is equal to the given value. * `HIGH`: Intent was recognized with high confidence. * `MEDIUM`: Intent was recognized with medium confidence. * `LOW`: Intent was recognized with low confidence. Note: Low confidence intents are not sent to the skill. 
     * @enum
     */
    export type IntentConfidenceBin = 'HIGH' | 'MEDIUM' | 'LOW';
}

export namespace v1.skill.history {
    /**
     *
     * @interface
     */
    export interface IntentRequest {
        'dialogAct'?: v1.skill.history.DialogAct;
        'intent'?: v1.skill.history.Intent;
        'interactionType'?: v1.skill.history.InteractionType;
        'locale'?: v1.skill.history.IntentRequestLocales;
        'publicationStatus'?: v1.skill.history.PublicationStatus;
        'stage'?: v1.StageType;
        'utteranceText'?: string;
    }
}

export namespace v1.skill.history {
    /**
     * Skill locale in which this interaction occurred.
     * @enum
     */
    export type IntentRequestLocales = 'en-US' | 'en-GB' | 'en-IN' | 'en-CA' | 'en-AU' | 'de-DE' | 'ja-JP';
}

export namespace v1.skill.history {
    /**
     * Response to the GET Intent Request History API. It contains the collection of utterances for the skill, nextToken and other metadata related to the search query.
     * @interface
     */
    export interface IntentRequests {
        '_links'?: v1.Links;
        'nextToken'?: string;
        'isTruncated'?: boolean;
        'totalCount'?: number;
        'startIndex'?: number;
        'skillId'?: string;
        'items'?: Array<v1.skill.history.IntentRequest>;
    }
}

export namespace v1.skill.history {
    /**
     * Indicates if the utterance was executed as a \"ONE_SHOT\" interaction or \"MODAL\" interaction. * `ONE_SHOT`: The user invokes the skill and states their intent in a single phrase. * `MODAL`: The user first invokes the skill and then states their intent. 
     * @enum
     */
    export type InteractionType = 'ONE_SHOT' | 'MODAL';
}

export namespace v1.skill.history {
    /**
     * The publication status of the skill when this interaction occurred
     * @enum
     */
    export type PublicationStatus = 'Development' | 'Certification';
}

export namespace v1.skill.history {
    /**
     *
     * @interface
     */
    export interface Slot {
        'name'?: string;
    }
}

export namespace v1.skill.history {
    /**
     * A filter used to retrieve items where the locale is equal to the given value.
     * @enum
     */
    export type LocaleInQuery = 'en-US' | 'en-GB' | 'en-IN' | 'en-CA' | 'en-AU' | 'de-DE' | 'ja-JP';
}

export namespace v1.skill.history {
    /**
     *
     * @enum
     */
    export type SortFieldForIntentRequestType = 'recordCount' | 'intent.name' | 'intent.confidence.bin' | 'stage' | 'dialogAct.name' | 'locale' | 'utteranceText' | 'publicationStatus' | 'interactionType';
}

export namespace v1.skill {
    /**
     * Set of properties of the image provided by the customer.
     * @interface
     */
    export interface ImageAttributes {
        'dimension'?: v1.skill.ImageDimension;
        'size'?: v1.skill.ImageSize;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Enumerates delegation strategies used to control automatic dialog management through the defined dialog model. When no delegation strategies are defined, the value SKILL_RESPONSE is assumed. 
     * @enum
     */
    export type DelegationStrategyType = 'ALWAYS' | 'SKILL_RESPONSE';
}

export namespace v1.skill.interactionModel {
    /**
     * Defines dialog rules e.g. slot elicitation and validation, intent chaining etc.
     * @interface
     */
    export interface Dialog {
        'delegationStrategy'?: v1.skill.interactionModel.DelegationStrategyType;
        'intents'?: Array<v1.skill.interactionModel.DialogIntents>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface DialogIntents {
        'name'?: string;
        'delegationStrategy'?: v1.skill.interactionModel.DelegationStrategyType;
        'slots'?: Array<v1.skill.interactionModel.DialogSlotItems>;
        'confirmationRequired'?: boolean;
        'prompts'?: v1.skill.interactionModel.DialogIntentsPrompts;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Collection of prompts for this intent.
     * @interface
     */
    export interface DialogIntentsPrompts {
        'elicitation'?: string;
        'confirmation'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Dialog prompts associated with this slot i.e. for elicitation and/or confirmation.
     * @interface
     */
    export interface DialogPrompts {
        'elicitation'?: string;
        'confirmation'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface DialogSlotItems {
        'name'?: string;
        'type'?: string;
        'elicitationRequired'?: boolean;
        'confirmationRequired'?: boolean;
        'prompts'?: v1.skill.interactionModel.DialogPrompts;
        'validations'?: Array<v1.skill.interactionModel.SlotValidation>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * The set of intents your service can accept and process.
     * @interface
     */
    export interface Intent {
        'name'?: string;
        'slots'?: Array<v1.skill.interactionModel.SlotDefinition>;
        'samples'?: Array<string>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface InteractionModelData {
        'version'?: string;
        'description'?: string;
        'interactionModel'?: v1.skill.interactionModel.InteractionModelSchema;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface InteractionModelSchema {
        'languageModel'?: v1.skill.interactionModel.LanguageModel;
        'dialog'?: v1.skill.interactionModel.Dialog;
        'prompts'?: Array<v1.skill.interactionModel.Prompt>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface Prompt {
        'id': string;
        'variations': Array<v1.skill.interactionModel.PromptItems>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     *
     * @interface
     */
    export interface PromptItems {
        'type'?: v1.skill.interactionModel.PromptItemsType;
        'value'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Prompt can be specified in different formats e.g. text, ssml.
     * @enum
     */
    export type PromptItemsType = 'SSML' | 'PlainText';
}

export namespace v1.skill.interactionModel {
    /**
     * Slot definition.
     * @interface
     */
    export interface SlotDefinition {
        'name'?: string;
        'type'?: string;
        'samples'?: Array<string>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Custom slot type to define a list of possible values for a slot. Used for items that are not covered by Amazon's built-in slot types.
     * @interface
     */
    export interface SlotType {
        'name'?: string;
        'values'?: Array<v1.skill.interactionModel.TypeValue>;
        'valueSupplier'?: v1.skill.interactionModel.ValueSupplier;
    }
}

export namespace v1.skill.interactionModel {
   /**
    * Validation on a slot with support for prompt and confirmation.
    * @interface
    */
    export type SlotValidation = v1.skill.interactionModel.HasEntityResolutionMatch | v1.skill.interactionModel.IsLessThanOrEqualTo | v1.skill.interactionModel.IsGreaterThan | v1.skill.interactionModel.IsNotInSet | v1.skill.interactionModel.IsInDuration | v1.skill.interactionModel.IsLessThan | v1.skill.interactionModel.IsNotInDuration | v1.skill.interactionModel.IsGreaterThanOrEqualTo | v1.skill.interactionModel.IsInSet;
}

export namespace v1.skill.interactionModel {
    /**
     * The value schema in type object of interaction model.
     * @interface
     */
    export interface TypeValue {
        'id'?: string;
        'name'?: v1.skill.interactionModel.TypeValueObject;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * The object that contains individual type values.
     * @interface
     */
    export interface TypeValueObject {
        'value'?: string;
        'synonyms'?: Array<string>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Catalog reference to provide values.
     * @interface
     */
    export interface ValueCatalog {
        'catalogId'?: string;
        'version'?: string;
    }
}

export namespace v1.skill.interactionModel {
   /**
    * Supplier object to provide slot values.
    * @interface
    */
    export type ValueSupplier = v1.skill.interactionModel.CatalogValueSupplier | v1.skill.interactionModel.InlineValueSupplier;
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Catalog request definitions.
     * @interface
     */
    export interface CatalogDefinitionOutput {
        'catalog'?: v1.skill.interactionModel.catalog.CatalogEntity;
        'creationTime'?: string;
        'totalVersions'?: string;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Definition for catalog entity.
     * @interface
     */
    export interface CatalogEntity {
        'name'?: string;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Definition for catalog input.
     * @interface
     */
    export interface CatalogInput {
        'name'?: string;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Definition for catalog entity.
     * @interface
     */
    export interface CatalogItem {
        'name'?: string;
        'description'?: string;
        'catalogId'?: string;
        '_links'?: v1.Links;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * CatalogId information.
     * @interface
     */
    export interface CatalogResponse {
        'catalogId'?: string;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Defines the structure for catalog status response.
     * @interface
     */
    export interface CatalogStatus {
        'lastUpdateRequest'?: v1.skill.interactionModel.catalog.LastUpdateRequest;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Status of last modification request for a resource.
     * @enum
     */
    export type CatalogStatusType = 'FAILED' | 'IN_PROGRESS' | 'SUCCEEDED';
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Catalog request definitions.
     * @interface
     */
    export interface DefinitionData {
        'catalog'?: v1.skill.interactionModel.catalog.CatalogInput;
        'vendorId'?: string;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Contains attributes related to last modification request of a resource.
     * @interface
     */
    export interface LastUpdateRequest {
        'status'?: v1.skill.interactionModel.catalog.CatalogStatusType;
        'version'?: string;
        'errors'?: Array<v1.skill.StandardizedError>;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * List of catalog versions of a skill for the vendor.
     * @interface
     */
    export interface ListCatalogResponse {
        '_links'?: v1.Links;
        'catalogs'?: Array<v1.skill.interactionModel.catalog.CatalogItem>;
        'isTruncated'?: boolean;
        'nextToken'?: string;
        'totalCount'?: number;
    }
}

export namespace v1.skill.interactionModel.catalog {
    /**
     * Catalog update request object.
     * @interface
     */
    export interface UpdateRequest {
        'name'?: string;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Define the language model.
     * @interface
     */
    export interface LanguageModel {
        'invocationName'?: string;
        'types'?: Array<v1.skill.interactionModel.SlotType>;
        'intents'?: Array<v1.skill.interactionModel.Intent>;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * The body of the bad request exception.
     * @interface
     */
    export interface BadRequest {
        'errors'?: Array<v1.skill.interactionModel.type.Error>;
        'warnings'?: Array<v1.skill.interactionModel.type.Warning>;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Slot type request definitions.
     * @interface
     */
    export interface DefinitionData {
        'slotType'?: v1.skill.interactionModel.type.SlotTypeInput;
        'vendorId'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * The error which would fail requests.
     * @interface
     */
    export interface Error {
        'code'?: string;
        'message'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Contains attributes related to last modification request of a resource.
     * @interface
     */
    export interface LastUpdateRequest {
        'status'?: v1.skill.interactionModel.type.SlotTypeStatusType;
        'version'?: string;
        'errors'?: Array<v1.skill.interactionModel.type.Error>;
        'warnings'?: Array<v1.skill.interactionModel.type.Warning>;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * List of slot types of a skill for the vendor.
     * @interface
     */
    export interface ListSlotTypeResponse {
        '_links'?: v1.Links;
        'slotTypes'?: Array<v1.skill.interactionModel.type.SlotTypeItem>;
        'nextToken'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Slot Type request definitions.
     * @interface
     */
    export interface SlotTypeDefinitionOutput {
        'slotType'?: v1.skill.interactionModel.type.SlotTypeInput;
        'totalVersions'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Definition for slot type input.
     * @interface
     */
    export interface SlotTypeInput {
        'name'?: string;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Definition for slot type entity.
     * @interface
     */
    export interface SlotTypeItem {
        'name'?: string;
        'description'?: string;
        'id'?: string;
        '_links'?: v1.Links;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Slot Type information.
     * @interface
     */
    export interface SlotTypeResponse {
        'slotType'?: v1.skill.interactionModel.type.SlotTypeResponseEntity;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * SlotTypeId information.
     * @interface
     */
    export interface SlotTypeResponseEntity {
        'id'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Defines the structure for slot type status response.
     * @interface
     */
    export interface SlotTypeStatus {
        'updateRequest'?: v1.skill.interactionModel.type.LastUpdateRequest;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Status of last modification request for a resource.
     * @enum
     */
    export type SlotTypeStatusType = 'FAILED' | 'IN_PROGRESS' | 'SUCCEEDED';
}

export namespace v1.skill.interactionModel.type {
    /**
     * Slot type update definition object.
     * @interface
     */
    export interface SlotTypeUpdateDefinition {
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * Slot type update request object.
     * @interface
     */
    export interface UpdateRequest {
        'slotType'?: v1.skill.interactionModel.type.SlotTypeUpdateDefinition;
    }
}

export namespace v1.skill.interactionModel.type {
    /**
     * The warning which would not fail requests.
     * @interface
     */
    export interface Warning {
        'code'?: string;
        'message'?: string;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * List of slot type versions of a skill for the vendor.
     * @interface
     */
    export interface ListSlotTypeVersionResponse {
        '_links'?: v1.Links;
        'slotTypeVersions'?: Array<v1.skill.interactionModel.typeVersion.SlotTypeVersionItem>;
        'nextToken'?: string;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type version data with metadata.
     * @interface
     */
    export interface SlotTypeVersionData {
        'slotType'?: v1.skill.interactionModel.typeVersion.SlotTypeVersionDataObject;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type version fields with metadata.
     * @interface
     */
    export interface SlotTypeVersionDataObject {
        'id'?: string;
        'definition'?: v1.skill.interactionModel.typeVersion.ValueSupplierObject;
        'description'?: string;
        'version'?: string;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Definition for slot type entity.
     * @interface
     */
    export interface SlotTypeVersionItem {
        'version'?: string;
        'description'?: string;
        '_links'?: v1.Links;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Value supplier object for slot definition.
     * @interface
     */
    export interface ValueSupplierObject {
        'valueSupplier'?: v1.skill.interactionModel.ValueSupplier;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type version specific data.
     * @interface
     */
    export interface VersionData {
        'slotType'?: v1.skill.interactionModel.typeVersion.VersionDataObject;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type version fields with specific data.
     * @interface
     */
    export interface VersionDataObject {
        'definition'?: v1.skill.interactionModel.typeVersion.ValueSupplierObject;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type update description wrapper.
     * @interface
     */
    export interface SlotTypeUpdate {
        'slotType'?: v1.skill.interactionModel.typeVersion.SlotTypeUpdateObject;
    }
}

export namespace v1.skill.interactionModel.typeVersion {
    /**
     * Slot Type update description object.
     * @interface
     */
    export interface SlotTypeUpdateObject {
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * List of catalog values.
     * @interface
     */
    export interface CatalogValues {
        'isTruncated'?: boolean;
        'nextToken'?: string;
        'totalCount'?: number;
        '_links'?: v1.Links;
        'values'?: Array<v1.skill.interactionModel.version.ValueSchema>;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * Catalog version data with metadata.
     * @interface
     */
    export interface CatalogVersionData {
        'source'?: v1.skill.interactionModel.version.InputSource;
        'description'?: string;
        'version'?: string;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * Definition for catalog version input data.
     * @interface
     */
    export interface InputSource {
        'type'?: string;
        'url'?: string;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     *
     * @interface
     */
    export interface Links {
        'self'?: v1.Link;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * List of interactionModel versions of a skill for the vendor
     * @interface
     */
    export interface ListResponse {
        '_links'?: v1.Links;
        'skillModelVersions'?: Array<v1.skill.interactionModel.version.VersionItems>;
        'isTruncated'?: boolean;
        'nextToken'?: string;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * The value schema in type object of interaction model.
     * @interface
     */
    export interface ValueSchema {
        'id'?: string;
        'name'?: v1.skill.interactionModel.version.ValueSchemaName;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     *
     * @interface
     */
    export interface ValueSchemaName {
        'value'?: string;
        'synonyms'?: Array<string>;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * Catalog version specific data.
     * @interface
     */
    export interface VersionData {
        'source'?: v1.skill.interactionModel.version.InputSource;
        'description'?: string;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * Version metadata about the entity.
     * @interface
     */
    export interface VersionItems {
        'version'?: string;
        'creationTime'?: string;
        'description'?: string;
        '_links'?: v1.skill.interactionModel.version.Links;
    }
}

export namespace v1.skill.interactionModel.version {
    /**
     * Catalog update description object.
     * @interface
     */
    export interface CatalogUpdate {
        'description'?: string;
    }
}

export namespace v1.skill.metrics {
    /**
     * Response object for the API call which contains metrics data.
     * @interface
     */
    export interface GetMetricDataResponse {
        'metric': string;
        'timestamps': Array<string>;
        'values': Array<number>;
        'nextToken'?: string;
    }
}

export namespace v1.skill.metrics {
    /**
     * A distinct set of logic which predictably returns a set of data.
     * @enum
     */
    export type Metric = 'uniqueCustomers' | 'totalEnablements' | 'totalUtterances' | 'successfulUtterances' | 'failedUtterances' | 'totalSessions' | 'successfulSessions' | 'incompleteSessions' | 'userEndedSessions' | 'skillEndedSessions';
}

export namespace v1.skill.metrics {
    /**
     * The aggregation period to use when retrieving the metric, follows ISO_8601#Durations format.
     * @enum
     */
    export type Period = 'SINGLE' | 'PT15M' | 'PT1H' | 'P1D';
}

export namespace v1.skill.metrics {
    /**
     * The type of the skill (custom, smartHome and flashBriefing).
     * @enum
     */
    export type SkillType = 'custom' | 'smartHome' | 'flashBriefing';
}

export namespace v1.skill.metrics {
    /**
     * The stage of the skill (live, development).
     * @enum
     */
    export type StageForMetric = 'live' | 'development';
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaExecutionInfo {
        'alexaResponses'?: Array<v1.skill.simulations.AlexaResponse>;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaResponse {
        'type'?: string;
        'content'?: v1.skill.simulations.AlexaResponseContent;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaResponseContent {
        'caption'?: string;
    }
}

export namespace v1.skill.simulations {
    /**
     * Model of a virtual device used for simulation. This device object emulates attributes associated with a real Alexa enabled device. 
     * @interface
     */
    export interface Device {
        'locale': string;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Input {
        'content': string;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Invocation {
        'invocationRequest'?: v1.skill.simulations.InvocationRequest;
        'invocationResponse'?: v1.skill.simulations.InvocationResponse;
        'metrics'?: v1.skill.simulations.Metrics;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface InvocationRequest {
        'endpoint'?: string;
        'body'?: { [key: string]: any; };
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface InvocationResponse {
        'body'?: { [key: string]: any; };
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Metrics {
        'skillExecutionTimeInMilliseconds'?: number;
    }
}

export namespace v1.skill.simulations {
    /**
     * Session settings for running current simulation. 
     * @interface
     */
    export interface Session {
        'mode'?: v1.skill.simulations.SessionMode;
    }
}

export namespace v1.skill.simulations {
    /**
     * Indicate the session mode of the current simulation is using. 
     * @enum
     */
    export type SessionMode = 'DEFAULT' | 'FORCE_NEW_SESSION';
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationResult {
        'alexaExecutionInfo'?: v1.skill.simulations.AlexaExecutionInfo;
        'skillExecutionInfo'?: v1.skill.simulations.Invocation;
        'error'?: v1.Error;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationsApiRequest {
        'input': v1.skill.simulations.Input;
        'device': v1.skill.simulations.Device;
        'session'?: v1.skill.simulations.Session;
    }
}

export namespace v1.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationsApiResponse {
        'id'?: string;
        'status'?: v1.skill.simulations.SimulationsApiResponseStatus;
        'result'?: v1.skill.simulations.SimulationResult;
    }
}

export namespace v1.skill.simulations {
    /**
     * String that specifies the current status of the simulation. Possible values are \"IN_PROGRESS\", \"SUCCESSFUL\", and \"FAILED\". 
     * @enum
     */
    export type SimulationsApiResponseStatus = 'IN_PROGRESS' | 'SUCCESSFUL' | 'FAILED';
}

export namespace v1.skill {
    /**
     * List of standardized error codes
     * @enum
     */
    export type StandardizedErrorCode = 'INVALID_DATA_TYPE' | 'RESOURCE_NOT_FOUND' | 'INVALID_CONTENT_TYPE' | 'INVALID_IMAGE_ATTRIBUTES' | 'DENIED_FEATURE_ACCESS' | 'INVALID_URL_DOMAIN' | 'INVALID_URL_FORMAT' | 'UNEXPECTED_PROPERTY' | 'MISSING_REQUIRED_PROPERTY' | 'UNEXPECTED_EMPTY_OBJECT' | 'INVALID_ARRAY_SIZE' | 'DUPLICATE_ARRAY_ITEMS' | 'INVALID_INTEGER_VALUE' | 'INVALID_STRING_LENGTH' | 'INVALID_ENUM_VALUE' | 'INVALID_STRING_PATTERN' | 'INCONSISTENT_ENDPOINTS' | 'MUTUALLY_EXCLUSIVE_ARRAY_ITEMS' | 'EXPECTED_RELATED_INSTANCE' | 'CONFLICTING_INSTANCES' | 'EXPECTED_COMPLIANCE_AGREEMENT';
}

export namespace v1.skill {
    /**
     *
     * @interface
     */
    export interface UpdateSkillWithPackageRequest {
        'location'?: string;
    }
}

export namespace v1.skill {
    /**
     * Standardized, machine readable structure that wraps all the information about a specific occurrence of an error of the type specified by the code.
     * @interface
     */
    export interface ValidationDetails {
        'actualImageAttributes'?: v1.skill.ImageAttributes;
        'actualNumberOfItems'?: number;
        'actualStringLength'?: number;
        'allowedContentTypes'?: Array<string>;
        'allowedDataTypes'?: Array<v1.skill.ValidationDataTypes>;
        'allowedImageAttributes'?: Array<v1.skill.ImageAttributes>;
        'conflictingInstance'?: v1.skill.Instance;
        'expectedInstance'?: v1.skill.Instance;
        'expectedRegexPattern'?: string;
        'agreementType'?: v1.skill.AgreementType;
        'feature'?: v1.skill.ValidationFeature;
        'inconsistentEndpoint'?: v1.skill.ValidationEndpoint;
        'minimumIntegerValue'?: number;
        'minimumNumberOfItems'?: number;
        'minimumStringLength'?: number;
        'maximumIntegerValue'?: number;
        'maximumNumberOfItems'?: number;
        'maximumStringLength'?: number;
        'originalEndpoint'?: v1.skill.ValidationEndpoint;
        'originalInstance'?: v1.skill.Instance;
        'requiredProperty'?: string;
        'unexpectedProperty'?: string;
    }
}

export namespace v1.skill.validations {
    /**
     *
     * @interface
     */
    export interface ResponseValidation {
        'title'?: string;
        'description'?: string;
        'category'?: string;
        'locale'?: string;
        'importance'?: v1.skill.validations.ResponseValidationImportance;
        'status'?: v1.skill.validations.ResponseValidationStatus;
    }
}

export namespace v1.skill.validations {
    /**
     * String that specifies importance of the validation. Possible values are \"REQUIRED\" and \"RECOMMENDED\" 
     * @enum
     */
    export type ResponseValidationImportance = 'REQUIRED' | 'RECOMMENDED';
}

export namespace v1.skill.validations {
    /**
     * String that specifies status of the validation. Possible values are \"SUCCESSFUL\" and \"FAILED\" 
     * @enum
     */
    export type ResponseValidationStatus = 'SUCCESSFUL' | 'FAILED';
}

export namespace v1.skill.validations {
    /**
     *
     * @interface
     */
    export interface ValidationsApiRequest {
        'locales'?: Array<string>;
    }
}

export namespace v1.skill.validations {
    /**
     *
     * @interface
     */
    export interface ValidationsApiResponse {
        'id'?: string;
        'status'?: v1.skill.validations.ValidationsApiResponseStatus;
        'result'?: v1.skill.validations.ValidationsApiResponseResult;
    }
}

export namespace v1.skill.validations {
    /**
     *
     * @interface
     */
    export interface ValidationsApiResponseResult {
        'validations'?: Array<v1.skill.validations.ResponseValidation>;
        'error'?: v1.Error;
    }
}

export namespace v1.skill.validations {
    /**
     * String that specifies the current status of validation execution. Possible values are \"IN_PROGRESS\", \"SUCCESSFUL\", and \"FAILED\". 
     * @enum
     */
    export type ValidationsApiResponseStatus = 'IN_PROGRESS' | 'SUCCESSFUL' | 'FAILED';
}

export namespace v1.vendorManagement {
    /**
     * Vendor Response Object.
     * @interface
     */
    export interface Vendor {
        'name'?: string;
        'id'?: string;
        'roles'?: Array<string>;
    }
}

export namespace v1.vendorManagement {
    /**
     * List of Vendors.
     * @interface
     */
    export interface Vendors {
        'vendors'?: Array<v1.vendorManagement.Vendor>;
    }
}

export namespace v2 {
    /**
     *
     * @interface
     */
    export interface BadRequestError {
        'message'?: string;
        'violations'?: Array<v2.Error>;
    }
}

export namespace v2 {
    /**
     *
     * @interface
     */
    export interface Error {
        'code'?: string;
        'message': string;
    }
}

export namespace v2.skill {
    /**
     *
     * @interface
     */
    export interface Invocation {
        'invocationRequest'?: v2.skill.InvocationRequest;
        'invocationResponse'?: v2.skill.InvocationResponse;
        'metrics'?: v2.skill.Metrics;
    }
}

export namespace v2.skill {
    /**
     *
     * @interface
     */
    export interface InvocationRequest {
        'endpoint'?: string;
        'body'?: { [key: string]: any; };
    }
}

export namespace v2.skill {
    /**
     *
     * @interface
     */
    export interface InvocationResponse {
        'body'?: { [key: string]: any; };
    }
}

export namespace v2.skill {
    /**
     *
     * @interface
     */
    export interface Metrics {
        'skillExecutionTimeInMilliseconds'?: number;
    }
}

export namespace v2.skill.invocations {
    /**
     * Region of endpoint to be called.
     * @enum
     */
    export type EndPointRegions = 'NA' | 'EU' | 'FE';
}

export namespace v2.skill.invocations {
    /**
     *
     * @interface
     */
    export interface InvocationResponseResult {
        'skillExecutionInfo'?: v2.skill.Invocation;
        'error'?: v2.Error;
    }
}

export namespace v2.skill.invocations {
    /**
     * String that specifies the status of skill invocation. Possible values are \"SUCCEEDED\", and \"FAILED\". 
     * @enum
     */
    export type InvocationResponseStatus = 'SUCCEEDED' | 'FAILED';
}

export namespace v2.skill.invocations {
    /**
     *
     * @interface
     */
    export interface InvocationsApiResponse {
        'status'?: v2.skill.invocations.InvocationResponseStatus;
        'result'?: v2.skill.invocations.InvocationResponseResult;
    }
}

export namespace v2.skill.invocations {
    /**
     *
     * @interface
     */
    export interface SkillRequest {
        'body': any;
    }
}

export namespace v2.skill.invocations {
    /**
     *
     * @interface
     */
    export interface InvocationsApiRequest {
        'endpointRegion': v2.skill.invocations.EndPointRegions;
        'skillRequest': v2.skill.invocations.SkillRequest;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaExecutionInfo {
        'alexaResponses'?: Array<v2.skill.simulations.AlexaResponse>;
        'consideredIntents'?: Array<v2.skill.simulations.Intent>;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaResponse {
        'type'?: string;
        'content'?: v2.skill.simulations.AlexaResponseContent;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface AlexaResponseContent {
        'caption'?: string;
    }
}

export namespace v2.skill.simulations {
    /**
     * An enumeration indicating whether the user has explicitly confirmed or denied the entire intent. Possible values: \"NONE\", \"CONFIRMED\", \"DENIED\". 
     * @enum
     */
    export type ConfirmationStatusType = 'NONE' | 'CONFIRMED' | 'DENIED';
}

export namespace v2.skill.simulations {
    /**
     * Model of a virtual device used for simulation. This device object emulates attributes associated with a real Alexa enabled device. 
     * @interface
     */
    export interface Device {
        'locale': string;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Input {
        'content': string;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Intent {
        'name'?: string;
        'confirmationStatus'?: v2.skill.simulations.ConfirmationStatusType;
        'slots'?: { [key: string]: v2.skill.simulations.Slot; };
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface ResolutionsPerAuthorityItems {
        'authority'?: string;
        'status'?: v2.skill.simulations.ResolutionsPerAuthorityStatus;
        'values'?: Array<v2.skill.simulations.ResolutionsPerAuthorityValueItems>;
    }
}

export namespace v2.skill.simulations {
    /**
     * An object representing the status of entity resolution for the slot.
     * @interface
     */
    export interface ResolutionsPerAuthorityStatus {
        'code'?: v2.skill.simulations.ResolutionsPerAuthorityStatusCode;
    }
}

export namespace v2.skill.simulations {
    /**
     * A code indicating the results of attempting to resolve the user utterance against the defined slot types. This can be one of the following: ER_SUCCESS_MATCH: The spoken value matched a value or synonym explicitly defined in your custom slot type. ER_SUCCESS_NO_MATCH: The spoken value did not match any values or synonyms explicitly defined in your custom slot type. ER_ERROR_TIMEOUT: An error occurred due to a timeout. ER_ERROR_EXCEPTION: An error occurred due to an exception during processing. 
     * @enum
     */
    export type ResolutionsPerAuthorityStatusCode = 'ER_SUCCESS_MATCH' | 'ER_SUCCESS_NO_MATCH' | 'ER_ERROR_TIMEOUT' | 'ER_ERROR_EXCEPTION';
}

export namespace v2.skill.simulations {
    /**
     * An object representing the resolved value for the slot, based on the user's utterance and the slot type definition. 
     * @interface
     */
    export interface ResolutionsPerAuthorityValueItems {
        'name'?: string;
        'id'?: string;
    }
}

export namespace v2.skill.simulations {
    /**
     * Session settings for running current simulation. 
     * @interface
     */
    export interface Session {
        'mode'?: v2.skill.simulations.SessionMode;
    }
}

export namespace v2.skill.simulations {
    /**
     * Indicate the session mode of the current simulation is using. 
     * @enum
     */
    export type SessionMode = 'DEFAULT' | 'FORCE_NEW_SESSION';
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationResult {
        'alexaExecutionInfo'?: v2.skill.simulations.AlexaExecutionInfo;
        'skillExecutionInfo'?: v2.skill.Invocation;
        'error'?: v2.Error;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationsApiRequest {
        'input': v2.skill.simulations.Input;
        'device': v2.skill.simulations.Device;
        'session'?: v2.skill.simulations.Session;
    }
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface SimulationsApiResponse {
        'id'?: string;
        'status'?: v2.skill.simulations.SimulationsApiResponseStatus;
        'result'?: v2.skill.simulations.SimulationResult;
    }
}

export namespace v2.skill.simulations {
    /**
     * String that specifies the current status of the simulation. Possible values are \"IN_PROGRESS\", \"SUCCESSFUL\", and \"FAILED\". 
     * @enum
     */
    export type SimulationsApiResponseStatus = 'IN_PROGRESS' | 'SUCCESSFUL' | 'FAILED';
}

export namespace v2.skill.simulations {
    /**
     *
     * @interface
     */
    export interface Slot {
        'name'?: string;
        'value'?: string;
        'confirmationStatus'?: v2.skill.simulations.ConfirmationStatusType;
        'resolutions'?: v2.skill.simulations.SlotResolutions;
    }
}

export namespace v2.skill.simulations {
    /**
     * A resolutions object representing the results of resolving the words captured from the user's utterance. 
     * @interface
     */
    export interface SlotResolutions {
        'resolutionsPerAuthority'?: Array<v2.skill.simulations.ResolutionsPerAuthorityItems>;
    }
}

export namespace v1.catalog.upload {
    /**
     * Request body for self-hosted catalog uploads
     * @interface
     */
    export interface Location {
        'location'?: string;
    }
}

export namespace v1.catalog.upload {
    /**
     * Request body for self-hosted catalog uploads
     * @interface
     */
    export interface PreSignedUrl {
        'urlId': string;
        'partETags'?: Array<v1.catalog.upload.PreSignedUrlItem>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Used to declare that the skill uses the Alexa.Presentation.APL interface.
     * @interface
     */
    export interface AlexaPresentationAplInterface {
        'type' : 'ALEXA_PRESENTATION_APL';
        'supportedViewports'?: Array<v1.skill.Manifest.ViewportSpecification>;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Used to declare that the skill uses the Alexa.Presentation.HTML interface.
     * @interface
     */
    export interface AlexaPresentationHtmlInterface {
        'type' : 'ALEXA_PRESENTATION_HTML';
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface AudioInterface {
        'type' : 'AUDIO_PLAYER';
    }
}

export namespace v1.skill.Manifest {
    /**
     * Skills using Custom Interfaces can send custom directives and receive custom events from custom endpoints such as Alexa gadgets.
     * @interface
     */
    export interface CustomInterface {
        'type' : 'CUSTOM_INTERFACE';
    }
}

export namespace v1.skill.Manifest {
    /**
     * Used to declare that the skill uses the Display interface. When a skill declares that it uses the Display interface the Display interface will be passed in the supportedInterfaces section of devices which meet any of the required minimum version attributes specified in the manifest. If the device does not meet any of the minimum versions specified in the manifest the Display interface will not be present in the supportedInterfaces section. If neither the minimumTemplateVersion nor the minimumApmlVersion attributes are specified in the manifes then the minimumTemplateVersion is defaulted to 1.0 and apmlVersion is omitted.
     * @interface
     */
    export interface DisplayInterface {
        'type' : 'RENDER_TEMPLATE';
        'minimumTemplateVersion'?: v1.skill.Manifest.DisplayInterfaceTemplateVersion;
        'minimumApmlVersion'?: v1.skill.Manifest.DisplayInterfaceApmlVersion;
    }
}

export namespace v1.skill.Manifest {
    /**
     * Skills using Gadget Controller can send directives to Echo Buttons. This is a legacy interface specific to Echo Buttons.
     * @interface
     */
    export interface GadgetControllerInterface {
        'type' : 'GADGET_CONTROLLER';
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface GameEngineInterface {
        'type' : 'GAME_ENGINE';
    }
}

export namespace v1.skill.Manifest {
    /**
     *
     * @interface
     */
    export interface VideoAppInterface {
        'type' : 'VIDEO_APP';
    }
}

export namespace v1.skill.evaluations {
    /**
     * The intent that Alexa selected for the utterance in the request.
     * @interface
     */
    export interface ProfileNluSelectedIntent {
        'name'?: string;
        'confirmationStatus'?: v1.skill.evaluations.ConfirmationStatusType;
        'slots'?: { [key: string]: v1.skill.evaluations.Slot; };
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Supply slot values from catalog(s).
     * @interface
     */
    export interface CatalogValueSupplier {
        'type' : 'CatalogValueSupplier';
        'valueCatalog'?: v1.skill.interactionModel.ValueCatalog;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * The hasEntityResolutionMatch would allow Alexa to trigger a re-prompt when the status produced by ER is \"ER_SUCCESS_NO_MATCH\".
     * @interface
     */
    export interface HasEntityResolutionMatch {
        'type' : 'hasEntityResolutionMatch';
        'prompt': string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Supplies inline slot type values.
     * @interface
     */
    export interface InlineValueSupplier {
        'type' : 'InlineValueSupplier';
        'values'?: Array<v1.skill.interactionModel.TypeValue>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that slot value is greater than the specified value.
     * @interface
     */
    export interface IsGreaterThan {
        'type' : 'isGreaterThan';
        'prompt': string;
        'value': string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that slot value is greater than or equals to the specified value.
     * @interface
     */
    export interface IsGreaterThanOrEqualTo {
        'type' : 'isGreaterThanOrEqualTo';
        'prompt': string;
        'value': string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that the given date or time (as a slot value) is in a given interval. Unlike other range validations, duration based validations lets the developer define a dynamic range of date or time using ISO_8601 Duration Format. Based on the given 'start' and 'end' parameters an interval is created. The slot value given by the skill's user at runtime is then validated inside this interval. Both 'start' and 'end' parameters are in reference to the current date/time. Here the current date/time refers to the date/time when the skill's user made the request. 
     * @interface
     */
    export interface IsInDuration {
        'type' : 'isInDuration';
        'prompt': string;
        'start'?: string;
        'end'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates if the slot is in the specified set of values.
     * @interface
     */
    export interface IsInSet {
        'type' : 'isInSet';
        'prompt': string;
        'values': Array<string>;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that slot value is less than or equals to the specified value.
     * @interface
     */
    export interface IsLessThan {
        'type' : 'isLessThan';
        'prompt': string;
        'value': string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that slot value is less than or equals to the specified value.
     * @interface
     */
    export interface IsLessThanOrEqualTo {
        'type' : 'isLessThanOrEqualTo';
        'prompt': string;
        'value': string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates that the given date or time (as a slot value) is not in a given interval. Unlike other range validations, duration based validations lets the developer define a dynamic range of date or time using ISO_8601 Duration Format. Based on the given 'start' and 'end' parameters an interval is created. The slot value given by the skill's user at runtime is then validated inside this interval. Both 'start' and 'end' parameters are in reference to the current date/time. Here the current date/time refers to the date/time when the skill's user made the request. 
     * @interface
     */
    export interface IsNotInDuration {
        'type' : 'isNotInDuration';
        'prompt': string;
        'start'?: string;
        'end'?: string;
    }
}

export namespace v1.skill.interactionModel {
    /**
     * Validates if the slot is not in the specified set of values.
     * @interface
     */
    export interface IsNotInSet {
        'type' : 'isNotInSet';
        'prompt': string;
        'values': Array<string>;
    }
}


export namespace services.skillManagement {

    /**
     *
     */
    export class SkillManagementServiceClient extends BaseServiceClient {

        private lwaServiceClient : LwaServiceClient;
        private userAgent : string;

        constructor(apiConfiguration : ApiConfiguration, authenticationConfiguration : AuthenticationConfiguration, customUserAgent : string = null) {
            super(apiConfiguration);
            this.lwaServiceClient = new LwaServiceClient({
                apiConfiguration,
                authenticationConfiguration,
                grantType: 'refresh_token',
            });
            this.userAgent = createUserAgent(`${require('./package.json').version}`, customUserAgent);
        }

        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.catalog.upload.CatalogUploadBase} catalogUploadRequestBody Request body for create content upload
         */
        async callCreateCatalogUploadV1(catalogId : string, catalogUploadRequestBody : v1.catalog.upload.CatalogUploadBase) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateCatalogUploadV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'catalogUploadRequestBody' is not null or undefined
            if (catalogUploadRequestBody == null) {
                throw new Error(`Required parameter catalogUploadRequestBody was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/catalogs/{catalogId}/uploads";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId. ");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, catalogUploadRequestBody, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.catalog.upload.CatalogUploadBase} catalogUploadRequestBody Request body for create content upload
         */
        async createCatalogUploadV1(catalogId : string, catalogUploadRequestBody : v1.catalog.upload.CatalogUploadBase) : Promise<void> {
                await this.callCreateCatalogUploadV1(catalogId, catalogUploadRequestBody);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} uploadId Unique identifier of the upload
         */
        async callGetContentUploadByIdV1(catalogId : string, uploadId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetContentUploadByIdV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'uploadId' is not null or undefined
            if (uploadId == null) {
                throw new Error(`Required parameter uploadId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('uploadId', uploadId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/catalogs/{catalogId}/uploads/{uploadId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "successful operation");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId. ");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} uploadId Unique identifier of the upload
         */
        async getContentUploadByIdV1(catalogId : string, uploadId : string) : Promise<v1.catalog.upload.GetContentUploadResponse> {
                const apiResponse: ApiResponse = await this.callGetContentUploadByIdV1(catalogId, uploadId);
                return apiResponse.body as v1.catalog.upload.GetContentUploadResponse;
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.catalog.CreateContentUploadUrlRequest} generateCatalogUploadUrlRequestBody Request body to generate catalog upload url
         */
        async callGenerateCatalogUploadUrlV1(catalogId : string, generateCatalogUploadUrlRequestBody : v1.catalog.CreateContentUploadUrlRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callGenerateCatalogUploadUrlV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'generateCatalogUploadUrlRequestBody' is not null or undefined
            if (generateCatalogUploadUrlRequestBody == null) {
                throw new Error(`Required parameter generateCatalogUploadUrlRequestBody was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/catalogs/{catalogId}/urls";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(201, "Successful operation.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, generateCatalogUploadUrlRequestBody, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.catalog.CreateContentUploadUrlRequest} generateCatalogUploadUrlRequestBody Request body to generate catalog upload url
         */
        async generateCatalogUploadUrlV1(catalogId : string, generateCatalogUploadUrlRequestBody : v1.catalog.CreateContentUploadUrlRequest) : Promise<v1.catalog.CreateContentUploadUrlResponse> {
                const apiResponse: ApiResponse = await this.callGenerateCatalogUploadUrlV1(catalogId, generateCatalogUploadUrlRequestBody);
                return apiResponse.body as v1.catalog.CreateContentUploadUrlResponse;
        }
        /**
         *
         * @param {v1.auditLogs.AuditLogsRequest} getAuditLogsRequest Request object encompassing vendorId, optional request filters and optional pagination context.
         */
        async callQueryDevelopmentAuditLogsV1(getAuditLogsRequest : v1.auditLogs.AuditLogsRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callQueryDevelopmentAuditLogsV1';
            // verify required parameter 'getAuditLogsRequest' is not null or undefined
            if (getAuditLogsRequest == null) {
                throw new Error(`Required parameter getAuditLogsRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/developmentAuditLogs/query";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns a list of audit logs for the given vendor.");
            errorDefinitions.set(400, "Invalid request");
            errorDefinitions.set(401, "Unauthorized");
            errorDefinitions.set(403, "Forbidden");
            errorDefinitions.set(404, "Not Found");
            errorDefinitions.set(429, "Too Many Requests");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, getAuditLogsRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.auditLogs.AuditLogsRequest} getAuditLogsRequest Request object encompassing vendorId, optional request filters and optional pagination context.
         */
        async queryDevelopmentAuditLogsV1(getAuditLogsRequest : v1.auditLogs.AuditLogsRequest) : Promise<v1.auditLogs.AuditLogsResponse> {
                const apiResponse: ApiResponse = await this.callQueryDevelopmentAuditLogsV1(getAuditLogsRequest);
                return apiResponse.body as v1.auditLogs.AuditLogsResponse;
        }
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {Array<string>} productId The list of in-skill product IDs that you wish to get the summary for. A maximum of 50 in-skill product IDs can be specified in a single listInSkillProducts call. Please note that this parameter must not be used with &#39;nextToken&#39; and/or &#39;maxResults&#39; parameter.
         * @param {string} stage Filter in-skill products by specified stage.
         * @param {string} type Type of in-skill product to filter on.
         * @param {string} referenceName Filter in-skill products by reference name.
         * @param {string} status Status of in-skill product.
         * @param {string} isAssociatedWithSkill Filter in-skill products by whether or not they are associated to a skill.
         */
        async callGetIspListForVendorV1(vendorId : string, nextToken? : string, maxResults? : number, productId? : Array<string>, stage? : string, type? : string, referenceName? : string, status? : string, isAssociatedWithSkill? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetIspListForVendorV1';
            // verify required parameter 'vendorId' is not null or undefined
            if (vendorId == null) {
                throw new Error(`Required parameter vendorId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            queryParams.push({ key: 'vendorId', value: vendorId});
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(productId != null) {
                queryParams.push({ key: 'productId', value: productId.toString() });
            }
            if(stage != null) {
                queryParams.push({ key: 'stage', value: stage });
            }
            if(type != null) {
                queryParams.push({ key: 'type', value: type });
            }
            if(referenceName != null) {
                queryParams.push({ key: 'referenceName', value: referenceName });
            }
            if(status != null) {
                queryParams.push({ key: 'status', value: status });
            }
            if(isAssociatedWithSkill != null) {
                queryParams.push({ key: 'isAssociatedWithSkill', value: isAssociatedWithSkill });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains list of in-skill products for the specified vendor and stage.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {Array<string>} productId The list of in-skill product IDs that you wish to get the summary for. A maximum of 50 in-skill product IDs can be specified in a single listInSkillProducts call. Please note that this parameter must not be used with &#39;nextToken&#39; and/or &#39;maxResults&#39; parameter.
         * @param {string} stage Filter in-skill products by specified stage.
         * @param {string} type Type of in-skill product to filter on.
         * @param {string} referenceName Filter in-skill products by reference name.
         * @param {string} status Status of in-skill product.
         * @param {string} isAssociatedWithSkill Filter in-skill products by whether or not they are associated to a skill.
         */
        async getIspListForVendorV1(vendorId : string, nextToken? : string, maxResults? : number, productId? : Array<string>, stage? : string, type? : string, referenceName? : string, status? : string, isAssociatedWithSkill? : string) : Promise<v1.isp.ListInSkillProductResponse> {
                const apiResponse: ApiResponse = await this.callGetIspListForVendorV1(vendorId, nextToken, maxResults, productId, stage, type, referenceName, status, isAssociatedWithSkill);
                return apiResponse.body as v1.isp.ListInSkillProductResponse;
        }
        /**
         *
         * @param {v1.isp.CreateInSkillProductRequest} createInSkillProductRequest defines the request body for createInSkillProduct API.
         */
        async callCreateIspForVendorV1(createInSkillProductRequest : v1.isp.CreateInSkillProductRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateIspForVendorV1';
            // verify required parameter 'createInSkillProductRequest' is not null or undefined
            if (createInSkillProductRequest == null) {
                throw new Error(`Required parameter createInSkillProductRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(201, "Success.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createInSkillProductRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.isp.CreateInSkillProductRequest} createInSkillProductRequest defines the request body for createInSkillProduct API.
         */
        async createIspForVendorV1(createInSkillProductRequest : v1.isp.CreateInSkillProductRequest) : Promise<v1.isp.ProductResponse> {
                const apiResponse: ApiResponse = await this.callCreateIspForVendorV1(createInSkillProductRequest);
                return apiResponse.body as v1.isp.ProductResponse;
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} skillId The skill ID.
         */
        async callDisassociateIspWithSkillV1(productId : string, skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDisassociateIspWithSkillV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/skills/{skillId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "Request is forbidden.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} skillId The skill ID.
         */
        async disassociateIspWithSkillV1(productId : string, skillId : string) : Promise<void> {
                await this.callDisassociateIspWithSkillV1(productId, skillId);
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} skillId The skill ID.
         */
        async callAssociateIspWithSkillV1(productId : string, skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callAssociateIspWithSkillV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/skills/{skillId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "Request is forbidden.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} skillId The skill ID.
         */
        async associateIspWithSkillV1(productId : string, skillId : string) : Promise<void> {
                await this.callAssociateIspWithSkillV1(productId, skillId);
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callDeleteIspForProductV1(productId : string, stage : string, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteIspForProductV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "Request is forbidden.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async deleteIspForProductV1(productId : string, stage : string, ifMatch? : string) : Promise<void> {
                await this.callDeleteIspForProductV1(productId, stage, ifMatch);
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async callResetEntitlementForProductV1(productId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callResetEntitlementForProductV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}/entitlement";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "Request is forbidden.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async resetEntitlementForProductV1(productId : string, stage : string) : Promise<void> {
                await this.callResetEntitlementForProductV1(productId, stage);
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async callGetIspDefinitionV1(productId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetIspDefinitionV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains the latest version of an in-skill product for the specified stage.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async getIspDefinitionV1(productId : string, stage : string) : Promise<v1.isp.InSkillProductDefinitionResponse> {
                const apiResponse: ApiResponse = await this.callGetIspDefinitionV1(productId, stage);
                return apiResponse.body as v1.isp.InSkillProductDefinitionResponse;
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {v1.isp.UpdateInSkillProductRequest} updateInSkillProductRequest defines the request body for updateInSkillProduct API.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callUpdateIspForProductV1(productId : string, stage : string, updateInSkillProductRequest : v1.isp.UpdateInSkillProductRequest, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateIspForProductV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateInSkillProductRequest' is not null or undefined
            if (updateInSkillProductRequest == null) {
                throw new Error(`Required parameter updateInSkillProductRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "Request is forbidden.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, updateInSkillProductRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {v1.isp.UpdateInSkillProductRequest} updateInSkillProductRequest defines the request body for updateInSkillProduct API.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async updateIspForProductV1(productId : string, stage : string, updateInSkillProductRequest : v1.isp.UpdateInSkillProductRequest, ifMatch? : string) : Promise<void> {
                await this.callUpdateIspForProductV1(productId, stage, updateInSkillProductRequest, ifMatch);
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async callGetIspAssociatedSkillsV1(productId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<ApiResponse> {
            const __operationId__ = 'callGetIspAssociatedSkillsV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}/skills";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns skills associated with the in-skill product.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async getIspAssociatedSkillsV1(productId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<v1.isp.AssociatedSkillResponse> {
                const apiResponse: ApiResponse = await this.callGetIspAssociatedSkillsV1(productId, stage, nextToken, maxResults);
                return apiResponse.body as v1.isp.AssociatedSkillResponse;
        }
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async callGetIspSummaryV1(productId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetIspSummaryV1';
            // verify required parameter 'productId' is not null or undefined
            if (productId == null) {
                throw new Error(`Required parameter productId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('productId', productId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/inSkillProducts/{productId}/stages/{stage}/summary";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns current in-skill product summary for productId.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} productId The in-skill product ID.
         * @param {string} stage Stage for skill.
         */
        async getIspSummaryV1(productId : string, stage : string) : Promise<v1.isp.InSkillProductSummaryResponse> {
                const apiResponse: ApiResponse = await this.callGetIspSummaryV1(productId, stage);
                return apiResponse.body as v1.isp.InSkillProductSummaryResponse;
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         */
        async callDeleteInteractionModelCatalogV1(catalogId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteInteractionModelCatalogV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No content; just confirm the catalog is deleted.");
            errorDefinitions.set(400, "The catalog cannot be deleted from reasons due to in-use by other entities.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         */
        async deleteInteractionModelCatalogV1(catalogId : string) : Promise<void> {
                await this.callDeleteInteractionModelCatalogV1(catalogId);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         */
        async callGetInteractionModelCatalogDefinitionV1(catalogId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelCatalogDefinitionV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "the catalog definition");
            errorDefinitions.set(400, "The catalog cannot be retrieved due to errors listed.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         */
        async getInteractionModelCatalogDefinitionV1(catalogId : string) : Promise<v1.skill.interactionModel.catalog.CatalogDefinitionOutput> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelCatalogDefinitionV1(catalogId);
                return apiResponse.body as v1.skill.interactionModel.catalog.CatalogDefinitionOutput;
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.skill.interactionModel.type.UpdateRequest} updateRequest 
         */
        async callUpdateInteractionModelCatalogV1(catalogId : string, updateRequest : v1.skill.interactionModel.type.UpdateRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateInteractionModelCatalogV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateRequest' is not null or undefined
            if (updateRequest == null) {
                throw new Error(`Required parameter updateRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/update";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No content, indicates the fields were successfully updated.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, updateRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.skill.interactionModel.type.UpdateRequest} updateRequest 
         */
        async updateInteractionModelCatalogV1(catalogId : string, updateRequest : v1.skill.interactionModel.type.UpdateRequest) : Promise<void> {
                await this.callUpdateInteractionModelCatalogV1(catalogId, updateRequest);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} updateRequestId The identifier for slotType version creation process
         */
        async callGetInteractionModelCatalogUpdateStatusV1(catalogId : string, updateRequestId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelCatalogUpdateStatusV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateRequestId' is not null or undefined
            if (updateRequestId == null) {
                throw new Error(`Required parameter updateRequestId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('updateRequestId', updateRequestId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/updateRequest/{updateRequestId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the build status and error codes for the given catalogId");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} updateRequestId The identifier for slotType version creation process
         */
        async getInteractionModelCatalogUpdateStatusV1(catalogId : string, updateRequestId : string) : Promise<v1.skill.interactionModel.catalog.CatalogStatus> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelCatalogUpdateStatusV1(catalogId, updateRequestId);
                return apiResponse.body as v1.skill.interactionModel.catalog.CatalogStatus;
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.skill.interactionModel.version.VersionData} catalog 
         */
        async callCreateInteractionModelCatalogVersionV1(catalogId : string, catalog : v1.skill.interactionModel.version.VersionData) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateInteractionModelCatalogVersionV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'catalog' is not null or undefined
            if (catalog == null) {
                throw new Error(`Required parameter catalog was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/versions";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Returns update status location link on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the catalog definition is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified catalog does not exist.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, catalog, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {v1.skill.interactionModel.version.VersionData} catalog 
         */
        async createInteractionModelCatalogVersionV1(catalogId : string, catalog : v1.skill.interactionModel.version.VersionData) : Promise<void> {
                await this.callCreateInteractionModelCatalogVersionV1(catalogId, catalog);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         */
        async callDeleteInteractionModelCatalogVersionV1(catalogId : string, version : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteInteractionModelCatalogVersionV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/versions/{version}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that version is successfully deleted.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog version for this catalogId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         */
        async deleteInteractionModelCatalogVersionV1(catalogId : string, version : string) : Promise<void> {
                await this.callDeleteInteractionModelCatalogVersionV1(catalogId, version);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         */
        async callGetInteractionModelCatalogVersionV1(catalogId : string, version : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelCatalogVersionV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/versions/{version}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the catalog version metadata for the given catalogId and version.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         */
        async getInteractionModelCatalogVersionV1(catalogId : string, version : string) : Promise<v1.skill.interactionModel.version.CatalogVersionData> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelCatalogVersionV1(catalogId, version);
                return apiResponse.body as v1.skill.interactionModel.version.CatalogVersionData;
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         * @param {v1.skill.interactionModel.version.CatalogUpdate} catalogUpdate 
         */
        async callUpdateInteractionModelCatalogVersionV1(catalogId : string, version : string, catalogUpdate? : v1.skill.interactionModel.version.CatalogUpdate) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateInteractionModelCatalogVersionV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/versions/{version}/update";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that version is successfully updated.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, catalogUpdate, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         * @param {v1.skill.interactionModel.version.CatalogUpdate} catalogUpdate 
         */
        async updateInteractionModelCatalogVersionV1(catalogId : string, version : string, catalogUpdate? : v1.skill.interactionModel.version.CatalogUpdate) : Promise<void> {
                await this.callUpdateInteractionModelCatalogVersionV1(catalogId, version, catalogUpdate);
        }
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         */
        async callGetInteractionModelCatalogValuesV1(catalogId : string, version : string, maxResults? : number, nextToken? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelCatalogValuesV1';
            // verify required parameter 'catalogId' is not null or undefined
            if (catalogId == null) {
                throw new Error(`Required parameter catalogId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('catalogId', catalogId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs/{catalogId}/versions/{version}/values";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of catalog values for the given catalogId and version.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} catalogId Unique identifier of the catalog
         * @param {string} version Version for interaction model.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         */
        async getInteractionModelCatalogValuesV1(catalogId : string, version : string, maxResults? : number, nextToken? : string) : Promise<v1.skill.interactionModel.version.CatalogValues> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelCatalogValuesV1(catalogId, version, maxResults, nextToken);
                return apiResponse.body as v1.skill.interactionModel.version.CatalogValues;
        }
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async callListInteractionModelCatalogsV1(vendorId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callListInteractionModelCatalogsV1';
            // verify required parameter 'vendorId' is not null or undefined
            if (vendorId == null) {
                throw new Error(`Required parameter vendorId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            queryParams.push({ key: 'vendorId', value: vendorId});
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(sortDirection != null) {
                queryParams.push({ key: 'sortDirection', value: sortDirection });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of catalogs for the vendor.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no catalog defined for the catalogId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async listInteractionModelCatalogsV1(vendorId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<v1.skill.interactionModel.catalog.ListCatalogResponse> {
                const apiResponse: ApiResponse = await this.callListInteractionModelCatalogsV1(vendorId, maxResults, nextToken, sortDirection);
                return apiResponse.body as v1.skill.interactionModel.catalog.ListCatalogResponse;
        }
        /**
         *
         * @param {v1.skill.interactionModel.catalog.DefinitionData} catalog 
         */
        async callCreateInteractionModelCatalogV1(catalog : v1.skill.interactionModel.catalog.DefinitionData) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateInteractionModelCatalogV1';
            // verify required parameter 'catalog' is not null or undefined
            if (catalog == null) {
                throw new Error(`Required parameter catalog was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/catalogs";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the generated catalogId.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the catalog definition is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, catalog, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.interactionModel.catalog.DefinitionData} catalog 
         */
        async createInteractionModelCatalogV1(catalog : v1.skill.interactionModel.catalog.DefinitionData) : Promise<v1.skill.interactionModel.catalog.CatalogResponse> {
                const apiResponse: ApiResponse = await this.callCreateInteractionModelCatalogV1(catalog);
                return apiResponse.body as v1.skill.interactionModel.catalog.CatalogResponse;
        }
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async callListInteractionModelSlotTypesV1(vendorId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callListInteractionModelSlotTypesV1';
            // verify required parameter 'vendorId' is not null or undefined
            if (vendorId == null) {
                throw new Error(`Required parameter vendorId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            queryParams.push({ key: 'vendorId', value: vendorId});
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(sortDirection != null) {
                queryParams.push({ key: 'sortDirection', value: sortDirection });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of slot types for the vendor.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async listInteractionModelSlotTypesV1(vendorId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<v1.skill.interactionModel.type.ListSlotTypeResponse> {
                const apiResponse: ApiResponse = await this.callListInteractionModelSlotTypesV1(vendorId, maxResults, nextToken, sortDirection);
                return apiResponse.body as v1.skill.interactionModel.type.ListSlotTypeResponse;
        }
        /**
         *
         * @param {v1.skill.interactionModel.type.DefinitionData} slotType 
         */
        async callCreateInteractionModelSlotTypeV1(slotType : v1.skill.interactionModel.type.DefinitionData) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateInteractionModelSlotTypeV1';
            // verify required parameter 'slotType' is not null or undefined
            if (slotType == null) {
                throw new Error(`Required parameter slotType was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the generated slotTypeId.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the slot type definition is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, slotType, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.interactionModel.type.DefinitionData} slotType 
         */
        async createInteractionModelSlotTypeV1(slotType : v1.skill.interactionModel.type.DefinitionData) : Promise<v1.skill.interactionModel.type.SlotTypeResponse> {
                const apiResponse: ApiResponse = await this.callCreateInteractionModelSlotTypeV1(slotType);
                return apiResponse.body as v1.skill.interactionModel.type.SlotTypeResponse;
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         */
        async callDeleteInteractionModelSlotTypeV1(slotTypeId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteInteractionModelSlotTypeV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No content; just confirm the slot type is deleted.");
            errorDefinitions.set(400, "The slot type cannot be deleted from reasons due to in-use by other entities.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         */
        async deleteInteractionModelSlotTypeV1(slotTypeId : string) : Promise<void> {
                await this.callDeleteInteractionModelSlotTypeV1(slotTypeId);
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         */
        async callGetInteractionModelSlotTypeDefinitionV1(slotTypeId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelSlotTypeDefinitionV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "The slot type definition.");
            errorDefinitions.set(400, "The slot type cannot be retrieved due to errors listed.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         */
        async getInteractionModelSlotTypeDefinitionV1(slotTypeId : string) : Promise<v1.skill.interactionModel.type.SlotTypeDefinitionOutput> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelSlotTypeDefinitionV1(slotTypeId);
                return apiResponse.body as v1.skill.interactionModel.type.SlotTypeDefinitionOutput;
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {v1.skill.interactionModel.type.UpdateRequest} updateRequest 
         */
        async callUpdateInteractionModelSlotTypeV1(slotTypeId : string, updateRequest : v1.skill.interactionModel.type.UpdateRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateInteractionModelSlotTypeV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateRequest' is not null or undefined
            if (updateRequest == null) {
                throw new Error(`Required parameter updateRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/update";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No content, indicates the fields were successfully updated.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, updateRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {v1.skill.interactionModel.type.UpdateRequest} updateRequest 
         */
        async updateInteractionModelSlotTypeV1(slotTypeId : string, updateRequest : v1.skill.interactionModel.type.UpdateRequest) : Promise<void> {
                await this.callUpdateInteractionModelSlotTypeV1(slotTypeId, updateRequest);
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} updateRequestId The identifier for slotType version creation process
         */
        async callGetInteractionModelSlotTypeBuildStatusV1(slotTypeId : string, updateRequestId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelSlotTypeBuildStatusV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateRequestId' is not null or undefined
            if (updateRequestId == null) {
                throw new Error(`Required parameter updateRequestId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);
            pathParams.set('updateRequestId', updateRequestId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/updateRequest/{updateRequestId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the build status and error codes for the given slotTypeId.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} updateRequestId The identifier for slotType version creation process
         */
        async getInteractionModelSlotTypeBuildStatusV1(slotTypeId : string, updateRequestId : string) : Promise<v1.skill.interactionModel.type.SlotTypeStatus> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelSlotTypeBuildStatusV1(slotTypeId, updateRequestId);
                return apiResponse.body as v1.skill.interactionModel.type.SlotTypeStatus;
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async callListInteractionModelSlotTypeVersionsV1(slotTypeId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callListInteractionModelSlotTypeVersionsV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(sortDirection != null) {
                queryParams.push({ key: 'sortDirection', value: sortDirection });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of slot type version for the slot type id.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         */
        async listInteractionModelSlotTypeVersionsV1(slotTypeId : string, maxResults? : number, nextToken? : string, sortDirection? : string) : Promise<v1.skill.interactionModel.typeVersion.ListSlotTypeVersionResponse> {
                const apiResponse: ApiResponse = await this.callListInteractionModelSlotTypeVersionsV1(slotTypeId, maxResults, nextToken, sortDirection);
                return apiResponse.body as v1.skill.interactionModel.typeVersion.ListSlotTypeVersionResponse;
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {v1.skill.interactionModel.typeVersion.VersionData} slotType 
         */
        async callCreateInteractionModelSlotTypeVersionV1(slotTypeId : string, slotType : v1.skill.interactionModel.typeVersion.VersionData) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateInteractionModelSlotTypeVersionV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'slotType' is not null or undefined
            if (slotType == null) {
                throw new Error(`Required parameter slotType was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Returns update status location link on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the slot type definition is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified slot type does not exist.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, slotType, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {v1.skill.interactionModel.typeVersion.VersionData} slotType 
         */
        async createInteractionModelSlotTypeVersionV1(slotTypeId : string, slotType : v1.skill.interactionModel.typeVersion.VersionData) : Promise<void> {
                await this.callCreateInteractionModelSlotTypeVersionV1(slotTypeId, slotType);
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         */
        async callDeleteInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteInteractionModelSlotTypeVersionV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions/{version}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that version is successfully deleted.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type version for this slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         */
        async deleteInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string) : Promise<void> {
                await this.callDeleteInteractionModelSlotTypeVersionV1(slotTypeId, version);
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         */
        async callGetInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelSlotTypeVersionV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions/{version}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns the slot type version metadata for the given slotTypeId and version.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         */
        async getInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string) : Promise<v1.skill.interactionModel.typeVersion.SlotTypeVersionData> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelSlotTypeVersionV1(slotTypeId, version);
                return apiResponse.body as v1.skill.interactionModel.typeVersion.SlotTypeVersionData;
        }
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         * @param {v1.skill.interactionModel.typeVersion.SlotTypeUpdate} slotTypeUpdate 
         */
        async callUpdateInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string, slotTypeUpdate : v1.skill.interactionModel.typeVersion.SlotTypeUpdate) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateInteractionModelSlotTypeVersionV1';
            // verify required parameter 'slotTypeId' is not null or undefined
            if (slotTypeId == null) {
                throw new Error(`Required parameter slotTypeId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'slotTypeUpdate' is not null or undefined
            if (slotTypeUpdate == null) {
                throw new Error(`Required parameter slotTypeUpdate was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('slotTypeId', slotTypeId);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions/{version}/update";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that version is successfully updated.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "There is no slot type defined for the slotTypeId.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, slotTypeUpdate, errorDefinitions);
        }
        
        /**
         *
         * @param {string} slotTypeId The identifier for a slot type.
         * @param {string} version Version for interaction model.
         * @param {v1.skill.interactionModel.typeVersion.SlotTypeUpdate} slotTypeUpdate 
         */
        async updateInteractionModelSlotTypeVersionV1(slotTypeId : string, version : string, slotTypeUpdate : v1.skill.interactionModel.typeVersion.SlotTypeUpdate) : Promise<void> {
                await this.callUpdateInteractionModelSlotTypeVersionV1(slotTypeId, version, slotTypeUpdate);
        }
        /**
         *
         * @param {string} exportId The Export ID.
         */
        async callGetStatusOfExportRequestV1(exportId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetStatusOfExportRequestV1';
            // verify required parameter 'exportId' is not null or undefined
            if (exportId == null) {
                throw new Error(`Required parameter exportId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('exportId', exportId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/exports/{exportId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "OK.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} exportId The Export ID.
         */
        async getStatusOfExportRequestV1(exportId : string) : Promise<v1.skill.ExportResponse> {
                const apiResponse: ApiResponse = await this.callGetStatusOfExportRequestV1(exportId);
                return apiResponse.body as v1.skill.ExportResponse;
        }
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {Array<string>} skillId the list of skillIds that you wish to get the summary for. A maximum of 10 skillIds can be specified to get the skill summary in single listSkills call. Please note that this parameter must not be used with &#39;nextToken&#39; or/and &#39;maxResults&#39; parameter.
         */
        async callListSkillsForVendorV1(vendorId : string, nextToken? : string, maxResults? : number, skillId? : Array<string>) : Promise<ApiResponse> {
            const __operationId__ = 'callListSkillsForVendorV1';
            // verify required parameter 'vendorId' is not null or undefined
            if (vendorId == null) {
                throw new Error(`Required parameter vendorId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            queryParams.push({ key: 'vendorId', value: vendorId});
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(skillId != null) {
                queryParams.push({ key: 'skillId', value: skillId.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of skills for the vendor.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} vendorId The vendor ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {Array<string>} skillId the list of skillIds that you wish to get the summary for. A maximum of 10 skillIds can be specified to get the skill summary in single listSkills call. Please note that this parameter must not be used with &#39;nextToken&#39; or/and &#39;maxResults&#39; parameter.
         */
        async listSkillsForVendorV1(vendorId : string, nextToken? : string, maxResults? : number, skillId? : Array<string>) : Promise<v1.skill.ListSkillResponse> {
                const apiResponse: ApiResponse = await this.callListSkillsForVendorV1(vendorId, nextToken, maxResults, skillId);
                return apiResponse.body as v1.skill.ListSkillResponse;
        }
        /**
         *
         * @param {string} importId The Import ID.
         */
        async callGetImportStatusV1(importId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetImportStatusV1';
            // verify required parameter 'importId' is not null or undefined
            if (importId == null) {
                throw new Error(`Required parameter importId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('importId', importId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/imports/{importId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "OK.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} importId The Import ID.
         */
        async getImportStatusV1(importId : string) : Promise<v1.skill.ImportResponse> {
                const apiResponse: ApiResponse = await this.callGetImportStatusV1(importId);
                return apiResponse.body as v1.skill.ImportResponse;
        }
        /**
         *
         * @param {v1.skill.CreateSkillWithPackageRequest} createSkillWithPackageRequest Defines the request body for createPackage API.
         */
        async callCreateSkillPackageV1(createSkillWithPackageRequest : v1.skill.CreateSkillWithPackageRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateSkillPackageV1';
            // verify required parameter 'createSkillWithPackageRequest' is not null or undefined
            if (createSkillWithPackageRequest == null) {
                throw new Error(`Required parameter createSkillWithPackageRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/imports";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(413, "Payload too large.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createSkillWithPackageRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.CreateSkillWithPackageRequest} createSkillWithPackageRequest Defines the request body for createPackage API.
         */
        async createSkillPackageV1(createSkillWithPackageRequest : v1.skill.CreateSkillWithPackageRequest) : Promise<void> {
                await this.callCreateSkillPackageV1(createSkillWithPackageRequest);
        }
        /**
         *
         * @param {v1.skill.CreateSkillRequest} createSkillRequest Defines the request body for createSkill API.
         */
        async callCreateSkillForVendorV1(createSkillRequest : v1.skill.CreateSkillRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateSkillForVendorV1';
            // verify required parameter 'createSkillRequest' is not null or undefined
            if (createSkillRequest == null) {
                throw new Error(`Required parameter createSkillRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted; Returns a URL to track the status in &#39;Location&#39; header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createSkillRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.CreateSkillRequest} createSkillRequest Defines the request body for createSkill API.
         */
        async createSkillForVendorV1(createSkillRequest : v1.skill.CreateSkillRequest) : Promise<v1.skill.CreateSkillResponse> {
                const apiResponse: ApiResponse = await this.callCreateSkillForVendorV1(createSkillRequest);
                return apiResponse.body as v1.skill.CreateSkillResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callGetAlexaHostedSkillMetadataV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetAlexaHostedSkillMetadataV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/alexaHosted";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "response contains the Alexa hosted skill&#39;s metadata");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. Authorization Url is invalid");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async getAlexaHostedSkillMetadataV1(skillId : string) : Promise<v1.skill.AlexaHosted.HostedSkillMetadata> {
                const apiResponse: ApiResponse = await this.callGetAlexaHostedSkillMetadataV1(skillId);
                return apiResponse.body as v1.skill.AlexaHosted.HostedSkillMetadata;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsRequest} hostedSkillRepositoryCredentialsRequest defines the request body for hosted skill repository credentials
         */
        async callGenerateCredentialsForAlexaHostedSkillV1(skillId : string, hostedSkillRepositoryCredentialsRequest : v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callGenerateCredentialsForAlexaHostedSkillV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'hostedSkillRepositoryCredentialsRequest' is not null or undefined
            if (hostedSkillRepositoryCredentialsRequest == null) {
                throw new Error(`Required parameter hostedSkillRepositoryCredentialsRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/alexaHosted/repository/credentials/generate";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains the hosted skill repository credentials");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. Authorization Url is invalid");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, hostedSkillRepositoryCredentialsRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsRequest} hostedSkillRepositoryCredentialsRequest defines the request body for hosted skill repository credentials
         */
        async generateCredentialsForAlexaHostedSkillV1(skillId : string, hostedSkillRepositoryCredentialsRequest : v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsRequest) : Promise<v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsList> {
                const apiResponse: ApiResponse = await this.callGenerateCredentialsForAlexaHostedSkillV1(skillId, hostedSkillRepositoryCredentialsRequest);
                return apiResponse.body as v1.skill.AlexaHosted.HostedSkillRepositoryCredentialsList;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callEndBetaTestV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callEndBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/end";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accept. Return a URL to track the resource in &#39;Location&#39; header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async endBetaTestV1(skillId : string) : Promise<void> {
                await this.callEndBetaTestV1(skillId);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callGetBetaTestV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async getBetaTestV1(skillId : string) : Promise<v1.skill.betaTest.BetaTest> {
                const apiResponse: ApiResponse = await this.callGetBetaTestV1(skillId);
                return apiResponse.body as v1.skill.betaTest.BetaTest;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.TestBody} createTestBody JSON object containing the details of a beta test used to create the test.
         */
        async callCreateBetaTestV1(skillId : string, createTestBody? : v1.skill.betaTest.TestBody) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. Return a URL to track the resource in &#39;Location&#39; header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createTestBody, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.TestBody} createTestBody JSON object containing the details of a beta test used to create the test.
         */
        async createBetaTestV1(skillId : string, createTestBody? : v1.skill.betaTest.TestBody) : Promise<void> {
                await this.callCreateBetaTestV1(skillId, createTestBody);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.TestBody} createTestBody JSON object containing the details of a beta test used to create the test.
         */
        async callUpdateBetaTestV1(skillId : string, createTestBody? : v1.skill.betaTest.TestBody) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, createTestBody, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.TestBody} createTestBody JSON object containing the details of a beta test used to create the test.
         */
        async updateBetaTestV1(skillId : string, createTestBody? : v1.skill.betaTest.TestBody) : Promise<void> {
                await this.callUpdateBetaTestV1(skillId, createTestBody);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callStartBetaTestV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callStartBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/start";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accept. Return a URL to track the resource in &#39;Location&#39; header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async startBetaTestV1(skillId : string) : Promise<void> {
                await this.callStartBetaTestV1(skillId);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async callAddTestersToBetaTestV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<ApiResponse> {
            const __operationId__ = 'callAddTestersToBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'testersRequest' is not null or undefined
            if (testersRequest == null) {
                throw new Error(`Required parameter testersRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/testers/add";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, testersRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async addTestersToBetaTestV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<void> {
                await this.callAddTestersToBetaTestV1(skillId, testersRequest);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async callGetListOfTestersV1(skillId : string, nextToken? : string, maxResults? : number) : Promise<ApiResponse> {
            const __operationId__ = 'callGetListOfTestersV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/testers";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Success.");
            errorDefinitions.set(400, "Bad request.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async getListOfTestersV1(skillId : string, nextToken? : string, maxResults? : number) : Promise<v1.skill.betaTest.testers.ListTestersResponse> {
                const apiResponse: ApiResponse = await this.callGetListOfTestersV1(skillId, nextToken, maxResults);
                return apiResponse.body as v1.skill.betaTest.testers.ListTestersResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async callRemoveTestersFromBetaTestV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<ApiResponse> {
            const __operationId__ = 'callRemoveTestersFromBetaTestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'testersRequest' is not null or undefined
            if (testersRequest == null) {
                throw new Error(`Required parameter testersRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/testers/remove";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, testersRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async removeTestersFromBetaTestV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<void> {
                await this.callRemoveTestersFromBetaTestV1(skillId, testersRequest);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async callRequestFeedbackFromTestersV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<ApiResponse> {
            const __operationId__ = 'callRequestFeedbackFromTestersV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'testersRequest' is not null or undefined
            if (testersRequest == null) {
                throw new Error(`Required parameter testersRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/testers/requestFeedback";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, testersRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async requestFeedbackFromTestersV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<void> {
                await this.callRequestFeedbackFromTestersV1(skillId, testersRequest);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async callSendReminderToTestersV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<ApiResponse> {
            const __operationId__ = 'callSendReminderToTestersV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'testersRequest' is not null or undefined
            if (testersRequest == null) {
                throw new Error(`Required parameter testersRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/betaTest/testers/sendReminder";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, testersRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.betaTest.testers.TestersList} testersRequest JSON object containing the email address of beta testers.
         */
        async sendReminderToTestersV1(skillId : string, testersRequest : v1.skill.betaTest.testers.TestersList) : Promise<void> {
                await this.callSendReminderToTestersV1(skillId, testersRequest);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} certificationId Id of the certification. Reserved word identifier of mostRecent can be used to get the most recent certification for the skill. Note that the behavior of the API in this case would be the same as when the actual certification id of the most recent certification is used in the request. 
         * @param {string} acceptLanguage User&#39;s locale/language in context.
         */
        async callGetCertificationReviewV1(skillId : string, certificationId : string, acceptLanguage? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetCertificationReviewV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'certificationId' is not null or undefined
            if (certificationId == null) {
                throw new Error(`Required parameter certificationId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(acceptLanguage != null) {
                headerParams.push({ key : 'Accept-Language', value : acceptLanguage });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('certificationId', certificationId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/certifications/{certificationId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved skill certification information.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeded the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId. ");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} certificationId Id of the certification. Reserved word identifier of mostRecent can be used to get the most recent certification for the skill. Note that the behavior of the API in this case would be the same as when the actual certification id of the most recent certification is used in the request. 
         * @param {string} acceptLanguage User&#39;s locale/language in context.
         */
        async getCertificationReviewV1(skillId : string, certificationId : string, acceptLanguage? : string) : Promise<v1.skill.certification.CertificationResponse> {
                const apiResponse: ApiResponse = await this.callGetCertificationReviewV1(skillId, certificationId, acceptLanguage);
                return apiResponse.body as v1.skill.certification.CertificationResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async callGetCertificationsListV1(skillId : string, nextToken? : string, maxResults? : number) : Promise<ApiResponse> {
            const __operationId__ = 'callGetCertificationsListV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/certifications";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of certifications for the skillId.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. if any request parameter is invalid like certification Id or pagination token etc. If the maxResults is not in the range of 1 to 50, it also qualifies for this error. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeded the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId. ");
            errorDefinitions.set(500, "Internal Server Error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async getCertificationsListV1(skillId : string, nextToken? : string, maxResults? : number) : Promise<v1.skill.certification.ListCertificationsResponse> {
                const apiResponse: ApiResponse = await this.callGetCertificationsListV1(skillId, nextToken, maxResults);
                return apiResponse.body as v1.skill.certification.ListCertificationsResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callDeleteSkillV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteSkillV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async deleteSkillV1(skillId : string) : Promise<void> {
                await this.callDeleteSkillV1(skillId);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         * @param {string} sortField Sets the field on which the sorting would be applied.
         * @param {Array<v1.StageType>} stage A filter used to retrieve items where the stage is equal to the given value.
         * @param {Array<v1.skill.history.LocaleInQuery>} locale 
         * @param {Array<v1.skill.history.DialogActName>} dialogActName A filter used to retrieve items where the dialogAct name is equal to the given value. * &#x60;Dialog.ElicitSlot&#x60;: Alexa asked the user for the value of a specific slot. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#elicitslot) * &#x60;Dialog.ConfirmSlot&#x60;: Alexa confirmed the value of a specific slot before continuing with the dialog. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmslot) * &#x60;Dialog.ConfirmIntent&#x60;: Alexa confirmed the all the information the user has provided for the intent before the skill took action. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmintent) 
         * @param {Array<v1.skill.history.IntentConfidenceBin>} intentConfidenceBin 
         * @param {Array<string>} intentName A filter used to retrieve items where the intent name is equal to the given value.
         * @param {Array<string>} intentSlotsName A filter used to retrieve items where the one of the slot names is equal to the given value.
         * @param {Array<v1.skill.history.InteractionType>} interactionType 
         * @param {Array<v1.skill.history.PublicationStatus>} publicationStatus 
         * @param {Array<string>} utteranceText A filter used to retrieve items where the utterance text contains the given phrase. Each filter value can be at-least 1 character and at-most 100 characters long.
         */
        async callGetUtteranceDataV1(skillId : string, nextToken? : string, maxResults? : number, sortDirection? : string, sortField? : string, stage? : Array<v1.StageType>, locale? : Array<v1.skill.history.LocaleInQuery>, dialogActName? : Array<v1.skill.history.DialogActName>, intentConfidenceBin? : Array<v1.skill.history.IntentConfidenceBin>, intentName? : Array<string>, intentSlotsName? : Array<string>, interactionType? : Array<v1.skill.history.InteractionType>, publicationStatus? : Array<v1.skill.history.PublicationStatus>, utteranceText? : Array<string>) : Promise<ApiResponse> {
            const __operationId__ = 'callGetUtteranceDataV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(sortDirection != null) {
                queryParams.push({ key: 'sortDirection', value: sortDirection });
            }
            if(sortField != null) {
                queryParams.push({ key: 'sortField', value: sortField });
            }
            if(stage != null) {
                queryParams.push({ key: 'stage', value: stage.toString() });
            }
            if(locale != null) {
                queryParams.push({ key: 'locale', value: locale.toString() });
            }
            if(dialogActName != null) {
                queryParams.push({ key: 'dialogAct.name', value: dialogActName.toString() });
            }
            if(intentConfidenceBin != null) {
                queryParams.push({ key: 'intent.confidence.bin', value: intentConfidenceBin.toString() });
            }
            if(intentName != null) {
                queryParams.push({ key: 'intent.name', value: intentName.toString() });
            }
            if(intentSlotsName != null) {
                queryParams.push({ key: 'intent.slots.name', value: intentSlotsName.toString() });
            }
            if(interactionType != null) {
                queryParams.push({ key: 'interactionType', value: interactionType.toString() });
            }
            if(publicationStatus != null) {
                queryParams.push({ key: 'publicationStatus', value: publicationStatus.toString() });
            }
            if(utteranceText != null) {
                queryParams.push({ key: 'utteranceText', value: utteranceText.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/history/intentRequests";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns a list of utterance items for the given skill.");
            errorDefinitions.set(400, "Bad Request.");
            errorDefinitions.set(401, "Unauthorized.");
            errorDefinitions.set(404, "Skill Not Found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         * @param {string} sortField Sets the field on which the sorting would be applied.
         * @param {Array<v1.StageType>} stage A filter used to retrieve items where the stage is equal to the given value.
         * @param {Array<v1.skill.history.LocaleInQuery>} locale 
         * @param {Array<v1.skill.history.DialogActName>} dialogActName A filter used to retrieve items where the dialogAct name is equal to the given value. * &#x60;Dialog.ElicitSlot&#x60;: Alexa asked the user for the value of a specific slot. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#elicitslot) * &#x60;Dialog.ConfirmSlot&#x60;: Alexa confirmed the value of a specific slot before continuing with the dialog. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmslot) * &#x60;Dialog.ConfirmIntent&#x60;: Alexa confirmed the all the information the user has provided for the intent before the skill took action. (https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html#confirmintent) 
         * @param {Array<v1.skill.history.IntentConfidenceBin>} intentConfidenceBin 
         * @param {Array<string>} intentName A filter used to retrieve items where the intent name is equal to the given value.
         * @param {Array<string>} intentSlotsName A filter used to retrieve items where the one of the slot names is equal to the given value.
         * @param {Array<v1.skill.history.InteractionType>} interactionType 
         * @param {Array<v1.skill.history.PublicationStatus>} publicationStatus 
         * @param {Array<string>} utteranceText A filter used to retrieve items where the utterance text contains the given phrase. Each filter value can be at-least 1 character and at-most 100 characters long.
         */
        async getUtteranceDataV1(skillId : string, nextToken? : string, maxResults? : number, sortDirection? : string, sortField? : string, stage? : Array<v1.StageType>, locale? : Array<v1.skill.history.LocaleInQuery>, dialogActName? : Array<v1.skill.history.DialogActName>, intentConfidenceBin? : Array<v1.skill.history.IntentConfidenceBin>, intentName? : Array<string>, intentSlotsName? : Array<string>, interactionType? : Array<v1.skill.history.InteractionType>, publicationStatus? : Array<v1.skill.history.PublicationStatus>, utteranceText? : Array<string>) : Promise<v1.skill.history.IntentRequests> {
                const apiResponse: ApiResponse = await this.callGetUtteranceDataV1(skillId, nextToken, maxResults, sortDirection, sortField, stage, locale, dialogActName, intentConfidenceBin, intentName, intentSlotsName, interactionType, publicationStatus, utteranceText);
                return apiResponse.body as v1.skill.history.IntentRequests;
        }
        /**
         *
         * @param {v1.skill.UpdateSkillWithPackageRequest} updateSkillWithPackageRequest Defines the request body for updatePackage API.
         * @param {string} skillId The skill ID.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callImportSkillPackageV1(updateSkillWithPackageRequest : v1.skill.UpdateSkillWithPackageRequest, skillId : string, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callImportSkillPackageV1';
            // verify required parameter 'updateSkillWithPackageRequest' is not null or undefined
            if (updateSkillWithPackageRequest == null) {
                throw new Error(`Required parameter updateSkillWithPackageRequest was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/imports";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(413, "Payload too large.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, updateSkillWithPackageRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.UpdateSkillWithPackageRequest} updateSkillWithPackageRequest Defines the request body for updatePackage API.
         * @param {string} skillId The skill ID.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async importSkillPackageV1(updateSkillWithPackageRequest : v1.skill.UpdateSkillWithPackageRequest, skillId : string, ifMatch? : string) : Promise<void> {
                await this.callImportSkillPackageV1(updateSkillWithPackageRequest, skillId, ifMatch);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} startTime The start time of query.
         * @param {string} endTime The end time of query (The maximum time duration is 1 week)
         * @param {string} period The aggregation period to use when retrieving the metric, follows ISO_8601#Durations format.
         * @param {string} metric A distinct set of logic which predictably returns a set of data.
         * @param {string} stage The stage of the skill (live, development).
         * @param {string} skillType The type of the skill (custom, smartHome and flashBriefing).
         * @param {string} intent The intent of the skill.
         * @param {string} locale The locale for the skill. e.g. en-GB, en-US, de-DE and etc.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         */
        async callGetSkillMetricsV1(skillId : string, startTime : string, endTime : string, period : string, metric : string, stage : string, skillType : string, intent? : string, locale? : string, maxResults? : number, nextToken? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillMetricsV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'startTime' is not null or undefined
            if (startTime == null) {
                throw new Error(`Required parameter startTime was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'endTime' is not null or undefined
            if (endTime == null) {
                throw new Error(`Required parameter endTime was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'period' is not null or undefined
            if (period == null) {
                throw new Error(`Required parameter period was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'metric' is not null or undefined
            if (metric == null) {
                throw new Error(`Required parameter metric was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillType' is not null or undefined
            if (skillType == null) {
                throw new Error(`Required parameter skillType was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            queryParams.push({ key: 'startTime', value: startTime.toString()});
            queryParams.push({ key: 'endTime', value: endTime.toString()});
            queryParams.push({ key: 'period', value: period});
            queryParams.push({ key: 'metric', value: metric});
            queryParams.push({ key: 'stage', value: stage});
            queryParams.push({ key: 'skillType', value: skillType});
            if(intent != null) {
                queryParams.push({ key: 'intent', value: intent });
            }
            if(locale != null) {
                queryParams.push({ key: 'locale', value: locale });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/metrics";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Get analytic metrics report successfully.");
            errorDefinitions.set(400, "Bad request due to invalid or missing data.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} startTime The start time of query.
         * @param {string} endTime The end time of query (The maximum time duration is 1 week)
         * @param {string} period The aggregation period to use when retrieving the metric, follows ISO_8601#Durations format.
         * @param {string} metric A distinct set of logic which predictably returns a set of data.
         * @param {string} stage The stage of the skill (live, development).
         * @param {string} skillType The type of the skill (custom, smartHome and flashBriefing).
         * @param {string} intent The intent of the skill.
         * @param {string} locale The locale for the skill. e.g. en-GB, en-US, de-DE and etc.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         */
        async getSkillMetricsV1(skillId : string, startTime : string, endTime : string, period : string, metric : string, stage : string, skillType : string, intent? : string, locale? : string, maxResults? : number, nextToken? : string) : Promise<v1.skill.metrics.GetMetricDataResponse> {
                const apiResponse: ApiResponse = await this.callGetSkillMetricsV1(skillId, startTime, endTime, period, metric, stage, skillType, intent, locale, maxResults, nextToken);
                return apiResponse.body as v1.skill.metrics.GetMetricDataResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.simulations.SimulationsApiRequest} simulationsApiRequest Payload sent to the skill simulation API.
         */
        async callSimulateSkillV1(skillId : string, simulationsApiRequest : v1.skill.simulations.SimulationsApiRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callSimulateSkillV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'simulationsApiRequest' is not null or undefined
            if (simulationsApiRequest == null) {
                throw new Error(`Required parameter simulationsApiRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/simulations";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Skill simulation has successfully began.");
            errorDefinitions.set(400, "Bad request due to invalid or missing data.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission to call this API or is currently in a state that does not allow simulation of this skill. ");
            errorDefinitions.set(404, "The specified skill does not exist.");
            errorDefinitions.set(409, "This requests conflicts with another one currently being processed. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, simulationsApiRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.simulations.SimulationsApiRequest} simulationsApiRequest Payload sent to the skill simulation API.
         */
        async simulateSkillV1(skillId : string, simulationsApiRequest : v1.skill.simulations.SimulationsApiRequest) : Promise<v1.skill.simulations.SimulationsApiResponse> {
                const apiResponse: ApiResponse = await this.callSimulateSkillV1(skillId, simulationsApiRequest);
                return apiResponse.body as v1.skill.simulations.SimulationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} simulationId Id of the simulation.
         */
        async callGetSkillSimulationV1(skillId : string, simulationId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillSimulationV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'simulationId' is not null or undefined
            if (simulationId == null) {
                throw new Error(`Required parameter simulationId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('simulationId', simulationId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/simulations/{simulationId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved skill simulation information.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission or is currently in a state that does not allow calls to this API. ");
            errorDefinitions.set(404, "The specified skill or simulation does not exist. The error response will contain a description that indicates the specific resource type that was not found. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} simulationId Id of the simulation.
         */
        async getSkillSimulationV1(skillId : string, simulationId : string) : Promise<v1.skill.simulations.SimulationsApiResponse> {
                const apiResponse: ApiResponse = await this.callGetSkillSimulationV1(skillId, simulationId);
                return apiResponse.body as v1.skill.simulations.SimulationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async callGetSSLCertificatesV1(skillId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSSLCertificatesV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/sslCertificateSets/~latest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains the latest version of the ssl certificates.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         */
        async getSSLCertificatesV1(skillId : string) : Promise<v1.skill.SSLCertificatePayload> {
                const apiResponse: ApiResponse = await this.callGetSSLCertificatesV1(skillId);
                return apiResponse.body as v1.skill.SSLCertificatePayload;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.SSLCertificatePayload} sslCertificatePayload Defines the input/output of the ssl certificates api for a skill.
         */
        async callSetSSLCertificatesV1(skillId : string, sslCertificatePayload : v1.skill.SSLCertificatePayload) : Promise<ApiResponse> {
            const __operationId__ = 'callSetSSLCertificatesV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'sslCertificatePayload' is not null or undefined
            if (sslCertificatePayload == null) {
                throw new Error(`Required parameter sslCertificatePayload was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/sslCertificateSets/~latest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Accepted; Request was successful and get will now result in the new values.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, sslCertificatePayload, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.SSLCertificatePayload} sslCertificatePayload Defines the input/output of the ssl certificates api for a skill.
         */
        async setSSLCertificatesV1(skillId : string, sslCertificatePayload : v1.skill.SSLCertificatePayload) : Promise<void> {
                await this.callSetSSLCertificatesV1(skillId, sslCertificatePayload);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async callDeleteSkillEnablementV1(skillId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteSkillEnablementV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/enablement";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that enablement is successfully deleted.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async deleteSkillEnablementV1(skillId : string, stage : string) : Promise<void> {
                await this.callDeleteSkillEnablementV1(skillId, stage);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async callGetSkillEnablementStatusV1(skillId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillEnablementStatusV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/enablement";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that enablement resource exists for given skillId &amp; stage.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async getSkillEnablementStatusV1(skillId : string, stage : string) : Promise<void> {
                await this.callGetSkillEnablementStatusV1(skillId, stage);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async callSetSkillEnablementV1(skillId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callSetSkillEnablementV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/enablement";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "No Content; Confirms that enablement is successfully created/updated.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async setSkillEnablementV1(skillId : string, stage : string) : Promise<void> {
                await this.callSetSkillEnablementV1(skillId, stage);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async callCreateExportRequestForSkillV1(skillId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callCreateExportRequestForSkillV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/exports";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async createExportRequestForSkillV1(skillId : string, stage : string) : Promise<void> {
                await this.callCreateExportRequestForSkillV1(skillId, stage);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async callGetIspListForSkillIdV1(skillId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<ApiResponse> {
            const __operationId__ = 'callGetIspListForSkillIdV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/inSkillProducts";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains list of in-skill products for the specified skillId and stage.");
            errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present, badly formatted. ");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(404, "Requested resource not found.");
            errorDefinitions.set(429, "Too many requests received.");
            errorDefinitions.set(500, "Internal Server Error");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async getIspListForSkillIdV1(skillId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<v1.isp.ListInSkillProductResponse> {
                const apiResponse: ApiResponse = await this.callGetIspListForSkillIdV1(skillId, stage, nextToken, maxResults);
                return apiResponse.body as v1.isp.ListInSkillProductResponse;
        }
        /**
         *
         * @param {v1.skill.evaluations.ProfileNluRequest} profileNluRequest Payload sent to the profile nlu API.
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async callProfileNluV1(profileNluRequest : v1.skill.evaluations.ProfileNluRequest, skillId : string, stage : string, locale : string) : Promise<ApiResponse> {
            const __operationId__ = 'callProfileNluV1';
            // verify required parameter 'profileNluRequest' is not null or undefined
            if (profileNluRequest == null) {
                throw new Error(`Required parameter profileNluRequest was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);
            pathParams.set('locale', locale);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/interactionModel/locales/{locale}/profileNlu";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Profiled utterance against interaction model and returned nlu response successfully.");
            errorDefinitions.set(400, "Bad request due to invalid or missing data.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(409, "This requests conflicts with another one currently being processed. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, profileNluRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.evaluations.ProfileNluRequest} profileNluRequest Payload sent to the profile nlu API.
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async profileNluV1(profileNluRequest : v1.skill.evaluations.ProfileNluRequest, skillId : string, stage : string, locale : string) : Promise<v1.skill.evaluations.ProfileNluResponse> {
                const apiResponse: ApiResponse = await this.callProfileNluV1(profileNluRequest, skillId, stage, locale);
                return apiResponse.body as v1.skill.evaluations.ProfileNluResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async callListPrivateDistributionAccountsV1(skillId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<ApiResponse> {
            const __operationId__ = 'callListPrivateDistributionAccountsV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/privateDistributionAccounts";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of private distribution accounts on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         */
        async listPrivateDistributionAccountsV1(skillId : string, stage : string, nextToken? : string, maxResults? : number) : Promise<v1.skill.Private.ListPrivateDistributionAccountsResponse> {
                const apiResponse: ApiResponse = await this.callListPrivateDistributionAccountsV1(skillId, stage, nextToken, maxResults);
                return apiResponse.body as v1.skill.Private.ListPrivateDistributionAccountsResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} id ARN that a skill can be privately distributed to.
         */
        async callDeletePrivateDistributionAccountIdV1(skillId : string, stage : string, id : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeletePrivateDistributionAccountIdV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'id' is not null or undefined
            if (id == null) {
                throw new Error(`Required parameter id was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);
            pathParams.set('id', id);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/privateDistributionAccounts/{id}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} id ARN that a skill can be privately distributed to.
         */
        async deletePrivateDistributionAccountIdV1(skillId : string, stage : string, id : string) : Promise<void> {
                await this.callDeletePrivateDistributionAccountIdV1(skillId, stage, id);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} id ARN that a skill can be privately distributed to.
         */
        async callSetPrivateDistributionAccountIdV1(skillId : string, stage : string, id : string) : Promise<ApiResponse> {
            const __operationId__ = 'callSetPrivateDistributionAccountIdV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'id' is not null or undefined
            if (id == null) {
                throw new Error(`Required parameter id was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);
            pathParams.set('id', id);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/privateDistributionAccounts/{id}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} id ARN that a skill can be privately distributed to.
         */
        async setPrivateDistributionAccountIdV1(skillId : string, stage : string, id : string) : Promise<void> {
                await this.callSetPrivateDistributionAccountIdV1(skillId, stage, id);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async callDeleteAccountLinkingInfoV1(skillId : string, stageV2 : string) : Promise<ApiResponse> {
            const __operationId__ = 'callDeleteAccountLinkingInfoV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/accountLinkingClient";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. No content.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill/stage/accountLinkingClient doesn&#39;t exist.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("DELETE", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async deleteAccountLinkingInfoV1(skillId : string, stageV2 : string) : Promise<void> {
                await this.callDeleteAccountLinkingInfoV1(skillId, stageV2);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async callGetAccountLinkingInfoV1(skillId : string, stageV2 : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetAccountLinkingInfoV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/accountLinkingClient";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns AccountLinking response of the skill.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async getAccountLinkingInfoV1(skillId : string, stageV2 : string) : Promise<v1.skill.accountLinking.AccountLinkingResponse> {
                const apiResponse: ApiResponse = await this.callGetAccountLinkingInfoV1(skillId, stageV2);
                return apiResponse.body as v1.skill.accountLinking.AccountLinkingResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {v1.skill.accountLinking.AccountLinkingRequest} accountLinkingRequest The fields required to create accountLinking partner.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callUpdateAccountLinkingInfoV1(skillId : string, stageV2 : string, accountLinkingRequest : v1.skill.accountLinking.AccountLinkingRequest, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateAccountLinkingInfoV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'accountLinkingRequest' is not null or undefined
            if (accountLinkingRequest == null) {
                throw new Error(`Required parameter accountLinkingRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/accountLinkingClient";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. Authorization Url is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, accountLinkingRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {v1.skill.accountLinking.AccountLinkingRequest} accountLinkingRequest The fields required to create accountLinking partner.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async updateAccountLinkingInfoV1(skillId : string, stageV2 : string, accountLinkingRequest : v1.skill.accountLinking.AccountLinkingRequest, ifMatch? : string) : Promise<void> {
                await this.callUpdateAccountLinkingInfoV1(skillId, stageV2, accountLinkingRequest, ifMatch);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async callGetInteractionModelV1(skillId : string, stageV2 : string, locale : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);
            pathParams.set('locale', locale);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/interactionModel/locales/{locale}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns interaction model object on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill doesn&#39;t exist or there is no model defined for the locale.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async getInteractionModelV1(skillId : string, stageV2 : string, locale : string) : Promise<v1.skill.interactionModel.InteractionModelData> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelV1(skillId, stageV2, locale);
                return apiResponse.body as v1.skill.interactionModel.InteractionModelData;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async callGetInteractionModelMetadataV1(skillId : string, stageV2 : string, locale : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelMetadataV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);
            pathParams.set('locale', locale);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/interactionModel/locales/{locale}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success. There is no content but returns etag.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill or stage or locale does not exist");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("HEAD", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         */
        async getInteractionModelMetadataV1(skillId : string, stageV2 : string, locale : string) : Promise<void> {
                await this.callGetInteractionModelMetadataV1(skillId, stageV2, locale);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {v1.skill.interactionModel.InteractionModelData} interactionModel 
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callSetInteractionModelV1(skillId : string, stageV2 : string, locale : string, interactionModel : v1.skill.interactionModel.InteractionModelData, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callSetInteractionModelV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'interactionModel' is not null or undefined
            if (interactionModel == null) {
                throw new Error(`Required parameter interactionModel was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);
            pathParams.set('locale', locale);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/interactionModel/locales/{locale}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Returns build status location link on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the input interaction model is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill or stage or locale does not exist.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, interactionModel, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {v1.skill.interactionModel.InteractionModelData} interactionModel 
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async setInteractionModelV1(skillId : string, stageV2 : string, locale : string, interactionModel : v1.skill.interactionModel.InteractionModelData, ifMatch? : string) : Promise<void> {
                await this.callSetInteractionModelV1(skillId, stageV2, locale, interactionModel, ifMatch);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         * @param {string} sortField Sets the field on which the sorting would be applied.
         */
        async callListInteractionModelVersionsV1(skillId : string, stageV2 : string, locale : string, nextToken? : string, maxResults? : number, sortDirection? : string, sortField? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callListInteractionModelVersionsV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(nextToken != null) {
                queryParams.push({ key: 'nextToken', value: nextToken });
            }
            if(maxResults != null) {
                queryParams.push({ key: 'maxResults', value: maxResults.toString() });
            }
            if(sortDirection != null) {
                queryParams.push({ key: 'sortDirection', value: sortDirection });
            }
            if(sortField != null) {
                queryParams.push({ key: 'sortField', value: sortField });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);
            pathParams.set('locale', locale);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/interactionModel/locales/{locale}/versions";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns list of interactionModel versions of a skill for the vendor.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the input interaction model is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill doesn&#39;t exist or there is no model defined for the locale.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element. The value of nextToken can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that Skill Management API understands. Token has expiry of 24 hours.
         * @param {number} maxResults Sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 50 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned, the response contains isTruncated &#x3D; true.
         * @param {string} sortDirection Sets the sorting direction of the result items. When set to &#39;asc&#39; these items are returned in ascending order of sortField value and when set to &#39;desc&#39; these items are returned in descending order of sortField value.
         * @param {string} sortField Sets the field on which the sorting would be applied.
         */
        async listInteractionModelVersionsV1(skillId : string, stageV2 : string, locale : string, nextToken? : string, maxResults? : number, sortDirection? : string, sortField? : string) : Promise<v1.skill.interactionModel.version.ListResponse> {
                const apiResponse: ApiResponse = await this.callListInteractionModelVersionsV1(skillId, stageV2, locale, nextToken, maxResults, sortDirection, sortField);
                return apiResponse.body as v1.skill.interactionModel.version.ListResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {string} version Version for interaction model.
         */
        async callGetInteractionModelVersionV1(skillId : string, stageV2 : string, locale : string, version : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetInteractionModelVersionV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'locale' is not null or undefined
            if (locale == null) {
                throw new Error(`Required parameter locale was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'version' is not null or undefined
            if (version == null) {
                throw new Error(`Required parameter version was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);
            pathParams.set('locale', locale);
            pathParams.set('version', version);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/interactionModel/locales/{locale}/versions/{version}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns interaction model object on success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. the input interaction model is invalid.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The specified skill doesn&#39;t exist or there is no model defined for the locale or version.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {string} locale The locale for the model requested e.g. en-GB, en-US, de-DE.
         * @param {string} version Version for interaction model.
         */
        async getInteractionModelVersionV1(skillId : string, stageV2 : string, locale : string, version : string) : Promise<v1.skill.interactionModel.InteractionModelData> {
                const apiResponse: ApiResponse = await this.callGetInteractionModelVersionV1(skillId, stageV2, locale, version);
                return apiResponse.body as v1.skill.interactionModel.InteractionModelData;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async callGetSkillManifestV1(skillId : string, stageV2 : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillManifestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/manifest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Response contains the latest version of skill manifest.");
            errorDefinitions.set(303, "See Other");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         */
        async getSkillManifestV1(skillId : string, stageV2 : string) : Promise<v1.skill.Manifest.SkillManifestEnvelope> {
                const apiResponse: ApiResponse = await this.callGetSkillManifestV1(skillId, stageV2);
                return apiResponse.body as v1.skill.Manifest.SkillManifestEnvelope;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {v1.skill.Manifest.SkillManifestEnvelope} updateSkillRequest Defines the request body for updateSkill API.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async callUpdateSkillManifestV1(skillId : string, stageV2 : string, updateSkillRequest : v1.skill.Manifest.SkillManifestEnvelope, ifMatch? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callUpdateSkillManifestV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stageV2' is not null or undefined
            if (stageV2 == null) {
                throw new Error(`Required parameter stageV2 was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'updateSkillRequest' is not null or undefined
            if (updateSkillRequest == null) {
                throw new Error(`Required parameter updateSkillRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(ifMatch != null) {
                headerParams.push({ key : 'If-Match', value : ifMatch });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stageV2', stageV2);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stageV2}/manifest";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Accepted; Returns a URL to track the status in &#39;Location&#39; header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(409, "The request could not be completed due to a conflict with the current state of the target resource.");
            errorDefinitions.set(412, "Precondition failed.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("PUT", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, updateSkillRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stageV2 Stages of a skill including the new certified stage. * &#x60;development&#x60; - skills which are currently in development corresponds to this stage. * &#x60;certified&#x60; -  skills which have completed certification and ready for publishing corresponds to this stage. * &#x60;live&#x60; - skills which are currently live corresponds to this stage. 
         * @param {v1.skill.Manifest.SkillManifestEnvelope} updateSkillRequest Defines the request body for updateSkill API.
         * @param {string} ifMatch Request header that specified an entity tag. The server will update the resource only if the eTag matches with the resource&#39;s current eTag.
         */
        async updateSkillManifestV1(skillId : string, stageV2 : string, updateSkillRequest : v1.skill.Manifest.SkillManifestEnvelope, ifMatch? : string) : Promise<void> {
                await this.callUpdateSkillManifestV1(skillId, stageV2, updateSkillRequest, ifMatch);
        }
        /**
         *
         * @param {v1.skill.validations.ValidationsApiRequest} validationsApiRequest Payload sent to the skill validation API.
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async callSubmitSkillValidationV1(validationsApiRequest : v1.skill.validations.ValidationsApiRequest, skillId : string, stage : string) : Promise<ApiResponse> {
            const __operationId__ = 'callSubmitSkillValidationV1';
            // verify required parameter 'validationsApiRequest' is not null or undefined
            if (validationsApiRequest == null) {
                throw new Error(`Required parameter validationsApiRequest was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/validations";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Skill validation has successfully begun.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission or is currently in a state that does not allow calls to this API. ");
            errorDefinitions.set(404, "The specified skill, stage or validation does not exist. The error response will contain a description that indicates the specific resource type that was not found. ");
            errorDefinitions.set(409, "This requests conflicts with another one currently being processed. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, validationsApiRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {v1.skill.validations.ValidationsApiRequest} validationsApiRequest Payload sent to the skill validation API.
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         */
        async submitSkillValidationV1(validationsApiRequest : v1.skill.validations.ValidationsApiRequest, skillId : string, stage : string) : Promise<v1.skill.validations.ValidationsApiResponse> {
                const apiResponse: ApiResponse = await this.callSubmitSkillValidationV1(validationsApiRequest, skillId, stage);
                return apiResponse.body as v1.skill.validations.ValidationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} validationId Id of the validation. Reserved word identifier of mostRecent can be used to get the most recent validation for the skill and stage. Note that the behavior of the API in this case would be the same as when the actual validation id of the most recent validation is used in the request. 
         * @param {string} stage Stage for skill.
         * @param {string} acceptLanguage User&#39;s locale/language in context.
         */
        async callGetSkillValidationsV1(skillId : string, validationId : string, stage : string, acceptLanguage? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillValidationsV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'validationId' is not null or undefined
            if (validationId == null) {
                throw new Error(`Required parameter validationId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });
            if(acceptLanguage != null) {
                headerParams.push({ key : 'Accept-Language', value : acceptLanguage });
            }

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('validationId', validationId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/stages/{stage}/validations/{validationId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved skill validation information.");
            errorDefinitions.set(403, "API user does not have permission or is currently in a state that does not allow calls to this API. ");
            errorDefinitions.set(404, "The specified skill, stage, or validation does not exist. The error response will contain a description that indicates the specific resource type that was not found. ");
            errorDefinitions.set(409, "This requests conflicts with another one currently being processed. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} validationId Id of the validation. Reserved word identifier of mostRecent can be used to get the most recent validation for the skill and stage. Note that the behavior of the API in this case would be the same as when the actual validation id of the most recent validation is used in the request. 
         * @param {string} stage Stage for skill.
         * @param {string} acceptLanguage User&#39;s locale/language in context.
         */
        async getSkillValidationsV1(skillId : string, validationId : string, stage : string, acceptLanguage? : string) : Promise<v1.skill.validations.ValidationsApiResponse> {
                const apiResponse: ApiResponse = await this.callGetSkillValidationsV1(skillId, validationId, stage, acceptLanguage);
                return apiResponse.body as v1.skill.validations.ValidationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} resource Resource name for which status information is desired. It is an optional, filtering parameter and can be used more than once, to retrieve status for all the desired (sub)resources only, in single API call. If this parameter is not specified, status for all the resources/sub-resources will be returned. 
         */
        async callGetSkillStatusV1(skillId : string, resource? : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillStatusV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];
            if(resource != null) {
                queryParams.push({ key: 'resource', value: resource });
            }

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/status";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Returns status for skill resource and sub-resources.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} resource Resource name for which status information is desired. It is an optional, filtering parameter and can be used more than once, to retrieve status for all the desired (sub)resources only, in single API call. If this parameter is not specified, status for all the resources/sub-resources will be returned. 
         */
        async getSkillStatusV1(skillId : string, resource? : string) : Promise<v1.skill.SkillStatus> {
                const apiResponse: ApiResponse = await this.callGetSkillStatusV1(skillId, resource);
                return apiResponse.body as v1.skill.SkillStatus;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.SubmitSkillForCertificationRequest} submitSkillForCertificationRequest Defines the request body for submitSkillForCertification API.
         */
        async callSubmitSkillForCertificationV1(skillId : string, submitSkillForCertificationRequest? : v1.skill.SubmitSkillForCertificationRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callSubmitSkillForCertificationV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/submit";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(202, "Success. There is no content but returns Location in the header.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, submitSkillForCertificationRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.SubmitSkillForCertificationRequest} submitSkillForCertificationRequest Defines the request body for submitSkillForCertification API.
         */
        async submitSkillForCertificationV1(skillId : string, submitSkillForCertificationRequest? : v1.skill.SubmitSkillForCertificationRequest) : Promise<void> {
                await this.callSubmitSkillForCertificationV1(skillId, submitSkillForCertificationRequest);
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.WithdrawRequest} withdrawRequest The reason and message (in case of OTHER) to withdraw a skill.
         */
        async callWithdrawSkillFromCertificationV1(skillId : string, withdrawRequest : v1.skill.WithdrawRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callWithdrawSkillFromCertificationV1';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'withdrawRequest' is not null or undefined
            if (withdrawRequest == null) {
                throw new Error(`Required parameter withdrawRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/{skillId}/withdraw";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(204, "Success.");
            errorDefinitions.set(400, "Server cannot process the request due to a client error.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "The operation being requested is not allowed.");
            errorDefinitions.set(404, "The resource being requested is not found.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, withdrawRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {v1.skill.WithdrawRequest} withdrawRequest The reason and message (in case of OTHER) to withdraw a skill.
         */
        async withdrawSkillFromCertificationV1(skillId : string, withdrawRequest : v1.skill.WithdrawRequest) : Promise<void> {
                await this.callWithdrawSkillFromCertificationV1(skillId, withdrawRequest);
        }
        /**
         *
         */
        async callCreateUploadUrlV1() : Promise<ApiResponse> {
            const __operationId__ = 'callCreateUploadUrlV1';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/skills/uploads";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(201, "Created.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Exceeds the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         */
        async createUploadUrlV1() : Promise<v1.skill.UploadResponse> {
                const apiResponse: ApiResponse = await this.callCreateUploadUrlV1();
                return apiResponse.body as v1.skill.UploadResponse;
        }
        /**
         *
         */
        async callGetVendorListV1() : Promise<ApiResponse> {
            const __operationId__ = 'callGetVendorListV1';

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/vendors";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Return vendor information on success.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         */
        async getVendorListV1() : Promise<v1.vendorManagement.Vendors> {
                const apiResponse: ApiResponse = await this.callGetVendorListV1();
                return apiResponse.body as v1.vendorManagement.Vendors;
        }
        /**
         *
         * @param {string} vendorId vendorId
         * @param {string} permission The permission of a hosted skill feature that customer needs to check.
         */
        async callGetAlexaHostedSkillUserPermissionsV1(vendorId : string, permission : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetAlexaHostedSkillUserPermissionsV1';
            // verify required parameter 'vendorId' is not null or undefined
            if (vendorId == null) {
                throw new Error(`Required parameter vendorId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'permission' is not null or undefined
            if (permission == null) {
                throw new Error(`Required parameter permission was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('vendorId', vendorId);
            pathParams.set('permission', permission);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v1/vendors/{vendorId}/alexaHosted/permissions/{permission}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "response contains the user&#39;s permission of hosted skill features");
            errorDefinitions.set(400, "Server cannot process the request due to a client error e.g. Authorization Url is invalid");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(429, "Exceed the permitted request limit. Throttling criteria includes total requests, per API, ClientId, and CustomerId.");
            errorDefinitions.set(500, "Internal Server Error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} vendorId vendorId
         * @param {string} permission The permission of a hosted skill feature that customer needs to check.
         */
        async getAlexaHostedSkillUserPermissionsV1(vendorId : string, permission : string) : Promise<v1.skill.AlexaHosted.HostedSkillPermission> {
                const apiResponse: ApiResponse = await this.callGetAlexaHostedSkillUserPermissionsV1(vendorId, permission);
                return apiResponse.body as v1.skill.AlexaHosted.HostedSkillPermission;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {v2.skill.invocations.InvocationsApiRequest} invocationsApiRequest Payload sent to the skill invocation API.
         */
        async callInvokeSkillEndPointV2(skillId : string, stage : string, invocationsApiRequest : v2.skill.invocations.InvocationsApiRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callInvokeSkillEndPointV2';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'invocationsApiRequest' is not null or undefined
            if (invocationsApiRequest == null) {
                throw new Error(`Required parameter invocationsApiRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/skills/{skillId}/stages/{stage}/invocations";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Skill was invoked.");
            errorDefinitions.set(400, "Bad request due to invalid or missing data.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission to call this API or is currently in a state that does not allow invocation of this skill. ");
            errorDefinitions.set(404, "The specified skill does not exist.");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, invocationsApiRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {v2.skill.invocations.InvocationsApiRequest} invocationsApiRequest Payload sent to the skill invocation API.
         */
        async invokeSkillEndPointV2(skillId : string, stage : string, invocationsApiRequest : v2.skill.invocations.InvocationsApiRequest) : Promise<v2.skill.invocations.InvocationsApiResponse> {
                const apiResponse: ApiResponse = await this.callInvokeSkillEndPointV2(skillId, stage, invocationsApiRequest);
                return apiResponse.body as v2.skill.invocations.InvocationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {v2.skill.simulations.SimulationsApiRequest} simulationsApiRequest Payload sent to the skill simulation API.
         */
        async callSimulateSkillV2(skillId : string, stage : string, simulationsApiRequest : v2.skill.simulations.SimulationsApiRequest) : Promise<ApiResponse> {
            const __operationId__ = 'callSimulateSkillV2';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'simulationsApiRequest' is not null or undefined
            if (simulationsApiRequest == null) {
                throw new Error(`Required parameter simulationsApiRequest was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/skills/{skillId}/stages/{stage}/simulations";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Skill simulation has successfully began.");
            errorDefinitions.set(400, "Bad request due to invalid or missing data.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission to call this API or is currently in a state that does not allow simulation of this skill. ");
            errorDefinitions.set(404, "The specified skill does not exist.");
            errorDefinitions.set(409, "This requests conflicts with another one currently being processed. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("POST", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, simulationsApiRequest, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {v2.skill.simulations.SimulationsApiRequest} simulationsApiRequest Payload sent to the skill simulation API.
         */
        async simulateSkillV2(skillId : string, stage : string, simulationsApiRequest : v2.skill.simulations.SimulationsApiRequest) : Promise<v2.skill.simulations.SimulationsApiResponse> {
                const apiResponse: ApiResponse = await this.callSimulateSkillV2(skillId, stage, simulationsApiRequest);
                return apiResponse.body as v2.skill.simulations.SimulationsApiResponse;
        }
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} simulationId Id of the simulation.
         */
        async callGetSkillSimulationV2(skillId : string, stage : string, simulationId : string) : Promise<ApiResponse> {
            const __operationId__ = 'callGetSkillSimulationV2';
            // verify required parameter 'skillId' is not null or undefined
            if (skillId == null) {
                throw new Error(`Required parameter skillId was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'stage' is not null or undefined
            if (stage == null) {
                throw new Error(`Required parameter stage was null or undefined when calling ${__operationId__}.`);
            }
            // verify required parameter 'simulationId' is not null or undefined
            if (simulationId == null) {
                throw new Error(`Required parameter simulationId was null or undefined when calling ${__operationId__}.`);
            }

            const queryParams : Array<{ key : string, value : string }> = [];

            const headerParams : Array<{ key : string, value : string }> = [];
            headerParams.push({ key : 'Content-type', value : 'application/json' });
            headerParams.push({ key : 'User-Agent', value : this.userAgent });

            const pathParams : Map<string, string> = new Map<string, string>();
            pathParams.set('skillId', skillId);
            pathParams.set('stage', stage);
            pathParams.set('simulationId', simulationId);

            const accessToken : string = await this.lwaServiceClient.getAccessToken();
            const authorizationValue = "Bearer " + accessToken;
            headerParams.push({key : "Authorization", value : authorizationValue});

            let path : string = "/v2/skills/{skillId}/stages/{stage}/simulations/{simulationId}";

            const errorDefinitions : Map<number, string> = new Map<number, string>();
            errorDefinitions.set(200, "Successfully retrieved skill simulation information.");
            errorDefinitions.set(401, "The auth token is invalid/expired or doesn&#39;t have access to the resource.");
            errorDefinitions.set(403, "API user does not have permission or is currently in a state that does not allow calls to this API. ");
            errorDefinitions.set(404, "The specified skill or simulation does not exist. The error response will contain a description that indicates the specific resource type that was not found. ");
            errorDefinitions.set(429, "API user has exceeded the permitted request rate.");
            errorDefinitions.set(500, "Internal service error.");
            errorDefinitions.set(503, "Service Unavailable.");

            return this.invoke("GET", this.apiConfiguration.apiEndpoint, path,
                    pathParams, queryParams, headerParams, null, errorDefinitions);
        }
        
        /**
         *
         * @param {string} skillId The skill ID.
         * @param {string} stage Stage for skill.
         * @param {string} simulationId Id of the simulation.
         */
        async getSkillSimulationV2(skillId : string, stage : string, simulationId : string) : Promise<v2.skill.simulations.SimulationsApiResponse> {
                const apiResponse: ApiResponse = await this.callGetSkillSimulationV2(skillId, stage, simulationId);
                return apiResponse.body as v2.skill.simulations.SimulationsApiResponse;
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
    }
}

