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
import withAuth from '@/components/Hoc';

const FormAlterGeneros = () => {

    const { push, query } = useRouter()

    interface FormValues {
        nome: string
        descricao: string
        
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {

        if (query.id) {

            axios.get('/api/generos/' + query.id).then(resultado => {
                const genero = resultado.data

                for (let atributo in genero) {
                    setValue(atributo as 'nome' | 'descricao', genero[atributo])
                }
            })
        }

    }, [query.id])

    function salvar(dados: any) {
        axios.put('/api/generos/' + dados.id, dados)
        push('/generos')
    }


    return (

        <>
            <Header />
            <div className='container'>
                <Row>
                    <span className='text-5xl p-2 justify-center flex mb-5 rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3'>Editar Gênero</span>
                </Row>
                <Row className="px-1 mx-1">
                    <Col>
                        <Form className='text-white font-bold'>
                            <Form.Group className="mb-3" controlId="Nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" {...register('nome', gameValidator.generos.nome)} />
                                {
                                    errors.nome &&
                                    <small className='text-red-700'>{errors.nome.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Descrição">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} type="text" placeholder="Descrição" {...register('descricao', gameValidator.generos.descricao)} />
                                {
                                    errors.descricao &&
                                    <small className='text-red-700'>{errors.descricao.message}</small>
                                }
                            </Form.Group>
                       
                            <div className='flex gap-3 justify-center pb-5'>
                                <Button variant="primary" onClick={handleSubmit(salvar)}>
                                    <div className='flex gap-2'><AiOutlineCheck />
                                        Salvar
                                    </div>
                                </Button>

                                <Link href={'/generos'} className='btn btn-primary text-white'>
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

export default withAuth(FormAlterGeneros)