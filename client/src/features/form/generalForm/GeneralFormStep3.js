import React, { useContext } from "react"
import { emailRegex, phoneNumberRegex } from "../../../utils/validations"
import { LanguageContext } from "../../../international/language"
import { InputField } from "../fields/InputField"
import { CheckBoxField } from "../fields/CheckBoxField"
import styles from "./GeneralForm.module.css"

export const GeneralFormStep3 = ({ formType }) => {
    const languageContext = useContext(LanguageContext);
    return (
        <div className={styles.step1}>
             <InputField 
              id={`${formType}_email`} 
              name="email" 
              required={true} 
              placeholder={languageContext.dictionary["email"]}
              formType={formType}
              validation={emailRegex}
              errorMessage="The value doesn't match to email pattern"
              step={3}
            />
            <InputField 
              id={`${formType}_phoneNumber`}
              name="phoneNumber" 
              required={false} 
              placeholder={languageContext.dictionary["phoneNumber"]}
              formType={formType}
              validation={phoneNumberRegex} 
              errorMessage="The value doesn't match to phone number pattern"
              step={3}
            />
            <CheckBoxField 
                id={`${formType}_newsLetter`}
                name={"newsLetter"}
                required={false}
                checked={true}
                label={languageContext.dictionary["subscribeNews"]}
                errorMessage={""}
                formType={formType}
                step={3}
            />
        </div>
    )
}