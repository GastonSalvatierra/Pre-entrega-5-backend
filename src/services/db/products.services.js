import productsModel from "./models/products.js";

export default class productService{

    getAll = async (limit) => {
        let products = await productsModel.find().limit(limit);
        return products.map(product =>product.toObject());
    }
    
    save = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    updateById = async (productId, updateFields) => {
        try {
            const filter = { _id: productId }
            const updatedProduct = await productsModel.updateOne(
                filter, { $set: updateFields });

            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    deleteById = async (productId) => {
        try {
            const filter = { _id: productId };
            const deleteProduct = await productsModel.deleteOne(
                filter);

            return deleteProduct;
        } catch (error) {
            throw error;
        }
    }
};