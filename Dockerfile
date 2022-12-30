FROM node:lts-alpine3.16

WORKDIR /usr/src/app

COPY ./ ./

# Fixing prisma ssl error
RUN apk add --update libc6-compat openssl openssl-dev

RUN npm install
RUN npm run prisma:generate
RUN npm run build

EXPOSE 3333
CMD ["npm", "run", "server"]