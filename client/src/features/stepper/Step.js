import React from "react"
import styles from "./Stepper.module.css"
import classNames  from "classnames/bind"
import { Text } from "../language/Text"
import { useSelector } from 'react-redux';
import { selectCurrentStep } from "../form/formSlice"

let cx = classNames.bind(styles);

export const Step = ({ number, description }) => {
    const currentStep = useSelector(selectCurrentStep)

    const currentStepStyle = cx({'step': true, 'currentStep': currentStep === number})

    return (
        <div className={styles.step_container}>
            <div className={currentStepStyle} >
                {number}
            </div>
            <Text tid={description} />
        </div>
    )
}