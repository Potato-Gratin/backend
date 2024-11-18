import supabase from "../libs/supabase";

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
};
