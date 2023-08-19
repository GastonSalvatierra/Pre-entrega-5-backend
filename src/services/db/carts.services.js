import cartsModel from "./models/carts.js";


export default class cartService {

    getAll = async () => {
        let carts = await cartsModel.find();
        return carts.map(carts=>carts.toObject());
    }

    save = async (cart) => {
        try {
            const existingCart = await cartsModel.findOne();

            if (existingCart) {
                // Si el carrito ya existe, busca si el producto ya está en el carrito
                const existingProduct = existingCart.products.find(
                    (product) => product.product === cart.products[0].product
                );

                if (existingProduct) {
                    // Si el producto ya existe, suma la cantidad al producto existente
                    existingProduct.quantity += cart.products[0].quantity;
                    await existingCart.save();
                    return existingCart;
                } else {
                    // Si el producto no existe, agrega el nuevo producto al carrito
                    existingCart.products.push(cart.products[0]);
                    const updatedCart = await existingCart.save();
                    return updatedCart;
                }
            } else {
                // Si el carrito no existe, crea un nuevo carrito con el producto
                const newCart = await cartsModel.create(cart);
                return newCart;
            }
        } catch (error) {
            throw error;
        }
    }
};