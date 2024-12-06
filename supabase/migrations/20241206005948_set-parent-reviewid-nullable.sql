ALTER TABLE "public"."review"
ALTER COLUMN parent_article_id DROP NOT NULL,
ALTER COLUMN parent_review_id DROP NOT NULL;
