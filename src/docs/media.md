## Media

### `/api/media/upload`

`Upload API`

**Method:** `POST`

**Params:** `681eed37688426a6c8ed3d2d`

**Request:**

- `media`: (file[]). Image file.
- `type`: (string). Type of media like product, category, user etc.

Example

```
{
	"media": file,
	"type": "product",
}
```

**Result:** It will returns a `true`

**Errors:**

- 400 `Please select the file`
- 422 `Type is required`

### `/api/media/remove`

`Remove API`

**Method:** `POST`

**Params:** `681eed37688426a6c8ed3d2d`

**Request:**

- `path`: (string). Path of file.
- `type`: (string). Type of media like product, category, user etc.

Example

```
{
	"type": "product",
	"path": "/images/products/chennai-int-logo_1747049202885.svg"
}
```

**Result:** It will returns a `true`

**Errors:**

- 400 `Please select the file`
- 422 `Type is required` | `Path is required`
