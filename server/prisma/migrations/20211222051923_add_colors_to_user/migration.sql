-- CreateTable
CREATE TABLE "Avitar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color0" TEXT NOT NULL DEFAULT '#554236',
    "color1" TEXT NOT NULL DEFAULT '#f77825',
    "color2" TEXT NOT NULL DEFAULT '#d3ce3d',
    "color3" TEXT NOT NULL DEFAULT '#f1efa5',
    "color4" TEXT NOT NULL DEFAULT '#60b99a',
    CONSTRAINT "Avitar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Avitar_userId_key" ON "Avitar"("userId");
