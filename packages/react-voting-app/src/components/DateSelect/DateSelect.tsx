import React from 'react';
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

export interface DateSelectProps {
    onChange?:() => true
}
const useStyles = makeStyles((theme) => ({
    dateWrapper: {
      width: '100%',
      display: 'block',
      clear: 'both',
      '& .MuiFormControl-root': {
          minWidth: 120,
      }
    },
}))

function DateSelect(props: DateSelectProps) {
    const classes = useStyles();
    const [month, setMonth] = React.useState('');
    const [day, setDay] = React.useState('');
    const [year, setYear] = React.useState('');
    const handleDayChange = (event: any) => {
      setDay(event.target.value);
    };
    const handleYearChange = (event: any) => {
        setYear(event.target.value);
      };
    const handleMonthChange = (event: any) => {
        setMonth(event.target.value);
      };
    
    return (
        <Box className={classes.dateWrapper}>
        <FormControl variant="outlined">
            <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={month}
                    onChange={handleMonthChange}
                    labelWidth={50}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                    <MenuItem value={'January'}>Jenuary</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl variant="outlined">
                <InputLabel id="day-select-label">Day</InputLabel>
                <Select
                    labelId="day-select-label"
                    id="day-select"
                    value={day}
                    onChange={handleDayChange}
                    labelWidth={30}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>1</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={year}
                    onChange={handleYearChange}
                    labelWidth={30}
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>1900</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default DateSelect;