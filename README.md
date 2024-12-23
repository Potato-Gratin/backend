# backend
## 開発用セットアップ
開発用サーバの実行までの手順です。

1. パッケージのインストール
```
npm clean-install
または
npm ci
```

2. 環境変数ファイルの作成
`.env.development.example` を複製し、`.env.development` を作成してください。その後、環境変数を書き込んでください（なにを入力すればいいかわからない場合は 宮崎（@ulxsth）まで）

3. 開発用サーバの起動
```
npm run dev
```

## フォーマット
プルリクエスト（以下 PR）を出す場合は、事前にフォーマットすることをお勧めします。以下のコマンドで文法やフォーマットのチェック、修正を自動で行ってくれます。
```
npm run check:fix
```

## ローカルにテスト環境を構築する
supabase を使用しているので、Docker 上に ローカル DB 環境を構築しないとテストが実行できません。以下はセットアップ方法です。

0. Docker をインストールする
- [Docker Desktop のインストール方法](https://qiita.com/zembutsu/items/a98f6f25ef47c04893b3)

1. db のローカル環境を構築する
```
npm run db:start
```

実行時、「docker が起動してないよ」といわれる可能性があります。Docker Desktop を起動していない場合は起動してください。<br>

初回起動時、ビルドに20年くらいかかるので待ってください。<br>
終了時、エラーを吐くなどして止まることがあります。もう一度実行してください。

2. （任意）db をリセットする
DB 内部の状態を初期化したい場合、以下のコマンドが使えます。<br>
問題が発生した場合、とりあえず実行してください。
```
npm run db:reset
```

3. （任意）DB を止める
作業が終了したとき、必ず以下のコマンドでデータベースを停止してください。
```
npm run db:stop
```

supabase は CLI 側でコンテナを管理しているため、コマンドからしか停止できません。
停止せずに放置した場合、PC のリソースを食い続けるので注意。

## テスト
テスト環境を構築したあとは、以下のコマンドでテストが実行可能です。なお、supabase のコンテナが起動していることを事前に確認してください。
```
npm run test
```

## NOTE: 認証について
ローカルホストで認証機能を試す場合、GitHubから認証を試してください。Google は現状対応してないです。
