# Build stage
FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm i -g typescript
RUN tsc
# Production stage
FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app
COPY --from=build /app /app
CMD ["dist/src/main.js"]
