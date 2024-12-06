CREATE OR REPLACE FUNCTION update_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true AND OLD.is_public = false THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_published_at
BEFORE UPDATE ON "public"."article"
FOR EACH ROW
EXECUTE FUNCTION update_published_at();
