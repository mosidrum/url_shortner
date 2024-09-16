import { TestFactory } from "./factory";
import { STATUS_CODES } from "../utils";
import { DATA, DEFAULT_ROUTE } from "./testUtils";

describe("DELETE /api/v1/urls", () => {
  const factory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  it("should delete with an id", async () => {
    const data = await factory.app.post(DEFAULT_ROUTE).send(DATA);
    const { id } = data.body.data;

    const response = await factory.app.delete(`${DEFAULT_ROUTE}/${id}`);
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.message).toBe("Deleted successfully");
  });

  it("should return a 400 error for an incorrect id", async () => {
    const id = "12345678";
    const response = await factory.app.delete(`${DEFAULT_ROUTE}/${id}`);
    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
    expect(response.body.errors).toEqual(
      expect.objectContaining([
        {
          message: "is not a valid mongo id",
          path: "id",
        },
      ]),
    );
  });

  it("should return a 404 error, when an id is not passed", async () => {
    const response = await factory.app.delete(DEFAULT_ROUTE);
    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
