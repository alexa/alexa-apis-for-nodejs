/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

'use strict';

import { ApiConfiguration, BaseServiceClient, DefaultApiClient } from '../../lib';

export class MockServiceClient extends BaseServiceClient {
    public constructor(apiClient : DefaultApiClient) {
        const apiConfiguration : ApiConfiguration = {
            apiClient,
            apiEndpoint : 'fake://url/',
            authorizationValue : undefined,
        };

        super(apiConfiguration);
    }

    public invokePublic(method : string,
                        endpoint : string,
                        path : string,
                        pathParams : Map<string, string>,
                        queryParams : Array<{ key : string, value : string }>,
                        headerParams : Array<{key : string, value : string }>,
                        bodyParam : any,
                        errors : Map<number, string>,
                        nonJsonBody? : boolean,
    ) : Promise<any> {
        return this.invoke(method, endpoint, path, pathParams, queryParams, headerParams, bodyParam, errors, nonJsonBody);
    }
}
