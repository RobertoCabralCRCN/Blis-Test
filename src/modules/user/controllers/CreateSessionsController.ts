import { container } from "tsyringe";
import { Request, Response } from "express";
import Joi from "joi";
import { CreateSessionsService } from "../services/CreateSessionsService";

class CreateSessionsController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const schema = Joi.object({
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

    const { email, password } = value;
    const createSessionsService = container.resolve(CreateSessionsService);

    try {
      const user = await createSessionsService.execute({ email, password });
      return response.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ message: err.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateSessionsController };
