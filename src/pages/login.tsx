import React from "react";
import {
    EuiProvider,
    EuiFlexGroup,
    EuiFlexItem,
    EuiImage,
    EuiSpacer,
    EuiText,
    EuiTextColor,
    EuiButton,
    EuiPanel
} from '@elastic/eui'
import animation from '../assets/animation.gif'
import logo from '../assets/logo_transparent.png'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth"
import {firebaseAuth, userRef} from "../utils/FirebaseConfig";
import {query, where, getDocs, addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from "../app/hooks";
import {setUser} from '../app/slices/AuthSlices'

function Login() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate('/')
    });

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user: {displayName, email, uid}} = await signInWithPopup(firebaseAuth, provider);
        if (email) {
            const fireStoreQuery = query(userRef, where("uid", "==", uid))
            const fetchedUsers = await getDocs(fireStoreQuery);
            if (fetchedUsers.docs.length === 0) {
                await addDoc(userRef, {
                    uid,
                    name: displayName,
                    email,

                })
            }
        }
        navigate('/');
        dispatch(setUser({uid, name: displayName, email}));
    };

    return (
        <EuiProvider colorMode='dark'>
            <EuiFlexGroup
                alignItems='center'
                justifyContent='center'
                style={{width: "100vw", height: "100vh"}}
            >
                <EuiFlexItem grow={false}>
                    <EuiPanel paddingSize='xl'>
                        <EuiFlexGroup justifyContent='center' alignItems='center'>
                            <EuiFlexItem>
                                <EuiImage src={animation} alt="Error"/>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                {/* <EuiImage src={logo} className="w-100 h-50" alt="Error" size='230px'/> */}
                                <EuiText textAlign={"center"}>
                                    <h2 style={{fontSize: "60px", color: "#0b5cff"}}>
                                        Videoic
                                    </h2>
                                </EuiText>
                                <EuiSpacer size='xs'/>
                                <EuiText textAlign="center">
                                    <h2 style={{marginTop: "32px"}}>
                                        <EuiTextColor>One platform to</EuiTextColor>
                                        <EuiTextColor color='#0b5cff'> connect</EuiTextColor>
                                    </h2>
                                </EuiText>
                                <EuiSpacer size='xxl'/>
                                <EuiButton fill onClick={login}>Login with google</EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiProvider>
    )
}

export default Login;