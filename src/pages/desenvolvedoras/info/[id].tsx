import Footer from '@/components/Footer'
import Header from '@/components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Slider from 'react-slick'
import withAuth from '@/components/Hoc'

interface Desenvolvedores {
    id: number;
    nome: string;
    logo: string;
    pais: string;
    fundacao: string;
}
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

const Info = () => {

    const [desenvolvedoras, setDesenvolvedoras] = useState<Desenvolvedores | null>(null)
    const [jogos, setJogos] = useState<Jogos[]>([])

    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query

    useEffect(() => {
        async function getAll() { // Transforme a função em assíncrona
            try {
                const resultado = await axios.get(`/api/desenvolvedoras/${id}`) // Use o id na URL da API e aguarde a resposta
                setDesenvolvedoras(resultado.data)
            } catch (error) {
                console.error(error) // Trate os possíveis erros
            }
        }

        if (id) { // Verifique se o id existe
            getAll() // Chame a função getAll
        }
    }, [id]) // Use o id como dependência do useEffect

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/jogos').then(resultado => {
            setJogos(resultado.data)

        })
    }

    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500

    };

    return (
        <>
            <Header />
            <div className='container text-slate-50'>
                <Row>

                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={desenvolvedoras?.logo} />
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <Card.Title className='h5'>{desenvolvedoras?.nome}</Card.Title>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'>
                                <p className='text-xl'><strong>País:</strong> {desenvolvedoras?.pais} </p>
                                <p className='text-xl'><strong>Fundação:</strong> {desenvolvedoras?.fundacao} </p>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Row>
                        <Col md={12}>
                            <div className='pt-5'>
                                <p className='text-3xl'><strong>Jogos</strong></p>
                            </div>
                            <Slider {...settings}>
                                {jogos.filter(item => item.desenvolvedora === desenvolvedoras?.nome).map((item: any) => (
                                    <div key={item.id} className='flex'>
                                        <Link href={'/jogos/games/' + item.id}>
                                            <img src={item.capa} width={300} height={300} alt={item.titulo} />
                                        </Link>
                                        <p>{item.titulo}</p>
                                    </div>
                                ))}
                            </Slider>
                        </Col>
                    </Row>


                </Row>
                <div className="d-flex flex-column align-items-start pt-1">
                    <Link href={'/home'} className='btn btn-primary text-white'>Voltar</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withAuth(Info)