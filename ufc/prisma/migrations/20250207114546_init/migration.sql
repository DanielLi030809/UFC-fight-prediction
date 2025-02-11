-- CreateTable
CREATE TABLE "Fighter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "height" VARCHAR NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reach" DOUBLE PRECISION NOT NULL,
    "stance" VARCHAR NOT NULL,
    "dob" DATE NOT NULL,
    "slpm" DOUBLE PRECISION NOT NULL,
    "stracc" VARCHAR NOT NULL,
    "sapm" DOUBLE PRECISION NOT NULL,
    "strdef" VARCHAR NOT NULL,
    "tdavg" DOUBLE PRECISION NOT NULL,
    "tdacc" VARCHAR NOT NULL,
    "tddef" VARCHAR NOT NULL,
    "subavg" DOUBLE PRECISION NOT NULL,
    "record" VARCHAR NOT NULL,

    CONSTRAINT "Fighter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fighter_name_idx" ON "Fighter"("name");

-- CreateIndex
CREATE INDEX "Fighter_height_idx" ON "Fighter"("height");

-- CreateIndex
CREATE INDEX "Fighter_weight_idx" ON "Fighter"("weight");

-- CreateIndex
CREATE INDEX "Fighter_reach_idx" ON "Fighter"("reach");

-- CreateIndex
CREATE INDEX "Fighter_stance_idx" ON "Fighter"("stance");

-- CreateIndex
CREATE INDEX "Fighter_dob_idx" ON "Fighter"("dob");

-- CreateIndex
CREATE INDEX "Fighter_slpm_idx" ON "Fighter"("slpm");

-- CreateIndex
CREATE INDEX "Fighter_stracc_idx" ON "Fighter"("stracc");

-- CreateIndex
CREATE INDEX "Fighter_sapm_idx" ON "Fighter"("sapm");

-- CreateIndex
CREATE INDEX "Fighter_strdef_idx" ON "Fighter"("strdef");

-- CreateIndex
CREATE INDEX "Fighter_tdavg_idx" ON "Fighter"("tdavg");

-- CreateIndex
CREATE INDEX "Fighter_tdacc_idx" ON "Fighter"("tdacc");

-- CreateIndex
CREATE INDEX "Fighter_tddef_idx" ON "Fighter"("tddef");

-- CreateIndex
CREATE INDEX "Fighter_subavg_idx" ON "Fighter"("subavg");

-- CreateIndex
CREATE INDEX "Fighter_record_idx" ON "Fighter"("record");
