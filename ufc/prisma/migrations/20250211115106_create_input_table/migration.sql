-- CreateTable
CREATE TABLE "Input" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
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

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Input_name_idx" ON "Input"("name");

-- CreateIndex
CREATE INDEX "Input_height_idx" ON "Input"("height");

-- CreateIndex
CREATE INDEX "Input_weight_idx" ON "Input"("weight");

-- CreateIndex
CREATE INDEX "Input_reach_idx" ON "Input"("reach");

-- CreateIndex
CREATE INDEX "Input_slpm_idx" ON "Input"("slpm");

-- CreateIndex
CREATE INDEX "Input_stracc_idx" ON "Input"("stracc");

-- CreateIndex
CREATE INDEX "Input_sapm_idx" ON "Input"("sapm");

-- CreateIndex
CREATE INDEX "Input_strdef_idx" ON "Input"("strdef");

-- CreateIndex
CREATE INDEX "Input_tdavg_idx" ON "Input"("tdavg");

-- CreateIndex
CREATE INDEX "Input_tdacc_idx" ON "Input"("tdacc");

-- CreateIndex
CREATE INDEX "Input_tddef_idx" ON "Input"("tddef");

-- CreateIndex
CREATE INDEX "Input_subavg_idx" ON "Input"("subavg");

-- CreateIndex
CREATE INDEX "Input_win_idx" ON "Input"("win");

-- CreateIndex
CREATE INDEX "Input_draw_idx" ON "Input"("draw");

-- CreateIndex
CREATE INDEX "Input_loss_idx" ON "Input"("loss");
