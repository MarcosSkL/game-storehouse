import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios';
import gameValidator from '@/validators/gameValidator';
import { mask, unmask } from 'remask';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FormAlterJogos = () => {

    const { push, query } = useRouter()
    const [generos, setGeneros] = useState([])
    const [desenvolvedoras, setDesenvolvedora] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/generos').then(resultado => {
            setGeneros(resultado.data)

        })


        axios.get('/api/desenvolvedoras').then(resultado => {
            setDesenvolvedora(resultado.data)

        })
    }
    interface FormValues {
        titulo: string
        desenvolvedora: string
        plataforma: string
        genero: string
        sinopse: string
        capa: string
        background: string

    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {

        if (query.id) {

            axios.get('/api/jogos/' + query.id).then(resultado => {
                const jogo = resultado.data

                for (let atributo in jogo) {
                    setValue(atributo as 'titulo' | 'desenvolvedora' | 'plataforma' | 'genero' | 'sinopse' | 'capa', jogo[atributo])
                }
            })
        }

    }, [query.id])

    function salvar(dados: any) {
        axios.put('/api/jogos/' + dados.id, dados)
        push('/jogos')
    }

    const MaskName = (event: any) => {

        const nome = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute("mask").split(", ")

        const marscaraInt = Number("mask")



        setValue(nome, mask(unmask(valor), mascara))
    }
    return (

        <>
            <Header />
            <div className='container'>
                <Row>
                    <span className='text-5xl p-2 justify-center flex mb-5 rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3'>Editar Jogo</span>
                </Row>
                <Row className="px-1 mx-1">
                <Col>
                        <Form className='text-white font-bold'>
                            <Form.Group className="mb-3" controlId="Titulo">
                                <Form.Label className=''>Titulo</Form.Label>
                                <Form.Control type="text" placeholder="Titulo" {...register('titulo', gameValidator.jogos.titulo)} />
                                {
                                    errors.titulo &&
                                    <small className='text-red-700'>{errors.titulo.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Desenvolvedora">
                                <Form.Label>Desenvolvedora</Form.Label>
                                <Form.Select placeholder="Desenvolvedora" {...register('desenvolvedora', gameValidator.jogos.desenvolvedora)}>
                                    {
                                        errors.desenvolvedora &&
                                        <small className='text-red-700'>{errors.desenvolvedora.message}</small>
                                    }
                                    <option value="Desenvolvedora">Selecione a Desenvolvedora</option>
                                    {desenvolvedoras.map((item: any) => (
                                        <option key={item.id} value={item.nome}>{item.nome}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="Plataforma">
                                <Form.Label>Plataforma</Form.Label>
                                <Form.Control type="text" placeholder="Plataforma" {...register('plataforma', gameValidator.jogos.plataforma)} />
                                {
                                    errors.plataforma &&
                                    <small className='text-red-700'>{errors.plataforma.message}</small>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Gênero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Select {...register('genero', gameValidator.jogos.genero)}>
                                    {
                                        errors.genero &&
                                        <small className='text-red-700'>{errors.genero.message}</small>
                                    }
                                    <option value="Generos">Selecione o Gênero</option>
                                    {generos.map((item: any) => (
                                        <option key={item.id} value={item.nome}>{item.nome}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Sinopse">
                                <Form.Label>Sinopse</Form.Label>
                                <Form.Control as="textarea" rows={3} type="text" placeholder="Sinopse" {...register('sinopse', gameValidator.jogos.sinopse)} />
                                {
                                    errors.sinopse &&
                                    <small className='text-red-700'>{errors.sinopse.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Capa">
                                <Form.Label>Capa</Form.Label>
                                <Form.Control type="text" placeholder="URL: https://" {...register('capa', gameValidator.jogos.capa)} />
                                {
                                    errors.capa &&
                                    <small className='text-red-700'>{errors.capa.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Background">
                                <Form.Label>Background</Form.Label>
                                <Form.Control type="text" placeholder="URL: https://" {...register('background', gameValidator.jogos.background)} />
                                {
                                    errors.background &&
                                    <small className='text-red-700'>{errors.background.message}</small>
                                }
                            </Form.Group>

                            <div className='flex gap-3 justify-center pb-5'>
                                <Button variant="primary" onClick={handleSubmit(salvar)}>
                                    <div className='flex gap-2'><AiOutlineCheck />
                                        Salvar
                                    </div>
                                </Button>

                                <Link href={'/jogos'} className='btn btn-primary text-white'>
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

export default FormAlterJogos