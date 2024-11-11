import supabase from '../libs/supabase';

interface User {
  id: string;          
  displayId: string;
  name: string;
  description: string;
}

export const UserModel = {
  /**
   * ユーザーを作成する。
   * @param {string} displayId 表示ID
   * @param {string} name ユーザー名
   * @param {string} description 説明
   * @returns {Promise<string>} 作成したユーザーのID
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (displayId: string, name: string, description: string): Promise<string> => {
    const { data, error } = await supabase
      .from('user')
      .insert([{ displayId, name, description }])
      .select('id'); 
      
    if (error) {
      switch (error.code) {
        case '23505': 
          throw new Error('displayId is conflicted');
        case '23502': 
          throw new Error('displayId is required');
        default:
          throw new Error(`Database Error: ${error.message}`);
      }
    }

    if (data && data[0]) {
      return data[0].id;
    } else {
      throw new Error('User creation failed: No data returned');
    }
  }
};