import { supabase } from '../libs/supabase'; // supabaseクライアントをインポート

interface User {
  id: string;          // UUID型をstringで表現
  displayId: string;
  name: string;
  description: string;
}

export const UserModel = {
  /**
   * ユーザーを作成する。
   * @param {string} id ユーザーID (UUID形式)
   * @param {string} displayId 表示ID
   * @param {string} name ユーザー名
   * @param {string} description 説明
   * @returns {Promise<string>} 作成したユーザーのID
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (displayId: string, name: string, description: string): Promise<string> => {
    const { data, error } = await supabase
      .from('user')
      .insert([{displayId, name, description }])
      .select('*');

    if (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
    
    return data ? data[0] : '';  // データが存在する場合のみIDを返す
  },
  /**
   * 指定された displayId を持つユーザーを検索する。
   * @param {string} displayId 検索対象の表示ID
   * @returns {Promise<User | null>} ユーザー情報または null
   */
  findByDisplayId: async (displayId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('displayId', displayId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 は空データを意味するエラーコード
      throw new Error(`User search failed: ${error.message}`);
    }

    return data || null; // 見つかった場合はユーザー情報、見つからない場合は null を返す
  }

};
