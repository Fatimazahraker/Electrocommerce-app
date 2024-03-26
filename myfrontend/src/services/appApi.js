import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
            // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
            
        }),

        //add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                method: "POST",
                body: cartInfo,
            }),
        }),
    
        // remove from cart 
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                method: "POST",
                body,
            }),
        }),
        
        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                method: "POST",
                body,
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                method: "POST",
                body,
            }),
        }),
}),

});

export const { useSignupMutation, useLoginMutation, useCreateProductMutation, useAddToCartMutation, useRemoveFromCartMutation, useIncreaseCartProductMutation, useDecreaseCartProductMutation } = appApi;

export default appApi;