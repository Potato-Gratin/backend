export interface User {
	id: string;
	article_id: string;
	content: string;
	created_at: string;
	updated_at: string;
	user_id: string;
	parent_review_id: string | null;
	parent_article_id: string | null;
}

export const ReviewModel = {
	getArticleReviews: (articleId: string, page = 1) => {
		// テストデータを返す
		return Array(10).fill({
			id: "test-review-id",
			article_id: articleId,
			content: "This is a test review.",
			created_at: new Date(),
			updated_at: new Date(),
			user_id: "test-user-id",
			parent_review_id: null,
			parent_article_id: null,
		});
	},
	addReview: (articleId: string, content: string, userId: string) => {
		
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
