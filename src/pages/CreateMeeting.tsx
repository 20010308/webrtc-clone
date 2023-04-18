import React from 'react';
import Headers from "../components/Headers";
import {EuiFlexGroup, EuiFlexItem, EuiCard, EuiImage} from "@elastic/eui"
import {useNavigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";

function CreateMeeting() {

    useAuth();
    const navigate = useNavigate();

    return (
        <div style={{display: "flex", height: "100vh", flexDirection: "column"}}>
            <Headers/>
            <EuiFlexGroup justifyContent={"center"} alignItems={"center"} style={{margin: '5vh 10vw'}}>
                <EuiFlexItem>
                    <EuiCard
                        icon={<EuiImage size="5rem" alt='Error' src={meeting1} />}
                        title={`Create 1 on 1 Meeting.`}
                        description="Create a personal single person meeting."
                        onClick={() => {navigate('/create1on1')}}
                        paddingSize={'xl'}
                    />
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiCard
                        icon={<EuiImage size="5rem" alt='Error' src={meeting2} />}
                        title={`Create video confirence.`}
                        description="Invite multiple persons to the meeting."
                        onClick={() => {navigate('/create-video-confirence')}}
                        paddingSize={'xl'}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
        </div>
    );
};

export default CreateMeeting;