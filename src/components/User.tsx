import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../services/firebase';
import { UserContext } from '../context/userProvider'; // ajuste o caminho conforme necessário


const User = () => {

    const router = useRouter();
    const auth = getAuth(firebase);
    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const db = getDatabase();
                const userRef = ref(db, 'users/' + userId);

                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        dispatch({ type: 'SET_USER_DATA', payload: data });
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
                    dispatch({ type: 'SET_USER_DATA', payload: null });
                })
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const { state } = useContext(UserContext);
    const userData = state.userData;

    if (!userData) {
        return <p>Carregando..</p>;
    }

    return (
        <>
            <div className='flex ms-[38px] gap-3'>
                <div className='flex gap-2 justify-end items-center text-white'>
                    {userData.photoURL && <img src={userData.photoURL} alt="Foto do usuário" className='rounded-full sm:h-14 h-10' />}
                    <strong className='sm:text-sm text-[13px]'>{userData.displayName}</strong>
                </div>
                <div className='flex justify-end'>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded bg-red-500 my-3 sm:p-3 p-[3px] sm:text-sm text-[10px] uppercase text-white"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </>
    )
}

export default User