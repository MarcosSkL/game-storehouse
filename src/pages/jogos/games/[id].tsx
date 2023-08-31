import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import BoxForm from '@/components/BoxForm'
import { AiOutlineDelete } from 'react-icons/ai'


interface Jogos {
    id: string;
    titulo: string;
    desenvolvedora: string,
    plataforma: string,
    genero: string,
    sinopse: string,
    capa: string,
    background: string
}

interface Reviews {
    id: string
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

    const handleAddReview = (newReview: any) => {
        setReviews([...reviews, newReview]); // Adiciona a nova revisão à lista de revisões
    };

    useEffect(() => {
        if (id) {
            // Verifique se o id existe
            getAll(); // Chame a função getAll
        }
    }, [id]); // Use o id como dependência do useEffect

    async function getAll() {
        try {
            const jogos = await axios.get(`/api/jogos/${id}`); // Use o id na URL da API e aguarde a resposta
            setJogos(jogos.data);

            const reviews = await axios.get('/api/reviews');
            setReviews(reviews.data);

        } catch (error) {
            console.error(error); // Trate os possíveis erros
        }
    }


    function backgroundNota(nota: number) {
        if (nota >= 80 && nota <= 99) {
            return 'bg-green-900';
        } else if (nota >= 40 && nota <= 79) {
            return 'bg-yellow-500';
        } else if (nota >= 0 && nota <= 39) {
            return 'bg-red-600';
        }
    }

    function excluir(id: any) {
        if (confirm('Deseja excluir o registro?')) {
            axios.delete(`/api/reviews/${id}`);
            getAll();
        }
    }

    return (
        <>
            <div>
                <Header />
                <div style={{ '--image-url': `url(${jogos?.background})` } as React.CSSProperties}
                    className='py-72 bg-[image:var(--image-url)] bg-cover bg-center rounded-b-3xl'
                >
                </div>
                <div className='container -mt-[15rem] text-slate-50'>
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
                                    {reviews.filter(item => item.jogo === jogos?.titulo).map((item: any, index: number) => (
                                        <div key={index}>
                                            <div className='flex items-baseline gap-3'>
                                                <img src={item.foto} height={100} width={100} alt={item.usuario} />
                                                <p className='text-xl font-bold'>{item.usuario}</p>
                                            </div>
                                            <div className='flex gap-2 text-xl'>
                                                <span>{item.comentario}</span>
                                                <span> <AiOutlineDelete
                                                    onClick={() => excluir(item.id)}
                                                    type='submit'
                                                    className='text-danger text-2xl' />
                                                </span>
                                            </div>
                                            <div className='mt-2'>
                                                <span className={`font-extrabold text-lg p-2 rounded-full ${backgroundNota(item.nota)}`}>{item.nota}</span>
                                            </div>
                                            <div className='flex justify-end pb-5'>
                                                {item.data}
                                            </div>
                                        </div>
                                    ))}
                                    <div className=''>
                                        <BoxForm gameID={String(id)} onAddReview={handleAddReview} />
                                    </div>
                                </Card.Body>

                            </Card>


                        </Col>
                    </Row>

                    <div className="d-flex flex-column align-items-start pt-1">
                        <Link href={'/'} className='btn btn-primary text-white'>Voltar</Link>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Games