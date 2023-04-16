import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../app/hooks";
import {query, where, getDocs} from "firebase/firestore"
import {userRef} from "../utils/FirebaseConfig"
import {UserType} from "../utils/Types";

export default function UseFetchUsers(){

    const [users, setUsers] = useState<Array<UserType>>([]);
    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

    useEffect(() => {
        if (uid){
            const getUsers = async () => {
                const fireStoreQuery = query(userRef, where("uid","!=",uid));
                const data = await getDocs(fireStoreQuery);
                const firebaseUsers: Array<UserType> = [];
                data.forEach((user) => {
                    const userData = user.data() as UserType;
                    firebaseUsers.push({
                        ...userData,
                        label: userData.label,
                    });
                });
                setUsers(firebaseUsers);
            };
            getUsers();
        }
    }, [uid]);

    return [users];
}