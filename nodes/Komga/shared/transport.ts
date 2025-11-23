import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function komgaApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {
	const options: IHttpRequestOptions = {
		method: method,
		qs,
		body,
		url: resource,
		json: true,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'komgaApi', options);
}

