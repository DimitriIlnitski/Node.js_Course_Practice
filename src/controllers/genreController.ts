import Genre from "../models/genre";
import { Request, Response } from "express";

// Create a new genre
export const createGenre = async (req: Request, res: Response) => {
	try {
		const newGenre = await Genre.create(req.body);
		res.status(201).json(newGenre);
	} catch (err: unknown) {
		res.status(400).json({ message: (err as Error).message });
	}
};

// Get all genres
export const getGenres = async (_req: Request, res: Response) => {
	try {
		const genres = await Genre.find();
		res.json(genres);
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};

// Update a genre by ID
export const updateGenre = async (req: Request, res: Response) => {
	try {
		const updatedGenre = await Genre.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedGenre) {
			return res.status(404).json({ message: "Genre not found" });
		}
		res.json(updatedGenre);
	} catch (err: unknown) {
		res.status(400).json({ message: (err as Error).message });
	}
};

// Delete a genre by ID
export const deleteGenre = async (req: Request, res: Response) => {
	try {
		const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
		if (!deletedGenre) {
			return res.status(404).json({ message: "Genre not found" });
		}
		res.json({ message: "Genre deleted" });
	} catch (err: unknown) {
		res.status(500).json({ message: (err as Error).message });
	}
};


