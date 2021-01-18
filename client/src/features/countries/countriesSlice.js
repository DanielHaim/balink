import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import { getCountries } from "../../utils/api"

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    const response = await getCountries();
    const data = response.data.express;
    return data.countries;
})

const countriesAdapter = createEntityAdapter()

const initialState = countriesAdapter.getInitialState()

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCountries.fulfilled]: countriesAdapter.setAll
    }
})

export default countriesSlice.reducer

export const {
    selectAll: selectAllCountries,
    selectById: selectCountrieById
} = countriesAdapter.getSelectors(state => state.countries)