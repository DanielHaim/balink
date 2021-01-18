import React from "react"
import { useSelector } from 'react-redux'
import { selectCurrentStep } from "../formSlice"
import styles from "./GeneralForm.module.css"
import { GeneralFormStep1 } from "./GeneralFormStep1"
import { GeneralFormStep2 } from "./GeneralFormStep2"
import { GeneralFormStep3 } from "./GeneralFormStep3"

export const GeneralForm = ({formType}) => {
    const step = useSelector(selectCurrentStep)
    return (
        <div className={styles.container}>
            <form>
                { step === 1 && <GeneralFormStep1 formType={formType} /> }
                { step === 2 && <GeneralFormStep2 formType={formType} /> }
                { step === 3 && <GeneralFormStep3 formType={formType} /> }
            </form>
        </div>
    )
}