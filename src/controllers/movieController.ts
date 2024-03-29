import Movie from "../models/movie";
import { Request, Response } from "express";
import { movieValidation } from "../validations/movieValidation";

// Create a new movie
export const createMovie = async (req: Request, res: Response) => {
	try {
		const { error } = movieValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const newMovie = await Movie.create(req.body);
		res.status(201).json(newMovie);
	} catch (err: unknown) {
		res.status(400).json({ message: (err as Error).message });
	}
};

// Get all movies
export const getMovies = async (req: Request, res: Response) => {
	try {
		const movies = await Movie.find({});
		console.log("Fetched movies:", movies);
		res.json(movies);
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};

// Update a movie by ID
export const updateMovie = async (req: Request, res: Response) => {
	try {
		const { error } = movieValidation.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const updatedMovie = await Movie.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedMovie) {
			return res.status(404).json({ message: "Movie not found" });
		}
		res.json(updatedMovie);
	} catch (err: unknown) {
		res.status(400).json({ message: (err as Error).message });
	}
};

// Delete a movie by ID
export const deleteMovie = async (req: Request, res: Response) => {
	try {
		const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
		if (!deletedMovie) {
			return res.status(404).json({ message: "Movie not found" });
		}
		res.json({ message: "Movie deleted" });
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};

// Get movies by genre
export const getMoviesByGenre = async (req: Request, res: Response) => {
	try {
		const { genreName } = req.params;
		const movies = await Movie.find({
			genre: { $regex: genreName, $options: "i" },
		}); // Find movies by genre
		res.json(movies);
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};
