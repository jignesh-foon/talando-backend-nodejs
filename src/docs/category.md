## Category

### `/api/category`

`Category List API`

**Method:** `POST`

**Request:**

- `page`: (number). Page number.
- `limit`: (number). Page limit.
- `search`: (string). Search value.
- `sortKey`: (string). Sorting key.
- `sortDirection`: (string). Sorting direction.

Example

```
{
	"page": 1,
	"limit": 10,
	"search": "",
	"sortKey": "",
	"sortDirection": "",
}
```

**Result:** Returns a paginated categories or array of categories.

**Errors:**

- 401 `User is not authorized`

### `/api/category/update`

`Create or Update API`

**Method:** `POST`

**Query Params:** `id=681eed37688426a6c8ed3d2d`

If we pass the query params with id of the category it will perform the update operation.

**Request:**

- `name`: (string). Name of the category.
- `description`: (string). Description of the category.
- `category`: (string). This is the optinal field, if we pass the value it will create child category of the category..

Example

```
{
	"name": "Whisky",
	"description": "One of the finest alchohol",
	"category": "681eed11688426a6c8ed3d2a"
}
```

**Result:** It will returns a `true`

**Errors:**

- 400 `Category is already exists`
- 422 `Name is required`

### `/api/category/delete`

`Delete API`

**Method:** `DELETE`

**Params:** `id=681eed37688426a6c8ed3d2d`

**Result:** It will returns a `true`
