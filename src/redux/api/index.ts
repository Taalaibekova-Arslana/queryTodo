import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuary = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BACKEND_URL,
});

const baseQueryExtended: BaseQueryFn = async (arg, api, extraOptions) => {
	const result = await baseQuary(arg, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryExtended,
	refetchOnReconnect: true,
	refetchOnFocus: false,
	tagTypes: ["todo"],
	endpoints: () => ({}),
});
