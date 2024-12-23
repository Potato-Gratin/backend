import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, type Result, Success } from "../types/result.types";

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
	createFavorite: async (
		user_id: string,
		article_id: string,
	): Promise<Result<Favorite, PostgrestError>> => {
		const { data, error } = await supabase
			.from("favorite")
			.insert([{ user_id: user_id, article_id: article_id }])
			.select()
			.single();

		if (error) {
			return new Failure(error);
		}
		return new Success(data);
	},

	/**
	 *指定した記事IDのいいねを取得する
	 * @param {string} article_id 記事ID
	 * @returns {Promise<Result<User, PostgrestError>>} いいね数
	 * @throws {Error} DB操作に失敗した場合
	 */
	getFavoriteCount: async (
		article_id: string,
	): Promise<Result<number | null, PostgrestError>> => {
		const { count, error } = await supabase
			.from("favorite")
			.select("*", { count: "exact", head: true })
			.eq("article_id", article_id);

		if (error) {
			return new Failure(error);
		}
		return new Success(count);
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
