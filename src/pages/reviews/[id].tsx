import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios';
import gameValidator from '@/validators/gameValidator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactInputMask from 'react-input-mask';

const FormAlterReviews = () => {

    const { push, query } = useRouter()

    const [usuarios, setUsuarios] = useState([])
    const [jogos, setJogos] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/usuarios').then(resultado => {
            setUsuarios(resultado.data)

        })
        axios.get('/api/jogos').then(resultado => {
            setJogos(resultado.data)

        })
    }
    interface FormValues {
        usuario: string
        jogo: string
        nota: number
        comentario: string
        data: Date


    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {

        if (query.id) {

            axios.get('/api/reviews/' + query.id).then(resultado => {
                const review = resultado.data

                for (let atributo in review) {
                    setValue(atributo as 'usuario' | 'jogo' | 'nota' | 'comentario' | 'data', review[atributo])
                }
            })
        }

    }, [query.id])

    function salvar(dados: any) {
        axios.put('/api/reviews/' + dados.id, dados)
        push('/reviews')
    }


    return (

        <>
            <Header />
            <div className='container'>
                <Row>
                    <span className='text-5xl p-2 justify-center flex mb-5 rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3'>Editar Reviews</span>
                </Row>
                <Row className="px-1 mx-1">
                    <Col>
                        <Form className='text-white font-bold'>
                            <Form.Group className="mb-3" controlId="Usuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Select placeholder="Usuario" {...register('usuario', gameValidator.reviews.usuario)}>
                                    {
                                        errors.usuario &&
                                        <small className='text-red-700'>{errors.usuario.message}</small>
                                    }
                                    <option value="nome">Selecione</option>
                                    {usuarios.map((item: any) => (
                                        <option key={item.id} value={item.nome}>{item.nome}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Jogo">
                                <Form.Label>Jogo</Form.Label>
                                <Form.Select placeholder="Jogo" {...register('jogo', gameValidator.reviews.jogo)}>
                                    {
                                        errors.jogo &&
                                        <small className='text-red-700'>{errors.jogo.message}</small>
                                    }
                                    <option value="titulo">Selecione o Jogo</option>
                                    {jogos.map((item: any) => (
                                        <option key={item.id} value={item.titulo}>{item.titulo}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Nota">
                                <Form.Label>Nota</Form.Label>
                                <Form.Control
                                    type="text"
                                    mask="99"
                                    as={ReactInputMask}
                                    {...register('nota', gameValidator.reviews.nota)} />
                                {
                                    errors.nota &&
                                    <small className='text-red-700'>{errors.nota.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Comentario">
                                <Form.Label>Comentario</Form.Label>
                                <Form.Control as="textarea" rows={3} type="text" placeholder="Comentario" {...register('comentario', gameValidator.reviews.comentario)} />
                                {
                                    errors.comentario &&
                                    <small className='text-red-700'>{errors.comentario.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Data">
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" placeholder="AAAA/MM/DD" {...register('data', gameValidator.reviews.data)} />
                                {
                                    errors.data &&
                                    <small className='text-red-700'>{errors.data.message}</small>
                                }
                            </Form.Group>

                            <div className='flex gap-3 justify-center pb-5'>
                                <Button variant="primary" onClick={handleSubmit(salvar)}>
                                    <div className='flex gap-2'><AiOutlineCheck />
                                        Salvar
                                    </div>
                                </Button>

                                <Link href={'/reviews'} className='btn btn-primary text-white'>
                                    <div className='flex gap-2'>
                                        <AiOutlineArrowLeft />
                                        Voltar
                                    </div>
                                </Link>
                            </div>

                        </Form>

                    </Col>

                </Row>
            </div>
            <Footer />
        </>
    )
}

export default FormAlterReviews