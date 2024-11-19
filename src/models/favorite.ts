import supabase from "../libs/supabase";
const favorites = [
	{
		user_id: "user1",
		article_id: "article1",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		user_id: "user2",
		article_id: "article1",
		created_at: new Date(),
		updated_at: new Date(),
	},
	// ...他のテストデータ...
];

const getFavoritesByArticleId = (article_id: string) => {
	return favorites.filter((favorite) => favorite.article_id === article_id);
};

const createFavorite = async (user_id: string, article_id: string) => {
	// 既にそのユーザーがその記事にいいねをしているか確認
	const existingFavorite = favorites.find(
		(favorite) =>
			favorite.user_id === user_id && favorite.article_id === article_id,
	);

	// すでにいいねが存在する場合は、新しいいいねを追加しない
	if (existingFavorite) {
		throw new Error("Favorite already exists for this article by this user.");
	}

	// Supabaseにデータを追加する処理
	const { data, error } = await supabase.from("favorite").insert([
		{
			user_id: user_id,
			article_id: article_id,
			created_at: new Date().toISOString(), // ISO 8601形式の文字列に変換
			updated_at: new Date().toISOString(), // ,,
		},
	]);

	// Supabaseのエラーチェック
	if (error) {
		throw new Error(`Failed to create favorite: ${error.message}`);
	}

	// 追加したデータを返す
	return data;
};

const removeFavorite = (user_id: string, article_id: string) => {
	const index = favorites.findIndex(
		(favorite) =>
			favorite.user_id === user_id && favorite.article_id === article_id,
	);
	if (index !== -1) {
		return favorites.splice(index, 1)[0];
	}
	return null;
};

export const FavoriteModel = {
	favorites,
	getFavoritesByArticleId,
	createFavorite,
	removeFavorite,
};
