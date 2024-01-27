import request from "supertest";
import { server } from "../../src/app";
import Genre from "../../src/models/genre";
import { mockOneGenre, mockTwoGenres } from "./mockData";

describe("genreController should", () => {
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

	it("create new Genre", async () => {
		Genre.prototype.save = jest.fn().mockResolvedValue(mockOneGenre);
		const response = await request(server).post("/genres").send(mockOneGenre);
		expect(response.statusCode).toBe(201);
		expect(response.body.name).toBe(mockOneGenre.name);
	});

	it("handle validation error when creating a genre", async () => {
		const invalidMovieData = {
			title: "Godzilla",
		};
		Genre.prototype.save = jest
			.fn()
			.mockRejectedValueOnce(new Error('"name" is required'));

		const response = await request(server)
			.post("/genres")
			.send(invalidMovieData);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: '"name" is required' });
	});
	it("handle error when creating a genre", async () => {
		const mockError = new Error("Mocked error");
		jest.spyOn(Genre, "create").mockRejectedValue(mockError);

		const response = await request(server).post("/genres").send(mockOneGenre);
		expect(response.status).toBe(400);
	});

	it("get all Genres", async () => {
		jest.spyOn(Genre, "find").mockResolvedValue(mockTwoGenres);

		const response = await request(server).get("/genres");
		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBe(2);
	});
	it("show error then genres have not been got", async () => {
		const mockError = new Error("Mocked error");
		jest.spyOn(Genre, "find").mockImplementationOnce(() => {
			throw mockError;
		});
		const response = await request(server).get("/genres");
		expect(response.status).toBe(500);
		expect(response.body).toEqual({ message: mockError.message });
	});

	it("update Genre", async () => {
		jest.spyOn(Genre, "findByIdAndUpdate").mockResolvedValue(mockOneGenre);

		const response = await request(server).put(`/genres/5`).send(mockOneGenre);
		expect(response.statusCode).toBe(200);
		expect(response.body).toStrictEqual(mockOneGenre);
	});
	it("handle validation error when updating a genre", async () => {
		const invalidGenreData = {
			title: "Godzilla",
		};
		jest
			.spyOn(Genre, "findByIdAndUpdate")
			.mockRejectedValueOnce(new Error('"name" is required'));

		const response = await request(server)
			.put("/genres/5")
			.send(invalidGenreData);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: '"name" is required' });
	});
	it("show error that genre has not been found then update movie", async () => {
		jest.spyOn(Genre, "findByIdAndUpdate").mockResolvedValueOnce(null);

		const response = await request(server).put("/genres/5").send(mockOneGenre);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Genre not found" });
	});

	it("delete Genre", async () => {
		jest.spyOn(Genre, "findByIdAndDelete").mockResolvedValue(true);

		const response = await request(server).delete(`/genres/5`);
		expect(response.statusCode).toBe(200);
	});
	it("show error that genre has not been found while movie delete", async () => {
		jest.spyOn(Genre, "findByIdAndDelete").mockResolvedValueOnce(null);

		const response = await request(server).delete("/genres/5");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Genre not found" });
	});
});
