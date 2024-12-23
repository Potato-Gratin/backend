-- user テーブルに30件のデータをシードするクエリ
INSERT INTO "public"."user" (id, display_id, name, description)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'user001', 'Taro', 'こんにちは、Taroです。これはサンプルの説明です。'),
  ('22222222-2222-2222-2222-222222222222', 'user002', 'Hanako', 'Hanakoのプロフィールへようこそ！簡単な説明を追加しています。'),
  ('33333333-3333-3333-3333-333333333333', 'user003', 'Jiro', 'Jiroの説明文はここにあります。'),
  ('44444444-4444-4444-4444-444444444444', 'user004', 'Yuki', 'Yukiの自己紹介です。趣味は読書と旅行です。'),
  ('55555555-5555-5555-5555-555555555555', 'user005', 'Akira', 'Akiraの簡単な紹介です。'),
  ('66666666-6666-6666-6666-666666666666', 'user006', 'Keiko', 'Keikoの詳細がここにあります。'),
  ('77777777-7777-7777-7777-777777777777', 'user007', 'Shin', 'Shinです。よろしくお��いします。'),
  ('88888888-8888-8888-8888-888888888888', 'user008', 'Miki', 'Mikiのプロフィールです。'),
  ('99999999-9999-9999-9999-999999999999', 'user009', 'Koji', 'Kojiの自己紹介です。'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user010', 'Aya', 'Ayaの簡単なプロフィールです。'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'user011', 'Ryo', 'Ryoです。好きなことは映画鑑賞です。'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'user012', 'Saki', 'Sakiのプロフィールです。特に趣味はありませんが、よろしく。'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'user013', 'Kazu', 'Kazuです。よろしく！'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'user014', 'Nao', 'Naoの簡単な紹介です。読書が好きです。'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'user015', 'Taku', 'Takuです。音楽が趣味です。'),
  ('00000000-0000-0000-0000-000000000000', 'user016', 'Mai', 'Maiのプロフィールです。旅行が好きです。'),
  ('11111111-1111-1111-1111-111111111112', 'user017', 'Yuji', 'Yujiの自己紹介です。映画好きです。'),
  ('22222222-2222-2222-2222-222222222223', 'user018', 'Saori', 'Saoriの簡単なプロフィールです。'),
  ('33333333-3333-3333-3333-333333333334', 'user019', 'Ken', 'Kenです。よろしくお願いします。'),
  ('44444444-4444-4444-4444-444444444445', 'user020', 'Yumi', 'Yumiの紹介です。'),
  ('55555555-5555-5555-5555-555555555556', 'user021', 'Sho', 'Shoのプロフィールへようこそ。'),
  ('66666666-6666-6666-6666-666666666667', 'user022', 'Rina', 'Rinaのプロフィールです。読書が趣味です。'),
  ('77777777-7777-7777-7777-777777777778', 'user023', 'Hiro', 'Hiroの自己紹介です。旅行が趣味です。'),
  ('88888888-8888-8888-8888-888888888889', 'user024', 'Moe', 'Moeです。よろしく！'),
  ('99999999-9999-9999-9999-999999999990', 'user025', 'Jun', 'Junです。スポーツが好きです。'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', 'user026', 'Ai', 'Aiのプロフィールです。料理が得意です。'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbc', 'user027', 'Shota', 'Shotaです。新しいことを学ぶのが好きです。'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccd', 'user028', 'Emi', 'Emiの簡単な紹介です。映画が好きです。'),
  ('dddddddd-dddd-dddd-dddd-ddddddddddde', 'user029', 'Ren', 'Renです。よろしくお願いします。'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeef', 'user030', 'Noa', 'Noaの紹介です。趣味は音楽です。');

-- article テーブルに10件のデータをシードするクエリ
INSERT INTO "public"."article" (id, title, content, user_id)
VALUES
  ('11111111-1111-1111-1111-111111111111', '記事タイトル1', 'これは記事1の内容です。', '11111111-1111-1111-1111-111111111111'),
  ('22222222-2222-2222-2222-222222222222', '記事タイトル2', 'これは記事2の内容です。', '22222222-2222-2222-2222-222222222222'),
  ('33333333-3333-3333-3333-333333333333', '記事タイトル3', 'これは記事3の内容です。', '33333333-3333-3333-3333-333333333333'),
  ('44444444-4444-4444-4444-444444444444', '記事タイトル4', 'これは記事4の内容です。', '44444444-4444-4444-4444-444444444444'),
  ('55555555-5555-5555-5555-555555555555', '記事タイトル5', 'これは記事5の内容です。', '55555555-5555-5555-5555-555555555555'),
  ('66666666-6666-6666-6666-666666666666', '記事タイトル6', 'これは記事6の内容です。', '66666666-6666-6666-6666-666666666666'),
  ('77777777-7777-7777-7777-777777777777', '記事タイトル7', 'これは記事7の内容です。', '77777777-7777-7777-7777-777777777777'),
  ('88888888-8888-8888-8888-888888888888', '記事タイトル8', 'これは記事8の内容です。', '88888888-8888-8888-8888-888888888888'),
  ('99999999-9999-9999-9999-999999999999', '記事タイトル9', 'これは記事9の内容です。', '99999999-9999-9999-9999-999999999999'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '記事タイトル10', 'これは記事10の内容です。', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- review テーブルに各記事に対して10件のデータをシードするクエリ
INSERT INTO "public"."review" (id, article_id, content, user_id, created_at, updated_at)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー1です。', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー2です。', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー3です。', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー4です。', '44444444-4444-4444-4444-444444444444', NOW(), NOW()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー5です。', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー6です。', '66666666-6666-6666-6666-666666666666', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー7です。', '77777777-7777-7777-7777-777777777777', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー8です。', '88888888-8888-8888-8888-888888888888', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333334', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー9です。', '99999999-9999-9999-9999-999999999999', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444445', '11111111-1111-1111-1111-111111111111', 'これは記事1に対するレビュー10です。', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555556', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー1です。', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666667', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー2です。', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777778', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー3です。', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888889', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー4です。', '44444444-4444-4444-4444-444444444444', NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999990', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー5です。', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー6です。', '66666666-6666-6666-6666-666666666666', NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbc', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー7です。', '77777777-7777-7777-7777-777777777777', NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccd', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー8です。', '88888888-8888-8888-8888-888888888888', NOW(), NOW()),
  ('dddddddd-dddd-dddd-dddd-ddddddddddde', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー9です。', '99999999-9999-9999-9999-999999999999', NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeef', '22222222-2222-2222-2222-222222222222', 'これは記事2に対するレビュー10です。', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), NOW()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー1です。', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー2です。', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111112', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー3です。', '33333333-3333-3333-3333-333333333333', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222223', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー4です。', '44444444-4444-4444-4444-444444444444', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333334', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー5です。', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444445', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー6です。', '66666666-6666-6666-6666-666666666666', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555556', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー7です。', '77777777-7777-7777-7777-777777777777', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666667', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー8です。', '88888888-8888-8888-8888-888888888888', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777778', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー9です。', '99999999-9999-9999-9999-999999999999', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888889', '33333333-3333-3333-3333-333333333333', 'これは記事3に対するレビュー10です。', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), NOW());

