import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { IoLogInSharp } from 'react-icons/io5';
import { FcGoogle, FcKey } from 'react-icons/fc';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth'
import { auth } from '@/services/firebase';
import Link from 'next/link';



const ModalLogin = () => {

    const [show, setShow] = useState(false);
    const [user, setUser] = useState<User>({} as User)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    function handleGoogleAuth() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                setUser(result.user);
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(error)
            })
    }

    return (
        <>
            <div className='flex gap-3'>
                <button onClick={handleShow}> <IoLogInSharp className='text-[36px] text-slate-50 hover:text-sky-300' /> </button>
                <div className='flex gap-2 justify-end items-center text-sm text-white'>
                    {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" className='rounded-full h-14' />}
                    <strong>{user.displayName}</strong>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="usuario">
                            <Form.Label>Usuário / Email</Form.Label>
                            <Form.Control type="text" placeholder="Usuário/Email" autoFocus />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite sua senha" autoFocus />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary"> Logar </Button>
                </Modal.Footer>
                <div className='ms-3'>
                    <Link href="/usuarios/form">
                        <Button variant='info' className='text-white'>
                            <div className='flex gap-2 items-center mx-[142px]'>
                                <FcKey className='text-2xl' />
                                Cadastrar Úsuario
                            </div>
                        </Button>
                    </Link>
                </div>
                <Button variant="primary" onClick={handleGoogleAuth} className='p-3 m-3'>
                    <div className='flex items-center justify-center gap-3'>
                        <FcGoogle className='text-3xl' />
                        Entrar com uma conta Google
                    </div>
                </Button>
            </Modal>
        </>

    )
}

export default ModalLogin