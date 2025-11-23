import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLibraryUpdate = {
	operation: ['update'],
	resource: ['library'],
};

export const libraryUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'The name of the library',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Root',
		name: 'root',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'The root path of the library',
		routing: {
			send: {
				type: 'body',
				property: 'root',
			},
		},
	},
	{
		displayName: 'Analyze Dimensions',
		name: 'analyzeDimensions',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to analyze image dimensions',
		routing: {
			send: {
				type: 'body',
				property: 'analyzeDimensions',
			},
		},
	},
	{
		displayName: 'Convert to CBZ',
		name: 'convertToCbz',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to convert files to CBZ format',
		routing: {
			send: {
				type: 'body',
				property: 'convertToCbz',
			},
		},
	},
	{
		displayName: 'Empty Trash After Scan',
		name: 'emptyTrashAfterScan',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to empty trash after scanning',
		routing: {
			send: {
				type: 'body',
				property: 'emptyTrashAfterScan',
			},
		},
	},
	{
		displayName: 'Hash Files',
		name: 'hashFiles',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to hash files',
		routing: {
			send: {
				type: 'body',
				property: 'hashFiles',
			},
		},
	},
	{
		displayName: 'Hash Koreader',
		name: 'hashKoreader',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to hash for Koreader',
		routing: {
			send: {
				type: 'body',
				property: 'hashKoreader',
			},
		},
	},
	{
		displayName: 'Hash Pages',
		name: 'hashPages',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to hash pages',
		routing: {
			send: {
				type: 'body',
				property: 'hashPages',
			},
		},
	},
	{
		displayName: 'Import Barcode ISBN',
		name: 'importBarcodeIsbn',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import barcode ISBN',
		routing: {
			send: {
				type: 'body',
				property: 'importBarcodeIsbn',
			},
		},
	},
	{
		displayName: 'Import ComicInfo Book',
		name: 'importComicInfoBook',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import ComicInfo.xml for books',
		routing: {
			send: {
				type: 'body',
				property: 'importComicInfoBook',
			},
		},
	},
	{
		displayName: 'Import ComicInfo Collection',
		name: 'importComicInfoCollection',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import ComicInfo.xml for collections',
		routing: {
			send: {
				type: 'body',
				property: 'importComicInfoCollection',
			},
		},
	},
	{
		displayName: 'Import ComicInfo ReadList',
		name: 'importComicInfoReadList',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import ComicInfo.xml for readlists',
		routing: {
			send: {
				type: 'body',
				property: 'importComicInfoReadList',
			},
		},
	},
	{
		displayName: 'Import ComicInfo Series',
		name: 'importComicInfoSeries',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import ComicInfo.xml for series',
		routing: {
			send: {
				type: 'body',
				property: 'importComicInfoSeries',
			},
		},
	},
	{
		displayName: 'Import ComicInfo Series Append Volume',
		name: 'importComicInfoSeriesAppendVolume',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to append volume to series when importing ComicInfo',
		routing: {
			send: {
				type: 'body',
				property: 'importComicInfoSeriesAppendVolume',
			},
		},
	},
	{
		displayName: 'Import EPUB Book',
		name: 'importEpubBook',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import EPUB metadata for books',
		routing: {
			send: {
				type: 'body',
				property: 'importEpubBook',
			},
		},
	},
	{
		displayName: 'Import EPUB Series',
		name: 'importEpubSeries',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import EPUB metadata for series',
		routing: {
			send: {
				type: 'body',
				property: 'importEpubSeries',
			},
		},
	},
	{
		displayName: 'Import Local Artwork',
		name: 'importLocalArtwork',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import local artwork',
		routing: {
			send: {
				type: 'body',
				property: 'importLocalArtwork',
			},
		},
	},
	{
		displayName: 'Import Mylar Series',
		name: 'importMylarSeries',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to import Mylar metadata for series',
		routing: {
			send: {
				type: 'body',
				property: 'importMylarSeries',
			},
		},
	},
	{
		displayName: 'Oneshots Directory',
		name: 'oneshotsDirectory',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Directory for oneshot comics',
		routing: {
			send: {
				type: 'body',
				property: 'oneshotsDirectory',
			},
		},
	},
	{
		displayName: 'Repair Extensions',
		name: 'repairExtensions',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to repair file extensions',
		routing: {
			send: {
				type: 'body',
				property: 'repairExtensions',
			},
		},
	},
	{
		displayName: 'Scan CBX',
		name: 'scanCbx',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to scan CBX files',
		routing: {
			send: {
				type: 'body',
				property: 'scanCbx',
			},
		},
	},
	{
		displayName: 'Scan Directory Exclusions',
		name: 'scanDirectoryExclusions',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Directories to exclude from scanning',
		routing: {
			send: {
				type: 'body',
				property: 'scanDirectoryExclusions',
			},
		},
	},
	{
		displayName: 'Scan EPUB',
		name: 'scanEpub',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to scan EPUB files',
		routing: {
			send: {
				type: 'body',
				property: 'scanEpub',
			},
		},
	},
	{
		displayName: 'Scan Force Modified Time',
		name: 'scanForceModifiedTime',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to force modified time scanning',
		routing: {
			send: {
				type: 'body',
				property: 'scanForceModifiedTime',
			},
		},
	},
	{
		displayName: 'Scan Interval',
		name: 'scanInterval',
		type: 'options',
		options: [
			{
				name: 'Daily',
				value: 'DAILY',
			},
			{
				name: 'Disabled',
				value: 'DISABLED',
			},
			{
				name: 'Every 12 Hours',
				value: 'EVERY_12H',
			},
			{
				name: 'Every 6 Hours',
				value: 'EVERY_6H',
			},
			{
				name: 'Hourly',
				value: 'HOURLY',
			},
			{
				name: 'Weekly',
				value: 'WEEKLY',
			},
		],
		default: 'DISABLED',
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'scanInterval',
			},
		},
	},
	{
		displayName: 'Scan on Startup',
		name: 'scanOnStartup',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to scan on startup',
		routing: {
			send: {
				type: 'body',
				property: 'scanOnStartup',
			},
		},
	},
	{
		displayName: 'Scan PDF',
		name: 'scanPdf',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Whether to scan PDF files',
		routing: {
			send: {
				type: 'body',
				property: 'scanPdf',
			},
		},
	},
	{
		displayName: 'Series Cover',
		name: 'seriesCover',
		type: 'options',
		options: [
			{
				name: 'First',
				value: 'FIRST',
			},
			{
				name: 'First Unread or First',
				value: 'FIRST_UNREAD_OR_FIRST',
			},
			{
				name: 'First Unread or Last',
				value: 'FIRST_UNREAD_OR_LAST',
			},
			{
				name: 'Last',
				value: 'LAST',
			},
		],
		default: 'FIRST',
		displayOptions: {
			show: showOnlyForLibraryUpdate,
		},
		description: 'Which cover to use for series',
		routing: {
			send: {
				type: 'body',
				property: 'seriesCover',
			},
		},
	},
];

