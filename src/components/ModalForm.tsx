import ModalFormReview from '@/pages/reviews/ModalFormReview';
import React, { useState } from 'react'


  const ModalForm: React.FC = () => {

    const [showModal, setShowModal] = useState(false);

    const handleSaveReview = (dados: any) => {
       
        console.log('Dados salvos:', dados);
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
                        className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative h-full w-[40rem]">

                            <div className="rounded-3xl shadow-black shadow-2xl relative bg-slate-700 outline-none focus:outline-none">

                                <div className="relative p-6">
                                    <ModalFormReview onSave={handleSaveReview} onCloseModal={handleCloseModal} />
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backdrop-blur-sm bg-black/30 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    );

}

export default ModalForm