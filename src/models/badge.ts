import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, type Result, Success } from "../types/result.types";

export interface Badge {
	id: string;
	review_id: string;
	user_id: string;
	created_at: string;
	updated_at: string;
	badge_flame_id: string;
	badge_text_id: string;
}

export const BadgeModel = {
	addBadge: (articleId: string, reviewId: number, userId: string) => {
		return {
			id: "test-badge-id",
			article_id: articleId,
			review_id: reviewId,
			user_id: userId,
			created_at: new Date(),
			updated_at: new Date(),
		};
	},
	/**
	 * レビューに対応したバッジ情報を取得する
	 * @param {string} reviewId ID
	 * @returns {Promise<Result<Badge | null, PostgrestError>>} 検索結果。見つからなかった場合は null
	 * @throws {Error} DB操作に失敗した場合
	 */
	getBadgesByReview: async (
		reviewId: string
	): Promise<Result<Badge | null, PostgrestError>> => {
		const { data, error } = await supabase
			.from("badge")
			.select("*")
			.eq("review_id", reviewId);
	
		if (error) {
			return new Failure(error);
		}
	
		return new Success(data[0] || null);
	},
	getReceivedBadges: (displayId: string) => {
		return [
			{
				id: "test-badge-id-1",
				article_id: "test-article-id-1",
				review_id: 1,
				user_id: displayId,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];
	},
	getSentBadges: (displayId: string) => {
		return [
			{
				id: "test-badge-id-1",
				article_id: "test-article-id-1",
				review_id: 1,
				user_id: displayId,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];
	},
};
