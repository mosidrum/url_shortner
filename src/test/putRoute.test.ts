import { TestFactory } from "./factory";
import { STATUS_CODES } from "../utils";
import { DATA, DEFAULT_ROUTE, testLink } from "./testUtils";

describe("PUT /api/v1/urls", () => {
  const factory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  const newUrl = `${testLink}/newUrl`;

  it("should edit a url with status 200", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send({
      originalUrl: testLink,
    });

    expect(data.status).toBe(STATUS_CODES.CREATED);
    const { id } = data.body.data;
    const { createdAt } = data.body.data;

    const dataEdited = await factory.app.put(`${DEFAULT_ROUTE}/${id}`).send({
      originalUrl: newUrl,
    });
    expect(dataEdited.status).toBe(STATUS_CODES.OK);
    expect(dataEdited.body).toEqual(
      expect.objectContaining({
        message: "Updated successfully",
        data: expect.objectContaining({
          originalUrl: newUrl,
          shortUrl: expect.stringMatching(/^http:\/\/shortit\.com\/\w+$/),
          id: id,
          createdAt: createdAt,
        }),
      }),
    );
  });

  it("should edit a customName", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send(DATA);

    expect(data.status).toBe(STATUS_CODES.CREATED);
    const { id } = data.body.data;

    const dataToEdit = await factory.app.put(`${DEFAULT_ROUTE}/${id}`).send({
      customName: "standard",
    });
    expect(dataToEdit.status).toBe(STATUS_CODES.OK);
    expect(dataToEdit.body.data.customName).toBe("standard");
  });

  it("should return a 400 error when url and customName are empty", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send(DATA);

    expect(data.status).toBe(STATUS_CODES.CREATED);
    const { id } = data.body.data;

    const dataToEdit = await factory.app.put(`${DEFAULT_ROUTE}/${id}`).send({
      originalUrl: "",
      customName: "",
    });
    expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
    expect(dataToEdit.body.errors).toEqual(
      expect.objectContaining([
        {
          message: "original url must be a valid URL",
          path: "originalUrl",
        },
        {
          message: "Custom name must be more than 5 characters long",
          path: "customName",
        },
        {
          message: "Custom name should be alphabets",
          path: "customName",
        },
      ]),
    );
  });

  it("should return a 400 error when customName has special character", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send(DATA);

    expect(data.status).toBe(STATUS_CODES.CREATED);
    const { id } = data.body.data;

    const dataToEdit = await factory.app.put(`${DEFAULT_ROUTE}/${id}`).send({
      customName: "my-app",
    });
    expect(dataToEdit.status).toBe(STATUS_CODES.BAD_REQUEST);
    expect(dataToEdit.body.errors).toEqual(
      expect.objectContaining([
        {
          message: "Custom name should be alphabets",
          path: "customName",
        },
      ]),
    );
  });
});
