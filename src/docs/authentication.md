## Authentication

### `/api/auth/register`

`Register API`

**Method:** `POST`

**Request:**

- `firstName`: (string). Firstname of the user.
- `lastName`: (string). Lastname of the user.
- `username`: (string). Username of the user.
- `password`: (string). Password of the user.
- `email`: (string). Email of the user.
- `phone`: (object). Phone no of the user with country code.
  - code: (string)
  - no: (string)
- `role`: (string). Role of the user.

Example

```
{
    "firstName": "Jignesh",
    "lastName": "Foon",
    "username": "jignesh.foon",
    "password":"admin@123",
    "email": "jignesh.foon@gmail.com",
    "phone": {
        "code": "+91",
        "no": "9714209234"
    },
    "role": "Administrator"
}
```

**Result:** User registered themselves, returns a `true`.

**Errors:**

- 400 `User already exist`

### `/api/auth/login`

`Login API`

**Method:** `POST`

**Request:**

- `username`: (string). Username of the user, It will accept `username`, `email`, and `phone.no`.
- `password`: (string). Password of the user.

Example

```
{
    "username": "jignesh.foon",
    "password":"admin@123",
}
```

**Result:** It will returns a `token`

**Errors:**

- 400 `Username or Password incorrect, Please check credentials.`
- 422 `Username is required` | `Password is required`

### `/api/auth/verify`

`Verify API`

**Method:** `GET`

**Result:** It will returns a `userId`

**Errors:**

- 401 `User is not authorized`

### `/api/auth/logout`

`Logout API`

**Method:** `GET`

**Result:** It will returns a `true`

**Errors:**

- 401 `User is not authorized`
