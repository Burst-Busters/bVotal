import React, { useState } from 'react';
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

export interface DateSelectProps {
    onChange?:() => true
}
const useStyles = makeStyles((theme) => ({
    dateWrapper: {
      width: '100%',
      display: 'block',
      clear: 'both',
    },
}))

function DateSelect(props: DateSelectProps) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event: any) => {
      setAge(event.target.value);
    };
    
    return (
        <Box className={classes.dateWrapper}>
            
        <FormControl variant="outlined">
            <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={age}
                    onChange={handleChange}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl variant="outlined">
                <InputLabel id="day-select-label">Day</InputLabel>
                <Select
                    labelId="day-select-label"
                    id="day-select"
                    value={age}
                    onChange={handleChange}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={age}
                    onChange={handleChange}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>1900</MenuItem>
                <MenuItem value={20}>1901</MenuItem>
                <MenuItem value={30}>1902</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default DateSelect;