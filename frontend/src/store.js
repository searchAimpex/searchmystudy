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
import assessmentReducer from './slices/assessmentSlice'
import popupReducer from './slices/popUpSlice'
import uploadReducer from './slices/uploadSlice'
import commissionReducer from './slices/commissionSlice'
import loanReducer from './slices/loanSlice'
import transactionReducer from './slices/transactionSlice'
import navReducer from './slices/navSlice'
import fileReducer from './slices/fileSlice'
import videoReducer from './slices/videoSlice'
import componentReducer from './slices/componentSlice'
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
    ticket:ticketReducer,
    assessment: assessmentReducer,
    popup:popupReducer,
    upload: uploadReducer,
    commission:commissionReducer,
    loan:loanReducer,
    transaction:transactionReducer,
    nav:navReducer,
    file:fileReducer,
    video:videoReducer,
    component: componentReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
