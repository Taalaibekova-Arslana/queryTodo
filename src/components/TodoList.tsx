import { useState } from "react";
import {
	useDeleteTodoMutation,
	useEditTodoMutation,
	useGetTodosQuery,
	usePostTodoMutation,
} from "../redux/crud";
import { Button, TextField } from "@mui/material";
import scss from "./TodoList.module.scss";

interface ItemTodo {
	_id?: number;
	title: string;
	price: number;
	img: string;
}

const TodoList = () => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState<string | number>("");
	const [img, setImg] = useState("");

	const [newTitle, setNewTitle] = useState("");
	const [newPrice, setNewPrice] = useState<string | number>("");
	const [newImg, setNewImg] = useState("");
	const { data, isLoading } = useGetTodosQuery();

	const [isEdit, setIsEdit] = useState<number | null>(null);
	const [postTodos] = usePostTodoMutation();
	const [deleteTodos] = useDeleteTodoMutation();
	const [editTodo] = useEditTodoMutation();

	const postTodoRequest = async () => {
		if (title === "" || price === "" || img === "") {
			alert("Пожалуйста заполните поля!");
		} else {
			const newData = {
				title: title,
				price: price,
				img: img,
			};
			await postTodos(newData);
			setTitle("");
			setPrice("");
			setImg("");
		}
	};

	const deleteRequestTodo = async (_id: number) => {
		await deleteTodos(_id);
	};

	const editRequestTodo = async (item: ItemTodo) => {
		setNewTitle(item.title);
		setNewPrice(item.price);
		setNewImg(item.img);
		setIsEdit(item._id!);
	};

	const saveRequestTodo = async (_id: number) => {
		const newData = {
			title: newTitle,
			price: newPrice,
			img: newImg,
		};
		await editTodo({ _id, newData });
		setIsEdit(null);
	};

	return (
		<div className={scss.mainDiv}>
			<div className={scss.mainInputs}>
				<TextField
					label="Title"
					color="secondary"
					focused
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					label="Price"
					color="secondary"
					focused
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<TextField
					label="Image"
					color="secondary"
					focused
					value={img}
					onChange={(e) => setImg(e.target.value)}
				/>
				<Button onClick={postTodoRequest} color="secondary">
					Add
				</Button>
			</div>
			{isLoading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					<div className={scss.cards}>
						{data?.map((item) => (
							<div className={scss.cardList} key={item._id}>
								{isEdit === item._id ? (
									<>
										<TextField
											label="Filled success"
											variant="filled"
											color="success"
											focused
											value={newTitle}
											onChange={(e) => setNewTitle(e.target.value)}
										/>
										<TextField
											label="Filled success"
											variant="filled"
											color="success"
											focused
											value={newPrice}
											onChange={(e) => setNewPrice(e.target.value)}
										/>
										<TextField
											label="Filled success"
											variant="filled"
											color="success"
											focused
											value={newImg}
											onChange={(e) => setNewImg(e.target.value)}
										/>
										<Button
											variant="contained"
											color="success"
											onClick={() => saveRequestTodo(item._id!)}>
											Save
										</Button>
										<Button
											variant="outlined"
											color="error"
											onClick={() => setIsEdit(null)}>
											Cancel
										</Button>
									</>
								) : (
									<>
										<h1>{item.title}</h1>
										<h4>{item.price}</h4>
										<img src={item.img} alt={item.title} />
										<div>
											<Button
												variant="contained"
												color="error"
												onClick={() => deleteRequestTodo(item._id!)}>
												Delete
											</Button>
											<Button
												variant="contained"
												color="success"
												onClick={() => editRequestTodo(item)}>
												Edit
											</Button>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TodoList;
