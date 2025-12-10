import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesThumbnailAdd = {
	operation: ['thumbnailAdd'],
	resource: ['series'],
};

export const seriesThumbnailAddDescription: INodeProperties[] = [
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: showOnlyForSeriesThumbnailAdd,
		},
		description: 'Name of the binary property containing the image file',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: showOnlyForSeriesThumbnailAdd,
		},
		default: {},
		options: [
			{
				displayName: 'Selected',
				name: 'selected',
				type: 'boolean',
				default: false,
				description: 'Whether to mark this thumbnail as selected',
				routing: {
					send: {
						type: 'query',
						property: 'selected',
					},
				},
			},
		],
	},
];
