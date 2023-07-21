import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ModalForm from '@/components/ModalForm'


interface Jogos {
    id: number;
    titulo: string;
    desenvolvedora: string,
    plataforma: string,
    genero: string,
    sinopse: string,
    capa: string,
    background: string
}

interface Reviews {
    usuario: string,
    jogo: string,
    nota: number,
    comentario: string,
    data: Date
}



const Games = () => {


    const [jogos, setJogos] = useState<Jogos | null>(null)
    const [reviews, setReviews] = useState<Reviews[]>([])

    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query

    useEffect(() => {
        async function getAll() { // Transforme a função em assíncrona
            try {
                const jogos = await axios.get(`/api/jogos/${id}`) // Use o id na URL da API e aguarde a resposta
                setJogos(jogos.data)

                const reviews = await axios.get('/api/reviews')
                    setReviews(reviews.data)
        
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
                <Row>

                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={jogos?.capa} />
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <Card.Title className='h5'>{jogos?.titulo}</Card.Title>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <p className='text-xl'><strong>Plataformas:</strong> {jogos?.plataforma} </p>
                                <p className='text-xl'><strong>Desenvolvedora:</strong> {jogos?.desenvolvedora} </p>
                                <p className='text-xl'><strong>Genero: </strong> {jogos?.genero} </p>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <p className='text-center text-3xl'><strong>Sinopse</strong></p>
                                <p className='text-xl'>{jogos?.sinopse}</p>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <Row className='pt-3 pb-2'>
                    <Col md={12}>

                        <Card>
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <p className='text-center text-3xl'><strong>Reviews:</strong></p>
                                {reviews.filter(item => item.jogo == jogos?.titulo).map((item: any) => (
                                    <div key={item.id}>
                                        <div className='flex items-baseline gap-3'>
                                            <Image src={item.foto} height={100} width={100} alt={item.usuario} />
                                            <p className='text-xl font-bold'>{item.usuario}</p>
                                        </div>
                                        <p className='text-xl pb-5'>{item.comentario}</p>
                                    </div>
                                ))}
                            </Card.Body>

                        </Card>

                        <ModalForm />

                    </Col>
                </Row>

                <div className="d-flex flex-column align-items-start pt-1">
                    <Link href={'/'} className='btn btn-primary text-white'>Voltar</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Games