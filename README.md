# n8n-nodes-komga

This is an n8n community node. It lets you use [Komga](https://komga.org/) in your n8n workflows.

Komga is a free and open source media server for your comics, mangas, BDs and magazines. This node provides full integration with the Komga API, allowing you to manage libraries, series, books, collections, and readlists through n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)
[Version History](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

In n8n, go to **Settings** → **Community Nodes** → **Install** and enter:

```
n8n-nodes-komga
```

Or install via npm in your n8n installation directory:

```bash
npm install n8n-nodes-komga
```

## Operations

The Komga node supports the following resources and operations:

### Library

- **Create** - Create a new library
- **Delete** - Delete a library
- **Get** - Get the data of a single library
- **List** - List all libraries
- **Update** - Update a library

### Series

- **Get** - Get the data of a single series by ID
- **List** - List series (with filtering options)

### Book

- **Get** - Get the data of a single book
- **List** - List books (with filtering options)

### Collection

- **Create** - Create a new collection
- **Delete** - Delete a collection
- **Get** - Get the data of a single collection
- **List** - List all collections
- **Update** - Update a collection

### Readlist

- **Create** - Create a new readlist
- **Delete** - Delete a readlist
- **Get** - Get the data of a single readlist
- **List** - List all readlists
- **Update** - Update a readlist

## Credentials

To use this node, you need to configure Komga API credentials. You can authenticate using one of two methods:

### API Key Authentication

1. Log in to your Komga instance
2. Go to **Settings** → **API Keys**
3. Create a new API key or use an existing one
4. In n8n, select **API Key** as the authentication method
5. Enter your Komga instance base URL (e.g., `https://komga.example.com`)
6. Enter your API key

### Basic Authentication

1. In n8n, select **Basic Auth** as the authentication method
2. Enter your Komga instance base URL
3. Enter your Komga username and password

**Note:** The default base URL is set to `https://demo.komga.org` for testing purposes. Make sure to update this with your own Komga instance URL.

## Compatibility

- **Minimum n8n version:** 1.0.0
- **Komga API version:** v1 (compatible with Komga 0.160.0+)

This node has been tested with:

- n8n 1.0.0 and later
- Komga 0.160.0 and later

## Usage

### Example Workflows

**Automate Library Management:**

- Create a library when a new folder is detected
- Update library metadata from external sources
- Monitor library health and send notifications

**Series and Book Management:**

- List all series in a library
- Get book details for processing
- Filter books by metadata or status

**Collection and Readlist Automation:**

- Create collections based on tags or metadata
- Automatically generate readlists from external sources
- Update collection metadata in bulk

### Tips

- Use the **List** operations to retrieve all items, then filter or process them in subsequent nodes
- The node supports dynamic expressions, so you can use data from previous nodes in your workflow
- For large datasets, consider using pagination options available in List operations

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Komga Documentation](https://komga.org/)
- [Komga API Documentation](https://komga.org/docs/openapi/komga-api)
- [n8n Node Development Guide](https://docs.n8n.io/integrations/creating-nodes/)

## Version History

### 1.0.00

- Initial release
- Support for Library, Series, Book, Collection, and Readlist resources
- API Key and Basic Auth authentication methods
- Full CRUD operations for Library, Collection, and Readlist
- List and Get operations for Series and Book

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE.md)

---

**Author:** Sylvain Cau
**Repository:** [https://github.com/AshDevFr/n8n-nodes-komga](https://github.com/AshDevFr/n8n-nodes-komga)
