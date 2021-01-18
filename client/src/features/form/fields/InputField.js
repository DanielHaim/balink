import React, {useEffect} from "react"
import classNames  from "classnames/bind"
import { useDispatch, useSelector } from 'react-redux';
import { inputAdded, inputUpdated, selectInputById } from '../formSlice';
import styles from "./InputField.module.css"

let cx = classNames.bind(styles);

export const InputField = ({id, name, required, placeholder, validation, formType, step, errorMessage}) => {
    const dispatch = useDispatch();
    const input = useSelector(state =>  selectInputById(state, id, formType))
    
    useEffect(() => {
        const validated = (required || validation) ? false : true;
        !input && dispatch(inputAdded({
            id, name, required, validated, formType, step, errorMessage, 
            value:"",focused: false, dirty: false, blured: false, displayError: false
        }))
    }, [dispatch, input, id, name, required, placeholder, validation, formType, step, errorMessage])

    const getErrorMessage = () => {
        if(required && input.value.length === 0){
            return "This field is required";
        }
        else if (input && input.value.length > 0 && !input.validated){
            return errorMessage;
        }
    }

    const updateField = (event) => {
        const value = event.target.value;
        const validated = validation ? validation(value) : (required && !value) ? false : true;
        dispatch(inputUpdated({id, formType, value, validated, dirty: true}))
    }

    const error =   (input && !input.value && required && input.blured && input.dirty) ||
                    (input && input.value && !input.validated && input.blured && input.dirty) ||
                    //(input && input.value && !input.validated && input.displayError) ||
                    (input && !input.value && required && input.displayError);

    var inputStyles = cx({ 'input': true,'input-error': error });
    console.log(input, error);

    return (
        <div 
            className={styles.container}
            onClick={() => dispatch(inputUpdated({id, formType, focused: true}))}
            onBlur={() => dispatch(inputUpdated({id, formType, blured: true}))}
        >
            <input 
                id={id}
                type="text"
                name={name}
                required={required}
                className={inputStyles} 
                placeholder={placeholder}
                value={(input && input.value) || ""} 
                onChange={(event) => updateField(event)}
                />
            { error && <div className={styles.error}>{getErrorMessage()}</div> }
        </div>
    );
}
