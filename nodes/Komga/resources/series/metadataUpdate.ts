import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSeriesMetadataUpdate = {
	operation: ['metadataUpdate'],
	resource: ['series'],
};

export const seriesMetadataUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: showOnlyForSeriesMetadataUpdate,
		},
		default: {},
		options: [
			{
				displayName: 'Age Rating',
				name: 'ageRating',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'ageRating',
					},
				},
			},
			{
				displayName: 'Age Rating Lock',
				name: 'ageRatingLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the age rating field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'ageRatingLock',
					},
				},
			},
			{
				displayName: 'Alternate Titles',
				name: 'alternateTitles',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Alternate titles for the series',
				options: [
					{
						displayName: 'Alternate Title',
						name: 'alternateTitle',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								required: true,
								default: '',
								description: 'Label for the alternate title (e.g., "Original", "English")',
							},
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								required: true,
								default: '',
								description: 'The alternate title',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'alternateTitles',
						preSend: [
							async function (this, requestOptions) {
								const updateFields = this.getNodeParameter('updateFields', 0, {}) as Record<
									string,
									unknown
								>;
								const alternateTitles = updateFields.alternateTitles as
									| { alternateTitle?: Array<{ label: string; title: string }> }
									| undefined;

								if (alternateTitles?.alternateTitle) {
									if (!requestOptions.body || typeof requestOptions.body !== 'object') {
										requestOptions.body = {};
									}
									(requestOptions.body as Record<string, unknown>).alternateTitles =
										alternateTitles.alternateTitle;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Alternate Titles Lock',
				name: 'alternateTitlesLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the alternate titles field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'alternateTitlesLock',
					},
				},
			},
			{
				displayName: 'Genres',
				name: 'genres',
				type: 'string',
				default: '',
				description: 'Comma-separated list of genres',
				routing: {
					send: {
						type: 'body',
						property: 'genres',
						value: '={{ $value ? $value.split(",").map(v => v.trim()) : undefined }}',
					},
				},
			},
			{
				displayName: 'Genres Lock',
				name: 'genresLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the genres field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'genresLock',
					},
				},
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Language code (e.g., en, fr, ja)',
				routing: {
					send: {
						type: 'body',
						property: 'language',
					},
				},
			},
			{
				displayName: 'Language Lock',
				name: 'languageLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the language field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'languageLock',
					},
				},
			},
			{
				displayName: 'Links',
				name: 'links',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Web links related to the series',
				options: [
					{
						displayName: 'Link',
						name: 'link',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								required: true,
								default: '',
								description: 'Label for the link (e.g., "Official Site", "Wikipedia")',
							},
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'links',
						preSend: [
							async function (this, requestOptions) {
								const updateFields = this.getNodeParameter('updateFields', 0, {}) as Record<
									string,
									unknown
								>;
								// Skip if linksRaw is provided (it will handle merging)
								if (
									updateFields.linksRaw !== undefined &&
									updateFields.linksRaw !== null &&
									updateFields.linksRaw !== ''
								) {
									return requestOptions;
								}

								const links = updateFields.links as
									| { link?: Array<{ label: string; url?: string }> }
									| undefined;

								if (links?.link) {
									if (!requestOptions.body || typeof requestOptions.body !== 'object') {
										requestOptions.body = {};
									}
									(requestOptions.body as Record<string, unknown>).links = links.link;
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Links Lock',
				name: 'linksLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the links field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'linksLock',
					},
				},
			},
			{
				displayName: 'Links Raw',
				name: 'linksRaw',
				type: 'json',
				default: '',
				description:
					'Links as a JSON array of objects with label and URL properties. Can be used with expressions for dynamic links. Example: [{"label": "Official Site", "URL": "https://example.com"}]',
				routing: {
					send: {
						type: 'body',
						property: 'links',
						preSend: [
							async function (this, requestOptions) {
								const updateFields = this.getNodeParameter('updateFields', 0, {}) as Record<
									string,
									unknown
								>;
								const linksRaw = updateFields.linksRaw;
								const links = updateFields.links as
									| { link?: Array<{ label: string; url?: string }> }
									| undefined;

								const allLinks: Array<{ label: string; url?: string }> = [];

								// Collect links from fixedCollection
								if (links?.link && Array.isArray(links.link)) {
									allLinks.push(...links.link);
								}

								// Collect links from linksRaw
								if (linksRaw !== undefined && linksRaw !== null && linksRaw !== '') {
									let parsedLinks: Array<{ label: string; url?: string }> | undefined;

									// If it's already an array, use it directly
									if (Array.isArray(linksRaw)) {
										parsedLinks = linksRaw as Array<{ label: string; url?: string }>;
									} else if (typeof linksRaw === 'string') {
										// Try to parse as JSON string
										try {
											const parsed = JSON.parse(linksRaw);
											if (Array.isArray(parsed)) {
												parsedLinks = parsed;
											}
										} catch {
											// If parsing fails, ignore
										}
									}

									if (parsedLinks) {
										allLinks.push(...parsedLinks);
									}
								}

								// Remove duplicates based on URL (case-insensitive)
								if (allLinks.length > 0) {
									const seenUrls = new Set<string>();
									const uniqueLinks = allLinks.filter((link) => {
										const url = link.url?.toLowerCase().trim() || '';
										if (!url || seenUrls.has(url)) {
											return false;
										}
										seenUrls.add(url);
										return true;
									});

									if (uniqueLinks.length > 0) {
										if (!requestOptions.body || typeof requestOptions.body !== 'object') {
											requestOptions.body = {};
										}
										(requestOptions.body as Record<string, unknown>).links = uniqueLinks;
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Publisher',
				name: 'publisher',
				type: 'string',
				default: '',
				description: 'Publisher name',
				routing: {
					send: {
						type: 'body',
						property: 'publisher',
					},
				},
			},
			{
				displayName: 'Publisher Lock',
				name: 'publisherLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the publisher field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'publisherLock',
					},
				},
			},
			{
				displayName: 'Reading Direction',
				name: 'readingDirection',
				type: 'options',
				options: [
					{
						name: 'Left to Right',
						value: 'LEFT_TO_RIGHT',
					},
					{
						name: 'Right to Left',
						value: 'RIGHT_TO_LEFT',
					},
					{
						name: 'Vertical',
						value: 'VERTICAL',
					},
					{
						name: 'Webtoon',
						value: 'WEBTOON',
					},
				],
				default: 'LEFT_TO_RIGHT',
				routing: {
					send: {
						type: 'body',
						property: 'readingDirection',
					},
				},
			},
			{
				displayName: 'Reading Direction Lock',
				name: 'readingDirectionLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the reading direction field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'readingDirectionLock',
					},
				},
			},
			{
				displayName: 'Sharing Labels',
				name: 'sharingLabels',
				type: 'string',
				default: '',
				description: 'Comma-separated list of sharing labels',
				routing: {
					send: {
						type: 'body',
						property: 'sharingLabels',
						value: '={{ $value ? $value.split(",").map(v => v.trim()) : undefined }}',
					},
				},
			},
			{
				displayName: 'Sharing Labels Lock',
				name: 'sharingLabelsLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the sharing labels field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'sharingLabelsLock',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Ended',
						value: 'ENDED',
					},
					{
						name: 'Ongoing',
						value: 'ONGOING',
					},
					{
						name: 'Abandoned',
						value: 'ABANDONED',
					},
					{
						name: 'Hiatus',
						value: 'HIATUS',
					},
				],
				default: 'ONGOING',
				description: 'Series status',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Status Lock',
				name: 'statusLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the status field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'statusLock',
					},
				},
			},
			{
				displayName: 'Summary',
				name: 'summary',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Series summary',
				routing: {
					send: {
						type: 'body',
						property: 'summary',
					},
				},
			},
			{
				displayName: 'Summary Lock',
				name: 'summaryLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the summary field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'summaryLock',
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
						value: '={{ $value ? $value.split(",").map(v => v.trim()) : undefined }}',
					},
				},
			},
			{
				displayName: 'Tags Lock',
				name: 'tagsLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the tags field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'tagsLock',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Series title',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Title Lock',
				name: 'titleLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the title field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'titleLock',
					},
				},
			},
			{
				displayName: 'Title Sort',
				name: 'titleSort',
				type: 'string',
				default: '',
				description: 'Title used for sorting',
				routing: {
					send: {
						type: 'body',
						property: 'titleSort',
					},
				},
			},
			{
				displayName: 'Title Sort Lock',
				name: 'titleSortLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the title sort field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'titleSortLock',
					},
				},
			},
			{
				displayName: 'Total Book Count',
				name: 'totalBookCount',
				type: 'number',
				default: 0,
				description: 'Total number of books in the series',
				routing: {
					send: {
						type: 'body',
						property: 'totalBookCount',
					},
				},
			},
			{
				displayName: 'Total Book Count Lock',
				name: 'totalBookCountLock',
				type: 'boolean',
				default: false,
				description: 'Whether to lock the total book count field to prevent automatic updates',
				routing: {
					send: {
						type: 'body',
						property: 'totalBookCountLock',
					},
				},
			},
		],
	},
];
