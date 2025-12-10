import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesThumbnailGet = {
	operation: ['thumbnailGet'],
	resource: ['series'],
};

export const seriesThumbnailGetDescription: INodeProperties[] = [
	{
		displayName: 'Thumbnail ID',
		name: 'thumbnailId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSeriesThumbnailGet,
		},
		description: 'ID of the thumbnail to retrieve',
	},
];
