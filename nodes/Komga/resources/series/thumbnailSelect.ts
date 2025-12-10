import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesThumbnailSelect = {
	operation: ['thumbnailSelect'],
	resource: ['series'],
};

export const seriesThumbnailSelectDescription: INodeProperties[] = [
	{
		displayName: 'Thumbnail ID',
		name: 'thumbnailId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSeriesThumbnailSelect,
		},
		description: 'ID of the thumbnail to mark as selected',
	},
];
