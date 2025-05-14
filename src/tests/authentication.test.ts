import supertest from "supertest";
import httpStatus from "http-status";
import { IRegisterRequest } from "../api/interfaces/IAuthenticationService";
import { ERRORS } from "../constants/errors";
import { IServiceResponse } from "../interfaces/IUtils";

const request = supertest("http://localhost:5000/api");

describe("Authentication", () => {
  let token: string = "";
  describe("Register", () => {
    let payload: IRegisterRequest = {
      firstName: "Test",
      lastName: "User",
      username: "test.user",
      password: "admin@123",
      email: "test.user@gmail.com",
      phone: {
        code: "+91",
        no: "0123456789",
      },
      role: "User",
    };
    test.skip("User should register themselves", async () => {
      let result = await request.post("/auth/register").send(payload);
      expect(result.statusCode).toBe(httpStatus.OK);
    });
    test("User already registered", async () => {
      request
        .post("/auth/register")
        .send(payload)
        .expect(httpStatus.BAD_REQUEST)
        .end((error, res) => {
          expect(res.text).toContain(ERRORS.USER_ALREADY_EXIST);
        });
    });
  });

  describe("Login", () => {
    let payload = {
      username: "test.user@gmail.com",
      password: "admin@123",
    };

    test("User should be login to the system", async () => {
      let result = await request.post("/auth/login").send(payload);
      let response: IServiceResponse<string> = JSON.parse(result.text);
      token = `Bearer ${response.data}`;
      expect(response.status).toBe(httpStatus.OK);
    });

    test("User should check the credentials", async () => {
      request
        .post("/auth/login")
        .send({ username: "test@gmail.com", password: "admin@123" })
        .expect(httpStatus.BAD_REQUEST)
        .end((error, res) => {
          expect(res.text).toContain(ERRORS.PLEASE_CHECK_CREDENTIALS);
        });
    });
  });

  describe("Verify", () => {
    test("User should verify themselved", async () => {
      await request
        .get("/auth/verify")
        .set("Authorization", token)
        .expect(httpStatus.OK);
    });

    test("User should be unauthorized", async () => {
      await request
        .get("/auth/verify")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFlMDQ4YmI5MTZlOTMyMjM1ZDNmYjIiLCJpYXQiOjE3NDcwNDkxMTIsImV4cCI6MTc0NzA4NTExMn0.nGtNnjY0MjdX2nwuL2GztdOHsg0dnn_DAe7-l4nb8C8"
        )
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe("Logout", () => {
    test("User should be logout", async () => {
      let result = await request
        .get("/auth/logout")
        .set("Authorization", token);
      expect(result.statusCode).toBe(httpStatus.OK);
    });
  });
});
