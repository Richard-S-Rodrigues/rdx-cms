/*
  Warnings:

  - You are about to drop the column `is_admin` on the `projectMembers` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projectMembers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "is_creator" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "projectMembers_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projectMembers" ("created_at", "id", "member_id", "project_id", "role") SELECT "created_at", "id", "member_id", "project_id", "role" FROM "projectMembers";
DROP TABLE "projectMembers";
ALTER TABLE "new_projectMembers" RENAME TO "projectMembers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
