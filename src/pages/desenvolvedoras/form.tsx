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

const Formulario = () => {

    const { push } = useRouter()

    interface FormValues {
        nome: string
        pais: string
        fundacao: Date
        logo: string

    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    function salvar(dados: any) {

        axios.post('/api/desenvolvedoras', dados)
        push('/desenvolvedoras')

    }

    return (
        <>
            <Header />
            <div className='container'>
                <Row>
                    <span className='text-5xl p-2 justify-center flex mb-5 rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3'>Cadastrar Desenvolvedora</span>
                </Row>
                <Row className="px-1 mx-1">
                    <Col>
                        <Form className='text-white font-bold'>
                            <Form.Group className="mb-3" controlId="Nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" {...register('nome', gameValidator.desenvolvedoras.nome)} />
                                {
                                    errors.nome &&
                                    <small className='text-red-700'>{errors.nome.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="País">
                                <Form.Label>País</Form.Label>
                                <Form.Control type="text" placeholder="País" {...register('pais', gameValidator.desenvolvedoras.pais)} />
                                {
                                    errors.pais &&
                                    <small className='text-red-700'>{errors.pais.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Fundacao">
                                <Form.Label>Fundação da Desenvolvedora</Form.Label>
                                <Form.Control type="date" placeholder="AAAA/MM/DD" {...register('fundacao', gameValidator.desenvolvedoras.fundacao)} />
                                {
                                    errors.fundacao &&
                                    <small className='text-red-700'>{errors.fundacao.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Logo">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control type="text" placeholder="URL: https://" {...register('logo', gameValidator.desenvolvedoras.logo)} />
                                {
                                    errors.logo &&
                                    <small className='text-red-700'>{errors.logo.message}</small>
                                }
                            </Form.Group>


                            <div className='flex gap-3 justify-center pb-5'>
                                <Button variant="primary" onClick={handleSubmit(salvar)}>
                                    <div className='flex gap-2'><AiOutlineCheck />
                                        Salvar
                                    </div>
                                </Button>

                                <Link href={'/desenvolvedoras'} className='btn btn-primary text-white'>
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

export default Formulario