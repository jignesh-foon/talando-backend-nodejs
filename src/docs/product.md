## Product

### `/api/product`

`Product List API`

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

**Result:** Returns a paginated products or array of products.

**Errors:**

- 401 `User is not authorized`

### `/api/product/update`

`Create or Update API`

**Method:** `POST`

**Query Params:** `id=681eed37688426a6c8ed3d2d`

If we pass the query params with id of the product it will perform the update operation.

**Request:**

- `name`: (string). Name of the product.
- `sku`: (string). SKU of the product.
- `description`: (string). short description of the product.
- `additionalDescription`: (string). Long description of the product.
- `code`: (string). Code of the product.
- `media`: (string[]). Image or Video path of the product.
- `category`: (ObjectId). Category of the product.
- `subcategory`: (ObjectId). Subcategory of the product.
- `serialNumber`: (string). Serial number of the product.
- `manufacturer`: (string). Manufacture of the product.
- `modelno`: (string). Model no of the product.
- `specification`: (string). Specification of the product.
- `prize`: (string). Selling prize of the product.
- `cost`: (string). Cost of the product.
- `size`: (string). Size of the product.
- `notes`: (string). Notes of the product.
- `unit`: (string). Unit of size of the product.
- `quantity`: (number). Quantity of the product.
- `remarks`: (string). Remarks of the product.
- `featured`: (boolean). Product is featured or not.

Example

```
{
	"name": "Ballantines Finest 100 Cl",
	"sku": "Ballantines Finest 100 Cl",
	"description": "Ballantines Finest 100CL : Ballantine’s Finest is the oldest recipe in the current range, created in 1910 by the Ballantine’s family. There are more than 40 malts and grains in this blend. These are carefully selected from 4 different iconic Scottish regions.",
	"additionalDescription": "",
	"code": "02N02077",
	"media": [],
	"category": "681eed11688426a6c8ed3d2a",
	"subcategory": "681f0697d369428e9a4839be",
	"serialNumber": "",
	"manufacturer": "Ballantines",
	"modelno": "",
	"specification": "Ballantines Finest 100 Cl",
	"prize": 0,
	"cost": 0,
	"size": "",
	"notes": "",
	"unit": "",
	"quantity": 0,
	"remarks": "",
	"featured": false
}
```

**Result:** It will returns a `true`

**Errors:**

- 400 `Product is already exists`
- 422 `Name is required` | `SKU is required` | `Code is required`

### `/api/product`

`Delete API`

**Method:** `GET`

**Query Params:** `id=681eed37688426a6c8ed3d2d`

**Result:** It will returns a `product details`

### `/api/product/delete`

`Delete API`

**Method:** `DELETE`

**Params:** `id=681eed37688426a6c8ed3d2d`

**Result:** It will returns `true`
