export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TConstructorIngredient = TIngredient & { uuid: string };

export type TOrder = {
	_id: string;
	number: number;
	status: 'done' | 'pending' | 'created';
	ingredients: string[];
	createdAt: string;
	updatedAt: string;
	name: string;
};
