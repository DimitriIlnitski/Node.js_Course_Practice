import request from "supertest";
import { server } from "../../src/app";
import Movie from "../../src/models/movie";
import { mockOneMovie, mockTwoMovies } from "./mockData";

describe("movieController should", () => {
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

	it("create new movie", async () => {
		Movie.prototype.save = jest.fn().mockResolvedValue(mockOneMovie);
		const response = await request(server).post("/movies").send(mockOneMovie);
		expect(response.statusCode).toBe(201);
		expect(response.body.title).toBe(mockOneMovie.title);
	});
	it("handle validation error when creating a movie", async () => {
		const invalidMovieData = {
			name: "Godzilla",
		};
		Movie.prototype.save = jest
			.fn()
			.mockRejectedValueOnce(new Error('"title" is required'));

		const response = await request(server)
			.post("/movies")
			.send(invalidMovieData);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: '"title" is required' });
	});
	it("handle error when creating a movie", async () => {
		const mockError = new Error("Mocked error");
		jest.spyOn(Movie, "create").mockRejectedValue(mockError);

		const response = await request(server).post("/genres").send(mockOneMovie);
		expect(response.status).toBe(400);
	});

	it("get all movies", async () => {
		jest.spyOn(Movie, "find").mockResolvedValue(mockTwoMovies);

		const response = await request(server).get("/movies");
		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBe(2);
	});
	it("show error then movies have not been got", async () => {
		const mockError = new Error("Mocked error");
		jest.spyOn(Movie, "find").mockImplementationOnce(() => {
			throw mockError;
		});
		const response = await request(server).get("/movies");
		expect(response.status).toBe(500);
		expect(response.body).toEqual({ message: mockError.message });
	});

	it("update movie", async () => {
		jest.spyOn(Movie, "findByIdAndUpdate").mockResolvedValue(mockOneMovie);

		const response = await request(server).put(`/movies/5`).send(mockOneMovie);

		expect(response.statusCode).toBe(200);
		expect(response.body).toStrictEqual(mockOneMovie);
	});
	it("handle validation error when updating a movie", async () => {
		const invalidMovieData = {
			title: "Inception",
			description: "A mind-bending science fiction thriller.",
			releaseDate: "2010-07-16",
		};
		jest
			.spyOn(Movie, "findByIdAndUpdate")
			.mockRejectedValueOnce(new Error('"genre" is required'));

		const response = await request(server)
			.put("/movies/5")
			.send(invalidMovieData);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: '"genre" is required' });
	});
	it("show error that movie has not been found then update movie", async () => {
		jest.spyOn(Movie, "findByIdAndUpdate").mockResolvedValueOnce(null);

		const response = await request(server).put("/movies/5").send(mockOneMovie);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Movie not found" });
	});

	it("delete movie", async () => {
		jest.spyOn(Movie, "findByIdAndDelete").mockResolvedValue(true);

		const response = await request(server).delete(`/movies/5`);
		expect(response.statusCode).toBe(200);
	});
	it("show error that movie has not been found while movie delete", async () => {
		jest.spyOn(Movie, "findByIdAndDelete").mockResolvedValueOnce(null);

		const response = await request(server).delete("/movies/5");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Movie not found" });
	});

	it("return movies by genre", async () => {
		jest.spyOn(Movie, "find").mockResolvedValue(mockTwoMovies);

		const response = await request(server).get(`/movies/genre/action`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(mockTwoMovies);
	});
	it("show error that movie has not been found while movie by genre search", async () => {
		jest.spyOn(Movie, "find").mockResolvedValueOnce([]);

		const response = await request(server).get(
			"/movies/genre/notExsistingGenre"
		);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			message: "Movies by genre have not been found",
		});
	});
});
