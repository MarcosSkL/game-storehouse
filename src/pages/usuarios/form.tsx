import Link from 'next/link'
import React, { useEffect, useState, createRef } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios';
import gameValidator from '@/validators/gameValidator';
import ReactInputMask from 'react-input-mask'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import withAuth from '@/components/Hoc';

const Formulario = () => {

    const [generos, setGeneros] = useState([])
 

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/generos').then(resultado => {
            setGeneros(resultado.data)

        })
    }


    const { push } = useRouter()

    interface FormValues {
        nome: string
        email: string
        senha: number
        confirmarSenha: number
        foto: string
        preferenciagenero: string

    }

    const { register, watch, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const senha = watch('senha');
    const confirmarSenha = watch('confirmarSenha');
    
    function salvar(dados: any) {

        axios.post('/api/usuarios', dados)
        push('/usuarios')

    }


    return (
        <>

            <div className='container mt-5'>
                <Row>
                    <span className='text-5xl p-2 justify-center flex mb-5 rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3'>Cadastro</span>
                </Row>
                <Row className="px-1 mx-1">
                    <Col>
                        <Form className='text-white font-bold'>
                            <Form.Group className="mb-3" controlId="Nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" {...register('nome', gameValidator.usuarios.nome)} />
                                {
                                    errors.nome &&
                                    <small className='text-red-700'>{errors.nome.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="text" placeholder="email@mail.com" {...register('email', gameValidator.usuarios.email)} />
                                {
                                    errors.email &&
                                    <small className='text-red-700'>{errors.email.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Senha"
                                    mask="99999999"
                                    as={ReactInputMask}

                                    {...register('senha', gameValidator.usuarios.senha)}

                                />
                                {
                                    errors.senha &&
                                    <small className='text-red-700'>{errors.senha.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ConfirmarSenha">
                                <Form.Label>Confirmar Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirmar Senha"
                                    mask="99999999"
                                    as={ReactInputMask}
                                    {...register('confirmarSenha', gameValidator.usuarios.confirmarSenha)}
                                />
                                {
                                    errors.confirmarSenha &&
                                    <small className='text-red-700'>{errors.confirmarSenha.message}</small>
                                }
                                {
                                    senha !== confirmarSenha &&
                                    <small className='text-red-700'>As senhas não correspondem!</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Foto">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control type="text" placeholder="URL: https://" {...register('foto', gameValidator.usuarios.foto)} />
                                {
                                    errors.foto &&
                                    <small className='text-red-700'>{errors.foto.message}</small>
                                }
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="PreferênciaGenero">
                                <Form.Label>Preferência de Gênero</Form.Label>
                                <Form.Select {...register('preferenciagenero', gameValidator.usuarios.nome)}>
                                    {
                                        errors.nome &&
                                        <small className='text-red-700'>{errors.nome.message}</small>
                                    }
                                    <option value="Generos">Selecione o Gênero</option>
                                    {generos.map((item: any) => (
                                        <option key={item.id} value={item.nome}>{item.nome}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <div className='flex gap-3 justify-center pb-5'>
                                <Button variant="primary" onClick={handleSubmit(salvar)}>
                                    <div className='flex gap-2'><AiOutlineCheck />
                                        Salvar
                                    </div>
                                </Button>

                                <Link href={'/usuarios'} className='btn btn-primary text-white'>
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