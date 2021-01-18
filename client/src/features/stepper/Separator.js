import React from "react"
import styles from "./Stepper.module.css"

export const Separator = () => {
    return (
        <div className={styles.separator}>
            <hr className={styles.separator_hr} />
        </div>
    )
}