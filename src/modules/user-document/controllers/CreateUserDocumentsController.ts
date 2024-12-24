import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { CreateUserDocumentsService } from "../services/CreateUserDocumentsService";

class CreateUserDocumentsController {
  static async create(request: Request, response: Response): Promise<Response> {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
        "any.required": "User ID is required",
      }),
      name: Joi.string().min(3).required().messages({
        "string.empty": "Document name is required",
        "string.min": "Document name must be at least 3 characters long",
        "any.required": "Document name is required",
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

    const file = request.file;
    if (!file) {
      return response.status(400).json({ message: "File is required!" });
    }

    const { user_id, name } = value;

    try {
      const createUserDocumentsService = container.resolve(
        CreateUserDocumentsService
      );

      const userDocument = await createUserDocumentsService.execute({
        user_id,
        name,
        file,
      });

      return response.status(201).json(userDocument);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateUserDocumentsController };
