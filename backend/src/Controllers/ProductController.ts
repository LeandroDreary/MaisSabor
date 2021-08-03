import { Request, Response } from "express";
import ProductEntity from "../Entity/Product";
import { Product } from "../Model/ProductModel";
import ConvertId from "../utils/ConvertId";
import DbConnect from "../utils/dbConnect";

class ProductController {
    async query(request: Request, response: Response) {
        let {  } = request.query;

        // Connect to the database
        await DbConnect();

        const products = await Product.find({}).exec()

        // Return the data
        return response.send({ products: products.map(product => product.toJSON()) });
    }

    async get(request: Request, response: Response) {
        let { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("products/invalid-informations")

        const product = await Product.findOne(ConvertId(_id)).exec()

        // Verifiy if found the product
        if (!product)
            throw new Error("products/not-found")

        // Return the data
        return response.send({ product: product.toJSON() });
    }

    async post(request: Request, response: Response) {
        const { name, category, image, description, price } = request.body;

        // Connect to the database
        await DbConnect();

        const productEntity = new ProductEntity({
            name,
            image,
            category,
            description,
            price
        });

        // Creating the schema
        const product = new Product(productEntity);

        // Saving the informations
        await product.save();

        // Return the data
        return response.send({ product: product.toJSON() });
    }

    async update(request: Request, response: Response) {
        const { _id, name, category, image, description, price } = request.body;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("products/invalid-informations")

        // tje function "ConvertId" also verify if the id is valid
        const product = await Product.findOne(ConvertId(_id)).exec()

        // Verifying if found the product
        if (!product)
            throw new Error("products/not-found")

        // Creating an entity to validate the fields values
        const productEntity = new ProductEntity({ 
            _id: product._id, 
            image,
            name, 
            category, 
            description, 
            price 
        })

        // Updating the fields
        product.set(productEntity)

        // Updating the product
        await product.save();

        // Return the data
        return response.send({ product: product.toJSON() });
    }

    async delete(request: Request, response: Response) {
        const { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("products/invalid-informations")

        // tje function "ConvertId" also verify if the id is valid
        const product = await Product.findOne(ConvertId(_id)).exec()

        // Verifiy if found the product
        if (!product)
            throw new Error("products/not-found")

        // Removing the product
        await product.remove()

        return response.send({ product: product.toJSON() });
    }
}

export { ProductController };
