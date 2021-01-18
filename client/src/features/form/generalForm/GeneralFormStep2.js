import React, { useContext } from "react"
import { useSelector } from 'react-redux'
import { selectAllCountries } from "../../../features/countries/countriesSlice"
import { LanguageContext } from "../../../international/language"
import { InputField } from "../fields/InputField"
import { SelectField } from "../fields/SelectField"
import styles from "./GeneralForm.module.css"

export const GeneralFormStep2 = ({ formType }) => {
    const languageContext = useContext(LanguageContext);
    const countries = useSelector(selectAllCountries);

    return (
        <div className={styles.step1}>
            <SelectField 
              id={`${formType}_country`}
              name="country"
              required={true}
              placeholder={languageContext.dictionary["selectCountryPlaceHolder"]}
              formType={formType}
              options={countries || []}
              value={""}
              step={2}
            />
            <InputField 
              id={`${formType}_city`}
              name="city" 
              required={false} 
              placeholder={languageContext.dictionary["city"]}
              formType={formType}
              validation={null} 
              errorMessage="" 
              step={2}
            />
            <InputField 
              id={`${formType}_street`}
              name="street"
              required={false} 
              placeholder={languageContext.dictionary["street"]}
              formType={formType}
              validation={null}
              errorMessage=""
              step={2}
            />
        </div>
    )
}