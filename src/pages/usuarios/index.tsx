import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

const index = () => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/usuarios').then(resultado => {
            setUsuarios(resultado.data)

        })
    }


    function excluir(id: any) {
        if (confirm("Deseja excluir o registro?")) {
            axios.delete('/api/usuarios/' + id)
            getAll()
        }
    }
    return (

        <>
            <Header />
            <div className='px-5'>
                <Row className="px-1 mx-1">
                    <Col>
                        <Link href={'usuarios/form/'} className='btn btn-primary text-white'>Novo</Link>
                        <div className="relative overflow-x-auto shadow-md rounded-tr-[90px] rounded-[50px] pt-2 pb-4">
                            <table className="w-full text-md text-left text-blue-100 dark:text-blue-100">
                                <thead className="text-xs text-white uppercase bg-blue-500 border-b border-blue-400 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-2 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            E-mail
                                        </th>

                                        <th scope="col" className="px-2 py-3">
                                            Preferências de Gênero
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Foto
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((item: any, id: any) => (

                                        <tr key={item.id} className="bg-opacity-80 bg-blue-400 border-b border-blue-400 hover:bg-blue-500">
                                            <td scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                                <div className='flex'>
                                                    <Link href={'/usuarios/' + item.id}>
                                                        <AiFillEdit className='ms-2 text-dark text-2xl' />
                                                    </Link>
                                                    <AiOutlineDelete
                                                        onClick={() => excluir(item.id)}
                                                        type='submit'
                                                        className='text-danger text-2xl' />
                                                </div>
                                            </td>

                                            <td className="px-2 py-2">
                                                {item.nome}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.email}
                                            </td>

                                            <td className="px-2 py-2">
                                                {item.preferenciagenero}
                                            </td>
                                            <td className="px-2 py-2">

                                                <Image src={item.foto} width={200} height={200} alt='Foto do Usuario' />

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
