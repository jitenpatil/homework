import React from 'react';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const DateRangeContainer = ({changeDate}) => {

    return (
        <>
            <DateRangePicker
                format='dd/MM/yyyy'
                placeholder="Start Date - End Date"
                character='-'
                onOk={(value)=>{changeDate(value);alert(Array.isArray(value))}}
            />
        </>
    );
}

export default DateRangeContainer;