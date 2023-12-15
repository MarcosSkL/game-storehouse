import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../services/firebase';


const User = () => {

    const router = useRouter();
    const auth = getAuth(firebase);

    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const db = getDatabase();
                const userRef = ref(db, 'users/' + userId);

                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setUserData(data);
                    } else {
                        console.log('informação não encontrada!');
                    }
                }, (error) => {
                    console.error('Erro ao buscar dados do usuário:', error);
                });
            } else {
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth)
                .then(() => {
                    console.log('Logout realizado com sucesso');
                })
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    if (!userData) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <div className='flex gap-3'>
                <div className='flex gap-2 justify-end items-center text-sm text-white'>
                    {userData.photoURL && <img src={userData.photoURL} alt="Foto do usuário" className='rounded-full h-14' />}
                    <strong>{userData.displayName}</strong>
                </div>
                <div className='flex justify-end'>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded bg-red-500 my-3 p-1 text-sm uppercase text-white"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </>
    )
}

export default User