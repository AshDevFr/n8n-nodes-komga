import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesThumbnailDelete = {
	operation: ['thumbnailDelete'],
	resource: ['series'],
};

export const seriesThumbnailDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Thumbnail ID',
		name: 'thumbnailId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSeriesThumbnailDelete,
		},
		description: 'ID of the thumbnail to delete',
	},
];
