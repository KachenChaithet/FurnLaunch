-- CreateTable
CREATE TABLE "public"."BillingDetail" (
    "id" SERIAL NOT NULL,
    "company" TEXT,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billingId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "price" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "quantity" INTEGER NOT NULL,
    "color" TEXT,
    "size" TEXT,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_billingId_key" ON "public"."Order"("billingId");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "public"."BillingDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
