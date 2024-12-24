import { container } from "tsyringe";
import { Request, Response } from "express";
import Joi from "joi";
import { CreateUsersService } from "../services/CreateUsersService";

class CreateUsersController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const schema = Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "any.required": "Name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
      }),
      avatar: Joi.string().uri().optional().messages({
        "string.uri": "Avatar must be a valid URI",
      }),
      birthdate: Joi.date().iso().required().messages({
        "date.base": "Birthdate must be a valid date",
        "date.format": "Birthdate must be in ISO 8601 format",
        "any.required": "Birthdate is required",
      }),
    });

    const { error, value } = schema.validate(request.body, {
      abortEarly: false,
    });

    if (error) {
      return response.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name, email, password, avatar, birthdate } = value;

    try {
      const createUsersService = container.resolve(CreateUsersService);

      const createdUser = await createUsersService.execute({
        name,
        email,
        password,
        avatar,
        birthdate,
      });

      return response.status(201).json(createdUser);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateUsersController };
