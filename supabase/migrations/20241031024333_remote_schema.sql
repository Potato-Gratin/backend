

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."article" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text",
    "content" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "published_at" timestamp with time zone,
    "updated_at" timestamp with time zone NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "view_count" bigint DEFAULT '0'::bigint NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    CONSTRAINT "article_content_check" CHECK ((("length"("content") >= 1) AND ("length"("content") <= 300000))),
    CONSTRAINT "article_title_check" CHECK ((("length"("title") >= 1) AND ("length"("title") <= 255)))
);


ALTER TABLE "public"."article" OWNER TO "postgres";


COMMENT ON TABLE "public"."article" IS '投稿者によってサービスに投稿される記事';



CREATE TABLE IF NOT EXISTS "public"."badge" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "review_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."badge" OWNER TO "postgres";


COMMENT ON TABLE "public"."badge" IS 'レビュワーがレビューに対して贈るバッジ';



CREATE TABLE IF NOT EXISTS "public"."badge_flame" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "price" bigint NOT NULL
);


ALTER TABLE "public"."badge_flame" OWNER TO "postgres";


COMMENT ON TABLE "public"."badge_flame" IS 'バッジのフレームパターン';



CREATE TABLE IF NOT EXISTS "public"."badge_text" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "context" "text" NOT NULL
);


ALTER TABLE "public"."badge_text" OWNER TO "postgres";


COMMENT ON TABLE "public"."badge_text" IS 'バッジの文字パターン';



CREATE TABLE IF NOT EXISTS "public"."favorite" (
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "article_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."favorite" OWNER TO "postgres";


COMMENT ON TABLE "public"."favorite" IS '閲覧者が記事に対して送るいいね';



CREATE TABLE IF NOT EXISTS "public"."review" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "article_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "parent_review_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "parent_article_id" "uuid",
    CONSTRAINT "review_content_check" CHECK (("length"("content") <= 10000))
);


ALTER TABLE "public"."review" OWNER TO "postgres";


COMMENT ON TABLE "public"."review" IS 'レビュワーが記事に対して送るレビュー';



CREATE TABLE IF NOT EXISTS "public"."review_vote" (
    "review_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "score" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."review_vote" OWNER TO "postgres";


COMMENT ON TABLE "public"."review_vote" IS 'レビュワーがレビューに対して送る評価';



CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "display_id" "text" DEFAULT ''::"text" NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text",
    "updated_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_description_check" CHECK (("length"("description") <= 400)),
    CONSTRAINT "user_display_id_check" CHECK ((("length"("display_id") >= 1) AND ("length"("display_id") <= 15))),
    CONSTRAINT "user_name_check" CHECK ((("length"("name") >= 1) AND ("length"("name") <= 15)))
);


ALTER TABLE "public"."user" OWNER TO "postgres";


COMMENT ON TABLE "public"."user" IS 'サービスを利用するユーザー';



ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."badge_flame"
    ADD CONSTRAINT "badge_flame_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."badge"
    ADD CONSTRAINT "badge_pkey" PRIMARY KEY ("id", "review_id");



ALTER TABLE ONLY "public"."badge_text"
    ADD CONSTRAINT "badge_text_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_pkey" PRIMARY KEY ("user_id", "article_id");



ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id", "article_id");



ALTER TABLE ONLY "public"."review_vote"
    ADD CONSTRAINT "review_vote_pkey" PRIMARY KEY ("review_id", "user_id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_display_id_key" UNIQUE ("display_id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."badge"
    ADD CONSTRAINT "badge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id");



ALTER TABLE ONLY "public"."favorite"
    ADD CONSTRAINT "favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id");



ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");



ALTER TABLE ONLY "public"."review_vote"
    ADD CONSTRAINT "review_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");



ALTER TABLE "public"."article" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."badge" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."badge_flame" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."badge_text" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."favorite" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."review" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."review_vote" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."article" TO "anon";
GRANT ALL ON TABLE "public"."article" TO "authenticated";
GRANT ALL ON TABLE "public"."article" TO "service_role";



GRANT ALL ON TABLE "public"."badge" TO "anon";
GRANT ALL ON TABLE "public"."badge" TO "authenticated";
GRANT ALL ON TABLE "public"."badge" TO "service_role";



GRANT ALL ON TABLE "public"."badge_flame" TO "anon";
GRANT ALL ON TABLE "public"."badge_flame" TO "authenticated";
GRANT ALL ON TABLE "public"."badge_flame" TO "service_role";



GRANT ALL ON TABLE "public"."badge_text" TO "anon";
GRANT ALL ON TABLE "public"."badge_text" TO "authenticated";
GRANT ALL ON TABLE "public"."badge_text" TO "service_role";



GRANT ALL ON TABLE "public"."favorite" TO "anon";
GRANT ALL ON TABLE "public"."favorite" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite" TO "service_role";



GRANT ALL ON TABLE "public"."review" TO "anon";
GRANT ALL ON TABLE "public"."review" TO "authenticated";
GRANT ALL ON TABLE "public"."review" TO "service_role";



GRANT ALL ON TABLE "public"."review_vote" TO "anon";
GRANT ALL ON TABLE "public"."review_vote" TO "authenticated";
GRANT ALL ON TABLE "public"."review_vote" TO "service_role";



GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
