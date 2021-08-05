import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

const CustomInput = (props) => {
    const [value, setValue] = React.useState('')

    const handleChange = (value) =>{
        setValue(value)
        props.onChange(value)
    }
    return(
        <div>
            <OutlinedInput
                className={'custom-input-field'}
                required
                id="standard-adornment-password"
                type={'text'}
                placeholder={'Search...'}
                value={value}
                onChange={e => handleChange(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                    </InputAdornment>
                }
            />
        </div>
    )
} 
export default CustomInput;