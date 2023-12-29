import Joi from "joi"

const loginFormSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Användarnamn kan inte vara tomt.",
            "string.min": "Användarnamn måste vara minst 3 tecken.",
            "string.max": "Användarnamn får vara max 30 tecken.",
            "any.required": "Användarnamn kan inte vara tomt."
        }),
    password: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Lösenord kan inte vara tomt.",
            "string.min": "Lösenord måste vara minst 3 tecken.",
            "string.max": "Lösenord får vara max 30 tecken.",
            "any.required": "Lösenord kan inte vara tomt."
        }),
})

export default loginFormSchema;