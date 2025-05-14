import supertest from "supertest";
import httpStatus from "http-status";
import path from "path";
import { IServiceResponse } from "../interfaces/IUtils";
import { PaginateResult } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const request = supertest("http://localhost:5000/api");
let token: string = null;
let _id: string = null;

beforeAll(async () => {
  let payload = {
    username: "test.user@gmail.com",
    password: "admin@123",
  };

  let result = await request.post("/auth/login").send(payload);
  let response: IServiceResponse<string> = JSON.parse(result.text);
  token = `Bearer ${response.data}`;

  let data = await request
    .post("/product")
    .set("Authorization", token)
    .send({ page: 1, limit: 1, sortKey: "createdAt", sortDirection: -1 });
  let productapi: IServiceResponse<PaginateResult<IProduct>> = JSON.parse(
    data.text
  );
  _id = productapi.data.docs[0]._id as string;
});

afterAll(async () => {
  await request.get("/auth/logout").set("Authorization", token);
});

describe("Media", () => {
  describe("Upload", () => {
    test("Should upload media to product", async () => {
      let image = path.resolve(__dirname, "../../public/temp/test.jpg");
      let response = await request
        .post(`/media/upload/${_id}`)
        .set("Authorization", token)
        .field("type", "product")
        .attach("media", image);
      let result: IServiceResponse<boolean> = JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
      expect(result.data).toBeTruthy();
    });

    test("Should validate the upload media request", async () => {
      request
        .post(`/media/upload/${_id}`)
        .set("Authorization", token)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe("Remove", () => {
    test("Should remove media from product", async () => {
      let data = await request
        .get("/product")
        .query({ id: _id })
        .set("Authorization", token);
      let payload: IServiceResponse<IProduct> = JSON.parse(data.text);

      let response = await request
        .post(`/media/delete/${_id}`)
        .send({
          type: "product",
          path: payload.data.media[payload.data.media.length - 1],
        })
        .set("Authorization", token);
      let result: IServiceResponse<boolean> = JSON.parse(response.text);
      expect(result.status).toBe(httpStatus.OK);
      expect(result.data).toBeTruthy();
    });

    test("Should validate the remove media request", async () => {
      request
        .post(`/media/upload/${_id}`)
        .send({})
        .set("Authorization", token)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
});
