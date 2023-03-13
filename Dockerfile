FROM node:16-alpine3.16 as dist

WORKDIR /usr/src/app
ENV PORT=8080
# ENV DATABASE_URL=
# ENV JwtSignKey=
COPY ./ ./

# Fixing prisma ssl error
RUN apk add --update libc6-compat openssl openssl-dev

RUN npm install
RUN npm run prisma:generate
RUN npm run build:prod
EXPOSE 8080
CMD [ "npm", "run", "start" ]