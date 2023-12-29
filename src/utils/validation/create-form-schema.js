import Joi from "joi";

const createFormSchema = Joi.object({
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
    repeatpassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            "string.empty": "Upprepa lösenord kan inte vara tomt.",
            "any.only": "Upprepa lösenord måste vara samma som lösenord.",
            "any.required": "Upprepa lösenord kan inte vara tomt."
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email kan inte vara tomt.",
            "string.email": "Email måste vara en giltig email.",
            "any.required": "Email kan inte vara tomt."
        }),
    firstname: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Förnamn kan inte vara tomt.",
            "string.min": "Förnamn måste vara minst 3 tecken.",
            "string.max": "Förnamn får vara max 30 tecken.",
            "any.required": "Förnamn kan inte vara tomt."
        }),
    lastname: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Efternamn kan inte vara tomt.",
            "string.min": "Efternamn måste vara minst 3 tecken.",
            "string.max": "Efternamn får vara max 30 tecken.",
            "any.required": "Efternamn kan inte vara tomt."
        }),
})

export default createFormSchema;