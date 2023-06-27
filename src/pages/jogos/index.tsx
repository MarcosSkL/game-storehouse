import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Default from '../../../public/default.jpg'

const index = () => {

    const [jogos, setJogos] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/jogos').then(resultado => {
            setJogos(resultado.data)

        })
    }


    function excluir(id: any) {
        if (confirm("Deseja excluir o registro?")) {
            axios.delete('/api/jogos/' + id)
            getAll()
        }
    }
    return (

        <>
            <Header />
            <div className='px-5'>
                <Row className="px-1 mx-1">
                    <Col>
                        <Link href={'jogos/form/'} className='btn btn-primary text-white'>Novo</Link>
                        <div className="relative overflow-x-auto shadow-md rounded-tr-[90px] rounded-[50px] pt-2 pb-4">
                            <table className="w-full text-md text-left text-blue-100 dark:text-blue-100">
                                <thead className="text-xs text-white uppercase bg-blue-500 border-b border-blue-400 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-2 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Titulo
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Desenvolvedora
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Plataforma
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Gênero
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Sinopse
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Capa
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Background
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jogos.map((item: any, id: any) => (

                                        <tr key={item.id} className="bg-opacity-80 bg-blue-400 border-b border-blue-400 hover:bg-blue-500">
                                            <td scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                                <div className='flex'>
                                                    <Link href={'/jogos/' + item.id}>
                                                        <AiFillEdit className='ms-2 text-dark text-2xl' />
                                                    </Link>
                                                    <AiOutlineDelete
                                                        onClick={() => excluir(item.id)}
                                                        type='submit'
                                                        className='text-danger text-2xl' />
                                                </div>
                                            </td>

                                            <td className="px-2 py-2">
                                                {item.titulo}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.desenvolvedora}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.plataforma}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.genero}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.sinopse}
                                            </td>
                                            <td className="px-2 py-2">
                                                <Image src={item.capa} width={500} height={200} alt={"Capa " + item.titulo} />
                                            </td>
                                            <td className="px-2 py-2">
                                                <Image src={item.background} width={200} height={200} alt={"Background " + item.titulo} />
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </Col>

                </Row>
            </div>
            <Footer />
        </>
    )
}

export default index
