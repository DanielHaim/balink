import React, { useContext } from "react"
import { LanguageContext } from "../../../international/language"
import { InputField } from "../fields/InputField"
import styles from "./GeneralForm.module.css"

export const GeneralFormStep1 = ({ formType }) => {
    const languageContext = useContext(LanguageContext);
    return (
        <div className={styles.step1}>
            <InputField 
              id={`${formType}_firstname`} 
              name="firstname" 
              required={true} 
              placeholder={languageContext.dictionary["firstName"]}
              formType={formType}
              validation={null} 
              errorMessage=""
              step={1}
            />
            <InputField 
              id={`${formType}_lastname`}
              name="lastname" 
              required={true} 
              placeholder={languageContext.dictionary["lastName"]}
              formType={formType}
              validation={null} 
              errorMessage="" 
              step={1}
            />
           <InputField 
              id={`${formType}_title`}
              name="title" 
              required={false} 
              placeholder={languageContext.dictionary["title"]}
              formType={formType}
              validation={null} 
              errorMessage="" 
              step={1}
            />
        </div>
    )
}