import { Request, Response } from "express";
import ProductEntity from "../Entity/Product";
import formidable from 'formidable';
import { Product } from "../Model/ProductModel";
import DbConnect from "../utils/dbConnect";
import { uploadFile } from "../services/ImageManagementService";
import fetch from 'node-fetch';
import { Types } from "mongoose";

const RemoveUndefined = (obj: any) => Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})

const rgx = (pattern) => (new RegExp(`.*${pattern}.*`));

class ProductController {
    async query(request: Request, response: Response) {
        let { category, search } = request.query;

        // Connect to the database
        await DbConnect();

        const searchParams = {}
        if (category)
            searchParams["category"] = category
        if (search)
            searchParams["name"] = { $regex: rgx(search), $options: "i" }

        // Find products
        const products = await Product.find(searchParams).collation({ locale: "en", strength: 2 }).select("-deleteImageUrl").exec()

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

        const product = await Product.findById(_id).collation({ locale: "en", strength: 2 }).select("-deleteImageUrl").exec()

        // Verifiy if found the product
        if (!product)
            throw new Error("products/not-found")

        // Return the data
        return response.send({ product: product.toJSON() });
    }

    async post(request: Request, response: Response) {
        const form = new formidable.IncomingForm()
        return await form.parse(request, async (err, fields, files) => {
            const name = fields.name.toString()
            const category = fields.category.toString()
            const description = fields.description.toString()
            const price = Number(fields.price)
            let image = ""
            let deleteImageUrl = ""

            if (fields.image) {
                image = fields.image.toString()
            }
            else if (files.image) {
                const { img, delImgUrl } = await uploadFile(files.image)
                image = img
                deleteImageUrl = delImgUrl
            }

            // Connect to the database
            await DbConnect();

            const productEntity = new ProductEntity({
                name,
                image,
                deleteImageUrl,
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
        })
    }

    async update(request: Request, response: Response) {
        const form = new formidable.IncomingForm()
        return await form.parse(request, async (err, fields, files) => {
            const _id = fields._id.toString()

            // Connect to the database
            await DbConnect();

            // If is _id string
            if (typeof _id !== 'string')
                throw new Error("products/invalid-informations")

            // Try to find the product
            const product = await Product.findById(_id).exec()

            // Verifying if found the product
            if (!product)
                throw new Error("products/not-found")

            if (fields.name)
                product.name = fields.name.toString()

            if (fields.category)
                product.category = Types.ObjectId(fields.category.toString())

            if (fields.description)
                product.description = fields.description.toString()

            if (fields.price)
                product.price = Number(fields.price)

            if (fields.image) {
                product.image = fields.image.toString()
            }
            else if (files.image) {
                const { image, deleteImageUrl } = await uploadFile(files.image)
                product.image = image
                try {
                    await fetch(product.deleteImageUrl)
                } catch (e) { }
                product.deleteImageUrl = deleteImageUrl

            } else {
                product.image = ""
            }

            // Updating the product datas
            await product.save();

            // Return the data
            return response.send({ product: product.toJSON() });
        })
    }

    async delete(request: Request, response: Response) {
        const { _id } = request.query;

        // Connect to the database
        await DbConnect();

        // If is _id string
        if (typeof _id !== 'string')
            throw new Error("products/invalid-informations")

        // tje function "ConvertId" also verify if the id is valid
        const product = await Product.findById(_id).exec()

        // Verifiy if found the product
        if (!product)
            throw new Error("products/not-found")

        try {
            await fetch(product.deleteImageUrl)
        } catch (e) { }

        // Removing the product
        await product.remove()

        return response.send({ product: product.toJSON() });
    }
}

export { ProductController };
