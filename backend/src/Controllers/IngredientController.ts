import { Request, Response } from "express";
import IngredientEntity from "../Entity/Ingredient";
import { Ingredient } from "../Model/IngredientModel";
import DbConnect from "../utils/dbConnect";

class IngredientController {
    async query(request: Request, response: Response) {
        let { } = request.query;

        // Connect to the database
        await DbConnect();

        const ingredients = await Ingredient.find({}).select("-__v").exec()

        // Return the data
        return response.send({ ingredients: ingredients.map(ingredient => ingredient.toJSON()) });
    }

    async get(request: Request, response: Response) {
        let { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("ingredient/invalid-informations")

        const ingredient = await Ingredient.findById(_id).select("-__v").exec()

        // Verifiy if found the ingredient
        if (!ingredient)
            throw new Error("ingredient/not-found")

        // Return the data
        return response.send({ ingredient: ingredient.toJSON() });
    }

    async post(request: Request, response: Response) {
        const { name, description } = request.body;
        // Connect to the database
        await DbConnect();

        const ingredientEntity = new IngredientEntity({
            name,
            description
        });

        // Creating the schema
        const ingredient = new Ingredient(ingredientEntity);

        // Saving the informations
        await ingredient.save();

        // Return the data
        return response.send({ ingredient: ingredient.toJSON() });
    }

    async update(request: Request, response: Response) {
        const { _id, name, description } = request.body;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("ingredient/invalid-informations")

        // Find ingredient
        const ingredient = await Ingredient.findById(_id).exec()

        // Verifying if found the ingredient
        if (!ingredient)
            throw new Error("ingredient/not-found")

        // Creating an entity to validate the fields values
        const ingredientEntity = new IngredientEntity({ name, description })

        // Updating the fields
        ingredient.set(ingredientEntity)

        // Updating the ingredient
        await ingredient.save();

        // Return the data
        return response.send({ ingredient: ingredient.toJSON() });
    }

    async delete(request: Request, response: Response) {
        const { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("ingredient/invalid-informations")

        // The function "ConvertId" also verify if the id is valid
        const ingredient = await Ingredient.findById(_id).select("-__v").exec()

        // Verifiy if found the ingredient
        if (!ingredient)
            throw new Error("ingredient/not-found");

        // Verifiy if ingredient can be deleted
        await (new IngredientEntity(ingredient.toJSON())).applyToDelete()

        // Removing the ingredient
        await ingredient.remove()

        return response.send({ ingredient: ingredient.toJSON() });
    }
}

export { IngredientController };
