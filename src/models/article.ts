import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";

export interface ArticleForm {
	title?: string;
	content?: string;
	is_public?: boolean;
	user_id: string;
}

export interface Article {
	id: string;
	title: string | null;
	content: string | null;
	created_at: string;
	published_at: string | null;
	updated_at: string;
	is_public: boolean;
	view_count: number;
	user_id: string;
}

export const ArticleModel = {
	/**
	 * 記事を新しい順に取得する。
	 * @returns {Promise<Article[]>} 記事一覧
	 * @throws {Error} DB操作に失敗した場合
	 */
	findAll: async (page: number): Promise<Article[]> => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.order("created_at", { ascending: false })
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			console.log(error);

			throw new Error(`Database Error: ${error.message}`);
		}

		return data;
	},

	/**
	 * 指定したIDの記事を検索する。
	 * @param {string} id 記事のID
	 * @returns {Promise<Article | null>} 見つかった記事、または null
	 * @throws {Error} DB操作に失敗した場合
	 */
	findById: async (id: string): Promise<Article | null> => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.eq("id", id);

		if (error) {
			console.log(error);

			throw new Error(`Database Error: ${error.message}`);
		}

		return data[0] || null;
	},

	/**
	 * 記事を更新する。
	 * @param {string} id 記事ID
	 * @param {Partial<Article>} updatedData 更新する記事データ
	 * @returns {Promise<Article>} 更新後の記事データ
	 * @throws {Error} DB操作に失敗した場合
	 */
	updateById: async (
		id: string,
		updateData: Partial<Article>,
	): Promise<Article> => {
		const { data, error } = await supabase
			.from("article")
			.update(updateData)
			.eq("id", id)
			.select();

		if (error) {
			switch (error.code) {
				case "23502":
					throw new Error("Missing required fields"); // 必須フィールドエラー
				default:
					throw new Error(`Database Error: ${error.message}`);
			}
		}

		if (!data[0]) {
			throw new Error("Article not found");
		}

		return data[0];
	},

	create: async (form: ArticleForm) => {
		const { data, error } = await supabase
			.from("article")
			.insert([form])
			.select();

		if (error) {
			console.log(error);
			throw new Error(`Database Error: ${error.message}`);
		}

		return data[0];
	},

	search: async (q: string, page: number) => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.ilike("title", `%${q}%`)
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			console.log(error);

			throw new Error(`Database Error: ${error.message}`);
		}

		return data;
	},

	/**
	 * 指定されたIDの記事を削除
	 * @param {string} id - 削除対象の記事ID
	 * @returns {Promise<void>} - 成功時はvoid、失敗時は例外をスロー
	 */
	deleteById: async (id: string): Promise<void> => {
		const { error } = await supabase.from("article").delete().eq("id", id);

		if (error) {
			throw new Error(
				`Failed to delete article with ID ${id}: ${error.message}`,
			);
		}
	},
};
