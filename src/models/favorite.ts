const favorites = [
  { user_id: "user1", article_id: "article1", created_at: new Date(), updated_at: new Date() },
  { user_id: "user2", article_id: "article1", created_at: new Date(), updated_at: new Date() },
  // ...他のテストデータ...
];

const getFavoritesByArticleId = (article_id: string) => {
  return favorites.filter(favorite => favorite.article_id === article_id);
};

const addFavorite = (user_id: string, article_id: string) => {
  const newFavorite = { user_id, article_id, created_at: new Date(), updated_at: new Date() };
  favorites.push(newFavorite);
  return newFavorite;
};

const removeFavorite = (user_id: string, article_id: string) => {
  const index = favorites.findIndex(favorite => favorite.user_id === user_id && favorite.article_id === article_id);
  if (index !== -1) {
    return favorites.splice(index, 1)[0];
  }
  return null;
};

export const FavoriteModel = {
  favorites,
  getFavoritesByArticleId,
  addFavorite,
  removeFavorite
};
