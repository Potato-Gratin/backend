import supabase from "../libs/supabase";

export interface User {
	id: string;
	display_id: string;
	name: string;
	description: string | null;
	created_at: string;
	updated_at: string;
}

export const UserModel = {
	/**
	 * ユーザーを作成する。
	 * @param {string} display_id 表示ID
	 * @param {string} name ユーザー名
	 * @param {string} description 説明
	 * @returns {Promise<User>} 作成したユーザー
	 * @throws {Error} DB操作に失敗した場合
	 */
	create: async (
		display_id: string,
		name: string,
		description: string,
	): Promise<User> => {
		const { data, error } = await supabase
			.from("user")
			.insert({ display_id, name, description })
			.select("*")
			.single();

		if (error) {
			switch (error.code) {
				case "23505":
					throw new Error("displayId is conflicted");
				case "23502":
					throw new Error("displayId is required");
				default:
					console.log(error.code);
					throw new Error(`Database Error: ${error.message}`);
			}
		}

		return data;
	},

	findByDisplayId: async (display_id: string): Promise<User | null> => {
		/**
		 * 指定した表示IDのユーザーを検索する。
		 * @param {string} display_id 表示ID
		 * @returns {Promise<User | null>} 見つかったユーザー、または null
		 * @throws {Error} DB操作に失敗した場合
		 */
		const { data, error } = await supabase
			.from("user")
			.select("*")
			.eq("display_id", display_id)
			.single();

		if (error) {
			throw new Error(`Database Error: ${error.message}`);
		}

		return data;
	},

  /**
	 * ユーザーを作成する。
	 * @param {string} display_id 表示ID
	 * @param {Object} updatedData 更新するユーザ情報
	 * @returns {Promise<User>} 更新したユーザー
	 * @throws {Error} DB操作に失敗した場合
	 */
	updateByDispalyId: async (
		display_id: string,
		updatedData:Partial<User>
	): Promise<User> => {
		const { data, error } = await supabase
			.from("user")
			.update(updatedData)
			.eq('display_id', display_id)
      .select()

		if (error) {
			switch (error.code) {
				case "23505":
					throw new Error("displayId is conflicted");
				case "23502":
					throw new Error("displayId is required");
				default:
					console.log(error.code);
					throw new Error(`Database Error: ${error.message}`);
			}
		}

		return data[0];
	},
};
