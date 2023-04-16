import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {onAuthStateChanged} from "firebase/auth"
import {firebaseAuth} from "../utils/FirebaseConfig";
import {setUser} from '../app/slices/AuthSlices'

function UseAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubsucribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate('/login');
            else {
                dispatch(setUser({
                    uid: currentUser.uid,
                    name: currentUser.displayName,
                    email: currentUser.email
                }))
            }
        });
        return () => unsubsucribe();
    },[dispatch, navigate])
};

export default UseAuth;