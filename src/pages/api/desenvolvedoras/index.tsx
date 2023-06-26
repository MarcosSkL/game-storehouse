// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/services/firebase"
import { child, get, ref, set } from "firebase/database"
import { v4 } from "uuid"

export default function handler(req: any, res: any) {

    if (req.method == 'GET') {

        get(child(ref(db), 'desenvolvedoras')).then(snapshot => {
            const retorno:any = []
            snapshot.forEach(item => {
                retorno.push(item.val())
            });
            res.status(200).json(retorno)
        })


    } else if (req.method == 'POST') {
        const id = v4()
        const dados = req.body
        dados.id = id

        set(ref(db, 'desenvolvedoras/' + id), dados)

        res.status(200).json(dados)
    }

}
export const config = {
    api: {
        externalResolver: true
    }
}