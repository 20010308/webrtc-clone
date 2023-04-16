import React from 'react';
import {EuiFlexGroup, EuiFlexItem, EuiButton} from "@elastic/eui"
import {useNavigate} from "react-router-dom"

export default function CreateMeetingButtons({createMeeting} : {createMeeting: () => void}) {

    const navigate = useNavigate();

    return (
        <EuiFlexGroup>
            <EuiFlexItem grow={false}>
                <EuiButton color={"danger"} onClick={() => {navigate('/')}}>Cancel</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiButton fill onClick={createMeeting}>Submit</EuiButton>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
};