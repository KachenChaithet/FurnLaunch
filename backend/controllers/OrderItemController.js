import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all order items
export const getAllOrderItems = async (req, res) => {
  try {
    const items = await prisma.orderItem.findMany({
      include: { order: true } // ถ้าต้องการดึง Order ด้วย
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order items" });
  }
};

// GET order item by id
export const getOrderItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.orderItem.findUnique({
      where: { id: parseInt(id) },
      include: { order: true }
    });
    if (!item) return res.status(404).json({ error: "OrderItem not found" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order item" });
  }
};

// UPDATE order item (quantity, size, color)
export const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const item = await prisma.orderItem.update({
      where: { id: parseInt(id) },
      data
    });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order item" });
  }
};

// DELETE order item
export const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orderItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: "OrderItem deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete order item" });
  }
};
