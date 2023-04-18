import React, {useState} from 'react';
import Headers from "../components/Headers";
import {EuiFlexGroup, EuiForm, EuiSpacer, EuiFormRow, EuiSwitch} from "@elastic/eui"
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
import {useNavigate} from "react-router-dom"
import useToast from "../hooks/useToast";
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUserField";

function VideoConference() {

    const navigate = useNavigate();
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const uid = useAppSelector(zoom => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [anyoneCanjoin, setAnyonecanJoin] = useState(false);
    const [size, setSize] = useState(1);
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
        if (!meetingName.length) {
            clonedShowError.meetingName.show = true;
            clonedShowError.meetingName.message = ["Please Enter Meeting Name"];
            errors = true
        } else {
            clonedShowError.meetingName.show = false;
            clonedShowError.meetingName.message = []
        }
        if (!selectedUsers.length) {
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
                meetingType: anyoneCanjoin ? "anyone-can-join" : "video-conference",
                invitedUsers: anyoneCanjoin
                    ? []
                    : selectedUsers.map((user: UserType) => user.uid),
                meetingDate: startDate.format("L"),
                maxUsers: anyoneCanjoin ? 100 : size,
                status: true,
            });
            createToast({
                title: anyoneCanjoin
                    ? "Anyone can join meeting created successfully"
                    : "Video Conference created successfully.",
                type: "success"
            });
            navigate('/');
        }
    };

    return (
        <div style={{display: "flex", height: "100vh", flexDirection: "column"}}>
            <Headers/>
            <EuiFlexGroup justifyContent={"center"} alignItems={"center"}>
                <EuiForm>
                    <EuiFormRow display={"columnCompressedSwitch"} label={'Anyone can join'}>
                        <EuiSwitch
                            showLabel={false}
                            label={"Anyone can join"}
                            checked={anyoneCanjoin}
                            onChange={(e) => setAnyonecanJoin(e.target.checked)}
                            compressed
                        />
                    </EuiFormRow>
                    <MeetingNameField
                        label="Meeting Name"
                        placeholder="Meeting Name"
                        value={meetingName}
                        setMeetingName={setMeetingName}
                        isInvalid={showErrors.meetingName.show}
                        error={showErrors.meetingName.message}
                    />
                    {
                        anyoneCanjoin ? (<MeetingMaximumUsersField value={size} setSize={setSize}/>) :
                            (<MeetingUsersField
                                label={"Invite User"}
                                options={users}
                                onChange={onUserChange}
                                selectedOptions={selectedUsers}
                                isClearable={false}
                                placeholder={"Select a user"}
                                singleSelection={false}
                                isInvalid={showErrors.meetingUser.show}
                                error={showErrors.meetingUser.message}
                            />)
                    }
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

export default VideoConference;