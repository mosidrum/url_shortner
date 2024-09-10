import { TestFactory } from "./factory";
import { STATUS_CODES } from "../utils";

describe("URL tests", () => {
  const defaultRoute = "/api/v1/urls";
  const testLink =
    "https://www.mail.google.com/mail/u/0/#inbox/FMfcgzGxTNvvQTsMtWlbcjkNvlmPkjnH";

  describe("POST /api/v1/urls", () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it("should create a url successfully", async () => {
      const response = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
      });

      expect(response.status).toBe(STATUS_CODES.CREATED);
      expect(response.body.message).toBe("Url created successfully");
      expect(response.body.data).toHaveProperty("shortUrl");
    });

    it("should return a 400 error if the url data is invalid", async () => {
      const response = await factory.app.post(defaultRoute).send({
        originalUrl: "http:google.com",
      });
      expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0].message).toBe("Invalid value");
      expect(response.body.errors[0].path).toBe("originalUrl");
    });

    it("should return a 400 error if the url data is empty", async () => {
      const response = await factory.app.post(defaultRoute).send({
        originalUrl: "",
      });
      expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors[0].message).toBe("Invalid value");
      expect(response.body.errors[0].path).toBe("originalUrl");
      expect(response.body.errors[1].message).toBe(
        "original url must be a valid URL",
      );
      expect(response.body.errors[1].path).toBe("originalUrl");
    });

    it('should return a 409 error if the "customName" or "url" already exists', async () => {
      const firstData = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "cluster",
      });
      expect(firstData.status).toBe(STATUS_CODES.CONFLICT);

      const secondData = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "cluster",
      });
      expect(secondData.status).toBe(STATUS_CODES.CONFLICT);
      expect(secondData.body.message).toBe("Duplicates, Try again");
    });
  });

  describe("GET /api/v1/urls", () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it("should get all urls in the collection", async () => {
      const response = await factory.app.get(defaultRoute).send();
      expect(response.status).toBe(STATUS_CODES.OK);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should get url by id", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "cluster",
      });

      const { id } = data.body.data;
      expect(id).toBeDefined();

      const getDataById = await factory.app.get(`${defaultRoute}/${id}`);
      expect(getDataById.status).toBe(STATUS_CODES.OK);
      expect(getDataById.body.message).toBe("Ok");
      expect(getDataById.body.data).toHaveProperty("shortUrl");
      expect(getDataById.body.data).not.toBeNull();
      expect(getDataById.body.data).toBeDefined();
    });

    it("should return a 400 error if id is invalid", async () => {
      const id = "notValid";

      const result = await factory.app.get(`${defaultRoute}/${id}`);
      expect(result.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.body.errors).toBeInstanceOf(Array);
      expect(result.body.errors).toHaveLength(1);
      expect(result.body.errors[0].message).toBe("is not a valid mongo id");
      expect(result.body.errors[0].path).toBe("id");
    });
  });

  describe("PUT /api/v1/urls", () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it("should edit a url with status 200", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataEdited = await factory.app.put(`${defaultRoute}/${id}`).send({
        originalUrl: `${testLink}/newUrl`,
      });
      expect(dataEdited).toBeDefined();
      expect(dataEdited.status).toBe(STATUS_CODES.OK);
      expect(dataEdited.body.message).toBe("Updated successfully");
      expect(dataEdited.body.data.originalUrl).toBe(`${testLink}/newUrl`);
    });

    it("should edit a customName", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        customName: "standard",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.OK);
      expect(dataToEdit.body.data.customName).toBe("standard");
    });

    it("should edit a url and customName", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        originalUrl: `${testLink}/newUrl`,
        customName: "standard",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.OK);
      expect(dataToEdit.body.data.originalUrl).toBe(`${testLink}/newUrl`);
      expect(dataToEdit.body.data.customName).toBe("standard");
    });

    it("should return a 400 error when url is empty", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        originalUrl: "",
        customName: "standard",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(dataToEdit.body.errors).toBeInstanceOf(Array);
      expect(dataToEdit.body.errors[0].message).toBe(
        "original url must be a valid URL",
      );
      expect(dataToEdit.body.errors[0].path).toBe("originalUrl");
    });

    it("should return a 400 error when customName is empty", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        originalUrl: testLink,
        customName: "",
      });
      expect(dataToEdit.body.errors).toBeInstanceOf(Array);
      expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(dataToEdit.body.errors[0].message).toBe(
        "Custom name must be more than 5 characters long",
      );
      expect(dataToEdit.body.errors[1].message).toBe(
        "Custom name should be alphabets",
      );
      expect(dataToEdit.body.errors[0].path).toBe("customName");
      expect(dataToEdit.body.errors[1].path).toBe("customName");
    });

    it("should return a 400 error when url and customName are empty", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        originalUrl: "",
        customName: "",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(dataToEdit.body.errors).toBeInstanceOf(Array);
      expect(dataToEdit.body.errors[0].message).toBe(
        "original url must be a valid URL",
      );
      expect(dataToEdit.body.errors[1].message).toBe(
        "Custom name must be more than 5 characters long",
      );
      expect(dataToEdit.body.errors[2].message).toBe(
        "Custom name should be alphabets",
      );
      expect(dataToEdit.body.errors[0].path).toBe("originalUrl");
      expect(dataToEdit.body.errors[1].path).toBe("customName");
      expect(dataToEdit.body.errors[2].path).toBe("customName");
    });

    it("should return a 400 error when customName has special character", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        customName: "my-app",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(dataToEdit.body.errors).toBeInstanceOf(Array);
      expect(dataToEdit.body.errors[0].message).toBe(
        "Custom name should be alphabets",
      );
      expect(dataToEdit.body.errors[0].path).toBe("customName");
    });

    it("should return a 400 error when customName is less that 5 character", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const dataToEdit = await factory.app.put(`${defaultRoute}/${id}`).send({
        customName: "app",
      });
      expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(dataToEdit.body.errors).toBeInstanceOf(Array);
      expect(dataToEdit.body.errors[0].message).toBe(
        "Custom name must be more than 5 characters long",
      );
      expect(dataToEdit.body.errors[0].path).toBe("customName");
    });
  });

  describe("DELETE /api/v1/urls", () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it("should delete with an id", async () => {
      const data = await factory.app.post(defaultRoute).send({
        originalUrl: testLink,
        customName: "address",
      });

      expect(data.status).toBe(STATUS_CODES.CREATED);
      const { id } = data.body.data;

      const response = await factory.app.delete(`${defaultRoute}/${id}`);
      expect(response.status).toBe(STATUS_CODES.OK);
      expect(response.body.message).toBe("Deleted successfully");
      expect(response.body.data).toBeDefined();
    });

    it("should return a 400 error for an incorrect id", async () => {
      const id = "12345678";
      const response = await factory.app.delete(`${defaultRoute}/${id}`);
      expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe("is not a valid mongo id");
      expect(response.body.errors[0].path).toBe("id");
    });

    it("should return a 404 error, when an id is not passed", async () => {
      const response = await factory.app.delete(defaultRoute);
      expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
    });
  });
});
