import React, {useEffect} from "react"
import classNames  from "classnames/bind"
import { useDispatch, useSelector } from 'react-redux';
import { inputAdded, inputUpdated, selectInputById } from '../formSlice';
import styles from "./CheckBoxField.module.css"

let cx = classNames.bind(styles);

export const CheckBoxField = ({id, name, required, label, checked, formType, step}) => {
    const dispatch = useDispatch();
    const input = useSelector(state =>  selectInputById(state, id, formType))

    useEffect(() => {
        const validated = required ? (checked ? true : false) : true;
        !input && dispatch(inputAdded({
            id, name, required, validated, formType, step, 
            value:checked, focused: false, dirty: false, blured: false, displayError: false
        }))
    }, [dispatch, input, id, name, required, label, checked, formType, step])

    const onCheckBoxClicked = (event) => {
        const checked = event.target.checked;
        const validated =  required ? (checked ? true : false) : true;
        dispatch(inputUpdated({id, formType, value: checked, validated, dirty: true, focused: true, blured: true}))
    }

    const error = input && (required ? (input.value ? false : true) : false);
    var inputStyles = cx({ 'checkbox_custom_label': true,'checkbox_custom_label_error': error });

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <input 
                    id={id} 
                    className={styles.checkbox_custom} 
                    name={name} 
                    type="checkbox" 
                    required={required}
                    defaultChecked={checked}
                    onChange={(event) => onCheckBoxClicked(event)}
                />
                <label htmlFor={id} className={inputStyles} >{label}</label>
            </div>
            { error && <div className={styles.error}>{"This field is required"}</div> }
        </div>
    )
}