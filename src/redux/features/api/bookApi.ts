import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
    tagTypes: ["book", "borrow"],
    endpoints: (builder) => ({
        getBook: builder.query({
            query: ({ limit = 5, page = 1 }) => `books?limit=${limit}&page=${page}`,
            providesTags: ["book", "borrow"],
        }),
        createBook: builder.mutation({
            query: (body) => ({
                url: "books",
                method: "POST",
                body
            }),
            invalidatesTags: ["book"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: builder.mutation({
            query: ({ id, body }) => ({
                url: `books/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["book"]
        }),
        getBorrow: builder.query({
            query: () => "borrow",
            providesTags: ["borrow", "book"]
        }),
        createBorrow: builder.mutation({
            query: (body) => ({
                url: "borrow",
                method: "POST",
                body
            }),
            invalidatesTags: ["borrow"]
        })
    }),


});

export const { useGetBookQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation, useCreateBorrowMutation, useGetBorrowQuery } = bookApi;