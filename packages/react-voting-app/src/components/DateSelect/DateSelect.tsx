import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import moment from 'moment';
export interface DateSelectProps {
    onChange:(date: string) => void
}
const addLeadingZero = (i: number | string) => ('0' + i).slice(-2);
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const getDateString = (day: string | number, month: string, year: string | number) => {
    const newMonth = MONTHS.indexOf(month)+1;
    return `${addLeadingZero(newMonth)}/${day}/${year}`;
}
function DateSelect(props: DateSelectProps) {
    const { onChange } = props;
    const [YEARS, setYEARS] = useState<number[]>([]);
    const [DAYS, setDAYS] = useState<string[]>([]);
    const [validDate, setValidDate] = useState<boolean | null>(null);
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
    
    useEffect(() => {
        const availableYears: number[] = [];
        for (let i=2010; i > 1900; i--) {
            availableYears.push(i);
        }
        setYEARS(availableYears);

        const availableDays: string[] = [];
        for (let i=1; i < 32; i++) {
            availableDays.push(addLeadingZero(i));
        }
        setDAYS(availableDays);
    }, [])

    useEffect(() => {
        if (!!day && !!month && !!year) {
            const dateString = getDateString(day, month, year);
            const mdate = moment(dateString, "MM/DD/YYYY", true);
            setValidDate(mdate.isValid());
        }
    }, [day, month, year, validDate])
    
    useEffect(() => {
        if (validDate) {
            const dateString = getDateString(day, month, year);
            onChange(dateString);
        }
    }, [validDate])
    return (
        <>
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
                    {
                        MONTHS.map(month => (
                            <MenuItem key={month} value={month}>{month}</MenuItem>
                        ))
                    }
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
                        {
                        DAYS.map(day => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))
                        }
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
                        {
                        YEARS.map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.dateWrapper}>
                {
                    validDate === false &&
                    <Typography variant="caption" color="error">Date invalid: Please verify the inputed date.</Typography>
                }
            </Box>
        </>
    )
}

export default DateSelect;