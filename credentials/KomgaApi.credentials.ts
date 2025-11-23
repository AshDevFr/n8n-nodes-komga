import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class KomgaApi implements ICredentialType {
	name = 'komgaApi';

	displayName = 'Komga API';

	icon: Icon = 'file:../icons/komga-light.svg';

	documentationUrl = 'https://komga.org/docs/openapi/komga-api';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://demo.komga.org',
			description: 'The base URL of your Komga instance',
			placeholder: 'https://demo.komga.org',
		},
		{
			displayName: 'Authentication Method',
			name: 'authenticationMethod',
			type: 'options',
			options: [
				{
					name: 'API Key',
					value: 'apiKey',
				},
				{
					name: 'Basic Auth',
					value: 'basicAuth',
				},
			],
			default: 'apiKey',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationMethod: ['apiKey'],
				},
			},
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					authenticationMethod: ['basicAuth'],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationMethod: ['basicAuth'],
				},
			},
		},
	];

	// authenticate: IAuthenticateGeneric = {
	// 	type: 'generic',
	// 	properties: {
	// 		headers: {
	// 			'X-API-Key':
	// 				'={{$credentials?.authenticationMethod === "apiKey" ? $credentials?.apiKey : undefined}}',
	// 		},
	// 		auth: {
	// 			username:
	// 				'={{$credentials?.authenticationMethod === "basicAuth" ? $credentials?.username : undefined}}',
	// 			password:
	// 				'={{$credentials?.authenticationMethod === "basicAuth" ? $credentials?.password : undefined}}',
	// 		},
	// 	},
	// };

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const authenticationMethod = credentials.authenticationMethod as string;

		if (authenticationMethod === 'apiKey') {
			requestOptions.headers = {
				...requestOptions.headers,
				'X-API-Key': credentials.apiKey as string,
			};
		} else if (authenticationMethod === 'basicAuth') {
			requestOptions.auth = {
				username: credentials.username as string,
				password: credentials.password as string,
			};
		}

		return requestOptions;
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/api/v2/users/me',
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		},
	};
}
