import React from 'react';
import {EuiFormRow, EuiComboBox} from "@elastic/eui"

function MeetingUsersField(
    {
        label,
        options,
        onChange,
        selectedOptions,
        isClearable,
        placeholder,
        singleSelection = false,
        isInvalid, error
    }
        :
        {
            label: string;
            options: any;
            onChange: any;
            selectedOptions: any;
            isClearable: boolean;
            placeholder: string;
            singleSelection: any;
            isInvalid: boolean;
            error: Array<string>
        }
  ) {

    console.log(options);
    return (
        <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
            <EuiComboBox
                options={options}
                onChange={onChange}
                selectedOptions={selectedOptions}
                singleSelection={singleSelection}
                placeholder={placeholder}
                isClearable={isClearable}
                isInvalid={isInvalid}
            />
        </EuiFormRow>
    );
}

export default MeetingUsersField;