# Build Stage 1
FROM node:22-alpine AS build
WORKDIR /repo

RUN corepack enable

# Copy workspace + lockfiles
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Copy apps + packages
COPY apps ./apps
COPY packages ./packages
COPY services ./services

# Install dependencies for apps/main
RUN pnpm install --filter ./apps/main...

# Copy the rest of the project
# COPY . ./

# Build the project
WORKDIR /repo/apps/main
RUN pnpm run build

# Build Stage 2: Minimal image with only nodejs and output
FROM alpine:3.22
WORKDIR /app

# Install just the Node.js runtime (no npm, no dev tools)
RUN apk add --no-cache nodejs

# Copy the built output
COPY --from=build /repo/apps/main/.output/ ./

# Expose port
EXPOSE 3000

# Run the Nuxt server
CMD ["node", "/app/server/index.mjs"]