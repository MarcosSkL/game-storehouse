import FormReview from '@/components/FormReview';
import React from 'react';

interface ModalFormProps {
    onAddReview: (newReview: any) => void;
    gameID: string
}

const ModalForm: React.FC<ModalFormProps> = ({ onAddReview, gameID }) => {

    const handleSaveReview = (dados: any) => {
        console.log('Dados salvos:', dados);
        onAddReview(dados); // Chama a função onAddReview passada como prop com os dados da nova revisão
    };

    return (
        <div className="p-6">
            <FormReview gameID={gameID} onSave={handleSaveReview} />
        </div>
    );
}

export default ModalForm;