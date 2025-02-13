/*
  Warnings:

  - You are about to drop the `Fighter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Input` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Fighter";

-- DropTable
DROP TABLE "Input";

-- CreateTable
CREATE TABLE "joined" (
    "name" VARCHAR,
    "height" VARCHAR,
    "weight" DOUBLE PRECISION,
    "reach" DOUBLE PRECISION,
    "stance" VARCHAR,
    "dob" DATE,
    "slpm" DOUBLE PRECISION,
    "stracc" VARCHAR,
    "sapm" DOUBLE PRECISION,
    "strdef" VARCHAR,
    "tdavg" DOUBLE PRECISION,
    "tdacc" VARCHAR,
    "tddef" VARCHAR,
    "subavg" DOUBLE PRECISION,
    "record" VARCHAR,
    "id" SERIAL NOT NULL,

    CONSTRAINT "joined_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fighter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "height" VARCHAR,
    "weight" DOUBLE PRECISION,
    "reach" DOUBLE PRECISION,
    "stance" VARCHAR,
    "dob" DATE,
    "slpm" DOUBLE PRECISION,
    "stracc" VARCHAR,
    "sapm" DOUBLE PRECISION,
    "strdef" VARCHAR,
    "tdavg" DOUBLE PRECISION,
    "tdacc" VARCHAR,
    "tddef" VARCHAR,
    "subavg" DOUBLE PRECISION,
    "record" VARCHAR,

    CONSTRAINT "Fighter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "reach" DOUBLE PRECISION,
    "slpm" DOUBLE PRECISION,
    "stracc" DOUBLE PRECISION,
    "sapm" DOUBLE PRECISION,
    "strdef" DOUBLE PRECISION,
    "tdavg" DOUBLE PRECISION,
    "tdacc" DOUBLE PRECISION,
    "tddef" DOUBLE PRECISION,
    "subavg" DOUBLE PRECISION,
    "win" DOUBLE PRECISION,
    "draw" DOUBLE PRECISION,
    "loss" DOUBLE PRECISION,

    CONSTRAINT "input_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fighter_dob_idx" ON "fighter"("dob");

-- CreateIndex
CREATE INDEX "Fighter_height_idx" ON "fighter"("height");

-- CreateIndex
CREATE INDEX "Fighter_name_idx" ON "fighter"("name");

-- CreateIndex
CREATE INDEX "Fighter_reach_idx" ON "fighter"("reach");

-- CreateIndex
CREATE INDEX "Fighter_record_idx" ON "fighter"("record");

-- CreateIndex
CREATE INDEX "Fighter_sapm_idx" ON "fighter"("sapm");

-- CreateIndex
CREATE INDEX "Fighter_slpm_idx" ON "fighter"("slpm");

-- CreateIndex
CREATE INDEX "Fighter_stance_idx" ON "fighter"("stance");

-- CreateIndex
CREATE INDEX "Fighter_stracc_idx" ON "fighter"("stracc");

-- CreateIndex
CREATE INDEX "Fighter_strdef_idx" ON "fighter"("strdef");

-- CreateIndex
CREATE INDEX "Fighter_subavg_idx" ON "fighter"("subavg");

-- CreateIndex
CREATE INDEX "Fighter_tdacc_idx" ON "fighter"("tdacc");

-- CreateIndex
CREATE INDEX "Fighter_tdavg_idx" ON "fighter"("tdavg");

-- CreateIndex
CREATE INDEX "Fighter_tddef_idx" ON "fighter"("tddef");

-- CreateIndex
CREATE INDEX "Fighter_weight_idx" ON "fighter"("weight");

-- CreateIndex
CREATE INDEX "ix_input_draw" ON "input"("draw");

-- CreateIndex
CREATE INDEX "ix_input_height" ON "input"("height");

-- CreateIndex
CREATE INDEX "ix_input_id" ON "input"("id");

-- CreateIndex
CREATE INDEX "ix_input_loss" ON "input"("loss");

-- CreateIndex
CREATE INDEX "ix_input_name" ON "input"("name");

-- CreateIndex
CREATE INDEX "ix_input_reach" ON "input"("reach");

-- CreateIndex
CREATE INDEX "ix_input_sapm" ON "input"("sapm");

-- CreateIndex
CREATE INDEX "ix_input_slpm" ON "input"("slpm");

-- CreateIndex
CREATE INDEX "ix_input_stracc" ON "input"("stracc");

-- CreateIndex
CREATE INDEX "ix_input_strdef" ON "input"("strdef");

-- CreateIndex
CREATE INDEX "ix_input_subavg" ON "input"("subavg");

-- CreateIndex
CREATE INDEX "ix_input_tdacc" ON "input"("tdacc");

-- CreateIndex
CREATE INDEX "ix_input_tdavg" ON "input"("tdavg");

-- CreateIndex
CREATE INDEX "ix_input_tddef" ON "input"("tddef");

-- CreateIndex
CREATE INDEX "ix_input_weight" ON "input"("weight");

-- CreateIndex
CREATE INDEX "ix_input_win" ON "input"("win");
