/*
  Warnings:

  - The values [homme,femme] on the enum `Target` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Target_new" AS ENUM ('man', 'woman', 'kids', 'unisex');
ALTER TABLE "public"."Product" ALTER COLUMN "target" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "target" TYPE "Target_new" USING ("target"::text::"Target_new");
ALTER TYPE "Target" RENAME TO "Target_old";
ALTER TYPE "Target_new" RENAME TO "Target";
DROP TYPE "public"."Target_old";
ALTER TABLE "Product" ALTER COLUMN "target" SET DEFAULT 'unisex';
COMMIT;
