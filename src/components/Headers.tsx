import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, Link} from "react-router-dom"
import {useAppSelector} from "../app/hooks";
import {useDispatch} from "react-redux";
import {EuiHeader, EuiText, EuiTextColor, EuiFlexItem, EuiFlexGroup, EuiButtonIcon} from "@elastic/eui"
import {firebaseAuth} from "../utils/FirebaseConfig";
import {signOut} from "firebase/auth"
import {changeTheme} from '../app/slices/AuthSlices';
import {
    getCreateMeetingBreadCrumbs, getMeetingsBreadCrumbs,
    getMyMeetingsBreadCrumbs,
    getOneOnOneMeetingBreadCrumbs,
    getVideoConferenceBreadCrumbs
} from "../utils/breadCrumbs";
import {BreadCrumbsType} from "../utils/Types";


function Headers() {


    const navigate = useNavigate();
    const location = useLocation();
    const userName = useAppSelector((zoom) => zoom.auth.userInfo?.name);
    const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
    const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
        {
            text: "Dashboard",
        },
    ]);
    const [isResponsive, setIsResponsive] = useState(false);
    const dispatch = useDispatch();
    const logout = () => {
        signOut(firebaseAuth)
    };
    const invertTheme = () => {
        const theme = localStorage.getItem('zoom-theme');
        localStorage.setItem('zoom-theme', theme === 'light' ? 'dark' : 'light');
        dispatch(changeTheme({isDarkTheme: !isDarkTheme}))
    };

    useEffect(() => {
        if (window.innerWidth < 480) setIsResponsive(true)
    }, []);

    useEffect(() => {
        const {pathname} = location;
        if (pathname === "/create") setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
        else if (pathname === "/create1on1") setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
        else if (pathname === "/create-video-confirence") setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
        else if (pathname === "/mymeetings") setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
        else if (pathname === "/meetings") setBreadCrumbs(getMeetingsBreadCrumbs(navigate))
    }, [navigate, location]);

    const section = [
        {
            items: [
                <Link to={'/'}>
                    <EuiText>
                        <h2 style={{padding: "0 1vw"}}>
                            <EuiTextColor color='#0b5cff'>Videoic</EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>
            ]
        },
        {
            items: [
                <>
                    {userName ?
                        <EuiText>
                            <h4>
                                <EuiTextColor color="white">Hello, </EuiTextColor>
                                <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
                            </h4>
                        </EuiText>
                        : null}
                </>
            ]
        },
        {
            items: [
                <EuiFlexGroup justifyContent={"center"} alignItems={"center"} direction={"row"} style={{gap: "2vw"}}>
                    {/* <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
                        {isDarkTheme ?
                            <EuiButtonIcon onClick={invertTheme} iconType={'sun'} display={'fill'} size={"s"}
                                           color={"warning"} aria-label={'invert-theme-button'}/>
                            :
                            <EuiButtonIcon onClick={invertTheme} iconType={'moon'} display={'fill'} size={"s"}
                                           color={"ghost"} aria-label={'invert-theme-button'}/>
                        }
                    </EuiFlexItem> */}
                    <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
                        <EuiButtonIcon onClick={logout} iconType={'lock'} display={'fill'} size={"s"}
                                       aria-label={'logout-button'}/>
                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }
    ];
    const responsiveSection = [
        {
            items: [
                <Link to={'/'}>
                    <EuiText>
                        <h2 style={{padding: "0 1vw"}}>
                            <EuiTextColor color='#0b5cff'>Videoic</EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>
            ]
        },
        {
            items: [
                <EuiFlexGroup justifyContent={"center"} alignItems={"center"} direction={"row"} style={{gap: "2vw"}}>
                    <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
                        {isDarkTheme ?
                            <EuiButtonIcon onClick={invertTheme} iconType={'sun'} display={'fill'} size={"s"}
                                           color={"warning"} aria-label={'invert-theme-button'}/>
                            :
                            <EuiButtonIcon onClick={invertTheme} iconType={'moon'} display={'fill'} size={"s"}
                                           color={"ghost"} aria-label={'invert-theme-button'}/>
                        }
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
                        <EuiButtonIcon onClick={logout} iconType={'lock'} display={'fill'} size={"s"}
                                       aria-label={'logout-button'}/>
                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }
    ];

    return (
        <>
            <EuiHeader style={{minHeight: "8vh"}} theme='dark' sections={isResponsive ? responsiveSection : section}/>
            <EuiHeader color='green' style={{minHeight: "8vh"}} sections={[{breadcrumbs: breadCrumbs}]}/>
        </>
    );
}

export default Headers;