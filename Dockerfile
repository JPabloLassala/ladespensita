FROM node:22-alpine3.20 AS development

WORKDIR /app

COPY --chown=node:node . .

RUN yarn

EXPOSE 5173

# Command to run the application
CMD ["yarn", "start"]

FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build

USER node

FROM nginx:1.27-alpine AS production

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
