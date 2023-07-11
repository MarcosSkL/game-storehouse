import React, { useState } from 'react'
import logo from '../../public/logo.png'
import { IoSearch, IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import { Offcanvas } from 'react-bootstrap'
import Link from 'next/link'
import ModalLogin from './ModalLogin'


const Header = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <header className='sticky top-0 left-0 right-0 ps-5 mb-4 z-10 font-bold flex justify-between items-center bg-gradient-to-r from-black via-sky-950 to-sky-900'>

                <div className='flex items-center gap-6'>
                    <IoMenu className='h-14 w-12 cursor-pointer text-white' onClick={handleShow} />
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton className='bg-slate-800'>
                            <Offcanvas.Title><p className='no-underline text-white'>Editar Campos</p></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='bg-gray-700'>
                            <p><Link href='/usuarios' className='no-underline text-lg font-semibold font-serif text-slate-200 text-current hover:text-gray-400'>Usuários</Link></p>
                            <p><Link href='/jogos' className='no-underline text-lg font-semibold font-serif text-slate-200 text-current hover:text-gray-400'>Jogos</Link></p>
                            <p><Link href='/reviews' className='no-underline text-lg font-semibold font-serif text-slate-200 text-current hover:text-gray-400'>Reviews</Link></p>
                            <p><Link href='/desenvolvedoras' className='no-underline text-lg font-semibold font-serif text-slate-200 text-current hover:text-gray-400'>Desenvolvedoras</Link></p>
                            <p><Link href='/generos' className='no-underline text-lg font-semibold font-serif text-slate-200 text-current hover:text-gray-400'>Gêneros</Link></p>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Link href={"/"}><Image src={logo} height={100} width={100} alt='Logo Site' /> </Link>
                </div>
                <div className='pe-20'>
                    <div className="absolute focus:pointer-events-auto">
                        <IoSearch className="absolute text-slate-400 h-8 w-6 ms-1" />
                    </div>
                    <input
                        className="rounded-3xl w-[15rem] md:w-[25rem] bg-gray-200 outline-none py-1 px-40 text-lg focus:px-7  focus: duration-500"
                        type="text"
                        placeholder="Procurar"
                    />
                </div>
                <div className='me-5'>
                    <ModalLogin />
                </div>

            </header>
        </>
    )
}

export default Header