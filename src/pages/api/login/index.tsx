import { NextApiResponse, NextApiRequest } from 'next';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/services/firebase';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        // Configurações de autenticação, se necessário
        const provider = new GoogleAuthProvider();
  
        // Lidar com a autenticação usando o componente ModalLogin
        const result = await signInWithPopup(auth, provider);
  
        // Retorne o resultado ou outra resposta adequada para a autenticação
        res.status(200).json({ result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autenticar' });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  }
