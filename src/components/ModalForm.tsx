import FormReview from '@/components/FormReview';
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';

interface ModalFormProps {
    onAddReview: (newReview: any) => void;
    gameID: string
}

const ModalForm: React.FC<ModalFormProps> = ({ onAddReview, gameID }) => {

    const [showModal, setShowModal] = useState(false);
    

    const handleSaveReview = (dados: any) => {

        console.log('Dados salvos:', dados);
        onAddReview(dados); // Chama a função onAddReview passada como prop com os dados da nova revisão

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
   
    return (

        <>
            <button
                className="bg-blue-500 text-white active:bg-blue-800 font-bold uppercase text-sm px-6 py-3 mt-2 rounded-lg shadow-black shadow-2xl hover:bg-blue-600 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Inserir Review
            </button>
            {showModal ? (
                <>
                    <div
                        className="top-2 md:mx-[27rem] justify-center items-center flex overflow-auto fixed z-20 outline-none focus:outline-none"

                    >
                        <div className="w-[30rem] h-full">

                            <div className="rounded-3xl bg-slate-700">
                            <div className='flex justify-end'>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <IoClose className='text-xl' />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <FormReview gameID={gameID} onSave={handleSaveReview} onCloseModal={handleCloseModal} />
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-sm bg-black/30 fixed inset-0 z-10" onClick={handleCloseModal}></div>
                </>
            ) : null}
        </>
    );

}

export default ModalForm