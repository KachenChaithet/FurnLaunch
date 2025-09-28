import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkout = async (req, res) => {
  const { billing, items } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        status: "pending",
        billing: { create: billing },        // สร้าง BillingDetail
        items: {                             // สร้างหลาย OrderItem
          create: items.map(item => ({
            productId: item.id,
            name: item.name,
            img: item.img,
            price: item.price,
            discountPrice: item.discountPrice,
            quantity: item.quantity,
            color: item.color,
            size: item.size
          }))
        }
      },
      include: {
        billing: true,
        items: true
      }
    });

    res.json(order); // ส่งกลับ Order + BillingDetail + OrderItem
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Checkout failed" });
  }
};
