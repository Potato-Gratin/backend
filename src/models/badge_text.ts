export interface BadgeText {
	id: number;
	context: string;
}

const badgeTexts: BadgeText[] = [
	{ id: 1, context: "First Badge" },
	{ id: 2, context: "Second Badge" },
];

const getAllBadgeTexts = (): BadgeText[] => {
	return badgeTexts;
};

const getBadgeTextById = (id: number): BadgeText | undefined => {
	return badgeTexts.find((badgeText) => badgeText.id === id);
};

export const BadgeTextModel = {
	getAllBadgeTexts,
	getBadgeTextById,
};
