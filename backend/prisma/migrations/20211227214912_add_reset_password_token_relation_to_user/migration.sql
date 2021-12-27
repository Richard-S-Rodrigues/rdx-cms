-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resetPasswordTokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resetPasswordTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_resetPasswordTokens" ("created_at", "id", "token", "user_id") SELECT "created_at", "id", "token", "user_id" FROM "resetPasswordTokens";
DROP TABLE "resetPasswordTokens";
ALTER TABLE "new_resetPasswordTokens" RENAME TO "resetPasswordTokens";
CREATE UNIQUE INDEX "resetPasswordTokens_user_id_key" ON "resetPasswordTokens"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
