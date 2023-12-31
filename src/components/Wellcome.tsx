import Link from 'next/link'
import React from 'react'

const Wellcome = () => {
    return (
        <div>
            <div className="pt-32 pb-28 container">
                <div className="text-4xl sm:text-8xl mb-10 py-5 mx-2 sm:mx-[1rem] shadow-2xl rounded-full shadow-zinc-950 text-center font-extrabold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 ">
                    Bem vindo a SK Game Storehouse
                </div>
                <div className="text-xl sm:text-2xl mx-2 font-mono font-semibold pb-11 text-slate-200 text-center">
                    <span>reviews de jogos que te ajuda a escolher os melhores títulos para o seu estilo.<br />
                        leia as nossas resenhas e descubra novas formas de se divertir.<br />
                        Se quiser compartilhar a sua experiência, é só deixar um comentário</span>
                </div>
                <div className="text-center">
                    <Link className="px-6 sm:px-10 py-3 no-underline shadow-2xl rounded-full shadow-zinc-950 font-bold text-white ml-8 sm:ml-11 bg-slate-400 hover:bg-slate-500"
                        target='_blanck'
                        href="https://github.com/MarcosSkL"
                    >
                        <span>My Github</span>

                    </Link>
                    <Link
                        className="px-6 sm:px-10 py-3 no-underline shadow-2xl rounded-full shadow-zinc-950 font-bold text-white ml-8 sm:ml-11 bg-sky-400 hover:bg-sky-500"
                        target='_blanck'
                        href="https://github.com/MarcosSkL/gamestore"
                    >
                        <span className="justify-center">Repositorio</span>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Wellcome
