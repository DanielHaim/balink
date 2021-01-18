import React from "react"
import { Step } from "./Step"
import { Separator } from "./Separator"
import styles from "./Stepper.module.css"

export const Stepper = ({ totalStep, descriptions }) => {

    const finalStepper = [...Array(totalStep).keys()].map((value, index) => {
        return (
            <div key={`stepper-${index+1}`} className={index + 1 < totalStep ? styles.stepper : ""}>
                <Step number={index + 1} description={descriptions[index]}/>
                { index + 1 < totalStep && <Separator /> }
            </div>
        )
    })

    return (
        <div className={styles.container}>
            {
                finalStepper
            }
        </div>
    )
}