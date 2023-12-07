import React from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import withAuth from '@/components/Hoc';
import Carousel from "@/components/Carousel";
import CarouselDevs from "@/components/CarouselDevs";
import CarouselSmall from "@/components/CarouselSmall";
import CarouselUser from "@/components/CarouselUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Wellcome from "@/components/Wellcome";


const Home = () => {

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

    return (
        <>
            <Header />
            <div className='relative z-50 flex justify-end md:me-10 md:-mt-10 -mt-10 md:h-full '>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-block rounded bg-red-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:shadow-xl"
                >
                    Sair
                </button>
            </div>
            <Wellcome />
            <Carousel />
            <CarouselSmall />
            <CarouselUser />
            <CarouselDevs />
            <Footer />
        </>

    )
}

export default withAuth(Home);