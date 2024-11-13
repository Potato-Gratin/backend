import supabase from "../../libs/supabase";
import { User, UserModel } from "../../models/user";

const testDisplayId = "test_display_id";

describe("UserModel", () => {
	beforeEach(async () => {
		await supabase.from("user").delete().eq("display_id", testDisplayId);
		await supabase.from("user").insert({
			display_id: testDisplayId,
			name: "test_name",
			description: "test_description",
		});
	});

	afterEach(async () => {
		await supabase.from("user").delete().eq("display_id", testDisplayId);
	});

	describe("create", () => {
		it("ユーザーが正常に追加されているか", async () => {
			const user = await UserModel.create(
				"new_display_id",
				"new_name",
				"new_description",
			);
			expect(user).toMatchObject({
				display_id: "new_display_id",
				name: "new_name",
				description: "new_description",
			});
			expect(user).toHaveProperty("id");
			expect(user).toHaveProperty("created_at");
			expect(user).toHaveProperty("updated_at");
		});

		it("表示IDが重複した場合は 409 conflict が返されるか", async () => {
			await expect(
				UserModel.create(testDisplayId, "test_name", "test_description"),
			).rejects.toThrow("displayId is conflicted");
		});
	});

	describe("findById", () => {
		it("指定したIDのユーザーが見つかるか", async () => {
			const user = await UserModel.findByDisplayId(testDisplayId);
			if (!user) throw new Error("User not found");

			const foundUser = await UserModel.findById(user.id);
			expect(foundUser).toMatchObject({
				display_id: testDisplayId,
				name: "test_name",
				description: "test_description",
			});
		});

		it("存在しないIDの場合は null が返されるか", async () => {
			const user = await UserModel.findById(
				"00000000-0000-0000-0000-000000000000",
			);
			expect(user).toBeNull();
		});
	});

	describe("findByDisplayId", () => {
		it("指定した表示IDのユーザーが見つかるか", async () => {
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

	describe("updateByDisplayId", () => {
		it("ユーザー情報が正常に更新されているか", async () => {
			const updatedUser = await UserModel.updateByDisplayId(testDisplayId, {
				name: "updated_name",
				description: "updated_description",
			});
			expect(updatedUser).toMatchObject({
				display_id: testDisplayId,
				name: "updated_name",
				description: "updated_description",
			});
		});
	});
});
