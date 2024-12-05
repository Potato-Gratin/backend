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

export interface Favorite {
	user_id: string;
	article_id: string;
	created_at: string;
	updated_at: string;
}

export const FavoriteModel = {
	createFavorite: async (user_id: string, article_id: string) => {
		const { data, error } = await supabase.from("favorite").insert([
			{
				user_id: user_id,
				article_id: article_id
			},
		]);

		//todo　既にいいねが存在してた時
		if (error) {
			// FIXME: いいねが重複した場合（主キー制約違反）に対応する
			throw new Error(`Failed to create favorite: ${error.message}`);
		}

		return data;
	},

	/**
	 *指定した記事IDのいいねを取得する
	 * @param {string} article_id 記事ID
	 * @returns {Promise<User>} いいね数
	 * @throws {Error} DB操作に失敗した場合
	 */
	getFavoriteCount: async (article_id: string): Promise<number> => {
		const { data, error } = await supabase
			.from("favorite")
			.select("article_id", { count: "exact" })
			.eq("article_id", article_id);

		if (error) {
			throw new Error(`Failed to retrieve favorite count: ${error.message}`);
		}

		return data ? data.length : 0;
	},

	getFavoritesByArticleId: (article_id: string) => {
		return favorites.filter((favorite) => favorite.article_id === article_id);
	},

	removeFavorite: (user_id: string, article_id: string) => {
		const index = favorites.findIndex(
			(favorite) =>
				favorite.user_id === user_id && favorite.article_id === article_id,
		);
		if (index !== -1) {
			return favorites.splice(index, 1)[0];
		}
		return null;
	},
};
