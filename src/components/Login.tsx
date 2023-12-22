import React from 'react';
import { useRouter } from 'next/router';
import { getAuth, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { dataInRealtimeFaGoDB } from './DatabaseFaGo';
import firebase from '../services/firebase';
import LogoUp from '../../public/logoSKupScaler.png'
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {

   const router = useRouter();
   const auth = getAuth(firebase);

   const signInWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
         .then(async (result) => {
            console.log(result);

            const user = result.user;
            await dataInRealtimeFaGoDB(user);

            router.push('/home')

         })
         .catch((error) => {
            console.error(error);
         });
   }

   const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then(async (result) => {
            console.log(result);
   
            const user = result.user;
            await dataInRealtimeFaGoDB(user);
   
            router.push('/home')
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <>
         <section className="h-screen container">
            <div className="h-full text-white">

               <div
                  className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                  <div
                     className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                     <Image
                        src={LogoUp}
                        height={1000} 
                        width={1000}
                        className="w-full"
                        alt="Sample image" />
                  </div>


                  <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                     <form>

                        <div className="flex flex-row items-center justify-center lg:justify-start">
                           <p className="mb-0 mr-4 text-lg">Entrar com</p>
                           <div className='flex gap-4'>
                              <button
                                 type="button"
                                 className='flex gap-1 text-lg items-center transition duration-100 ease-in-out hover:shadow-2xl hover:shadow-white'
                                 onClick={signInWithFacebook}
                              >
                                 <span className='text-blue-500 font-bold text-xl'>facebook</span>
                                 <FaFacebook className="text-blue-500 text-2xl" />
                              </button>

                              <button
                                 type="button"
                                 className='flex gap-1 text-lg items-center transition duration-100 ease-in-out hover:shadow-2xl hover:shadow-white'
                                 onClick={signInWithGoogle}
                              >
                                 <FcGoogle className="text-2xl" />
                                 <span className='text-red-500 font-bold text-xl'>o</span><span className='text-yellow-500 font-bold text-xl'>o</span><span className='text-blue-500 font-bold text-xl'>g</span><span className='text-green-500 font-bold text-xl'>l</span><span className='text-red-500 font-bold text-xl'>e</span>
                              </button>
                           </div>

                        </div>

                        <div
                           className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                           <p
                              className="mx-4 mb-0 text-center font-semibold dark:text-white">
                              Ou entrar com uma conta
                           </p>
                        </div>


                        <div className="relative mb-6">
                           <input
                              type="text"
                              className="block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] outline-2"
                              id="Email"
                              placeholder="Email" />
                           <label
                              className=""
                           >

                           </label>
                        </div>


                        <div className="relative mb-6">
                           <input
                              type="password"
                              className="block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] outline-2"
                              id="Senha"
                              placeholder="Senha" />
                           <label
                              className=""
                           >

                           </label>
                        </div>


                        <div className="text-center lg:text-left">
                           <button
                              type="button"
                              className="inline-block rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white stransition duration-150 ease-in-out hover:shadow-2xl hover:shadow-white"
                           >
                              Login
                           </button>

                           <div className='flex gap-1 justify-center mt-5'>
                              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                 Nao tem uma conta?</p>
                              <Link
                                 href="/usuarios/form"
                                 className="text-red-700 hover:text-blue-500 mb-0 mt-2 pt-1 text-sm font-semibold"
                              >
                                 Criar conta
                              </Link>
                           </div>

                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default Login