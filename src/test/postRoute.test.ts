import { TestFactory } from "./factory";
import { STATUS_CODES } from "../utils";
import { DATA, DEFAULT_ROUTE, testLink } from "./testUtils";

describe("POST /api/v1/urls", () => {
  const factory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  it("should create a url successfully", async () => {
    const response = await factory.app.post(DEFAULT_ROUTE).send({
      originalUrl: testLink,
    });

    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Url created successfully",
        data: expect.objectContaining({
          originalUrl:
            "https://www.mail.google.com/mail/u/0/#inbox/FMfcgzGxTNvvQTsMtWlbcjkNvlmPkjnH",
          shortUrl: expect.stringMatching(/^http:\/\/shortit\.com\/\w+$/),
          id: expect.stringMatching(/^[a-f0-9]{24}$/),
          createdAt: expect.any(String),
        }),
      }),
    );
  });

  it("should return a 400 error if the url data is invalid", async () => {
    const response = await factory.app.post(DEFAULT_ROUTE).send({
      originalUrl: "http:google.com",
    });
    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
    expect(response.body.errors).toEqual(
      expect.objectContaining([
        {
          message: "Invalid value",
          path: "originalUrl",
        },
      ]),
    );
  });

  it("should return a 400 error if the url data is empty", async () => {
    const response = await factory.app.post(DEFAULT_ROUTE).send({
      originalUrl: "",
    });

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
    expect(response.body.errors[0]).toEqual(
      expect.objectContaining({
        message: "Invalid value",
        path: "originalUrl",
      }),
    );
  });

  it('should return a 409 error if the "customName" or "url" already exists', async () => {
    const firstData = await factory.app.post(DEFAULT_ROUTE).send(DATA);
    expect(firstData.status).toBe(STATUS_CODES.CREATED);

    const secondData = await factory.app.post(DEFAULT_ROUTE).send(DATA);
    expect(secondData.status).toBe(STATUS_CODES.CONFLICT);
    expect(secondData.body.message).toBe("Duplicates, Try again");
  });
});
