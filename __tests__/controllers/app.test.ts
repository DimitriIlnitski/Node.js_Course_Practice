import request from "supertest";
import { server } from "../../src/app";

describe("server", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});
	beforeAll((done) => {
		server.close(() => {
			console.log("Server closed");
			done();
		});
	});
	afterAll((done) => {
		server.close(() => {
			console.log("Server closed");
			done();
		});
	});
	
	it("should return a health check message with the port number", async () => {
		const response = await request(server).get("/health-check");

		expect(response.status).toBe(200);
		expect(response.text).toContain(`Health check on port`);
	});
	it("should return a message for the general page", async () => {
		const response = await request(server).get("/");

		expect(response.status).toBe(200);
		expect(response.text).toContain("General page");
	});
	it("should return a 404 status for an unknown route", async () => {
		const response = await request(server).get("/nonexistent-route");

		expect(response.status).toBe(404);
		expect(response.text).toContain("Not found");
	});
});
