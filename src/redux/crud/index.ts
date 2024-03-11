import { api as index } from "../api";
import { TODO } from "./types";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<TODO.GetTodoResponse, TODO.GetTodoRequest>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["todo"],
		}),
		postTodo: builder.mutation<TODO.PostResponse, TODO.PostTodoRequest>({
			query: (newData) => ({
				url: "",
				method: "POST",
				body: newData,
			}),
			invalidatesTags: ["todo"],
		}),
		deleteTodo: builder.mutation({
			query: (_id) => ({
				url: `${_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["todo"],
		}),
		editTodo: builder.mutation<TODO.EditTodoResponse, TODO.EditTodoRequest>({
			query: ({ newData, _id }) => ({
				url: `${_id}`,
				method: "PATCH",
				body: newData,
			}),
			invalidatesTags: ["todo"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	usePostTodoMutation,
	useDeleteTodoMutation,
	useEditTodoMutation,
} = api;
