import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ดึง BillingDetail ทั้งหมด
export const getAllBillingDetails = async (req, res) => {
  try {
    const billings = await prisma.billingDetail.findMany({
      include: { order: true }
    });
    res.json(billings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch billing details" });
  }
};

// ดึง BillingDetail ตาม id
export const getBillingDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await prisma.billingDetail.findUnique({
      where: { id: parseInt(id) },
      include: { order: true }
    });
    if (!billing) return res.status(404).json({ error: "BillingDetail not found" });
    res.json(billing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch billing detail" });
  }
};

// สร้าง BillingDetail
export const createBillingDetail = async (req, res) => {
  const { firstName, lastName, company, country, address, city, province, zip, phone, note } = req.body;
  try {
    const billing = await prisma.billingDetail.create({
      data: {
        FirstName: firstName,
        LastName: lastName,
        company,
        country,
        address,
        city,
        province,
        zip,
        phone,
        note
      }
    });
    res.json(billing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create billing detail" });
  }
};

// แก้ไข BillingDetail
export const updateBillingDetail = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, company, country, address, city, province, zip, phone, note } = req.body;
  try {
    const billing = await prisma.billingDetail.update({
      where: { id: parseInt(id) },
      data: {
        FirstName: firstName,
        LastName: lastName,
        company,
        country,
        address,
        city,
        province,
        zip,
        phone,
        note
      }
    });
    res.json(billing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update billing detail" });
  }
};

// ลบ BillingDetail
export const deleteBillingDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const billingDetail = await prisma.billingDetail.findUnique({
      where: { id: parseInt(id) },
    });

    if (!billingDetail) {
      return res.status(404).json({ error: "BillingDetail not found" });
    }

    await prisma.billingDetail.delete({ where: { id: parseInt(id) } });
    res.json({ message: "BillingDetail deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete billing detail" });
  }
};

