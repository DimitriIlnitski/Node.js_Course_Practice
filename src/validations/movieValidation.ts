import Joi from "joi";

export const movieValidation = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	releaseDate: Joi.date().iso().required(),
	genre: Joi.array().items(Joi.string()).required(),
});
