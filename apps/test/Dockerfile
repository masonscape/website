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

# Install dependencies for apps/test
RUN pnpm install --filter ./apps/test...

# Optimize build step for GitHub
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the project
WORKDIR /repo/apps/test
RUN pnpm run build


# Build Stage 2: Minimal image with only nodejs and output
FROM nginx:alpine
WORKDIR /app

# Copy the built output
COPY --from=build /repo/apps/test/dist/ /usr/share/nginx/html
COPY --from=build /repo/apps/test/nginx.conf /etc/nginx/conf.d/default.conf