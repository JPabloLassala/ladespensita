# ---- Build stage ----
FROM node:20-alpine AS development

WORKDIR /app

# Install deps first (better layer caching)
COPY . .
RUN npm g i yarn;
# pick your installer; default to npm
RUN yarn install --frozen-lockfile;

CMD ["yarn", "start", "--host", "0.0.0.0"]

FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first (better layer caching)
COPY . .
RUN npm g i yarn;

RUN yarn install --frozen-lockfile; 

RUN yarn build

FROM nginx:alpine AS production

# Basic SPA nginx config (handles client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
