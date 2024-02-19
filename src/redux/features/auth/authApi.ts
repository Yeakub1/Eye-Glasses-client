import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo,'auth api')
        return {
          url: "/users/create-user",
          method: "POST",
          body: userInfo,
        };
       
      },
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/users/login-user",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useUserRegisterMutation } = authApi;
