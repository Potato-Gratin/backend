import supabase from "../libs/supabase";

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
	
			if (!data) {
				throw new Error("Article not found");
			}
	
			return data[0];
		},
	};
