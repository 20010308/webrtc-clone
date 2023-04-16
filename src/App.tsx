import React, {useEffect, useState} from "react";
import {EuiProvider, EuiThemeProvider, EuiThemeColorMode} from '@elastic/eui';
import {Routes, Route} from 'react-router-dom'
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import '@elastic/eui/dist/eui_theme_light.css';
import '@elastic/eui/dist/eui_theme_dark.css';
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";

function App() {

    const dispatch = useAppDispatch();
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
    }, [isDarkTheme]);

    const overrides = {
        colors: {
            LIGHT: {primary: "#0b5cff"},
            DARK: {primary: "#0b5cff"}
        }
    };

    return (
        <ThemeSelector>
            <EuiProvider colorMode={theme}>
                <EuiThemeProvider modify={overrides}>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/create' element={<CreateMeeting/>}/>
                        <Route path='/create1on1' element={<OneOnOneMeeting/>}/>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/*' element={<Dashboard/>}/>
                    </Routes>
                </EuiThemeProvider>
            </EuiProvider>
        </ThemeSelector>
    )
}

export default App