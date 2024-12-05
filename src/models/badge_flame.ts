export const BadgeFlame = {
	findAll: async () => [
		{ id: 1, price: 100 },
		{ id: 2, price: 200 },
	],

	findById: async (id: number) => {
		const data = [
			{ id: 1, price: 100 },
			{ id: 2, price: 200 },
		];
		return data.find((item) => item.id === id) || null;
	},
};
