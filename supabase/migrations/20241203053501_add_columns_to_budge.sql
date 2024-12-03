-- `badge` テーブルに `badge_flame_id` と `badge_text_id` を追加する
ALTER TABLE "public"."badge"
  ADD COLUMN badge_flame_id UUID,
  ADD COLUMN badge_text_id UUID;

-- `badge_flame_id` を `badge_flame` テーブルに外部キーとして設定
ALTER TABLE "public"."badge"
  ADD CONSTRAINT fk_badge_flame
  FOREIGN KEY (badge_flame_id) REFERENCES badge_flame(id)
  ON DELETE SET NULL ON UPDATE CASCADE;

-- `badge_text_id` を `badge_text` テーブルに外部キーとして設定
ALTER TABLE "public"."badge"
  ADD CONSTRAINT fk_badge_text
  FOREIGN KEY (badge_text_id) REFERENCES badge_text(id)
  ON DELETE SET NULL ON UPDATE CASCADE;
