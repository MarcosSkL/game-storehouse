import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { IoLogInSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/services/firebase';



const ModalLogin = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleGoogleAuth() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <button onClick={handleShow}> <IoLogInSharp className='text-[36px] text-slate-50 hover:text-sky-300' /> </button>


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