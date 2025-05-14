# Tolando

Tolando API for the assignment

## Installation

**1.** Install the scoped package.

```
npm install
```

**2.** Setup environment file

```
cp env.example .env
```

## Scripts

| npm run | desc                                |
| :------ | :---------------------------------- |
| `start` | Run for the execute the project     |
| `build` | Run for the preparing the build     |
| `test`  | run tests/coverage for all of `src` |

### Docs

- [API Documentation](src/docs/index.md)

### Swagger

```
http://localhost:5000/api/documentation
```

## Docker

**1.** Build and start containers

```
docker-compose up -d
```

**2.** Stop containers

```
docker-compose down
```
