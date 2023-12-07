import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../services/firebase';

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
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
                        if (snapshot.exists()) {
                            setUserData(snapshot.val());
                        } else {
                            console.log('Documento não encontrado!');
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

        if (!userData) {
            return <p className='text-white bg-cover'>Conteúdo protegido...</p>;
        }

        return <WrappedComponent {...props} userData={userData} />;
    };
};

export default withAuth;