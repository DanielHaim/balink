import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from "@reduxjs/toolkit"
import { addSubscriber } from "../../utils/api"

const personalFormAdapter = createEntityAdapter();
const businessFormAdapter = createEntityAdapter();
const subscribersAdapter = createEntityAdapter();

const personalFormInitialState = personalFormAdapter.getInitialState({step: 1});
const businessFormInitialState = businessFormAdapter.getInitialState({step: 1});
const subscribersInitialState  = subscribersAdapter.getInitialState();
const initialState = {
    currentForm: "personal",
    showModal: false,
    modalContent: "",
    personalForm: personalFormInitialState,
    businessForm: businessFormInitialState,
    subscribers: subscribersInitialState
}

export const addNewSubscriber = createAsyncThunk('form/addNewSubscriber', async subscriberData => {
    const response = await addSubscriber(subscriberData);
    console.log(response.data, "response of the server");
    return response.data;
})

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        inputAdded(state, action) {
            const { id, formType } = action.payload
            const temp_state = formType === "personal" ? state.personalForm : state.businessForm;
            const adapter = formType === "personal" ? personalFormAdapter : businessFormAdapter;
            const existingInput = temp_state.entities[id]
            if (!existingInput) {
                adapter.addOne(temp_state, action.payload)
            }
        },
        inputUpdated(state, action) {
            const { id, formType, ...changes } = action.payload
            const temp_state = formType === "personal" ? state.personalForm : state.businessForm;
            const adapter = formType === "personal" ? personalFormAdapter : businessFormAdapter;
            const existingInput = temp_state.entities[id]
            if(existingInput){
                adapter.updateOne(temp_state, {id, changes})
            }
        },
        inputsUpdated(state,action) {
            const temp_state = state.currentForm === "personal" ? state.personalForm : state.businessForm;
            const adapter = state.currentForm === "personal" ? personalFormAdapter : businessFormAdapter;
            adapter.updateMany(temp_state, action.payload)
        },
        incrementStep(state, action) { 
            state.currentForm === "personal" ? state.personalForm.step += 1 : state.businessForm.step += 1;
        },
        decrementStep(state, action) {
            state.currentForm === "personal" ? state.personalForm.step -= 1 : state.businessForm.step -= 1;
        },
        formSwitched(state, action) {
            state.currentForm = action.payload
        },
        resetFormState(state, action) {
            state.personalForm = personalFormInitialState;
            state.businessForm = businessFormInitialState;
        },
        hideModal(state, action) {
            state.showModal = false;
            state.modalContent = "";
        }
    },
    extraReducers: {
        [addNewSubscriber.fulfilled]:(state, action) => {
            state.showModal = true;
            state.modalContent = action.payload;
            subscribersAdapter.addOne(state.subscribers, action.payload);
        }
        
    }
})

export const { inputAdded, inputUpdated, formSwitched, incrementStep, decrementStep, inputsUpdated,  resetFormState, hideModal} = formSlice.actions

export default formSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllInputsPerosnal,
    selectById: selectInputByIdPerosnal
    // Pass in a selector that returns the posts slice of state
} = personalFormAdapter.getSelectors(state => state.form.personalForm)

export const {
    selectAll: selectAllInputsBusiness,
    selectById: selectInputByIdBusiness
    // Pass in a selector that returns the posts slice of state
} = businessFormAdapter.getSelectors(state => state.form.businessForm)

export const selectInputById = createSelector(
    // input selector
    [
        (state, id, formType ) => selectInputByIdPerosnal(state, id), 
        (state, id, formType ) => selectInputByIdBusiness(state, id), 
        (state, id, formType) => formType
    ],
    // output selector
    (inputIdPersonal, inputIdBusiness, formType) => formType === "personal" ? inputIdPersonal : inputIdBusiness
) 
export const selectInputsByFormType = createSelector(
    // input selector
    [selectAllInputsPerosnal, selectAllInputsBusiness, (state) => state.form.currentForm],
    // output selector
    (inputsPersonal, inputsBusiness, currentForm) => currentForm === "personal" ? inputsPersonal : inputsBusiness
);

export const selectInputsByStep = createSelector(
    // input selector
    [
        selectAllInputsPerosnal, 
        selectAllInputsBusiness, 
        (state) => state.form.currentForm,
        (state) => state.form.currentForm === "personal" ? state.form.personalForm.step : state.form.businessForm.step
    ],
    // output selector
    (inputsPersonal, inputsBusiness, currentForm, step) => {
        const allInputs = currentForm === "personal" ? inputsPersonal : inputsBusiness
        return allInputs.filter(input => input.step === step)
    }
);

export const selectShowModal = state => state.form.showModal;
export const selectModalContent = state => state.form.modalContent;
export const selectCurentForm = state => state.form.currentForm;
export const selectCurrentStep = state => {
    return state.form.currentForm === "personal" ? state.form.personalForm.step : state.form.businessForm.step;
}