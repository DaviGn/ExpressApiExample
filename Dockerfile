ARG PORT=8080
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
ENV PORT=${PORT}
ENV DATABASE_URL="postgresql://postgres:pLRh3ZpOAjV8QPW@ecommerce.cv9qoyrrucel.sa-east-1.rds.amazonaws.com:5432/ecommerce"
ENV JwtSignKey="662e01137fa34edcaa0c55ca3143a906"

# Copying necessary files
RUN mkdir -p /app/dist
WORKDIR /usr/src/app
COPY package*.json ./
COPY process.yml ./
COPY ./prisma ./prisma
COPY .env ./

# Fixing prisma ssl error
RUN apk add --update libc6-compat openssl openssl-dev

# Building
RUN npm i --only=production
RUN npm run prisma:generate
COPY --from=builder /app/dist ./dist

RUN npm i -g pm2

EXPOSE ${PORT}
# CMD [ "npm", "run", "start" ]
CMD ["pm2-runtime", "./process.yml"]