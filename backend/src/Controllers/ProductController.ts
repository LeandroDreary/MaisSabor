import { Request, Response } from "express";
import ProductEntity from "../Entity/Product";
import formidable from 'formidable';
import { Product } from "../Model/ProductModel";
import DbConnect from "../utils/dbConnect";
import { uploadFile } from "../services/ImageManagementService";
import fetch from 'node-fetch';

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

        const product = await Product.findById(_id).select("-deleteImageUrl").exec()

        // Verifiy if found the product
        if (!product)
            throw new Error("products/not-found")

        // Return the data
        return response.send({ product: product.toJSON() });
    }

    async post(request: Request, response: Response) {
        const form = new formidable.IncomingForm()
        let { _id, name, description, category, price, ingredients, image, files } = request.body
        await form.parse(request, async (err, fields, fl) => {
            _id = _id || fields?._id
            name = name || fields?.name
            description = description || fields?.description
            category = category || fields?.category
            price = price || fields?.price
            ingredients = ingredients || fields?.ingredients
            image = image || fields?.image
            files = fl
        })

        // Connect to the database
        await DbConnect();

        if (!Array.isArray(JSON.parse(ingredients.toString())) && ingredients !== undefined)
            throw new Error("product/ingredients-need-to-be-array")

        const productEntity = new ProductEntity({
            _id, name, description, category,
            price: Number(price), ingredients: JSON.parse((ingredients ?? []).toString())
        })

        // Validate information
        await productEntity.validate({ type: "create" })

        if (image) {
            productEntity.image = image.toString()
        }
        else if (files.image) {
            const { img, delImgUrl } = await uploadFile(files.image)
            productEntity.image = img
            productEntity.deleteImageUrl = delImgUrl
        }

        // Creating the schema
        const product = new Product(productEntity);

        // Saving the informations
        await product.save();

        // Return the data
        return response.send({ product: product.toJSON() });

    }

    async update(request: Request, response: Response) {
        const form = new formidable.IncomingForm()
        let { _id, name, description, category, price, ingredients, image, files } = request.body
        await form.parse(request, async (err, fields, fl) => {
            _id = _id ?? fields?._id
            name = name ?? fields?.name
            description = description ?? fields?.description
            category = category ?? fields?.category
            price = price ?? fields?.price
            ingredients = ingredients ?? fields?.ingredients
            image = image ?? fields?.image
            files = fl
        })

        // Connect to the database
        await DbConnect();

        if (!Array.isArray(JSON.parse(ingredients.toString())) && ingredients !== undefined)
            throw new Error("product/ingredients-need-to-be-array")

        const productEntity = new ProductEntity({
            _id, name, description, category,
            price: Number(price), ingredients: JSON.parse((ingredients ?? []).toString())
        })

        // Validate information
        await productEntity.validate({ type: "edit" })

        if (image) {
            productEntity.image = image.toString()
        }
        else if (files.image) {
            const { image, deleteImageUrl } = await uploadFile(files.image)
            productEntity.image = image
            try {
                await fetch(productEntity.deleteImageUrl)
            } catch (e) { }
            productEntity.deleteImageUrl = deleteImageUrl

        } else {
            productEntity.image = ""
        }

        // Updating the product datas
        let product = await Product.findOneAndUpdate({ _id: productEntity._id }, productEntity)

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
