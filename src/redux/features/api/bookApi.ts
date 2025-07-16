import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://librarymanagementsystem-ten.vercel.app/api/" }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getBook: builder.query({
            query: () => "books",
            
            providesTags: ["book"]
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
            invalidatesTags : ["book"]
        })
    }),


});

export const { useGetBookQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation } = bookApi;