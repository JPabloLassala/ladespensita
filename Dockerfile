# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first (better layer caching)
COPY yarn.lock* ./
RUN npm g i yarn;
# pick your installer; default to npm
RUN yarn --frozen-lockfile;

# Copy the rest and build
COPY . .


# Build (make sure your build script runs `vite build`)
RUN yarn build 

# ---- Serve stage ----
FROM nginx:alpine

# Basic SPA nginx config (handles client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
