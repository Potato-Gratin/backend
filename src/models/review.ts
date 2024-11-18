export const ReviewModel = {
    getArticleReviews: (articleId: string, page: number = 1) => {
        // テストデータを返す
        return Array(10).fill({
            id: "test-review-id",
            article_id: articleId,
            content: "This is a test review.",
            created_at: new Date(),
            updated_at: new Date(),
            user_id: "test-user-id",
            parent_review_id: null,
            parent_article_id: null
        });
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
            parent_article_id: null
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
            parent_article_id: null
        });
    },
    deleteReview: (articleId: string, reviewId: string) => {
        // テストデータを返す
        return { success: true };
    }
};
