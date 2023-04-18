import React, {useEffect, useState} from "react";
import {EuiProvider, EuiThemeProvider, EuiThemeColorMode, EuiGlobalToastList} from '@elastic/eui';
import {Routes, Route} from 'react-router-dom'
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import '@elastic/eui/dist/eui_theme_light.css';
import '@elastic/eui/dist/eui_theme_dark.css';
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import {setToasts} from "./app/slices/MeetingSlice"
import VideoConfirence from "./pages/VideoConfirence";
import MyMeetings from "./pages/MyMeetings";
import Meeting from "./pages/Meeting";
import JoinMeeting from "./pages/JoinMeeting";

function App() {

    const dispatch = useAppDispatch();
    const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
    const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
    const [theme, setTheme] = useState<EuiThemeColorMode>('light');
    const [initialTheme, setInitialTheme] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('zoom-theme');
        if (theme) {
            setTheme(theme as EuiThemeColorMode)
        } else {
            localStorage.setItem('zoom-theme', 'light')
        }
    }, []);

    useEffect(() => {
        if (initialTheme) {
            setInitialTheme(false)
        } else {
            window.location.reload()
        }
    }, []);

    const overrides = {
        colors: {
            LIGHT: {primary: "#0b5cff"},
            DARK: {primary: "#0b5cff"}
        }
    };

    const removeToast = (removedToast: { id: string }) => {
        dispatch(
            setToasts(
                toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
            )
        );
    };
    return (
        <ThemeSelector>
            <EuiProvider colorMode={theme}>
                <EuiThemeProvider modify={overrides}>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/create' element={<CreateMeeting/>}/>
                        <Route path='/create1on1' element={<OneOnOneMeeting/>}/>
                        <Route path='/create-video-confirence' element={<VideoConfirence/>}/>
                        <Route path='/mymeetings' element={<MyMeetings/>}/>
                        <Route path='/meetings' element={<Meeting/>}/>
                        <Route path='/join/:id' element={<JoinMeeting/>}/>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/*' element={<Dashboard/>}/>
                    </Routes>
                    <EuiGlobalToastList
                        toasts={toasts}
                        dismissToast={removeToast}
                        toastLifeTimeMs={5000}
                    />
                </EuiThemeProvider>
            </EuiProvider>
        </ThemeSelector>
    )
}

export default App