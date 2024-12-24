import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { UserAbilitiesService } from "../services/CreateUserAbilitiesService";
import AppError from "@shared/errors/AppError";

class UserAbilitiesController {
  static async create(request: Request, response: Response): Promise<Response> {
    console.log(request.body, "request.body"); // Verifique os dados recebidos no corpo

    const schema = Joi.object({
      user_id: Joi.string().uuid().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
        "any.required": "User ID is required",
      }),
      ability_id: Joi.string().uuid().required().messages({
        "string.empty": "Ability ID is required",
        "string.uuid": "Ability ID must be a valid UUID",
        "any.required": "Ability ID is required",
      }),
      years_experience: Joi.number().integer().min(0).required().messages({
        "number.base": "Years of experience must be a number",
        "number.min": "Years of experience cannot be negative",
        "any.required": "Years of experience is required",
      }),
    });

    const { error, value } = schema.validate(request.body, {
      abortEarly: false, // Garante que todos os erros sejam capturados
      allowUnknown: true, // Permite que propriedades extras sejam ignoradas
    });

    // Verifique se houve erro
    if (error) {
      console.log(error, "validation error"); // Verifique os detalhes do erro
      return response.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    console.log(value, "value"); // Verifique os dados validados
    const { user_id, ability_id, years_experience } = value;
    console.log(
      user_id,
      ability_id,
      years_experience,
      "user_id, ability_id, years_experience"
    );

    // Processe os dados validados
    const userAbilitiesService = container.resolve(UserAbilitiesService);
    try {
      const userAbility = await userAbilitiesService.execute({
        user_id,
        ability_id,
        years_experience,
      });
      console.log(userAbility, "userAbility"); // Verifique os dados retornados
      return response.status(201).json(userAbility);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }
      return response
        .status(400)
        .json({ message: "An unknown error occurred" });
    }
  }
}
export { UserAbilitiesController };
