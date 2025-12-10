import type { INodeProperties } from 'n8n-workflow';
import { seriesSelect } from '../../shared/descriptions';
import { seriesListDescription } from './list';
import { seriesGetDescription } from './get';
import { seriesLatestDescription } from './latest';
import { seriesNewDescription } from './new';
import { seriesUpdatedDescription } from './updated';
import { seriesReleaseDatesDescription } from './releaseDates';
import { seriesAlphabeticalGroupsDescription } from './alphabeticalGroups';
import { seriesAnalyzeDescription } from './analyze';
import { seriesCollectionsDescription } from './collections';
import { seriesFileDeleteDescription } from './fileDelete';
import { seriesMetadataUpdateDescription } from './metadataUpdate';
import { seriesMetadataRefreshDescription } from './metadataRefresh';
import { seriesMarkReadDescription } from './markRead';
import { seriesMarkUnreadDescription } from './markUnread';
import { seriesThumbnailDescription } from './thumbnail';
import { seriesThumbnailsDescription } from './thumbnails';
import { seriesThumbnailAddDescription } from './thumbnailAdd';
import { seriesThumbnailDeleteDescription } from './thumbnailDelete';
import { seriesThumbnailGetDescription } from './thumbnailGet';
import { seriesThumbnailSelectDescription } from './thumbnailSelect';

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
				name: 'Analyze',
				value: 'analyze',
				action: 'Analyze a series',
				description: 'Trigger analysis for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/series/{{$parameter.seriesId}}/analyze',
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
						url: '=/api/v1/series/{{$parameter.seriesId}}',
					},
				},
			},
			{
				name: 'Get Collections',
				value: 'collections',
				action: 'Get series collections',
				description: 'List all collections for a series',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/series/{{$parameter.seriesId}}/collections',
					},
				},
			},
			{
				name: 'Get Thumbnail',
				value: 'thumbnail',
				action: 'Get series thumbnail',
				description: 'Get the poster image for a series',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnail',
					},
					output: {
						postReceive: [
							{
								type: 'binaryData',
								properties: {
									destinationProperty: 'data',
								},
							},
						],
					},
				},
			},
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
					send: {
						preSend: [
							async function (this, requestOptions) {
								const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;

								// Ensure body is always an object
								if (!requestOptions.body || typeof requestOptions.body !== 'object') {
									requestOptions.body = {};
								}

								// Type assertion: after initialization, body is a Record
								const body = requestOptions.body as Record<string, unknown>;

								// Handle full text search (not part of condition)
								if (
									filters.fullTextSearch &&
									typeof filters.fullTextSearch === 'string' &&
									filters.fullTextSearch.length > 0
								) {
									body.fullTextSearch = filters.fullTextSearch;
								}

								// Workaround: n8n strips empty bodies, so we need to stringify it manually
								// when the body is empty to ensure it's sent as '{}'
								if (Object.keys(body).length === 0) {
									// Convert to string to prevent n8n from stripping it
									requestOptions.body = '{}' as unknown as Record<string, unknown>;
									// Make sure we don't double-encode
									requestOptions.json = false;
									// Set content-type manually
									if (!requestOptions.headers) {
										requestOptions.headers = {};
									}
									(requestOptions.headers as Record<string, string>)['Content-Type'] =
										'application/json';
								}

								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'List Alphabetical Groups',
				value: 'alphabeticalGroups',
				action: 'List series alphabetical groups',
				description: 'List series grouped by first character',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/series/list/alphabetical-groups',
						body: {},
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								const filters = this.getNodeParameter('filters', 0, {}) as Record<string, unknown>;

								// Ensure body is always an object
								if (!requestOptions.body || typeof requestOptions.body !== 'object') {
									requestOptions.body = {};
								}

								// Type assertion: after initialization, body is a Record
								const body = requestOptions.body as Record<string, unknown>;

								// Handle full text search (not part of condition)
								if (
									filters.fullTextSearch &&
									typeof filters.fullTextSearch === 'string' &&
									filters.fullTextSearch.length > 0
								) {
									body.fullTextSearch = filters.fullTextSearch;
								}

								// Workaround: n8n strips empty bodies
								if (Object.keys(body).length === 0) {
									requestOptions.body = '{}' as unknown as Record<string, unknown>;
									requestOptions.json = false;
									if (!requestOptions.headers) {
										requestOptions.headers = {};
									}
									(requestOptions.headers as Record<string, string>)['Content-Type'] =
										'application/json';
								}

								return requestOptions;
							},
						],
					},
				},
			},
			{
				name: 'List Latest',
				value: 'latest',
				action: 'List latest series',
				description: 'List recently added or updated series',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/series/latest',
					},
				},
			},
			{
				name: 'List New',
				value: 'new',
				action: 'List new series',
				description: 'List newly added series',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/series/new',
					},
				},
			},
			{
				name: 'List Release Dates',
				value: 'releaseDates',
				action: 'List series release dates',
				description: 'List release dates for series',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/series/release-dates',
					},
				},
			},
			{
				name: 'List Thumbnails',
				value: 'thumbnails',
				action: 'List series thumbnails',
				description: 'List all poster images for a series',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnails',
					},
				},
			},
			{
				name: 'List Updated',
				value: 'updated',
				action: 'List updated series',
				description: 'List recently updated series (not newly added)',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/series/updated',
					},
				},
			},
			{
				name: 'Mark as Read',
				value: 'markRead',
				action: 'Mark series as read',
				description: 'Mark all books in series as read',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/series/{{$parameter.seriesId}}/read-progress',
					},
				},
			},
			{
				name: 'Mark as Unread',
				value: 'markUnread',
				action: 'Mark series as unread',
				description: 'Mark all books in series as unread',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/series/{{$parameter.seriesId}}/read-progress',
					},
				},
			},
			{
				name: 'Delete File',
				value: 'fileDelete',
				action: 'Delete series files',
				description: 'Delete all book files for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/series/{{$parameter.seriesId}}/file',
					},
				},
			},
			{
				name: 'Delete Thumbnail',
				value: 'thumbnailDelete',
				action: 'Delete series thumbnail',
				description: 'Delete a specific thumbnail for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnails/{{$parameter.thumbnailId}}',
					},
				},
			},
			{
				name: 'Get Thumbnail by ID',
				value: 'thumbnailGet',
				action: 'Get specific series thumbnail',
				description: 'Get a specific thumbnail image by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnails/{{$parameter.thumbnailId}}',
					},
					output: {
						postReceive: [
							{
								type: 'binaryData',
								properties: {
									destinationProperty: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Refresh Metadata',
				value: 'metadataRefresh',
				action: 'Refresh series metadata',
				description: 'Trigger metadata refresh for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/series/{{$parameter.seriesId}}/metadata/refresh',
					},
				},
			},
			{
				name: 'Select Thumbnail',
				value: 'thumbnailSelect',
				action: 'Select series thumbnail',
				description: 'Mark a thumbnail as selected for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnails/{{$parameter.thumbnailId}}/selected',
					},
				},
			},
			{
				name: 'Update Metadata',
				value: 'metadataUpdate',
				action: 'Update series metadata',
				description: 'Update metadata for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/series/{{$parameter.seriesId}}/metadata',
					},
				},
			},
			{
				name: 'Upload Thumbnail',
				value: 'thumbnailAdd',
				action: 'Upload series thumbnail',
				description: 'Upload a new poster image for a series (requires ADMIN role)',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/series/{{$parameter.seriesId}}/thumbnails',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								const itemIndex = 0;
								const binaryPropertyName =
									(this.getNodeParameter('binaryPropertyName', itemIndex) as string) || 'data';

								// Get binary data using n8n helpers (property name first, then item index)
								const binaryData = this.helpers.assertBinaryData(binaryPropertyName, itemIndex);
								const buffer = await this.helpers.getBinaryDataBuffer(
									binaryPropertyName,
									itemIndex,
								);

								// Build multipart boundary
								const boundary = `----n8nFormBoundary${Date.now()}${Math.random().toString(36)}`;

								// Build multipart body manually
								const parts: Buffer[] = [];
								const textEncoder = new TextEncoder();

								// Add file field
								const fileName = binaryData.fileName || 'thumbnail';
								const mimeType = binaryData.mimeType || 'image/jpeg';

								parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
								parts.push(
									Buffer.from(
										textEncoder.encode(
											`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`,
										),
									),
								);
								parts.push(Buffer.from(textEncoder.encode(`Content-Type: ${mimeType}\r\n\r\n`)));
								parts.push(buffer);
								parts.push(Buffer.from(textEncoder.encode('\r\n')));

								// End boundary
								parts.push(Buffer.from(textEncoder.encode(`--${boundary}--\r\n`)));

								// Combine all parts
								const body = Buffer.concat(parts);

								// Set request options with proper multipart/form-data headers
								requestOptions.body = body;
								requestOptions.headers = {
									...requestOptions.headers,
									'Content-Type': `multipart/form-data; boundary=${boundary}`,
									'Content-Length': body.length.toString(),
								};
								requestOptions.json = false;

								return requestOptions;
							},
						],
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
				operation: [
					'analyze',
					'collections',
					'fileDelete',
					'get',
					'markRead',
					'markUnread',
					'metadataRefresh',
					'metadataUpdate',
					'thumbnail',
					'thumbnailAdd',
					'thumbnailDelete',
					'thumbnailGet',
					'thumbnailSelect',
					'thumbnails',
				],
			},
		},
	},
	...seriesListDescription,
	...seriesGetDescription,
	...seriesLatestDescription,
	...seriesNewDescription,
	...seriesUpdatedDescription,
	...seriesReleaseDatesDescription,
	...seriesAlphabeticalGroupsDescription,
	...seriesAnalyzeDescription,
	...seriesCollectionsDescription,
	...seriesFileDeleteDescription,
	...seriesMetadataUpdateDescription,
	...seriesMetadataRefreshDescription,
	...seriesMarkReadDescription,
	...seriesMarkUnreadDescription,
	...seriesThumbnailDescription,
	...seriesThumbnailsDescription,
	...seriesThumbnailAddDescription,
	...seriesThumbnailDeleteDescription,
	...seriesThumbnailGetDescription,
	...seriesThumbnailSelectDescription,
];
