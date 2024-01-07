import Joi from "joi";

const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email kan inte vara tomt.",
            "string.email": "Email måste vara en giltig email.",
            "any.required": "Email kan inte vara tomt."
        }),
})

export default resetPasswordSchema;