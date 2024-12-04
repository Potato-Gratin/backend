import supabase from "../libs/supabase";

export type Badge = {
    id: string;
    review_id: string;
    user_id: string;
    badge_flame_id: string;
    badge_text_id: string;
    created_at: string;
    updated_at: string;
};

export const BadgeModel = {
	/**
	 * ユーザーを作成する。
	 * @param {string} review_id レビューID
	 * @param {string} user_id ユーザーID
	 * @param {string} badge_flame_id バッジフレームID
	 * @param {string} badge_text_id バッジテキストID
	 * @returns {Promise<Badge>} 
	 * @throws {Error} DB操作に失敗した場合
	 */
    addBadge: async(
        review_id: string,
        user_id: string,
        badge_flame_id: string,
        badge_text_id: string
    ): Promise<Badge> => {
        const { data, error } = await supabase
            .from("badge")
            .insert({
                review_id,
                user_id,
                badge_flame_id,
                badge_text_id,
            })
            .select();

        if (error) {
            throw new Error(`Failed to add badge: ${error.message}`);
        }

        return data[0];
    },
	getBadgesByReview: (articleId: string, reviewId: number) => {
		return [
			{
				id: "test-badge-id-1",
				article_id: articleId,
				review_id: reviewId,
				user_id: "test-user-id-1",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "test-badge-id-2",
				article_id: articleId,
				review_id: reviewId,
				user_id: "test-user-id-2",
				created_at: new Date(),
				updated_at: new Date(),
			},
		];
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
