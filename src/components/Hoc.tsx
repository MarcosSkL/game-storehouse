import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import firebase from '../services/firebase';

const withAuth = (WrappedComponent: any) => {
    const WithAuthComponent = (props: any) => {
        const router = useRouter();
        const auth = getAuth(firebase);

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (!user) {
                    router.push('/');
                }
            });

            return () => unsubscribe();
        }, [auth, router]);

        return <WrappedComponent {...props} />;
    };

    // Função auxiliar para obter o nome de exibição de um componente
    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
    return WithAuthComponent;
    function getDisplayName(WrappedComponent: any) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
};

export default withAuth;