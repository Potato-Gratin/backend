import supabase from "../../libs/supabase";
import { User, UserModel } from "../../models/user";

const testDisplayId = "test_display_id";

describe("UserModel", () => {
	beforeEach(async () => {
		await supabase.from("user").delete().eq("display_id", testDisplayId);
	});

	afterEach(async () => {
		await supabase.from("user").delete().eq("display_id", testDisplayId);
	});

	describe("create", () => {
		it("ユーザーが正常に追加されているか", async () => {
			const user = await UserModel.create(
				testDisplayId,
				"test_name",
				"test_description",
			);
			expect(user).toMatchObject({
				display_id: testDisplayId,
				name: "test_name",
				description: "test_description",
			});
			expect(user).toHaveProperty("id");
			expect(user).toHaveProperty("created_at");
			expect(user).toHaveProperty("updated_at");
		});

		it("表示IDが重複した場合は 409 conflict が返されるか", async () => {
			await UserModel.create(testDisplayId, "test_name", "test_description");
			await expect(
				UserModel.create(testDisplayId, "test_name", "test_description"),
			).rejects.toThrow("displayId is conflicted");
		});
	});

	describe("findByDisplayId", () => {
		it("指定した表示IDのユーザーが見つかるか", async () => {
			await UserModel.create(testDisplayId, "test_name", "test_description");
			const user = await UserModel.findByDisplayId(testDisplayId);
			expect(user).toMatchObject({
				display_id: testDisplayId,
				name: "test_name",
				description: "test_description",
			});
		});

		it("存在しない表示IDの場合は null が返されるか", async () => {
			const user = await UserModel.findByDisplayId("non_existent_display_id");
			expect(user).toBeNull();
		});
	});
});
