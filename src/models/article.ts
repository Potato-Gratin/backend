import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, type Result, Success } from "../types/result.types";

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
	createArticle: async (
		form: ArticleForm,
	): Promise<Result<Article, PostgrestError>> => {
		const { data, error } = await supabase
			.from("article")
			.insert([form])
			.select();

		if (error) {
			return new Failure(error);
		}

		return new Success(data[0]);
	},

	/**
	 * 記事を新しい順に取得する。
	 * @returns {Promise<Result<Article[]>>} 記事一覧
	 * @throws {Error} DB操作に失敗した場合
	 */
	findAll: async (page: number): Promise<Result<Article[], PostgrestError>> => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.order("created_at", { ascending: false })
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			return new Failure(error);
		}

		return new Success(data);
	},

	/**
	 * 指定したIDの記事を検索する。
	 * @param {string} id 記事のID
	 * @returns {Promise<Article | null>} 見つかった記事、または null
	 * @throws {Error} DB操作に失敗した場合
	 */
	findById: async (id: string): Promise<Result<Article | null, PostgrestError>> => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.eq("id", id);

		if (error) {
			return new Failure(error)
		}

		return new Success(data[0] || null);
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
	): Promise<Result<Article, PostgrestError>> => {
		const { data, error } = await supabase
			.from("article")
			.update(updateData)
			.eq("id", id)
			.select();

		if (error) {
			return new Failure(error)
			// switch (error.code) {
			// 	case "23502":
			// 		throw new Error("Missing required fields"); // 必須フィールドエラー
			// 	default:
			// 		throw new Error(`Database Error: ${error.message}`);
			// }
		}

		return new Success(data[0])
	},

	search: async (q: string, page: number) => {
		const { data, error } = await supabase
			.from("article")
			.select("*")
			.ilike("title", `%${q}%`)
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			return new Failure(error)
		}

		return new Success(data);
	},

	// TODO: Result
	deleteById: async (id: string) => {
		// TODO: 実際のDB操作に置き換える
		const articles = [
			{ id: "1", title: "Title 1", content: "Content 1", user_id: "user1" },
			{ id: "2", title: "Title 2", content: "Content 2", user_id: "user2" },
		];
		const index = articles.findIndex((article) => article.id === id);
		if (index !== -1) {
			const [deletedArticle] = articles.splice(index, 1);
			return deletedArticle;
		}
		return null;
	},
};
