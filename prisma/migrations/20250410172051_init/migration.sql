-- CreateTable
CREATE TABLE "outlets" (
    "outletId" SERIAL NOT NULL,
    "outletName" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "managerId" INTEGER,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "establishment" TEXT NOT NULL,
    "opensAt" TEXT NOT NULL,
    "closesAt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outlets_pkey" PRIMARY KEY ("outletId")
);
