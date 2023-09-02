import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { backgroundNota } from '@/pages/jogos/games/[id]'

interface Reviews {
    id: string
    usuario: string,
    jogo: string,
    nota: number,
    comentario: string,
    data: Date
}

interface Membro {
    nome: string;
    email: string,
    foto: string
    preferenciagenero: string
}

const Membros = () => {

    const [usuarios, setUsuarios] = useState<Membro | null>(null)
    const [reviews, setReviews] = useState<Reviews[]>([])

    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query

    useEffect(() => {
        async function getAll() { // Transforme a função em assíncrona
            try {
                const resultado = await axios.get(`/api/usuarios/${id}`) // Use o id na URL da API e aguarde a resposta
                setUsuarios(resultado.data)

                const reviews = await axios.get('/api/reviews');
                setReviews(reviews.data);

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
            <Row className='mt-3 mx-3'>

                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={usuarios?.foto} />
                        <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                            <Card.Title className='h5'>{usuarios?.nome}</Card.Title>
                        </Card.Body>
                    </Card>

                </Col>
                <Col md={8}>
                    <h3 className='text-white font-black text-center'>{usuarios?.nome}</h3>
                    <Card>
                        <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                            <p className='text-xl'><strong>E-mail:</strong> {usuarios?.email} </p>
                            <p className='text-xl'><strong>Genero Preferido:</strong> {usuarios?.preferenciagenero} </p>

                        </Card.Body>
                    </Card>

                    <h3 className='text-white mt-3'>Reviews</h3>

                    <Card>
                        <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                            <div> {reviews.filter(item => item.usuario === usuarios?.nome).map((item: any) => (
                                <div key={item.id}>
                                    <span className='text-xl font-bold'>{item.jogo}</span>
                                    <p>{item.comentario}</p>
                                    <div className='mt-2'>
                                        <span className={`font-extrabold text-lg p-2 rounded-full ${backgroundNota(item.nota)}`}>{item.nota}</span>
                                    </div>
                                    <div className='flex justify-end pb-5'>
                                        {item.data}
                                    </div>
                                </div>
                            ))}
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="mt-3 mx-4">
                <Link href={'/'} className='btn btn-primary text-white'>Voltar</Link>
            </div>
            <Footer />
        </>
    )
}

export default Membros