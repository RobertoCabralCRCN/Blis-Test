import { Request, Response } from "express";
import { container } from "tsyringe";
import Joi from "joi";
import { CreateAbilitiesService } from "../services/CreateAbilitiesService";

export class CreateAbilitiesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "any.required": "Name is required",
      }),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name } = value;
    const createAbilitiesService = container.resolve(CreateAbilitiesService);

    try {
      const ability = await createAbilitiesService.execute({ name });

      return res.status(201).json(ability);
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
