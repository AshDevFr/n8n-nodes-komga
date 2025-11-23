# Docker Compose Setup for Development

This setup provides a complete development environment with n8n and Komga running in Docker containers, with automatic rebuilding and hot-reloading of the Komga node using Docker Compose's native watch feature.

## Prerequisites

- Docker and Docker Compose v2.22+ (required for watch feature)
- Node.js 22+ (for local development, if needed)

## Directory Structure

The setup expects the following directory structure:

```
.
├── docker-compose.yml
├── nodes/              # Source TypeScript files
├── credentials/        # Source credential files
├── dist/               # Built JavaScript files (auto-generated)
├── data/
│   └── komga/
│       └── libraries/  # Your comics library (create if needed)
└── package.json
```

Create the `data/komga/libraries` directory if you want to add comics:

```bash
mkdir -p data/komga/libraries
```

## Quick Start

1. **Start all services with watch mode:**

   ```bash
   docker-compose watch
   ```

   Or for detached mode:

   ```bash
   docker-compose up -d --watch
   ```

2. **Access the services:**
   - n8n: http://localhost:5678
     - Username: `admin`
     - Password: `admin`
   - Komga: http://localhost:25600

3. **The services will automatically:**
   - **Build service:** Installs dependencies, builds the node, and watches source files for changes
   - **n8n service:** Watches the `dist/` folder and restarts when built files change
   - Changes to source files trigger a rebuild, which updates `dist/`, which triggers n8n restart

## Development Workflow

1. **Start the services:**

   ```bash
   docker-compose watch
   ```

2. **Make changes** to your node code in `nodes/` or `credentials/`

3. **Automatic rebuild process:**
   - Docker Compose watch detects file changes
   - **Build service:** Syncs source files → TypeScript watch rebuilds → Outputs to `dist/`
   - **n8n service:** Detects changes in `dist/` → Restarts → Loads updated node

4. **Test your changes** in the n8n UI at http://localhost:5678

**Note:** The first build may take a minute to install dependencies. Subsequent changes are much faster.

## Services

### Komga

- **Port:** 25600
- **Data:** Persisted in `komga-data` volume
- **Libraries:** Mounted from `./data/komga/libraries` (read-only mount)
  - Create this directory and add your comics here
  - Access Komga UI at http://localhost:25600 to configure libraries

### n8n

- **Port:** 5678
- **Data:** Persisted in `n8n-data` volume
- **Custom Nodes:** The `dist/` folder is mounted to `/home/node/.n8n/custom/n8n-nodes-komga`
- **Authentication:** Basic auth enabled (admin/admin)
- **Watch:** Monitors `dist/` folder and restarts when built files change

### Build Service

- **Watch:** Monitors source files (`nodes/`, `credentials/`, `package.json`, `tsconfig.json`) for changes
- **Sync:** Automatically syncs source files into the container
- **Rebuild:** TypeScript compiler runs in watch mode (`npm run build:watch`) and rebuilds on changes
- **Output:** Built files go to `dist/` which is mounted to n8n
- **Restart:** Service restarts when `package.json` or `tsconfig.json` change (to pick up new dependencies/config)

## Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f build
docker-compose logs -f n8n
docker-compose logs -f komga
```

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v
```

## Customizing Environment

To customize n8n settings (e.g., disable auth, enable debug logging), you can:

1. **Edit `docker-compose.yml` directly** - Modify the `n8n` service environment variables
2. **Use a `.env` file** - Create a `.env` file and reference variables in `docker-compose.yml`

Example to disable auth and enable debug logging:

```yaml
# In docker-compose.yml, modify n8n service environment:
environment:
  - N8N_BASIC_AUTH_ACTIVE=false
  - NODE_ENV=development
  - N8N_LOG_LEVEL=debug
```

## Troubleshooting

### Node doesn't appear in n8n

1. Check that the build completed successfully: `docker-compose logs build`
2. Verify the dist folder is mounted: `docker-compose exec n8n ls -la /home/node/.n8n/custom/`
3. Restart n8n: `docker-compose restart n8n`

### Build errors

1. Check the build service logs: `docker-compose logs build`
2. Ensure dependencies are installed: `docker-compose exec build npm install`

### Watch not working

1. Ensure you're using Docker Compose v2.22+ (check with `docker-compose version`)
2. Make sure you're running with `docker-compose watch` or `docker-compose up --watch`
3. Check that file changes are being detected: `docker-compose logs build`
4. Verify the watch configuration is correct: `docker-compose config`

### n8n restarts too frequently

If n8n restarts on every source file change (instead of only when `dist/` changes):

- Check that n8n's watch is configured to only watch `./dist`
- Verify the build service is outputting to `dist/` correctly
- Check logs: `docker-compose logs n8n` to see what's triggering restarts

### Komga not accessible

1. Check health status: `docker-compose ps`
2. View logs: `docker-compose logs komga`
3. Ensure port 25600 is not in use

## Mounting Your Comics Library

The Komga libraries directory is configured at `./data/komga/libraries` (read-only mount). To add your comics:

1. **Create the directory** (if it doesn't exist):

   ```bash
   mkdir -p data/komga/libraries
   ```

2. **Add your comics** to `./data/komga/libraries/`

3. **Access Komga UI** at http://localhost:25600 and configure the library in the web UI

**Alternative:** To use a different location, modify the volume mount in `docker-compose.yml`:

```yaml
# In komga service volumes, replace:
- ./data/komga/libraries:/libraries:ro
# With:
- /path/to/your/comics:/libraries:ro
```

## Manual Rebuild

If you need to manually trigger a rebuild:

```bash
docker-compose exec build npm run build
```

## Using npm scripts

For convenience, you can also use the npm scripts:

```bash
# Start with watch mode (recommended for development)
npm run docker:up:watch

# Start without watch
npm run docker:up

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

## How Watch Works

The watch system uses Docker Compose's native watch feature:

1. **Build Service Watch:**
   - `sync` actions: Copy source files (`nodes/`, `credentials/`, `package.json`, `tsconfig.json`) into the container
   - `restart` actions: Restart the service when `package.json` or `tsconfig.json` change (to reinstall dependencies)

2. **n8n Service Watch:**
   - `restart` action: Restart n8n when files in `dist/` change

3. **Flow:**
   ```
   Source file change → Build service syncs → TypeScript rebuilds → dist/ updates → n8n restarts
   ```

This ensures n8n only restarts when the actual built files change, not on every source file edit.
