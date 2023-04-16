import React, {useState} from 'react';
import Headers from "../components/Headers";
import {EuiFlexGroup, EuiForm, EuiSpacer} from "@elastic/eui"
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUsersField from "../components/FormComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth"
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import {FieldErrorType, UserType} from "../utils/Types";
import {addDoc} from "firebase/firestore"
import {meetingRef} from "../utils/FirebaseConfig";
import {generateMeetingId} from "../utils/generateMeetingId";
import {useAppSelector} from "../app/hooks";

function OneOnOneMeeting() {

    useAuth();
    const [users] = useFetchUsers();
    const uid = useAppSelector(zoom => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [showErrors, setShowErrors] = useState<{
        meetingName: FieldErrorType;
        meetingUser: FieldErrorType;
    }>({
        meetingName: {
            show: false,
            message: [],
        },
        meetingUser: {
            show: false,
            message: []
        }
    });

    const onUserChange = (selectedOptions: any) => {
        setSelectedUsers(selectedOptions);
    };

    const validateForm = () => {
        let errors = false;
        const clonedShowError = {...showErrors};
        if (!meetingName.length){
            clonedShowError.meetingName.show = true;
            clonedShowError.meetingName.message = ["Please Enter Meeting Name"];
            errors = true
        }else {
            clonedShowError.meetingName.show = false;
            clonedShowError.meetingName.message = []
        }
        if (!selectedUsers.length){
            clonedShowError.meetingUser.show = true;
            clonedShowError.meetingUser.message = ["Please Selected User"];
        } else {
            clonedShowError.meetingUser.show = false;
            clonedShowError.meetingUser.message = []
        }
        setShowErrors(clonedShowError);
        return errors
    };

    const createMeeting = async () => {
        if (!validateForm()) {
            const meetingId = generateMeetingId();
            await addDoc(meetingRef, {
                createdBy: uid,
                meetingId,
                meetingName,
                meetingType: '1-on-1,',
                invitedUsers: [selectedUsers[0].uid],
                meetingDate: startDate.format("L"),
                maxUsers: 1,
                status: true,
            });
        }
    };

    return (
        <div style={{display: "flex", height: "100vh", flexDirection: "column"}}>
            <Headers/>
            <EuiFlexGroup justifyContent={"center"} alignItems={"center"}>
                <EuiForm>
                    <MeetingNameField
                        label="Meeting Name"
                        placeholder="Meeting Name"
                        value={meetingName}
                        setMeetingName={setMeetingName}
                        isInvalid={showErrors.meetingName.show}
                        error={showErrors.meetingName.message}
                    />
                    <MeetingUsersField
                        label={"Invite User"}
                        options={users}
                        onChange={onUserChange}
                        selectedOptions={selectedUsers}
                        isClearable={false}
                        placeholder={"Select a user"}
                        singleSelection={{asPlainText: true}}
                        isInvalid={showErrors.meetingUser.show}
                        error={showErrors.meetingUser.message}
                    />
                    <MeetingDateField
                        selected={startDate}
                        setStartDate={setStartDate}
                    />
                    <EuiSpacer/>
                    <CreateMeetingButtons createMeeting={createMeeting}/>
                </EuiForm>
            </EuiFlexGroup>
        </div>
    );
}

export default OneOnOneMeeting;