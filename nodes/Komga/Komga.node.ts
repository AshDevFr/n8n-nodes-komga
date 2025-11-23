import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { libraryDescription } from './resources/library';
import { seriesDescription } from './resources/series';
import { bookDescription } from './resources/book';
import { collectionDescription } from './resources/collection';
import { readlistDescription } from './resources/readlist';

export class Komga implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Komga',
		name: 'komga',
		icon: { light: 'file:../../icons/komga-light.svg', dark: 'file:../../icons/komga-dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Komga API',
		defaults: {
			name: 'Komga',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'komgaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Book',
						value: 'book',
					},
					{
						name: 'Collection',
						value: 'collection',
					},
					{
						name: 'Library',
						value: 'library',
					},
					{
						name: 'Readlist',
						value: 'readlist',
					},
					{
						name: 'Series',
						value: 'series',
					},
				],
				default: 'library',
			},
			...libraryDescription,
			...seriesDescription,
			...bookDescription,
			...collectionDescription,
			...readlistDescription,
		],
	};
}
