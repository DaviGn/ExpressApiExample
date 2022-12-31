# About

This is an example of REST api using Express. To run this project follow the instructions below:

-   Install the dependencies

```
npm run install
```

-   Generate Prisma schema

```
npm run prisma:generate
```

Now you can run it! To run the server:

```
dev:server
```

# Running dependencies

This project is set to run with Postgres and Redis. You can run they using Docker.
Run the following to get this dependencies up and running:

```
docker-compose up
```

# Production

To run it as production build, first run:

```
npm run build
```

Now you can run the following:

```
npm run server
```
