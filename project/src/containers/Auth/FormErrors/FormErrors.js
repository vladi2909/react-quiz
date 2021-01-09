import React from 'react';
import classes from './FormErrors.module.scss';

const FormErrors = ({ formErrors }) => (
    <div className={classes.FormErrors}>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>

)

export default FormErrors;