import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: ({ filter, user }) => {
         const params = new URLSearchParams();
       if (filter) {
         params.append("filterBy", filter);
       }
        return {
          url: `/sales/all-sales/${user?.email}/${user?.role}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["all-sales"],
    }),
    deleteSales: builder.mutation({
      query: (id) => {
        return {
          url: `/sales/delete-sales/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["all-sales"],
    }),
  }),
});

export const { useGetAllSalesQuery, useDeleteSalesMutation } = salesApi;
