import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Importe o useRouter do Next.js

const Games = () => {

    interface Jogo {
        id: number;
        titulo: string;
    }

    const [jogos, setJogos] = useState<Jogo[]>([])

    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query

    useEffect(() => {
        async function getAll() { // Transforme a função em assíncrona
            try {
                const resultado = await axios.get(`/api/jogos/${id}`) // Use o id na URL da API e aguarde a resposta
                setJogos(resultado.data)
            } catch (error) {
                console.error(error) // Trate os possíveis erros
            }
        }

        if (id) { // Verifique se o id existe
            getAll() // Chame a função getAll
        }
    }, [id]) // Use o id como dependência do useEffect

    return (
        <>
            <Header />
            <div className='container text-slate-50'>
                <h1>{jogos.titulo}</h1>
            </div>
            <Footer />
        </>
    )
}

export default Games