import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { DeleteUserAbilitiesService } from "../services/DeleteUserAbilitiesService";

class DeleteUserAbilitiesController {
  static async delete(request: Request, response: Response): Promise<Response> {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required().messages({
        "string.empty": "User ID is required",
        "string.uuid": "User ID must be a valid UUID",
        "any.required": "User ID is required",
      }),
      ability_ids: Joi.array()
        .items(Joi.string().uuid().required())
        .min(1)
        .required()
        .messages({
          "array.base": "Ability IDs must be an array",
          "array.min": "At least one ability ID must be provided",
          "string.uuid": "Each Ability ID must be a valid UUID",
          "any.required": "Ability IDs are required",
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

    const { user_id, ability_ids } = value;
    const deleteUserAbilitiesService = container.resolve(
      DeleteUserAbilitiesService
    );

    try {
      await deleteUserAbilitiesService.execute({ user_id, ability_ids });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteUserAbilitiesController };
