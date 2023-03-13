FROM node:16-alpine3.16 as node

# Builder container
FROM node as builder

WORKDIR /app
COPY ./ ./

# Fixing prisma ssl error
RUN apk add --update libc6-compat openssl openssl-dev

RUN npm install
RUN npm run prisma:generate
RUN npm run build:prod

# Produced artifact
FROM node as final

ENV NODE_ENV production
ENV PORT=8080
# ENV DATABASE_URL=
# ENV JwtSignKey=

# Copying necessary files
RUN mkdir -p /app/dist
WORKDIR /usr/src/app
COPY package*.json ./
COPY process.yml ./
COPY ./prisma ./prisma

# Fixing prisma ssl error
RUN apk add --update libc6-compat openssl openssl-dev

# Building
RUN npm i --only=production
RUN npm run prisma:generate

COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist

RUN npm i -g pm2

EXPOSE 8080
# CMD [ "npm", "run", "start" ]
CMD ["pm2-runtime", "./process.yml"]