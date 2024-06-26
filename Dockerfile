FROM node:18-alpine3.17 as builder
WORKDIR /build
COPY package*.json ./
RUN npm install -g --quiet pnpm && pnpm install --ignore-scripts
COPY . ./
RUN pnpm prisma generate && pnpm build

# app
FROM node:18-alpine3.17 as app
WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
CMD [ "node", "dist/src/main.js" ]