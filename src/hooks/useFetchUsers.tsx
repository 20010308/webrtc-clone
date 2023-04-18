import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../app/hooks";
import {query, where, getDocs} from "firebase/firestore"
import {userRef} from "../utils/FirebaseConfig"
import {UserType} from "../utils/Types";

export default function UseFetchUsers(){

    const [users, setUsers] = useState<Array<UserType>>([]);
    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

    useEffect(() => {
        if (uid) {
            const getUser = async () => {
                const firestoreQuery = query(userRef, where("uid", "!=", uid));
                const data = await getDocs(firestoreQuery);
                const firebaseUsers: Array<UserType> = [];
                console.log(data);
                data.forEach((user) => {
                    const userData: UserType = user.data() as UserType;
                    firebaseUsers.push({
                        ...userData,
                        label: userData.name,
                    });
                });
                setUsers(firebaseUsers);
            };
            getUser();
        }
    }, [uid]);

    return [users];
}