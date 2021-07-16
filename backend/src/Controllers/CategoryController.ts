import { Request, Response } from "express";
import CategoryEntity from "../Entities/Category";
import { Category } from "../Models/CategoryModel";
import ConvertId from "../utils/ConvertId";
import DbConnect from "../utils/dbConnect";

class CategoryController {
    async query(request: Request, response: Response) {
        let {  } = request.query;

        // Connect to the database
        await DbConnect();

        const categories = await Category.find({}).exec()

        // Return the data
        return response.send({ categories: categories.map(category => category.toJSON()) });
    }

    async get(request: Request, response: Response) {
        let { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("category/invalid-informations")

        const category = await Category.findOne(ConvertId(_id)).exec()

        // Verifiy if found the category
        if (!category)
            throw new Error("category/not-found")

        // Return the data
        return response.send({ category: category.toJSON() });
    }

    async post(request: Request, response: Response) {
        const { name } = request.body;

        // Connect to the database
        await DbConnect();

        const categoryEntity = new CategoryEntity({
            name
        });

        // Creating the schema
        const category = new Category(categoryEntity);

        // Saving the informations
        await category.save();

        // Return the data
        return response.send({ category: category.toJSON() });
    }

    async update(request: Request, response: Response) {
        const { _id, name } = request.body;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("category/invalid-informations")

        // tje function "ConvertId" also verify if the id is valid
        const category = await Category.findOne(ConvertId(_id)).exec()

        // Verifying if found the category
        if (!category)
            throw new Error("category/not-found")

        // Creating an entity to validate the fields values
        const categoryEntity = new CategoryEntity({ _id: category._id, name })

        // Updating the fields
        category.set(categoryEntity)

        // Updating the category
        await category.save();

        // Return the data
        return response.send({ category: category.toJSON() });
    }

    async delete(request: Request, response: Response) {
        const { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("category/invalid-informations")

        // tje function "ConvertId" also verify if the id is valid
        const category = await Category.findOne(ConvertId(_id)).exec()

        // Verifiy if found the category
        if (!category)
            throw new Error("category/not-found")

        // Removing the category
        await category.remove()

        return response.send({ category: category.toJSON() });
    }
}

export { CategoryController };
