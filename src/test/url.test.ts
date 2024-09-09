import { TestFactory } from "./factory";
import { STATUS_CODES } from "../utils";

describe("URL tests", () => {
  describe("POST /api/v1/urls", () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it("should create a url successfully", async () => {
      const response = await factory.app.post("/api/v1/urls").send({
        originalUrl:
          "https://www.mail.google.com/mail/u/0/#inbox/FMfcgzGxTNvvQTsMtWlbcjkNvlmPkjnH",
      });

      expect(response.status).toBe(STATUS_CODES.CREATED);
      expect(response.body.message).toBe("Url created successfully");
      expect(response.body.data).toHaveProperty("shortUrl");
    });

    it.todo("should return a 400 error if the url data is invalid");
    it.todo(
      'should return a 409 error if the "customName" or "url" already exists',
    );
  });
});
