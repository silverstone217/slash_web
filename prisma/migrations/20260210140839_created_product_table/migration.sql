-- CreateEnum
CREATE TYPE "Category" AS ENUM ('accessoires', 'vetements', 'electroniques', 'aliments', 'cosmetiques', 'autres');

-- CreateEnum
CREATE TYPE "Target" AS ENUM ('homme', 'femme', 'kids', 'unisex');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'CDF');

-- CreateEnum
CREATE TYPE "Origin" AS ENUM ('slash_web', 'slash_mobile', 'otekis', 'unknown');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category" NOT NULL DEFAULT 'autres',
    "type" TEXT NOT NULL DEFAULT 'standard',
    "price" DECIMAL(65,30) NOT NULL,
    "promoPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "image" TEXT NOT NULL DEFAULT 'https://3eqaz12yan4rgf7v.public.blob.vercel-storage.com/products/noimage.png',
    "stock" INTEGER NOT NULL DEFAULT 1,
    "brand" TEXT,
    "target" "Target" NOT NULL DEFAULT 'unisex',
    "shopName" TEXT NOT NULL DEFAULT '...',
    "shopLogo" TEXT NOT NULL DEFAULT 'https://3eqaz12yan4rgf7v.public.blob.vercel-storage.com/products/shop-logo.png',
    "whatsapp" TEXT NOT NULL,
    "origin" "Origin" NOT NULL DEFAULT 'slash_web',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
