import type { INodeProperties } from 'n8n-workflow';

export const librarySelect: INodeProperties = {
	displayName: 'Library',
	name: 'libraryId',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. library-id-123',
		},
	],
};

export const seriesSelect: INodeProperties = {
	displayName: 'Series',
	name: 'seriesId',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. series-id-123',
		},
	],
};

export const bookSelect: INodeProperties = {
	displayName: 'Book',
	name: 'bookId',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. book-id-123',
		},
	],
};

export const collectionSelect: INodeProperties = {
	displayName: 'Collection',
	name: 'collectionId',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. collection-id-123',
		},
	],
};

export const readlistSelect: INodeProperties = {
	displayName: 'Readlist',
	name: 'readlistId',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	required: true,
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. readlist-id-123',
		},
	],
};

