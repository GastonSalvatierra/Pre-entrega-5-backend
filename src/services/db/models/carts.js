import mongoose from 'mongoose';

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {type : Number, unique: true},
            quantity: {type: Number}
        }

    ]
});


const cartsModel = mongoose.model(collectionName, cartSchema);

export default cartsModel;