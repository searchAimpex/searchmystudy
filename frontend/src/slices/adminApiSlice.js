
import { apiSlice } from './apiSlice';
const USERS_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        CreateBanner: builder.mutation({
            query: (data) => {
                const url = `${USERS_URL}/createBanner`;
                console.log('URL: ========>', url); // Log the URL
                return {
                    url,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        GetAllBanner: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/FetchAllBanner`,
                method: 'GET',

            }),
        }),
        DeleteBanner: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeleteBanner/${id}`,
                method: 'DELETE',
            }),
        }),
        ServiceCreate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/CreateService`,
                method: 'POST',
                body: data
            }),
        }),
        ServiceFetchAll: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/Services/all`,
                method: 'GET',
            })
        }),
        ServiceOne: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/Service/${id}`,
                method: 'GET',
            })
        }),
        ServiceDelete: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeleteService/${id}`,
                method: 'DELETE',
            })
        }),
        TestimonialCreate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/CreateTestimonials`,
                method: 'POST',
                body: data
            }),
        }),
        TestimonialFetchAll: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/Testimonials/all`,
                method: 'GET',
            }),
        }),
        TestimonialDelete: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeleteTestimonials/${id}`,
                method: 'DELETE',
            }),
        }),
        CreateCounsellor: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/CreateCounsellor`,
                method: 'POST',
                body: data
            }),
        }),
        AllCounsellor: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/Counsellor/all`,
                method: 'GET',
            }),
        }),
        CounsellorDelete: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeleteCounsellors/${id}`,
                method: 'DELETE',
            }),
        }),
        CreateBlog: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/Blog`,
                method: 'POST',
                body: data
            }),
        }),
        FetchBlog: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/Blog`,
                method: 'GET',
            }),
        }),
        GetOneBlog: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/Blog/${id}`,
                method: 'GET',
            }),
        }),
        DeleteBlog: builder.mutation({
            query: (ids) => ({
                url: `${USERS_URL}/blogs`,
                method: 'DELETE',
                body: { ids }, // Send array of blog IDs in the request body
            }),
        }),

        CreateCountry: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/countries`,
                method: 'POST',
                body: data
            }),
        }),
        CountryFetch: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/countries`,
                method: 'GET',
            }),
        }),
        CountryAllFetch: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/allcountries`,
                method: 'GET',
            }),
        }),
        CountryDelete: builder.mutation({
            query: (ids) => ({
                url: `${USERS_URL}/countries`,
                method: "DELETE",
                body: ids
            }),
        }),

        CountryStatusUpdate: builder.mutation({
            query: (data) => ({

                url: `${USERS_URL}/countries/${data.id}`,
                method: 'PUT',
                body: data.raw,
            }),
        }),
        CountryFetchOne: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/countries/${id}`,
                method: 'GET',
            }),
        }),
        CreateProvince: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/province`,
                method: 'POST',
                body: data
            }),
        }),
        FetchProvince: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/province`,
                method: 'GET',
            }),
        }),
        FetchOneProvince: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/province/${id}`,
                method: 'GET',
            }),
        }),
        DeleteProvince: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/province/${id}`,
                method: 'DELETE',
            }),
        }),
        UpdateProvince: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/province/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),
        CreateUniversity: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/university`,
                method: 'POST',
                body: data
            }),
        }),
        FetchUniversity: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/university`,
                method: 'GET',
            }),
        }),
        FetchOneUniversity: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/university/${id}`,
                method: 'GET',
            }),
        }),
        DeleteUniversity: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/university/${id}`,
                method: 'DELETE',
            }),
        }),
        UpdateUniversity: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/university/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),

        CreateCourse: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/course`,
                method: 'POST',
                body: data
            }),
        }),
        FetchCourse: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/course`,
                method: 'GET'
            }),
        }),
        FetchOneCourse: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/course/${id}`,
                method: 'GET'
            }),
        }),
        AllCourse: builder.mutation({
            query: (filter) => ({
                url: `${USERS_URL}/course/All`,
                method: 'GET',
                params: filter
            }),  
        }),
        UpdateCourseOne: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/course/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),


        }),
        DeleteCourse: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/course/${data}`,
                method: 'DELETE',

            }),

        }),
        LinkFetch: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/course/medical`,
                method: 'GET',
            })
        }),
        AllWebinar: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/webinar`,
                method: 'GET',
            }),
        }),
        PostWebinar: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/webinar`,
                method: 'GET',
                body: data
            }),
        }),
        DeleteWebinar: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/webinar/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateWebinar: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/webinar`,
                method: 'POST',
                body: data
            }),
        }),
        sendWebinarLinkToMail: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/webinar/register`,
                method: 'POST',
                body: data
            }),
        }),
        CreateMedia: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/media`,
                method: 'POST',
                body: data
            }),
        }),
        FetchMedia: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/media`,
                method: 'GET',

            }),
        }),
        DeleteMedia: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/webinar/${data}`,
                method: 'DELETE'
            }),
        }),
        CounsellerCreateLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/lead`,
                method: 'POST',
                body: data
            }),
        }),
        CounsellerFetchLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/lead`,
                method: 'GET',
                body: data
            }),
        }),
        CounsellerDeleteLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/lead/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/homelead`,
                method: 'POST',
                body: data
            }),
        }),
        GetLead: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/homelead`,
                method: 'GET',
            }),
        }),
        HomeLeadDelete: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/homelead/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateContactLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/contactlead`,
                method: 'POST',
                body: data
            }),
        }),
        GetContactLead: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/contactlead`,
                method: 'GET',
            }),
        }),
        DeleteContactLead: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/contactlead/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateQuery: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/createQuery`,
                method: 'POST',
                body: data
            }),
        }),
        GetQuery: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/getAllQuery`,
                method: 'GET'
            })
        }),
        fetchNotifcation: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/notify-me/${data}`,
                method: 'GET'
            }),
        }),
        fetchAllNotifcation: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/notfiy-all`,
                method: 'GET'
            }),
        }),
        createNotifcation: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/notify-role`,
                method: 'POST',
                body: data
            }),
        }),
        GetAllStudent: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/student`,
                method: 'GET'
            }),
        }),
        ChangeStatusStudent: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/student/status/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),
        StudentDelete: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/student/${data}`,
                method: 'DELETE',

            }),
        }),
        UpdateStudent: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/student/detail/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),
        FetchAllTicket: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/ticket`,
                method: 'GET'
            }),
        }),
        RemoveOneTicket: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/ticket/${data}`,
                method: 'DELETE',

            }),
        }),
        UpdateOneTicket: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/ticket/${data.id}`,
                method: 'PUT',
                body: data.raw

            }),
        }),
        CreateResponseTicket: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/ticket/reply/${data.id}`,
                method: 'POST',
                body: data.raw

            }),
        }),
        CreatePromotional: builder.mutation({
            query: (data) => {
                const url = `${USERS_URL}/createPromotional`;
                console.log('URL: ========>', url); // Log the URL
                return {
                    url,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        GetAllPromotional: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/FetchAllPromotional`,
                method: 'GET',

            }),
        }),
        DeletePromotional: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeletePromotional/${id}`,
                method: 'DELETE',
            }),
        }),
        FetchAllProfile: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: 'GET'
            }),
        }),

        ChangeStatusProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile/status/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),
        ProfileDelete: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile/${data}`,
                method: 'DELETE',

            }),
        }),
        CreateMyPopup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/popup`,
                method: 'POST',
                body: data
            }),
        }),
        FetchMyPopup: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/popup`,
                method: 'GET',
            }),
        }),
        DeleteMyPopup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/popup/${data}`,
                method: 'DELETE',
            }),
        }),
        FetchMainPopup: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/popup/main`,
                method: 'GET',
            }),
        }),
        CreateMyUpload: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/upload`,
                method: 'POST',
                body: data
            }),
        }),
        FetchMyUpload: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/upload`,
                method: 'GET',
            }),
        }),
        DeleteMyUpload: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/upload/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateMyCommission: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/commission`,
                method: 'POST',
                body: data
            }),
        }),
        FetchMyCommission: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/commission`,
                method: 'GET',
            }),
        }),
        FetchLoan: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/loan`,
                method: 'GET',
            }),
        }),
        UpdateLoan: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/loan/status/${data.id}`,
                method: 'PUT',
                body: data.raw
            }),
        }),
        DeleteLoans: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/loan/${data}`,
                method: 'DELETE',

            }),
        }),
        CreateTransaction: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/transaction`,
                method: 'POST',
                body: data
            }),
        }),
        FetchTransaction: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/transaction`,
                method: 'GET',
            }),
        }),
        DeleteMyTransaction: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/transaction/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateNav: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/nav`,
                method: 'POST',
                body: data
            }),
        }),
        FetchNav: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/nav`,
                method: 'GET',
            }),
        }),
        DeleteMyNav: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/nav/${data}`,
                method: 'DELETE',
            }),
        }),
        CheckCenter: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/CenterCheck/${data}`,
                method: 'GET',
            }),
        }),
        CreateFile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/file`,
                method: 'POST',
                body: data
            }),
        }),
        FetchFile: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/file`,
                method: 'GET',
            }),
        }),
        DeleteMyFile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/file/${data}`,
                method: 'DELETE',
            }),
        }),
        CreateVideo: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/CreateVideo`,
                method: 'POST',
                body: data
            }),
        }),
        AllVideo: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/Video/all`,
                method: 'GET',
            }),
        }),
        VideoDelete: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/DeleteVideo/${id}`,
                method: 'DELETE',
            }),
        }),




    })
})


export const { useCreateBannerMutation, useGetAllBannerMutation, useDeleteBannerMutation,
    useServiceCreateMutation, useServiceFetchAllMutation, useServiceDeleteMutation, useServiceOneMutation,
    useTestimonialCreateMutation, useTestimonialFetchAllMutation, useTestimonialDeleteMutation,
    useCreateCounsellorMutation, useAllCounsellorMutation, useCounsellorDeleteMutation,
    useCreateBlogMutation, useFetchBlogMutation, useGetOneBlogMutation, useDeleteBlogMutation,
    useCreateCountryMutation, useCountryFetchMutation, useCountryDeleteMutation, useCountryFetchOneMutation, useCountryStatusUpdateMutation, useCountryAllFetchMutation,
    useCreateProvinceMutation, useFetchProvinceMutation, useDeleteProvinceMutation, useFetchOneProvinceMutation, useUpdateProvinceMutation,
    useCreateUniversityMutation, useFetchUniversityMutation, useDeleteUniversityMutation, useFetchOneUniversityMutation, useUpdateUniversityMutation,
    useCreateCourseMutation, useFetchCourseMutation, useFetchOneCourseMutation, useAllCourseMutation, useDeleteCourseMutation, useLinkFetchMutation, useUpdateCourseOneMutation,
    usePostWebinarMutation, useAllWebinarMutation, useDeleteWebinarMutation, useCreateWebinarMutation, useSendWebinarLinkToMailMutation,
    useCreateMediaMutation, useFetchMediaMutation, useDeleteMediaMutation,
    useCounsellerCreateLeadMutation, useCounsellerFetchLeadMutation, useCounsellerDeleteLeadMutation,
    useCreateLeadMutation, useGetLeadMutation, useHomeLeadDeleteMutation,
    useCreateContactLeadMutation, useGetContactLeadMutation, useDeleteContactLeadMutation,
    useFetchNotifcationMutation, useCreateNotifcationMutation, useFetchAllNotifcationMutation,
    useGetAllStudentMutation, useChangeStatusStudentMutation, useStudentDeleteMutation, useUpdateStudentMutation,
    useFetchAllTicketMutation, useRemoveOneTicketMutation, useUpdateOneTicketMutation, useCreateResponseTicketMutation,
    useCreatePromotionalMutation, useGetAllPromotionalMutation, useDeletePromotionalMutation,
    useFetchAllProfileMutation, useChangeStatusProfileMutation, useProfileDeleteMutation,
    useCreateMyPopupMutation, useFetchMyPopupMutation, useDeleteMyPopupMutation, useFetchMainPopupMutation,
    useCreateMyUploadMutation, useFetchMyUploadMutation, useDeleteMyUploadMutation,
    useCreateMyCommissionMutation, useFetchMyCommissionMutation,
    useFetchLoanMutation, useUpdateLoanMutation, useDeleteLoansMutation,
    useCreateTransactionMutation, useFetchTransactionMutation, useDeleteMyTransactionMutation,
    useCreateNavMutation, useFetchNavMutation, useDeleteMyNavMutation, useCheckCenterMutation,
    useCreateFileMutation, useFetchFileMutation, useDeleteMyFileMutation,
    useCreateVideoMutation, useAllVideoMutation, useVideoDeleteMutation, useCreateQueryMutation, useGetQueryMutation
} = userApiSlice