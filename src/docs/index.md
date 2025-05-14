# Talando API

This is the assignment of the build the REST API of the products in an online store. Implemented the authentication mechanism using JWT. It will contains the `User`, `Category`, `Product` modules etc.

## API Structure

| folders      | description                                                                                     |
| :----------- | :---------------------------------------------------------------------------------------------- |
| `api`        | API folder contains the controllers, routes and it's services                                   |
| `config`     | Config files contains default configuration and environments values                             |
| `constants`  | Contains all the constant values like errors, messages.                                         |
| `docs`       | Docs folder contains the documentation of the API                                               |
| `interfaces` | Interfaces folder contains the model interfaces of the schema                                   |
| `loaders`    | Loaders folder contains all the default loading items, like database, express, and dependencies |
| `models`     | Models contains all the schema & model for the APIs                                             |
| `tests`      | Tests contains the test cases of the API                                                        |
| `types`      | Custom types for the project                                                                    |
| `Utils`      | Utils contains the utility like handler, multer, logger, redis etc.                             |
| `worker`     | Redis job workers for the handling queues.                                                      |

### APIs

- [Authentication](./authentication.md)
- [Category](./category.md)
- [Product](./product.md)
- [Media](./media.md)

### Authentication Mechanism

For authentication `JWT` is used.
