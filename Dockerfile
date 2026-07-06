FROM node:22-alpine3.21 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline

FROM deps AS dev
ENV NODE_ENV=development
# Create cache directories before copying to preserve them
RUN mkdir -p ./.next-local ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

FROM deps AS build
COPY . .
RUN npm run build

FROM node:22-alpine3.21 AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]
