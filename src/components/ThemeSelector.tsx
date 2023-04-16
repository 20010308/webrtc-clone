import React, {Suspense, useEffect, useState} from 'react';
import {EuiThemeColorMode} from "@elastic/eui";
import DarkThemes from "./Themes/DarkThemes";
import LightThemes from "./Themes/LightThemes";

const LightTheme = React.lazy(() => import("./Themes/LightThemes"));
const DarkTheme = React.lazy(() => import("./Themes/DarkThemes"));

export default function ThemeSelector({children}: { children: React.ReactNode }) {

    const [theme, setTheme] = useState<EuiThemeColorMode>('light');
    useEffect(() => {
        const theme = localStorage.getItem('zoom-theme');
        if (theme) {
            setTheme(theme as EuiThemeColorMode)
        }
    });

    return (
        <>
            <Suspense fallback={<></>}>
                {theme === "dark" ? <DarkThemes/> : <LightThemes/>}
            </Suspense>
            {children}
        </>
    )
}