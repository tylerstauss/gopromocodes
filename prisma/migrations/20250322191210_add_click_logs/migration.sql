-- CreateTable
CREATE TABLE "ClickLog" (
    "id" SERIAL NOT NULL,
    "promoCodeId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClickLog_storeId_idx" ON "ClickLog"("storeId");

-- CreateIndex
CREATE INDEX "ClickLog_promoCodeId_idx" ON "ClickLog"("promoCodeId");

-- CreateIndex
CREATE INDEX "ClickLog_date_idx" ON "ClickLog"("date");

-- AddForeignKey
ALTER TABLE "ClickLog" ADD CONSTRAINT "ClickLog_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClickLog" ADD CONSTRAINT "ClickLog_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
