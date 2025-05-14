import supertest from "supertest";
import httpStatus from "http-status";
import { IServiceResponse } from "../interfaces/IUtils";
import { PaginateResult } from "mongoose";
import { IProduct } from "../interfaces/IProduct";
import { ERRORS } from "../constants/errors";

const request = supertest("http://localhost:5000/api");
let token: string = null;

beforeAll(async () => {
  let payload = {
    username: "test.user@gmail.com",
    password: "admin@123",
  };

  let result = await request.post("/auth/login").send(payload);
  let response: IServiceResponse<string> = JSON.parse(result.text);
  token = `Bearer ${response.data}`;
});

afterAll(async () => {
  await request.get("/auth/logout").set("Authorization", token);
});

describe("Product", () => {
  let payload = {
    page: 1,
    limit: 10,
  };
  let _id: string = null;

  describe("List", () => {
    test("Should fetch all the records of the products", async () => {
      let response = await request
        .post("/product")
        .send(payload)
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<IProduct> | IProduct[]> =
        JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
    });

    test("Should search the the products", async () => {
      let response = await request
        .post("/product")
        .send({ ...payload, search: "Whisky" })
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<IProduct> | IProduct[]> =
        JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
    });

    test("Should check authorization for products API", async () => {
      await request
        .post("/product")
        .send(payload)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe("Update", () => {
    let requestpayload = {
      name: "test product",
      sku: "TEST_PRODUCT",
      code: "TEST_PRODUCT",
      description: "Test product",
    };

    test("Should create a new product", async () => {
      let response = await request
        .post("/product/update")
        .send(requestpayload)
        .set("Authorization", token);
      let result: IServiceResponse<boolean> = JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.CREATED);
      expect(result.data).toBeTruthy();
    });

    test("Should validate the request", async () => {
      await request
        .post("/product/update")
        .send({})
        .set("Authorization", token)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);
    });

    test("Should update the product", async () => {
      let response = await request
        .post("/product")
        .send({ ...payload, search: requestpayload.name })
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<IProduct>> = JSON.parse(
        response.text
      );
      _id = result.data.docs[0]._id as string;
      await request
        .post(`/product/update`)
        .query({ id: _id })
        .send(requestpayload)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });
  });

  describe("Details", () => {
    test("Should fetch the product details", async () => {
      let response = await request
        .get("/product")
        .query({ id: _id })
        .set("Authorization", token);
      let result: IServiceResponse<IProduct> = JSON.parse(response.text);

      expect(result.status).toBe(httpStatus.OK);
      expect(result.data._id).toBe(_id);
    });

    test("Should not fetch the product details", () => {
      request
        .get("/product")
        .query({ id: "681f0697d369428e9a4839be" })
        .set("Authorization", token)
        .expect(httpStatus.BAD_REQUEST)
        .end((error, res) => {
          expect(res.text).toContain(ERRORS.PRODUCT_NOT_FOUND);
        });
    });
  });

  describe("Delete", () => {
    test("Should delete the product", async () => {
      await request
        .delete(`/product/delete/${_id}`)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });

    test("Should permanent delete the product", async () => {
      await request
        .delete(`/product/delete/${_id}`)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });
  });
});
