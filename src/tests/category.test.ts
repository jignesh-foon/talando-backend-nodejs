import supertest from "supertest";
import httpStatus from "http-status";
import { IServiceResponse } from "../interfaces/IUtils";
import { PaginateResult } from "mongoose";
import { ICategory } from "../interfaces/ICategory";
import { ICategoryRequest } from "../api/interfaces/ICategoryService";

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

describe("Category", () => {
  let payload = {
    page: 1,
    limit: 10,
  };

  describe("List", () => {
    test("Should fetch all the records of the categories", async () => {
      let response = await request
        .post("/category")
        .send(payload)
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<ICategory> | ICategory[]> =
        JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
    });

    test("Should search the the category", async () => {
      let response = await request
        .post("/category")
        .send({ ...payload, search: "Whisky" })
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<ICategory> | ICategory[]> =
        JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
    });

    test("Should check authorization for catgory API", async () => {
      await request
        .post("/category")
        .send(payload)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe("Update", () => {
    let requestpayload: ICategoryRequest = {
      name: "test",
      description: "Test category",
    };

    test("Should create a new category", async () => {
      let response = await request
        .post("/category/update")
        .send(requestpayload)
        .set("Authorization", token);
      let result: IServiceResponse<boolean> = JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.CREATED);
      expect(result.data).toBeTruthy();
    });

    test("Should validate the request", async () => {
      await request
        .post("/category/update")
        .send({})
        .set("Authorization", token)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);
    });

    test("Should update the category", async () => {
      let response = await request
        .post("/category")
        .send({ ...payload, search: requestpayload.name })
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<ICategory>> = JSON.parse(
        response.text
      );
      await request
        .post(`/category/update`)
        .query({ id: result.data.docs[0]._id })
        .send(requestpayload)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });
  });

  describe("Delete", () => {
    let _id: string = null;
    test.skip("Should delete the category", async () => {
      let response = await request
        .post("/category")
        .send({ ...payload, search: "test" })
        .set("Authorization", token);
      let result: IServiceResponse<PaginateResult<ICategory>> = JSON.parse(
        response.text
      );
      _id = result.data.docs[0]._id as string;
      await request
        .delete(`/category/delete/${_id}`)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });

    test.skip("Should permanent delete the category", async () => {
      await request
        .delete(`/category/delete/${_id}`)
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });
  });
});
