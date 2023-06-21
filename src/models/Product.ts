import mongoose, { Schema, Document } from 'mongoose';

// Definisikan interface Product
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  productCategory: string[];
  thumbnails: string[];
  owner: Schema.Types.ObjectId; // Referensi ke model User
}

// Definisikan schema Product
const productSchema: Schema<Product> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productCategory: [{ type: String }],
  thumbnails: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referensi ke model User
});

// Buat model Product
const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
