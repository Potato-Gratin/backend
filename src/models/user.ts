import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, type Result, Success } from "../types/result.types";

export type UserForm = {
	displayId: string;
	name: string;
	description?: string;
};

export interface User {
	id: string;
	display_id: string;
	name: string;
	description: string | null;
	created_at: string;
	updated_at: string;
}

export const UserModel = {
	// TODO: Result
	/**
	 * ユーザーを作成する。
	 * @param {UserForm} form ユーザー情報
	 * @returns {Promise<User>} 作成したユーザー
	 * @throws {Error} DB操作に失敗した場合
	 */
	create: async (form: UserForm): Promise<Result<User, PostgrestError>> => {
		const { data, error } = await supabase
			.from("user")
			.insert(form)
			.select("*")
			.single();

		if (error) return new Failure(error);

		return new Success(data);
	},

	// TODO: Result
	/**
	 * ユーザーを検索する。
	 * @param {string} q 検索クエリ
	 * @param {number} page ページ番号
	 * @returns {Promise<User[]>} 検索結果
	 * @throws {Error} DB操作に失敗した場合
	 */
	search: async (q: string, page: number): Promise<User[]> => {
		const { data, error } = await supabase
			.from("user")
			.select("*")
			.ilike("name", `%${q}%`)
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			throw new Error(`Database Error: ${error.message}`);
		}

		return data || [];
	},

	// TODO: Result
	/**
	 * 指定した表示IDのユーザーを検索する。
	 * @param {string} id 表示ID
	 * @returns {Promise<User | null>} 見つかったユーザー、または null
	 * @throws {Error} DB操作に失敗した場合
	*/
	findById: async (id: string): Promise<User | null> => {
		const { data, error } = await supabase
			.from("user")
			.select("*")
			.eq("id", id);

		if (error) {
			throw new Error(`Database Error: ${error.message}`);
		}

		return data[0] || null;
	},

	// TODO: Result
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
			.eq("display_id", display_id);

		if (error) {
			throw new Error(`Database Error: ${error.message}`);
		}

		return data[0] || null;
	},

	// TODO: Result
	/**
	 * ユーザーを更新する。
	 * @param {string} display_id 表示ID
	 * @param {Object} updatedData 更新するユーザ情報
	 * @returns {Promise<User>} 更新したユーザー
	 * @throws {Error} DB操作に失敗した場合
	 */
	updateByDisplayId: async (
		display_id: string,
		updateData: Partial<User>,
	): Promise<User> => {
		const { data, error } = await supabase
			.from("user")
			.update(updateData)
			.eq("display_id", display_id)
			.select();

		if (error) {
			switch (error.code) {
				case "23505":
					throw new Error("displayId is conflicted");
				case "23514":
					if (error.message.includes("user_display_id_check")) {
						throw new Error("displayId is conflicted");
					}
					break;
				default:
					console.log(error.code);
					throw new Error(`Database Error: ${error.message}`);
			}
		}

		if (!data || data.length === 0) {
			throw new Error("No data found");
		}

		return data[0];
	},
};
