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

  addFavorite: (user_id: string, article_id: string) => {
    const newFavorite = {
      user_id,
      article_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    favorites.push(newFavorite);
    return newFavorite;
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
