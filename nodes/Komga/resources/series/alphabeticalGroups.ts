import type { INodeProperties } from 'n8n-workflow';
import {
	buildMultiValueCondition,
	buildNumericCondition,
	buildBooleanCondition,
	buildStringCondition,
	buildEnumCondition,
} from '../../shared/utils';

const showOnlyForSeriesAlphabeticalGroups = {
	operation: ['alphabeticalGroups'],
	resource: ['series'],
};

export const seriesAlphabeticalGroupsDescription: INodeProperties[] = [
	{
		displayName: 'Condition Operator',
		name: 'conditionOperator',
		type: 'options',
		displayOptions: {
			show: showOnlyForSeriesAlphabeticalGroups,
		},
		options: [
			{
				name: 'All Of (AND)',
				value: 'allOf',
				description: 'All conditions must match',
			},
			{
				name: 'Any Of (OR)',
				value: 'anyOf',
				description: 'At least one condition must match',
			},
		],
		default: 'allOf',
		description: 'How to combine multiple filter conditions',
		hint: 'Use "All Of" when you want results matching ALL filters, or "Any Of" when results can match ANY filter',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForSeriesAlphabeticalGroups,
		},
		default: {},
		options: [
			{
				displayName: 'Age Rating',
				name: 'ageRating',
				type: 'number',
				default: 0,
				description: 'Filter by age rating (numeric value)',
				routing: {
					send: {
						preSend: [buildNumericCondition('ageRating')],
					},
				},
			},
			{
				displayName: 'Age Rating Operator',
				name: 'ageRatingOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
					{
						name: 'Greater Than',
						value: 'GreaterThan',
					},
					{
						name: 'Less Than',
						value: 'LessThan',
					},
				],
				default: 'Is',
				description: 'Operator to use for age rating filter',
			},
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Filter by author (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('author')],
					},
				},
			},
			{
				displayName: 'Author Multi Operator',
				name: 'authorMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Author Operator',
				name: 'authorOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for author filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Filter by collection ID (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('collectionId')],
					},
				},
			},
			{
				displayName: 'Collection ID Multi Operator',
				name: 'collectionIdMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Collection ID Operator',
				name: 'collectionIdOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for collection ID filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Complete',
				name: 'complete',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by complete status',
				routing: {
					send: {
						preSend: [buildBooleanCondition('complete')],
					},
				},
			},
			{
				displayName: 'Deleted',
				name: 'deleted',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by deleted status',
				routing: {
					send: {
						preSend: [buildBooleanCondition('deleted')],
					},
				},
			},
			{
				displayName: 'Full Text Search',
				name: 'fullTextSearch',
				type: 'string',
				default: '',
				description: 'Full text search term',
				routing: {
					send: {
						type: 'body',
						property: 'fullTextSearch',
						value: '={{ $value && $value.length > 0 ? $value : undefined }}',
					},
				},
			},
			{
				displayName: 'Genre',
				name: 'genre',
				type: 'string',
				default: '',
				description: 'Filter by genre (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('genre')],
					},
				},
			},
			{
				displayName: 'Genre Multi Operator',
				name: 'genreMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Genre Operator',
				name: 'genreOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for genre filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Filter by language (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('language')],
					},
				},
			},
			{
				displayName: 'Language Multi Operator',
				name: 'languageMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Language Operator',
				name: 'languageOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for language filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Library ID',
				name: 'libraryId',
				type: 'string',
				default: '',
				description: 'Filter by library ID (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('libraryId')],
					},
				},
			},
			{
				displayName: 'Library ID Multi Operator',
				name: 'libraryIdMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Library ID Operator',
				name: 'libraryIdOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for library ID filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'One Shot',
				name: 'oneshot',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by one shot status',
				routing: {
					send: {
						preSend: [buildBooleanCondition('oneshot')],
					},
				},
			},
			{
				displayName: 'Publisher',
				name: 'publisher',
				type: 'string',
				default: '',
				description: 'Filter by publisher (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('publisher')],
					},
				},
			},
			{
				displayName: 'Publisher Multi Operator',
				name: 'publisherMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Publisher Operator',
				name: 'publisherOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for publisher filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Read Status',
				name: 'readStatus',
				type: 'options',
				options: [
					{
						name: 'Unread',
						value: 'UNREAD',
					},
					{
						name: 'Read',
						value: 'READ',
					},
					{
						name: 'In Progress',
						value: 'IN_PROGRESS',
					},
				],
				default: 'UNREAD',
				description: 'Filter by read status',
				routing: {
					send: {
						preSend: [buildEnumCondition('readStatus')],
					},
				},
			},
			{
				displayName: 'Series Status',
				name: 'seriesStatus',
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
				description: 'Filter by series status',
				routing: {
					send: {
						preSend: [buildEnumCondition('seriesStatus')],
					},
				},
			},
			{
				displayName: 'Sharing Label',
				name: 'sharingLabel',
				type: 'string',
				default: '',
				description: 'Filter by sharing label (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('sharingLabel')],
					},
				},
			},
			{
				displayName: 'Sharing Label Multi Operator',
				name: 'sharingLabelMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Sharing Label Operator',
				name: 'sharingLabelOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for sharing label filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter by tag (comma-separated for multiple values)',
				routing: {
					send: {
						preSend: [buildMultiValueCondition('tag')],
					},
				},
			},
			{
				displayName: 'Tag Multi Operator',
				name: 'tagMultiOperator',
				type: 'options',
				options: [
					{
						name: 'Any Of (OR)',
						value: 'anyOf',
						description: 'Match any value',
					},
					{
						name: 'All Of (AND)',
						value: 'allOf',
						description: 'Match all values',
					},
				],
				default: 'anyOf',
				description: 'How to combine multiple comma-separated values',
				hint: 'Only applies when using comma-separated values',
			},
			{
				displayName: 'Tag Operator',
				name: 'tagOperator',
				type: 'options',
				options: [
					{
						name: 'Is',
						value: 'Is',
					},
					{
						name: 'Is Not',
						value: 'IsNot',
					},
				],
				default: 'Is',
				description: 'Operator to use for tag filter',
				hint: 'Applied to each value when using comma-separated values',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Filter by title',
				routing: {
					send: {
						preSend: [buildStringCondition('title')],
					},
				},
			},
			{
				displayName: 'Title Sort',
				name: 'titleSort',
				type: 'string',
				default: '',
				description: 'Filter by sort title',
				routing: {
					send: {
						preSend: [buildStringCondition('titleSort')],
					},
				},
			},
		],
	},
];
