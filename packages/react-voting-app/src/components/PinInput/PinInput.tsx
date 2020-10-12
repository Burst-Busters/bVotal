import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import React, { useState } from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export interface PinInputProps {
    onChange:(date: string) => void
}

function PinInput(props: PinInputProps) {
    const { onChange } = props;
    const [YEARS, setYEARS] = useState<number[]>([]);
    
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outline-doc">5 Digit PIN</InputLabel>
            <OutlinedInput
                id="outline-doc"
                type={'password'}
                onChange={e => onChange(e.target.value)}
                labelWidth={125}
                endAdornment={
                    <InputAdornment position="end">
                        <VpnKeyIcon/>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default PinInput;