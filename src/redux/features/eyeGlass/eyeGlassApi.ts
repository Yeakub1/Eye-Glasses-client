import { baseApi } from "../../api/baseApi";

const eyeGlassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: ({
        material,
        shape,
        lens,
        brand,
        gender,
        color,
        minPrice,
        maxPrice,
        searchTerm,
        email,
        role,
      }) => {
        const params = new URLSearchParams();
        if (material) {
          params.append("frameMaterial", material);
        }
        if (shape) {
          params.append("frameShape", shape);
        }
        if (lens) {
          params.append("lensType", lens);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (gender) {
          params.append("gender", gender);
        }
        if (color) {
          params.append("color", color);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        console.log(email, role);
        return {
          url: `/products/all-products/${email}/${role}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["all-glasses"],
    }),
    getEyeGlass: builder.query({
      query: (id: string) => ({
        url: `/products/single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["all-glasses"],
    }),
    addEyeGlass: builder.mutation({
      query: (productData) => ({
        url: "/products/add-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["all-glasses"],
    }),
    updateEyeGlass: builder.mutation({
      query: ({ eyeglass, id }) => {
        return {
          url: `/products/update-product/${id}`,
          method: "PUT",
          body: eyeglass,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    deleteEyeGlass: builder.mutation({
      query: (id) => {
        return {
          url: `/products/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    alldeleteEyeGlass: builder.mutation({
      query: (deletedGlass) => {
        return {
          url: `/products/all-delete`,
          method: "POST",
          body: deletedGlass,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    sellEyeGlass: builder.mutation({
      query: (sellData) => {
        console.log(sellData, "inside base api");
        return {
          url: `/sales/create-sales`,
          method: "POST",
          body: sellData,
        };
      },
      invalidatesTags: ["all-sales"],
    }),
  }),
});

export const {
  useGetAllEyeGlassQuery,
  useAddEyeGlassMutation,
  useGetEyeGlassQuery,
  useUpdateEyeGlassMutation,
useDeleteEyeGlassMutation,
  useSellEyeGlassMutation,
  useAlldeleteEyeGlassMutation
} = eyeGlassApi;
