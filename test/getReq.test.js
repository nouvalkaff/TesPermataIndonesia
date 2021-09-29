const app = require("../app");
const supTest = require("supertest");
const req = supTest(app);

describe("user endpoint", () => {
  it("should GET from / endpoint to home route", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome to API Permata Indonesia");
  });

  it("should GET from * endpoint if route not exist", async () => {
    const res = await req.get("/wrong");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Route not found. Please double check your route again."
    );
  });

  it("should GET from /user/:id endpoint to get one of user data", async () => {
    const id = 10;
    return req.get(`/permata/user/${id}`).then((resp) => {
      expect(resp.status).toBe(200);
      expect(resp.body.result).toStrictEqual({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        username: expect.any(String),
        no_phone: expect.any(String),
        email: expect.any(String),
        birth_place: expect.any(String),
        birth_date: expect.any(String),
      });
    });
  });

  it("should GET from /user/all endpoint to get one of user data", async () => {
    const res = await req.get("/permata/user/all");
    expect(res.status).toBe(200);

    const arrofObj = res.body.result;

    const benchmark = {
      id: expect.any(Number),
      first_name: expect.any(String),
      last_name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      birth_place: expect.any(String),
      birth_date: expect.any(String),
    };

    for (const i of arrofObj) {
      return expect(i).toStrictEqual(benchmark);
    }
  });
});
