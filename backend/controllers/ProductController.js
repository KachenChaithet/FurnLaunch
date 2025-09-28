import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const AddProduct = async (req, res) => {
    const { name, description, price, discountPercent, imageUrl, category, stock, badge } = req.body

    if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                category,
                stock,
                discountPercent: discountPercent ?? 0,
                badge: badge ?? null,
            }
        })
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
        console.log(error);

    }
}

export const UpdateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const { name, description, price, discountPercent, imageUrl, category, stock, badge } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = price;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (category !== undefined) data.category = category;
    if (stock !== undefined) data.stock = stock;
    if (discountPercent !== undefined) data.discountPercent = discountPercent;
    if (badge !== undefined) data.badge = badge;

    try {
        const product = await prisma.product.update({
            where: { id },
            data
        });
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

export const GetAllProduct = async (req, res) => {
    try {

        const allProducts = await prisma.product.findMany()
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Failed to update product" });
    }
}

export const DeleteProduct = async (req, res) => {
    const id = Number(req.params.id)
    try {
        const remove = await prisma.product.delete({
            where: { id },
        })
        res.status(200).json(remove);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Failed to update product" });
    }
}
export const GetProductById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};