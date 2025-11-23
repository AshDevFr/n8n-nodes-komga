import type { INodeProperties } from 'n8n-workflow';
import { seriesSelect } from '../../shared/descriptions';
import { seriesListDescription } from './list';
import { seriesGetDescription } from './get';

const showOnlyForSeries = {
	resource: ['series'],
};

export const seriesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSeries,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List series',
				description: 'List series',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/series/list',
						body: {},
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a series by ID',
				description: 'Get the data of a single series',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/series/{{$parameter.seriesId}}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...seriesSelect,
		displayOptions: {
			show: {
				...showOnlyForSeries,
				operation: ['get'],
			},
		},
	},
	...seriesListDescription,
	...seriesGetDescription,
];
