/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace TODO {
	type GetTodoRequest = void;
	type GetTodoResponse = {
		_id?: number;
		title: string;
		price: number;
		img: string;
	}[];
	type GetTodoRequest = {
		_id?: number;
		title: string;
		price: number;
		img: string;
	};
	type GetResponse = {
		_id?: number;
		title: string;
		price: number;
		img: string;
	};
	// !POST
	type PostTodoRequest = {
		title: string;
		price: number | string;
		img: string;
	};
	type PostResponse = {
		newData: {
			_id?: number;
			title: string;
			price: number | string;
			img: string;
		}[];
	};

	// !EDIT
	type EditTodoRequest = {
		_id?: number;
		newData: {
			title: string;
			price: number | string;
			img: string;
		};
	};
	type EditTodoResponse = {
		_id?: number;
		newData: {
			title: string;
			price: number | string;
			img: string;
		};
	};
}
