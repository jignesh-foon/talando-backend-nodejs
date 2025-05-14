export default {
  openapi: "3.0.4",
  info: {
    title: "Talado",
    version: "1.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  schemes: ["http"],
  components: {
    schemas: {
      registration: {
        title: "Registration",
        type: "object",
        properties: {
          firstname: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              no: {
                type: "string",
              },
            },
          },
          role: {
            type: "string",
          },
        },
      },
      login: {
        title: "Login",
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      category: {
        title: "Category",
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          category: {
            type: "string",
          },
        },
      },
      product: {
        title: "Product",
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          sku: {
            type: "string",
          },
          description: {
            type: "string",
          },
          additionalDescription: {
            type: "string",
          },
          code: {
            type: "string",
          },
          media: {
            type: "array",
          },
          category: {
            type: "string",
          },
          subcategory: {
            type: "string",
          },
          serialNumber: {
            type: "string",
          },
          manufacturer: {
            type: "string",
          },
          modelno: {
            type: "string",
          },
          specification: {
            type: "string",
          },
          prize: {
            type: "number",
          },
          cost: {
            type: "number",
          },
          size: {
            type: "string",
          },
          notes: {
            type: "string",
          },
          status: {
            type: "string",
          },
          unit: {
            type: "string",
          },
          quantity: {
            type: "number",
          },
          remarks: {
            type: "string",
          },
          featured: {
            type: "string",
          },
        },
      },
      upload: {
        title: "Upload media",
        type: "object",
        properties: {
          media: {
            type: "string",
            format: "binary",
          },
          type: {
            type: "string",
          },
        },
      },
      remove: {
        title: "Remove media",
        type: "object",
        properties: {
          path: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
      listrequest: {
        title: "Common List Request",
        type: "object",
        properties: {
          page: {
            type: "number",
          },
          limit: {
            type: "number",
          },
          sortKey: {
            type: "string",
          },
          sortDirection: {
            type: "string",
          },
          search: {
            type: "string",
          },
          filters: {
            type: "object",
          },
        },
      },
      paginatedresponse: {
        title: "Paginated Response",
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          success: {
            type: "boolean",
          },
          data: {
            type: "object",
            properties: {
              docs: {
                type: "array",
              },
              totalDocs: {
                type: "number",
              },
              limit: {
                type: "number",
              },
              totalPages: {
                type: "number",
              },
              page: {
                type: "number",
              },
              pagingCounter: {
                type: "number",
              },
              hasPrevPage: {
                type: "boolean",
              },
              hasNextPage: {
                type: "boolean",
              },
              prevPage: {
                type: "number",
              },
              nextPage: {
                type: "number",
              },
            },
          },
          message: {
            type: "string",
          },
        },
      },
      booleanresponse: {
        title: "Common Response",
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          success: {
            type: "boolean",
          },
          data: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
        },
      },
      stringresponse: {
        title: "Common Response",
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          success: {
            type: "boolean",
          },
          data: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
      error: {
        title: "Common Error Response",
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          success: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      BearerAuthentication: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuthentication: [],
    },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Registration",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/registration",
              },
              example: {
                firstName: "Jignesh",
                lastName: "Foon",
                username: "jignesh.foon",
                password: "admin@123",
                email: "jignesh.foon@gmail.com",
                phone: {
                  code: "+91",
                  no: "9714209234",
                },
                role: "Administrator",
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "User registered successfully.",
                },
              },
            },
          },
          "400": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "User already exist",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Firstname is required",
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/registration",
              },
              example: {
                username: "jignesh.foon@gmail.com",
                password: "admin@123",
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/stringresponse",
                },
                example: {
                  data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFlMDQ4YmI5MTZlOTMyMjM1ZDNmYjIiLCJpYXQiOjE3NDcxMzIwODksImV4cCI6MTc0NzE2ODA4OX0.VW5mcIW2l4Ks4dI1rpBZCiUg3RN0_NH7zyE8tyB98YM",
                  message: "User loggedin successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "400": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message:
                    "Username or Password incorrect, Please check credentials.",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Username is required",
                },
              },
            },
          },
        },
      },
    },
    "/auth/verify": {
      get: {
        tags: ["Authentication"],
        summary: "Verify",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/stringresponse",
                },
                example: {
                  data: "681e048bb916e932235d3fb2",
                  message: "User verified successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "User is not authorized",
                },
              },
            },
          },
        },
      },
    },
    "/auth/logout": {
      get: {
        tags: ["Authentication"],
        summary: "Logout",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  data: true,
                  message: "User logout successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
        },
      },
    },
    "/category": {
      post: {
        tags: ["Category"],
        summary: "List",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/listrequest",
              },
              example: {
                page: 1,
                limit: 10,
                search: "",
                sortKey: "",
                sortDirection: "",
                filters: {},
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/paginatedresponse",
                },
                example: {
                  data: {
                    docs: [
                      {
                        _id: "681eed11688426a6c8ed3d2a",
                        name: "Liquor",
                        description: "The alchohol content",
                        image: null,
                        children: [
                          {
                            _id: "681f0697d369428e9a4839be",
                            name: "Whisky",
                            description: "One of the finest alchohol",
                            image: null,
                          },
                        ],
                      },
                    ],
                    totalDocs: 1,
                    limit: 10,
                    totalPages: 1,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null,
                  },
                  message: "Categories fetched successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
        },
      },
    },
    "/category/update": {
      post: {
        tags: ["Category"],
        summary: "Create or Update",
        parameters: [
          {
            in: "query",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/category",
              },
              example: {
                name: "Whisky",
                description: "One of the finest alchohol",
                category: "681eed11688426a6c8ed3d2a",
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Category created successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Name is required",
                },
              },
            },
          },
        },
      },
    },
    "/category/delete/{id}": {
      delete: {
        tags: ["Category"],
        summary: "Delete",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Category deleted successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Name is required",
                },
              },
            },
          },
        },
      },
    },
    "/product": {
      post: {
        tags: ["Product"],
        summary: "List",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/listrequest",
              },
              example: {
                page: 1,
                limit: 10,
                search: "",
                sortKey: "",
                sortDirection: "",
                filters: {},
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/paginatedresponse",
                },
                example: {
                  data: {
                    docs: [
                      {
                        _id: "681eed11688426a6c8ed3d2a",
                        name: "Liquor",
                        description: "The alchohol content",
                        image: null,
                        children: [
                          {
                            _id: "68207c0504f02ef86347476e",
                            name: "Johnnie Walker Black Label 100 Cl",
                            sku: "Johnnie Walker Black Label 100 Cl",
                            description:
                              "Johnnie Walker Black Label 100CL: Johnnie Walker Black Label is an Iconic Blend, recognized as the benchmark for all other deluxe blends. Created using only Scotch Whiskies aged for a minimum of 12 years from the four corners of Scotland, Johnnie Walker Black Label has an unmistakably smooth, deep, complex character. An impressive Blended Scotch Whisky to share on any occasion, whether you're entertaining at home with friends or on a memorable night out. We recommend Johnnie Walker Black Label on the rocks. (Fill a rocks glass with ice cubes + Add 1.5 oz ml of Johnnie Walker Black Label + Enjoy)",
                            additionalDescription: null,
                            code: "02N01010",
                            media: [
                              "/images/products/ConnectivityDestinations_1747049202884.jpg",
                            ],
                            serialNumber: null,
                            manufacturer: "Johnnie Walker",
                            modelno: null,
                            specification: "Black Label 100 Cl",
                            prize: 0,
                            cost: 0,
                            size: null,
                            notes: null,
                            unit: null,
                            quantity: "0",
                            remarks: null,
                            featured: false,
                            isDeleted: false,
                            createdBy: "681e048bb916e932235d3fb2",
                            updatedBy: "681e048bb916e932235d3fb2",
                            createdAt: "2025-05-11T10:29:25.977Z",
                            updatedAt: "2025-05-12T11:35:03.878Z",
                            __v: 0,
                          },
                        ],
                      },
                    ],
                    totalDocs: 1,
                    limit: 10,
                    totalPages: 1,
                    page: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null,
                  },
                  message: "Products fetched successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Product"],
        summary: "Details",
        parameters: [
          {
            in: "query",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/paginatedresponse",
                },
                example: {
                  data: {
                    _id: "681eed11688426a6c8ed3d2a",
                    name: "Liquor",
                    description: "The alchohol content",
                    image: null,
                    children: [
                      {
                        _id: "68207c0504f02ef86347476e",
                        name: "Johnnie Walker Black Label 100 Cl",
                        sku: "Johnnie Walker Black Label 100 Cl",
                        description:
                          "Johnnie Walker Black Label 100CL: Johnnie Walker Black Label is an Iconic Blend, recognized as the benchmark for all other deluxe blends. Created using only Scotch Whiskies aged for a minimum of 12 years from the four corners of Scotland, Johnnie Walker Black Label has an unmistakably smooth, deep, complex character. An impressive Blended Scotch Whisky to share on any occasion, whether you're entertaining at home with friends or on a memorable night out. We recommend Johnnie Walker Black Label on the rocks. (Fill a rocks glass with ice cubes + Add 1.5 oz ml of Johnnie Walker Black Label + Enjoy)",
                        additionalDescription: null,
                        code: "02N01010",
                        media: [
                          "/images/products/ConnectivityDestinations_1747049202884.jpg",
                        ],
                        serialNumber: null,
                        manufacturer: "Johnnie Walker",
                        modelno: null,
                        specification: "Black Label 100 Cl",
                        prize: 0,
                        cost: 0,
                        size: null,
                        notes: null,
                        unit: null,
                        quantity: "0",
                        remarks: null,
                        featured: false,
                        isDeleted: false,
                        createdBy: "681e048bb916e932235d3fb2",
                        updatedBy: "681e048bb916e932235d3fb2",
                        createdAt: "2025-05-11T10:29:25.977Z",
                        updatedAt: "2025-05-12T11:35:03.878Z",
                        __v: 0,
                      },
                    ],
                  },
                  message: "Product details fetched successfully.",
                  status: 200,
                  success: true,
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "400": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Product not found.",
                },
              },
            },
          },
        },
      },
    },
    "/product/update": {
      post: {
        tags: ["Product"],
        summary: "Create or Update",
        parameters: [
          {
            in: "query",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/product",
              },
              example: {
                name: "Ballantines Finest 100 Cl",
                sku: "Ballantines Finest 100 Cl",
                description:
                  "Ballantines Finest 100CL : Ballantine’s Finest is the oldest recipe in the current range, created in 1910 by the Ballantine’s family. There are more than 40 malts and grains in this blend. These are carefully selected from 4 different iconic Scottish regions.",
                additionalDescription: "",
                code: "02N02077",
                media: [],
                category: "681eed11688426a6c8ed3d2a",
                subcategory: "681f0697d369428e9a4839be",
                serialNumber: "",
                manufacturer: "Ballantines",
                modelno: "",
                specification: "Ballantines Finest 100 Cl",
                prize: 0,
                cost: 0,
                size: "",
                notes: "",
                status: "",
                unit: "",
                quantity: 0,
                remarks: "",
                featured: false,
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Product created successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Name is required",
                },
              },
            },
          },
        },
      },
    },
    "/product/delete/{id}": {
      delete: {
        tags: ["Product"],
        summary: "Delete",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Product deleted successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 400,
                  message: "Name is required",
                },
              },
            },
          },
        },
      },
    },
    "/media/upload/{id}": {
      post: {
        tags: ["Media"],
        summary: "Upload",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/upload",
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Media uploaded successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 422,
                  message: "Please select the file",
                },
              },
            },
          },
        },
      },
    },
    "/media/delete/{id}": {
      post: {
        tags: ["Media"],
        summary: "Upload",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/remove",
              },
              example: {
                type: "product",
                path: "/images/products/chennai-int-logo_1747049202885.svg",
              },
            },
          },
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/booleanresponse",
                },
                example: {
                  success: true,
                  status: 200,
                  data: true,
                  message: "Media removed successfully.",
                },
              },
            },
          },
          "401": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 401,
                  message: "User is not authorized",
                },
              },
            },
          },
          "422": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  success: false,
                  status: 422,
                  message: "Please select the file",
                },
              },
            },
          },
        },
      },
    },
  },
};
