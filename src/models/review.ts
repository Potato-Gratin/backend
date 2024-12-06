import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, type Result, Success } from "../types/result.types";

export interface Review {
	id: string;
	article_id: string;
	content: string | null;
	created_at: string;
	updated_at: string;
	user_id: string;
	parent_review_id: string | null;
	parent_article_id: string | null;
}

export const ReviewModel = {
	addReview: (articleId: string, content: string, userId: string) => {
		// テストデータを返す
		return {
			id: "new-review-id",
			article_id: articleId,
			content: content,
			created_at: new Date(),
			updated_at: new Date(),
			user_id: userId,
			parent_review_id: null,
			parent_article_id: null,
		};
	},

	getReviewsByArticleId: async (
		articleId: string,
		page: number,
	): Promise<Result<Review[], PostgrestError>> => {
		const { data, error } = await supabase
			.from("review")
			.select("*")
			.eq("article_id", articleId)
			.order("created_at", { ascending: false })
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			return new Failure(error);
		}

		return new Success(data);
	},

	getReviewsByUserId: async (userId: string, page: number): Promise<Result<Review[], PostgrestError>> => {
		const { data, error } = await supabase
			.from("review")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false })
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			return new Failure(error);
		}

		return new Success(data);
	},

	deleteReview: (articleId: string, reviewId: string) => {
		// テストデータを返す
		return { success: true };
	},
};
