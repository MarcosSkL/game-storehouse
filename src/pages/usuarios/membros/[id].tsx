import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Membros = () => {

    interface Membro {
        id: number;
        titulo: string;
    }

    const [usuarios, setUsuarios] = useState<Membro[]>([])

    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query

    useEffect(() => {
        async function getAll() { // Transforme a função em assíncrona
            try {
                const resultado = await axios.get(`/api/usuarios/${id}`) // Use o id na URL da API e aguarde a resposta
                setUsuarios(resultado.data)
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
                <h1>{usuarios.nome}</h1>
            </div>
            <Footer />
        </>
    )
}

export default Membros