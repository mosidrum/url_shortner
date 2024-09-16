import { DATA, DEFAULT_ROUTE, SHORT_URL } from "./testUtils";
import { STATUS_CODES } from "../utils";
import { TestFactory } from "./factory";

describe("GET /api/v1/urls", () => {
  const factory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  it("should get all urls in the collection", async () => {
    const response = await factory.app.get(DEFAULT_ROUTE).send();
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should get url by id", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send(DATA);

    const { createdAt } = data.body.data;
    const id = data.body.data.id;

    const getDataById = await factory.app.get(`${DEFAULT_ROUTE}/${id}`);
    expect(getDataById.status).toBe(STATUS_CODES.OK);
    expect(getDataById.body).toEqual(
      expect.objectContaining({
        message: "Ok",
        data: expect.objectContaining({
          originalUrl: DATA.originalUrl,
          shortUrl: `${SHORT_URL}${DATA.customName}`,
          id: id,
          createdAt: createdAt,
        }),
      }),
    );
  });

  it("should return a 400 error if id is invalid", async () => {
    const id = "notValid";

    const result = await factory.app.get(`${DEFAULT_ROUTE}/${id}`);

    expect(result.status).toBe(STATUS_CODES.BAD_REQUEST);

    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0]).toEqual(
      expect.objectContaining({
        message: "is not a valid mongo id",
        path: "id",
      }),
    );
  });
});
