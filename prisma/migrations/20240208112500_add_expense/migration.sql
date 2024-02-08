-- CreateEnum
CREATE TYPE "ExpenseInterval" AS ENUM ('monthly', 'quaterly', 'yearly', 'custom');

-- CreateTable
CREATE TABLE "Expense" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "interval" "ExpenseInterval" NOT NULL,
    "customMonths" INTEGER,
    "monthOfPayment" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
