import Link from 'next/link'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { UserContext } from '../context/userProvider';
import { Button, Card, Col, Row, Table, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios';
import gameValidator from '@/validators/gameValidator';
import ReactInputMask from 'react-input-mask';
import Image from 'next/image';
import User from './User';

interface FormValues {
    id: string;
    usuario: string;
    jogo: string;
    nota: number;
    comentario: string;
    data: string;
    foto: string;
}
interface Usuario {
    id: string;
    nome: string;
    foto: string;
}
interface Jogos {
    id: string;
    titulo: string;
    desenvolvedora: string;
    plataforma: string;
    genero: string;
    sinopse: string;
    capa: string;
    background: string;
}
interface ModalFormReviewProps {
    onSave: (dados: any) => void;
    gameID: string
}

const FormReview: React.FC<ModalFormReviewProps> = ({ onSave, gameID }) => {


    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [jogos, setJogos] = useState<Jogos[]>([])
    const { state } = useContext(UserContext);
    const userData = state.userData;

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>();

    const currentDate = new Date().toISOString().slice(0, 10);

    console.log(state)


    const fetchData = async () => {

        try {
            const jogoTitle = await jogos.find(item => item.id === gameID)?.titulo || ''; // Função que busca o título do jogo
            const userLogin = userData ? userData.displayName : '';
            setValue('jogo', jogoTitle);
            setValue('usuario', userLogin);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();


    const router = useRouter() // Crie uma instância do useRouter
    const { id } = router.query // Extraia o id da query


    useEffect(() => {
        if (id) {
            // Verifique se o id existe
            getAll(); // Chame a função getAll
        }
    }, [id]); // Use o id como dependência do useEffect

    function getAll() {

        axios.get('/api/usuarios').then(resultado => {
            setUsuarios(resultado.data)

        })
        axios.get('/api/jogos').then(resultado => {
            setJogos(resultado.data)

        })

        axios.get(`/api/reviews/${id}`);
    }


    const salvar = async (dados: FormValues) => {

        await axios.post('/api/reviews', dados)
        onSave(dados) // Chame a função onSave passando os dados para o ModalForm
        reset()
    }

    return (
        <>

            <div>

                <Row>
                    <Col>
                        <Form className='text-white font-bold'>
                        <Form.Group className="mb-3" controlId="Nota">
                                <Form.Label>Nota</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="0 a 99"
                                    mask="99"
                                    as={ReactInputMask}
                                    {...register('nota', gameValidator.reviews.nota)}
                                />
                                {
                                    errors.nota &&
                                    <small className='text-red-700'>{errors.nota.message}</small>
                                }
                            </Form.Group>
                        <Form.Group className="mb-3" controlId="Comentario">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                type="text"
                                placeholder="Comentario"
                                {...register('comentario', gameValidator.reviews.comentario)}
                            />
                            {
                                errors.comentario &&
                                <small className='text-red-700'>{errors.comentario.message}</small>
                            }
                        </Form.Group>
                        
                            <Form.Group className="mb-3" controlId="Usuario">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    placeholder="Usuario"
                                    {...register('usuario', gameValidator.reviews.usuario)}
                                    defaultValue={userData ? userData.displayName : ''}
                                    autoFocus
                                    hidden

                                >
                                    {
                                        errors.usuario &&
                                        <small className='text-red-700'>{errors.usuario.message}</small>
                                    }

                                </Form.Control>
                            </Form.Group>


                            
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="foto"
                                    {...register('foto', gameValidator.reviews.foto)}
                                    defaultValue={userData ? userData.photoURL : ''}
                                    autoFocus
                                    hidden
                                    readOnly


                                />
                                {
                                    errors.foto &&
                                    <small className='text-red-700'>{errors.foto.message}</small>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Jogo">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Selecione o Jogo"
                                    {...register('jogo', gameValidator.reviews.jogo)}
                                    hidden
                                    readOnly


                                />
                                {
                                    errors.jogo &&
                                    <small className='text-red-700'>{errors.jogo.message}</small>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Data">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="AAAA/MM/DD"
                                    defaultValue={currentDate}
                                    {...register('data', gameValidator.reviews.data)}
                                    readOnly
                                    hidden
                                />
                                {
                                    errors.data &&
                                    <small className='text-red-700'>{errors.data.message}</small>
                                }
                            </Form.Group>

                            <div className='flex gap-3 justify-center'>
                                <button
                                    onClick={handleSubmit(salvar)}
                                    type="submit"
                                    className="bg-blue-500 text-white active:bg-blue-800 font-bold uppercase text-sm px-6 py-1 -mt-20 rounded-lg shadow-black shadow-2xl hover:bg-blue-600 ease-linear transition-all duration-150"
                                >
                                    <span className='flex items-center gap-2'>
                                        <AiOutlineCheck />
                                        Salvar
                                    </span>
                                </button>

                            </div>

                        </Form>

                    </Col>

                </Row>
            </div >

        </>
    )
}

export default FormReview