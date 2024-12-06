import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Failure, Result, Success } from "../types/result.types";

export interface Review {
	id: string;
	article_id: string;
	content: string | null;
	created_at: string;
	updated_at: string;
	user_id: string;
	parent_review_id: string;
	parent_article_id: string;
}

export const ReviewModel = {
	getReviewsByArticleId: async (articleId: string, page: number): Promise<Result<Review[], PostgrestError>> => {
		const { data, error } = await supabase
			.from("review")
			.select("*")
			.eq("article_id", articleId)
			.order("created_at", { ascending: true })
			.range((page - 1) * 10, page * 10 - 1);

		if (error) {
			return new Failure(error)
		}

		return new Success(data);
	},
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
	getUserReviews: (displayId: string) => {
		// テストデータを返す
		return Array(10).fill({
			id: "test-review-id",
			article_id: "test-article-id",
			content: "This is a test review.",
			created_at: new Date(),
			updated_at: new Date(),
			user_id: displayId,
			parent_review_id: null,
			parent_article_id: null,
		});
	},
	deleteReview: (articleId: string, reviewId: string) => {
		// テストデータを返す
		return { success: true };
	},
};
