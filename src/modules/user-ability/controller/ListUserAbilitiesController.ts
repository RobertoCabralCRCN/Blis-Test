import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { ListUserAbilitiesService } from "../services/GetByUserAbilitiesService";

class ListUserAbilitiesController {
  static async list(request: Request, response: Response): Promise<Response> {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
        "any.required": "User ID is required",
      }),
      page: Joi.number().integer().min(1).default(1).messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be at least 1",
      }),
      limit: Joi.number().integer().min(1).default(10).messages({
        "number.base": "Limit must be a number",
        "number.min": "Limit must be at least 1",
      }),
    });

    const dataToValidate = {
      user_id: request.params.user_id,
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    };

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
    });

    if (error) {
      return response.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { user_id, page, limit } = value;
    const listUserAbilitiesService = container.resolve(
      ListUserAbilitiesService
    );

    try {
      const result = await listUserAbilitiesService.execute({
        user_id,
        page,
        limit,
      });

      return response.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ListUserAbilitiesController };
