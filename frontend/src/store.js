import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import  bannerReducer from './slices/bannerSlice';
import serviceReducer from './slices/serviceSlice';
import testimonialReducer from './slices/testimonialSlice';
import counsellorReducer from './slices/counsellorSlice';
import blogReducer from './slices/blogSlice';
import countryReducer from './slices/countrySlice';
import provinceReducer from './slices/provinceSlice';
import universityReducer from './slices/universitySlice';
import webinarReducer from './slices/webinarSlice';
import courseReducer from './slices/courseSlice';
import mediaReducer from './slices/mediaSlice';
import counsellerLeadReducer from './slices/counsellerLeadSlice'
import homeLeadReducer from './slices/leadSlice'
import contactLeadReducer from './slices/contactLeadSlice'
import notificationReducer from './slices/notificationSlice'
import secondCountryReducer from './slices/secondCountrySlice'
import studentReducer from './slices/studentSlice'
import ticketReducer from './slices/ticketSlice'
import promotionalReducer from './slices/promotionalSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    banner:bannerReducer,
    service:serviceReducer,
    testimonial:testimonialReducer,
    counsellor:counsellorReducer,
    blog:blogReducer,
    promotional:promotionalReducer,

    country:countryReducer,
    province:provinceReducer,
    university:universityReducer,
    course:courseReducer,
    webinar:webinarReducer,
    media:mediaReducer,
    counsellerLead : counsellerLeadReducer,
    homeLead: homeLeadReducer,
    contactLead : contactLeadReducer,
    notification: notificationReducer,
    secondCountry:secondCountryReducer,
    student:studentReducer,
    ticket:ticketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
