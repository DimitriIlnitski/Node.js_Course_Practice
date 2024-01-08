import Joi from "joi";

export const genreValidation = Joi.object({
	name: Joi.string().required(),
});
