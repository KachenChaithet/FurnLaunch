import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ดึง Order ทั้งหมด
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { billing: true, items: true }
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ดึง Order ตาม id
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { billing: true, items: true }
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// แก้ไข Order (เช่น status)
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// ลบ Order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
