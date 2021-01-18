import React, {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { inputAdded, inputUpdated, selectInputById } from '../formSlice';
import styles from "./SelectField.module.css"

export function SelectField ({id, name, required, placeholder, formType, options, value, step}){
    const dispatch = useDispatch();
    const input = useSelector(state =>  selectInputById(state, id, formType))
                    
    useEffect(() => {
        !input && dispatch(inputAdded({
            id, name, required, value:{id: 0, desc: ""}, formType, step, 
            displayError: false, focus:false, blured: false, dirty: false, validated: false 
        }))
    }, [dispatch, input, id, name, required, placeholder, formType, options, value, step])

    const updateField = (event) => {
        const value = event.target.value;
        dispatch(inputUpdated({id, formType, value:{id: value, desc: options[value].name}, dirty: true, validated: value ? true : false}))
    }

    const error = (required && input && input.blured && input.dirty && input.value === "") ||
                  (input && input.displayError && !input.validated);

    return (
        <div 
            className={styles.container}
            onClick={() => !input.focused && dispatch(inputUpdated({id, formType, focused: true}))}
            onBlur={() =>  !input.blured  && dispatch(inputUpdated({id, formType, blured: true}))}
        >
            <select 
                id={id}
                name={name}
                required={required}
                className={styles.select} 
                onChange={(event) => updateField(event)}
                value={(input && input.value.id) || value}>
                    <option key={`${id}-placeholder`} value="">{placeholder}</option>
                    {options.map((option, _) => {
                        return <option key={`${id}-${option.id}`} value={option.id}>{option.name}</option> 
                    })}
            </select>
            { error && <div className={styles.error}>{"This field is required"}</div> }
        </div>
    );
}
