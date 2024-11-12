import { UserModel, User } from '../../models/user';
import supabase from '../../libs/supabase';

const testDisplayId = 'test_display_id';

describe('UserModel', () => {
  beforeEach(async () => {
    await supabase.from('user').delete().eq('display_id', testDisplayId);
  });

  afterEach(async () => {
    await supabase.from('user').delete().eq('display_id', testDisplayId);
  });

  describe('create', () => {
    it('ユーザーが正常に追加されているか', async () => {
      const user = await UserModel.create(testDisplayId, 'test_name', 'test_description');
      expect(user).toMatchObject({
        display_id: testDisplayId,
        name: 'test_name',
        description: 'test_description'
      });
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('created_at');
      expect(user).toHaveProperty('updated_at');
    });

    it('表示IDが重複した場合は 409 conflict が返されるか', async () => {
      await UserModel.create(testDisplayId, 'test_name', 'test_description');
      await expect(UserModel.create(testDisplayId, 'test_name', 'test_description'))
        .rejects
        .toThrow('displayId is conflicted');
    });

    it('display_idがリクエスト内に存在しない場合、400 Bad Request が返されるか', async () => {
      await expect(UserModel.create('', 'test_name', 'test_description'))
        .rejects
        .toThrow('displayId is required');
    });
  });
});
