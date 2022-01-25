/*
  Warnings:

  - You are about to drop the column `raw_content` on the `blogPosts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blogPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "markdown_content" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "blogPosts_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "blogPosts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_blogPosts" ("author_id", "created_at", "description", "id", "is_published", "markdown_content", "project_id", "title", "updated_at") SELECT "author_id", "created_at", "description", "id", "is_published", "markdown_content", "project_id", "title", "updated_at" FROM "blogPosts";
DROP TABLE "blogPosts";
ALTER TABLE "new_blogPosts" RENAME TO "blogPosts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
