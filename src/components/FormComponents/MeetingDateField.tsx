import React from 'react';
import {EuiFormRow, EuiDatePicker} from "@elastic/eui"

export default function MeetingDateField({
    selected,
    setStartDate
}
: {
    selected: moment.Moment;
    setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>
}) {
    return (
        <EuiFormRow>
            <EuiDatePicker
                selected={selected}
                onChange={date => setStartDate(date!)}
            />
        </EuiFormRow>
    );
};
