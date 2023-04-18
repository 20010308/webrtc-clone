import React from "react";
import {useAppSelector} from "../app/hooks";
import useAuth from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {EuiFlexGroup, EuiCard, EuiFlexItem, EuiImage} from "@elastic/eui"
import dashboard1 from '../assets/dashboard1.png'
import dashboard2 from '../assets/dashboard2.png'
import dashboard3 from '../assets/dashboard3.png'
import Headers from "../components/Headers";

function Dashboard() {

    useAuth();
    const navigate = useNavigate();
    return(
        <>
            <div style={{display: "flex", height: "100vh", flexDirection: "column"}}>
                <Headers/>
                <EuiFlexGroup justifyContent={"center"} alignItems={"center"} style={{margin: "5vh 10vw"}}>
                    <EuiFlexItem>
                        <EuiCard
                            icon={<EuiImage size="5rem" alt='Error' src={dashboard1} />}
                            title={`Create Meating`}
                            description="Create a new meeting and invite people."
                            onClick={() => {navigate('/create')}}
                            paddingSize={'xl'}
                        />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiCard
                            icon={<EuiImage size="5rem" alt='Error' src={dashboard2} />}
                            title={`My Meetings`}
                            description="View your created meetings."
                            onClick={() => {navigate('/mymeetings')}}
                            paddingSize={'xl'}
                        />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiCard
                            icon={<EuiImage size="5rem" alt='Error' src={dashboard3} />}
                            title={`Meatings`}
                            description="View the meetings that your are invetid to."
                            onClick={() => {navigate('/meetings')}}
                            paddingSize={'xl'}
                        />
                    </EuiFlexItem>
                </EuiFlexGroup>

            </div>
        </>
    )
}

export default Dashboard;