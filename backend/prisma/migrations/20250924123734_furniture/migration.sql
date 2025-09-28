/*
  Warnings:

  - Added the required column `FirstName` to the `BillingDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `BillingDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BillingDetail" ADD COLUMN     "FirstName" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL;
