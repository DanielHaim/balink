import React from "react"
import classNames  from "classnames/bind"
import styles from "./Form.module.css"
import { Text } from "../../features/language/Text"
import { useDispatch, useSelector } from 'react-redux';
import { nanoid, unwrapResult } from '@reduxjs/toolkit'
import { 
    formSwitched, 
    selectCurentForm, 
    selectCurrentStep, 
    incrementStep, 
    decrementStep, 
    selectInputsByStep,
    inputsUpdated,
    selectInputsByFormType,
    addNewSubscriber,
    resetFormState,
    selectShowModal,
    selectModalContent,
    hideModal
} from "./formSlice"
import { Modal } from "../modal/Modal"
import { GeneralForm } from "./generalForm/GeneralForm"

let cx = classNames.bind(styles);

export const Form = () => {
    const dispatch = useDispatch();
    const currentForm = useSelector(selectCurentForm)
    const currentStep = useSelector(selectCurrentStep)
    const showModal = useSelector(selectShowModal)
    const modalContent = useSelector(selectModalContent)
    const inputsOfStep = useSelector(state => selectInputsByStep(state))
    const allFormInput = useSelector(state => selectInputsByFormType(state));
    const minStep = 1;
    const maxStep = 3;

    var clickedTab = cx({ 'tab': true,'clicked': true });
    var centerButtons = cx({'buttonContainer': true, 'center': true });
    var spaceButtons = cx({ 'buttonContainer': true, 'space-between': true});

    const isStepValid = () => {
        const notValid = inputsOfStep.filter(input => (input.required && !input.value) || (input.value && input.validated === false));
        if(notValid.length > 0) {
            const toUpdateInputs = inputsOfStep.map(({ id }) => ({id, changes:{displayError: true}}));
            dispatch(inputsUpdated(toUpdateInputs));
            return false;
        }
        return true;
    }

    const onNextClick = () => {
        const isInputsValid = isStepValid();
        // only if all input are valids
        isInputsValid && dispatch(incrementStep());
    }

    const onSubmitClick = () => {
        const isInputsValid = isStepValid();
        if(isInputsValid) {
            const newSubscriber = {id: nanoid(), subscriptionType: currentForm};
            allFormInput.map(({name, value}) => 
                name === "country" ? newSubscriber[name] = value.desc : newSubscriber[name] = value );
            console.log(newSubscriber, "This is the newSubscriber values");
            try {
                const resultAction = dispatch(addNewSubscriber(newSubscriber));
                unwrapResult(resultAction)
            } catch (err) {
                console.error("Failed to save the users", err)
            } finally {
                dispatch(resetFormState())
            }
        }
        else{
            console.log("Can't submit, missing required field")
        }
    }

    return(
        <div className={styles.form}>
            <div className={styles.tabs}>
                <div 
                    onClick={() => dispatch(formSwitched("personal"))} 
                    className={(currentForm === "personal" && clickedTab) || styles.tab} 
                >
                        <Text tid="tab1" />
                </div>
                <div 
                    onClick={() => dispatch(formSwitched("business"))} 
                    className={(currentForm === "business" && clickedTab) || styles.tab} 
                >
                        <Text tid="tab2" />
                </div>
            </div>
            <div className={styles.step}>
                { <GeneralForm formType={currentForm} /> }
                <div className={currentStep > minStep ? spaceButtons : centerButtons}>
                    { currentStep > minStep && <button onClick={() => dispatch(decrementStep())} ><Text tid="previous"/></button> }
                    { currentStep < maxStep && <button onClick={() => onNextClick()}><Text tid="next"/></button> }
                    { currentStep === maxStep && 
                        <button type="button" onClick={onSubmitClick} >
                            <Text tid="Submit" />
                        </button>
                    }
                    <Modal title={"New user subscribed"} show={showModal} closeCallback={() => dispatch(hideModal())}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {Object.entries(modalContent).map(([key, value], i) => 
                                    <div key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <div style={{flex: 0.5, textAlign: 'start'}}>{key}:</div>
                                        <div style={{flex: 0.5, textAlign: 'start'}}>{modalContent[key].toString() || 'undefined'}</div>
                                    </div>
                            )}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
