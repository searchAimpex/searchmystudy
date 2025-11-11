import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAllUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/profile/all`,
        method: 'GET'
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/delete/${data}`,
        method: 'DELETE',
       
      }),
    }),
    getAllfrechise: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/profile/frenchise`,
        method: 'GET'
      }),
    }),
    userBlock: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/block/${data.userId}`,
        method: 'PUT',
        body: data.status
      }),
    }),
    CountryCreate: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry`,
        method: 'POST',
        body: data
      }),
    }),
    CountryGet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry`,
        method: 'GET',
      }),
    }),
    CountryGetOne: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry/${data}`,
        method: 'GET',
      }),
    }),
    CountryUpdate: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry/${data.id}`,
        method: 'PUT',
        body: data.formValues
      }),
    }),
    CountryDeletes: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry/${data}`,
        method: 'DELETE'
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAllUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllfrechiseMutation,
  useUserBlockMutation,
  useCountryCreateMutation,
  useCountryGetMutation,
  useCountryGetOneMutation,
  useCountryUpdateMutation,
  useCountryDeletesMutation
} = userApiSlice;