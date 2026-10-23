import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    nameKo: { type: String, default: '' },
    cat: { type: String, default: 'series-a' },
    catLabel: { type: String, default: 'Therapeutic Medical Systems' },
    model: { type: String, default: 'DM-001' },
    price: { type: String, default: '' },
    priceNumber: { type: Number, default: 0 },
    short: { type: String, default: '' },
    desc: { type: String, default: '' },
    volume: { type: String, default: 'Medical Grade' },
    texture: { type: String, default: 'Precision Ergonomic' },
    badge: { type: String, default: 'Medical Grade' },
    imgUrl: { type: String, required: true },
    keyActives: [{ type: String }],
    specs: [[{ type: String }]] // array of [label, value] pairs
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
export default Product;
