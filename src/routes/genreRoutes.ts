import express from "express";
import {
	createGenre,
	getGenres,
	updateGenre,
	deleteGenre,
} from "../controllers/genreController";

const router = express.Router();

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     description: Creates a new genre entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       '201':
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *
 *   get:
 *     summary: Get all genres
 *     description: Retrieves all genres
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *
 * /genres/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     description: Updates a genre based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *
 *   delete:
 *     summary: Delete a genre by ID
 *     description: Deletes a genre based on its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted
 */


router.post("/", createGenre);
router.get("/", getGenres);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
