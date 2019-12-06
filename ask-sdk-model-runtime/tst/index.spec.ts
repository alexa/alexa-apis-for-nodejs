import { expect } from 'chai';
import { LwaServiceClient } from '../lib/index';
import { MockApiClient } from './mocks/MockApiClient';
import { MockErrorApiClient } from './mocks/MockErrorApiClient';
import { MockServiceClient } from './mocks/MockServiceClient';

const emptyParamsMap = new Map<string, string>();
const emptyQueryParams : Array<{ key : string, value : string }> = [];
const emptyErrorsMap = new Map<number, string>();

describe('BaseServiceClient', () => {
    it('should make minimal call with undefined body', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            '',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );

        expect(apiClient.request.url).eq('');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result.body).deep.eq({k1 : 'v1'});
    });

    it('should make minimal call with most nulls as parameters', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            '',
            '',
            null,
            null,
            [],
            null,
            null,
        );

        expect(apiClient.request.url).eq('');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should serialize the request body when the request body is JSON object', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            '',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [],
            { k1 : 'v1' },
            emptyErrorsMap,
        );

        expect(apiClient.request.url).eq('');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq('{"k1":"v1"}');
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should not serialize the request body when the request body is not JSON object', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            '',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [],
            'nonJson body',
            emptyErrorsMap,
            true,
        );

        expect(apiClient.request.url).eq('');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq('nonJson body');
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should build url', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            'fake://url',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(apiClient.request.url).eq('fake://url');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should remove the ending / from endpoint', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            'fake://url/',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(apiClient.request.url).eq('fake://url');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should interpolate the path parameters', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const pathParams = new Map<string, string>();
        pathParams.set('path', 'sub');
        pathParams.set('id', '123');

        const result = await client.invokePublic(
            '',
            'fake://url',
            '/some/{path}/{id}/',
            pathParams,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(apiClient.request.url).eq('fake://url/some/sub/123/');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should build url with query string', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const queryParams : Array<{ key : string, value : string }> = [];
        queryParams.push({ key: 'k1', value: 'v1.1' });
        queryParams.push({ key: 'k1', value: 'v1.2' });
        queryParams.push({ key: 'k2', value: 'v2' });

        const result = await client.invokePublic(
            '',
            'fake://url',
            '/some/path',
            emptyParamsMap,
            queryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(apiClient.request.url).eq('fake://url/some/path?k1=v1.1&k1=v1.2&k2=v2');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should build url with path containing query string', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const queryParams : Array<{ key : string, value : string }> = [];
        queryParams.push({ key: 'k1', value: 'v1.1' });
        queryParams.push({ key: 'k1', value: 'v1.2' });
        queryParams.push({ key: 'k2', value: 'v2' });

        const result = await client.invokePublic(
            '',
            'fake://url',
            '/some/path?k0=v0',
            emptyParamsMap,
            queryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(apiClient.request.url).eq('fake://url/some/path?k0=v0&k1=v1.1&k1=v1.2&k2=v2');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq(undefined);
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: {k1 : 'v1'},
                                });
    });

    it('should throw error on failed ApiClientResponse', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 401,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        const errors = new Map<number, string>();
        errors.set(401, 'error message');

        try {
            await client.invokePublic(
                '',
                '',
                '',
                emptyParamsMap,
                emptyQueryParams,
                [],
                null,
                errors,
            );
        } catch (e) {
            expect(e.name).eq('ServiceError');
            expect(e.message).eq('error message');
            expect(e.statusCode).eq(401);
            expect(e.response).deep.eq({k1 : 'v1'});
        }
    });

    it('should throw error with default error message on failed ApiClientResponse if no match found', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 401,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };
        const client = new MockServiceClient(apiClient);

        try {
            await client.invokePublic(
                '',
                '',
                '',
                emptyParamsMap,
                emptyQueryParams,
                [],
                null,
                emptyErrorsMap,
            );
        } catch (e) {
            expect(e.name).eq('ServiceError');
            expect(e.message).eq('Unknown error');
            expect(e.statusCode).eq(401);
            expect(e.response).deep.eq({k1 : 'v1'});
        }
    });

    it('should throw error on invalid JSON response body', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: 'This is a invalid JSON string',
        };
        const client = new MockServiceClient(apiClient);

        try {
            await client.invokePublic(
                '',
                '',
                '',
                emptyParamsMap,
                emptyQueryParams,
                [],
                null,
                emptyErrorsMap,
            );
        } catch (err) {
            expect(err.name).eq('SyntaxError');
            expect(err.message).contains('Failed trying to parse the response body');
        }
    });

    it('should throw error if ApiClient throws error', async() => {
        const apiClient = new MockErrorApiClient();
        const client = new MockServiceClient(apiClient);

        try {
            await client.invokePublic(
                '',
                '',
                '',
                emptyParamsMap,
                emptyQueryParams,
                [],
                null,
                emptyErrorsMap,
            );
        } catch (err) {
            expect(err.name).eq('ApiClientError');
            expect(err.message).eq('Call to service failed: Internal ApiClient Error');
        }
    });
});

describe('LwaServiceClient', () => {
    it('should be able to retrieve access token for given scope', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
        });

        const token = await client.getAccessTokenForScope('alexa:test_scope');

        expect(apiClient.request.url).eq('https://api.amazon.com/auth/O2/token');
        expect(apiClient.request.method).eq('POST');
        expect(apiClient.request.body).eq('grant_type=client_credentials&client_secret=mockSecret&client_id=mockId&scope=alexa:test_scope');
        expect(token).eq('mockToken');
    });

    it('should be able to retrieve access token for given refreshToken', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
                refreshToken: 'mockRefreshToken',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
            grantType: 'refresh_token',
        });

        const token = await client.getAccessToken();

        expect(apiClient.request.url).eq('https://api.amazon.com/auth/O2/token');
        expect(apiClient.request.method).eq('POST');
        expect(apiClient.request.body).eq('grant_type=refresh_token&client_secret=mockSecret&client_id=mockId&refresh_token=mockRefreshToken');
        expect(token).eq('mockToken');
    });

    it('should be able to cache the access token result for given scope', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
        });

        await client.getAccessTokenForScope('alexa:test_scope');
        const token = await client.getAccessTokenForScope('alexa:test_scope');

        expect(apiClient.request.url).eq('https://api.amazon.com/auth/O2/token');
        expect(apiClient.request.method).eq('POST');
        expect(apiClient.request.body).eq('grant_type=client_credentials&client_secret=mockSecret&client_id=mockId&scope=alexa:test_scope');
        expect(token).eq('mockToken');
        expect(apiClient.counter).eq(1);
    });

    it('should throw an error when scope was not provided', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };
        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
        });
        try {
            await client.getAccessTokenForScope(null);
        } catch (err) {
            expect(err.message).eq('Scope cannot be null or undefined.');

            return;
        }

        throw new Error('Should have thrown an error.');
    });

    it('should throw an error when authentication configuration was not provided', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        try {
            const client = new LwaServiceClient({
                authenticationConfiguration : null,
                apiConfiguration : {
                    apiClient,
                    apiEndpoint : null,
                    authorizationValue : null,
                },
            });
        } catch (err) {
            expect(err.message).eq('AuthenticationConfiguration cannot be null or undefined.');

            return;
        }

        throw new Error('Should have thrown an error.');
    });

    it('should throw an error when both scope and refreshToken are specified', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
                refreshToken: 'mockRefreshToken',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
        });
        try {
            await client.getAccessTokenForScope('alexa:test_scope');
        } catch (err) {
            expect(err.message).eq('Cannot support both refreshToken and scope.');

            return;
        }

        throw new Error('Should have thrown an error.');
    });

    it('should throw an error when both scope and refreshToken are not specified', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({
                access_token : 'mockToken',
                scope : 'alexa:test_scope',
                token_type : 'bearer',
                expires_in : 3600,
            }),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
        });
        try {
            await client.getAccessToken();
        } catch (err) {
            expect(err.message).eq('Either refreshToken or scope must be specified.');

            return;
        }

        throw new Error('Should have thrown an error.');
    });
});
