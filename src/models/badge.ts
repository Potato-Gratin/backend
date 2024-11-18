export const BadgeModel = {
  addBadge: (articleId: string, reviewId: number, userId: string) => {
    return {
      id: 'test-badge-id',
      article_id: articleId,
      review_id: reviewId,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date()
    };
  },
  getBadgesByReview: (articleId: string, reviewId: number) => {
    return [
      {
        id: 'test-badge-id-1',
        article_id: articleId,
        review_id: reviewId,
        user_id: 'test-user-id-1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'test-badge-id-2',
        article_id: articleId,
        review_id: reviewId,
        user_id: 'test-user-id-2',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  },
  getReceivedBadges: (displayId: string) => {
    return [
      {
        id: 'test-badge-id-1',
        article_id: 'test-article-id-1',
        review_id: 1,
        user_id: displayId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  },
  getSentBadges: (displayId: string) => {
    return [
      {
        id: 'test-badge-id-1',
        article_id: 'test-article-id-1',
        review_id: 1,
        user_id: displayId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
};
