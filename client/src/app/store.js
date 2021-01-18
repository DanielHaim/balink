
import { configureStore } from '@reduxjs/toolkit'
import countriesReducer  from "../features/countries/countriesSlice"
import formReducer from "../features/form/formSlice"

export default configureStore({
  reducer: {
    countries: countriesReducer,
    form: formReducer
}});

