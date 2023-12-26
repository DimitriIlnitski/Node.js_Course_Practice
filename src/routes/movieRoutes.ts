import express from "express";
import {
	createMovie,
	getMovies,
	updateMovie,
	deleteMovie,
	getMoviesByGenre,
} from "../controllers/movieController";

const router = express.Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Creates a new movie entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '201':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *
 *   get:
 *     summary: Get all movies
 *     description: Retrieves all movies
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     description: Updates a movie based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Deletes a movie based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted
 */

router.post("/", createMovie);
router.get("/", getMovies);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/genre/:genreName", getMoviesByGenre);

export default router;
