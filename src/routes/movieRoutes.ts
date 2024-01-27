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
 * tags:
 *   name: Movies
 *   description: Movie management
 * 
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - title
 *         - description
 *         - releaseDate
 *         - genre
 * 
 * paths:
 *   /movies:
 *     post:
 *       summary: Create a new movie
 *       description: Creates a new movie entry
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       responses:
 *         '201':
 *           description: Successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *     get:
 *       summary: Get all movies
 *       description: Retrieves all movies
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Movie'
 * 
 *   /movies/{id}:
 *     put:
 *       summary: Update a movie by ID
 *       description: Updates a movie based on its ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the movie to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       responses:
 *         '200':
 *           description: Successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *     delete:
 *       summary: Delete a movie by ID
 *       description: Deletes a movie based on its ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the movie to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully deleted
 * 
 *   /movies/genre/{genreName}:
 *     get:
 *       summary: Get movies by genre
 *       description: Retrieves movies based on a specific genre
 *       parameters:
 *         - name: genreName
 *           in: path
 *           required: true
 *           description: Name of the genre to filter movies
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Movie'
 */

router.post("/", createMovie);
router.get("/", getMovies);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/genre/:genreName", getMoviesByGenre);

export default router;
