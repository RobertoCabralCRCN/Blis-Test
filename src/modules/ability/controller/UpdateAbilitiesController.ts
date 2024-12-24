import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { UpdateAbilitiesService } from "../services/UpdateAbilitiesService";

export class UpdateAbilitiesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      id: Joi.string().uuid().required().messages({
        "string.empty": "ID is required",
        "string.uuid": "ID must be a valid UUID",
        "any.required": "ID is required",
      }),
      active: Joi.boolean().required().messages({
        "any.required": "Active is required",
        "boolean.base": "Active must be a boolean value",
      }),
    });

    const { error, value } = schema.validate(
      { id: req.params.id, active: req.body.active },
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { id, active } = value;
    const updateAbilitiesService = container.resolve(UpdateAbilitiesService);

    try {
      await updateAbilitiesService.execute({ id, active });

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status((error as any).statusCode || 500)
          .json({ message: error.message });
      }
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
