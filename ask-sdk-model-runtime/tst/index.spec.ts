import { expect } from 'chai';
import * as nock from 'nock';
import { ApiClient, ApiClientRequest, ApiClientResponse, createUserAgent, DefaultApiClient, LwaServiceClient } from '../lib/index';
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
            body: null,
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
                                body: undefined,
                                });
    });

    it('should not serialize the request body when content type header is not application/json', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: null,
        };
        const client = new MockServiceClient(apiClient);

        const result = await client.invokePublic(
            '',
            '',
            '',
            emptyParamsMap,
            emptyQueryParams,
            [{key: 'Content-type', value: 'text/csv'}],
            'nonJson body',
            emptyErrorsMap,
        );

        expect(apiClient.request.url).eq('');
        expect(apiClient.request.method).eq('');
        expect(apiClient.request.body).eq('nonJson body');
        expect(result).deep.eq({headers: [],
                                statusCode: 200,
                                body: undefined,
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

    it('should invoke request interceptors', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };

        let called = false;
        const requestInterceptor = () => {
            called = true;
        };

        let calledPromise = false;
        const requestInterceptorPromise = (): Promise<void> => {
            return new Promise((resolve) => {
                calledPromise = true;
                resolve();
            });
        };
        const client = new MockServiceClient(apiClient);

        client.withRequestInterceptors(requestInterceptor, requestInterceptorPromise);

        await client.invokePublic(
            '',
            'fake://url',
            '/some/',
            emptyParamsMap,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(called).eq(true);
        expect(calledPromise).eq(true);
    });

    it('should invoke response interceptors', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body: JSON.stringify({k1 : 'v1'}),
        };

        let called = false;
        const responseInterceptor = () => {
            called = true;
        };

        let calledPromise = false;
        const responseInterceptorPromise = () : Promise<void> => {
            return new Promise((resolve) => {
                calledPromise = true;
                resolve();
            });
        };
        const client = new MockServiceClient(apiClient);
        client.withResponseInterceptors(responseInterceptor, responseInterceptorPromise);

        await client.invokePublic(
            '',
            'fake://url',
            '/some/',
            emptyParamsMap,
            emptyQueryParams,
            [],
            null,
            emptyErrorsMap,
        );
        expect(called).eq(true);
        expect(calledPromise).eq(true);
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

    it('should call custom auth endpoint', async() => {
        const apiClient = new MockApiClient();
        apiClient.response = {
            statusCode : 200,
            headers : [],
            body : JSON.stringify({}),
        };

        const client = new LwaServiceClient({
            authenticationConfiguration : {
                clientSecret : 'mockSecret',
                clientId : 'mockId',
                refreshToken: 'mockRefreshToken',
                authEndpoint: 'https://someendpoint.com'
            },
            apiConfiguration : {
                apiClient,
                apiEndpoint : null,
                authorizationValue : null,
            },
            grantType: 'refresh_token',
        });

        await client.getAccessToken();

        expect(apiClient.request.url).eq('https://someendpoint.com/auth/O2/token');
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
                authenticationConfiguration : {
                    clientId: null,
                    clientSecret: null,
                },
                apiConfiguration : {
                    apiClient,
                    apiEndpoint : null,
                    authorizationValue : null,
                },
            });
            await client.getAccessTokenForScope('alexa:test_scope');
        } catch (err) {
            expect(err.message).eq(`Required parameter accessTokenRequest didn't specify clientId or clientSecret`);

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

describe('DefaultApiClient', () => {
    const testHttpUrl : string  = 'http://dummy.com';
    const testHttpsUrl : string  = 'https://dummy.com';
    let apiClient : ApiClient;

    before(() => {
        apiClient = new DefaultApiClient();
    });

    it('should be able to send POST request', async() => {
        const request : ApiClientRequest = {
            body : 'Test POST Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'},
            ],
            method : 'POST',
            url : testHttpUrl,
        };

        const apiFake = nock(testHttpUrl)
            .matchHeader('k1', 'v1,k2')
            .post('/', 'Test POST Message')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2'],
            });

        const response : ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send GET request', async() => {
        const request : ApiClientRequest = {
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'},
            ],
            method : 'GET',
            url : testHttpUrl,
        };

        const apiFake = nock(testHttpUrl)
            .matchHeader('k1', 'v1,k2')
            .get('/')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2'],
            });

        const response : ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send DELETE request', async() => {
        const request : ApiClientRequest = {
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'},
            ],
            method : 'DELETE',
            url : testHttpsUrl,
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .delete('/')
            .reply(200, 'Success', {
                v1 : ['k_1', 'k_2'],
            });

        const response : ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
        expect(response.headers[1]).deep.equal({key : 'v1', value : 'k_2'});
    });

    it('should be able to send PUT request', async() => {
        const request : ApiClientRequest = {
            body : 'Test PUT Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'},
            ],
            method : 'PUT',
            url : testHttpsUrl,
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .put('/', 'Test PUT Message')
            .reply(200, 'Success', {
                v1 : 'k_1',
            });

        const response : ApiClientResponse = await apiClient.invoke(request);

        expect(apiFake.isDone()).equal(true);
        expect(response.statusCode).equal(200);
        expect(response.body).equal('Success');
        expect(response.headers[0]).deep.equal({key : 'v1', value : 'k_1'});
    });

    it('should throw an error if API has returned an error', async() => {
        const request : ApiClientRequest = {
            body : 'Test PUT Message',
            headers : [
                {key : 'k1', value : 'v1'},
                {key : 'k1', value : 'k2'},
            ],
            method : 'PUT',
            url : testHttpsUrl,
        };

        const apiFake = nock(testHttpsUrl)
            .matchHeader('k1', 'v1,k2')
            .put('/', 'Test PUT Message')
            .replyWithError('UnknownError');

        try {
            await apiClient.invoke(request);
        } catch (err) {
            expect(apiFake.isDone()).equal(true);
            expect(err.name).equal('AskSdkModelRuntime.DefaultApiClient Error');
            expect(err.message).equal('UnknownError');

            return;
        }

        throw new Error('should have thrown an error!');
    });
});

describe('Utils', () => {

    it('should be able to create user agent string', () => {
        const userAgent = createUserAgent('2.0.0', undefined);

        expect(userAgent).equal(`ask-node-model/2.0.0 Node/${process.version}`);
    });

    it('should be able to create user agent string with custom user agent', () => {
        const userAgent = createUserAgent('2.0.0', 'custom user agent');

        expect(userAgent).equal(`ask-node-model/2.0.0 Node/${process.version} custom user agent`);
    });
});
