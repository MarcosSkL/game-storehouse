const cursoValidator = {
    jogos: {
        titulo: {
            required: 'O Campo é Obrigatório',
            minLength: {
                value: 3,
                message: "Quantidade minima de caracteres: 3"
            },
            maxLength: {
                value: 100,
                message: "Quantidade maxima de caracteres: 100"
            },
        },
        desenvolvedora: {
            required: 'O Campo é Obrigatório',
        },
        plataforma: {
            required: 'O Campo é Obrigatório',
        },
        genero: {
            required: 'O Campo é Obrigatório',
        },
        sinopse: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 1000,
                message: "Quantidade maxima de caracteres: 1000"
            },
        },
        capa: {
            maxLength: {
                value: 200,
                message: "Quantidade maxima de caracteres: 200"
            },
        },
        background: {
            maxLength: {
                value: 200,
                message: "Quantidade maxima de caracteres: 200"
            },
        },
    },
    usuarios: {
        nome: {
            required: 'O Campo é Obrigatório',
            minLength: {
                value: 3,
                message: "Quantidade minima de caracteres: 3"
            },
            maxLength: {
                value: 50,
                message: "Quantidade maxima de caracteres: 50"
            },
        },
        email: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 100,
                message: "Quantidade maxima de caracteres: 100"
            },
        },
        senha: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 12,
                message: "Quantidade maxima de caracteres: 12"
            },
            minLength: {
                value: 8,
                message: "Quantidade minima de caracteres: 8"
            },
        },
        foto: {
            maxLength: {
                value: 200,
                message: "Quantidade maxima de caracteres: 200"
            },
        },
        
        preferenciaGenero: {
            maxLength: {
                value: 20,
                message: "Quantidade maxima de caracteres: 20"
            },
        },
    },
    reviews: {
        usuario: {
            required: 'O Campo é Obrigatório',
        },
        foto: {
            required: 'O Campo é Obrigatório',
        },
        jogo: {
            required: 'O Campo é Obrigatório',
        },
        nota: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 2,
                message: "Quantidade maxima de caracteres: 2"
            },
            minLength: {
                value: 1,
                message: "Quantidade maxima de caracteres: 1"
            },
        },
        comentario: {
            maxLength: {
                value: 1000,
                message: "Quantidade maxima de caracteres: 1.000"
            },
        },
        data: {
            required: 'O Campo é Obrigatório',
        },
    },
    desenvolvedoras: {
        nome: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 50,
                message: "Quantidade maxima de caracteres: 50"
            },
        },
        pais: {
            required: 'O Campo é Obrigatório',
        },
        fundacao: {
            required: 'O Campo é Obrigatório',
        },
        logo: {
            maxLength: {
                value: 200,
                message: "Quantidade maxima de caracteres: 1.000"
            },
        },
        
    },
    generos: {
        nome: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 50,
                message: "Quantidade maxima de caracteres: 50"
            },
        },
        descricao: {
            required: 'O Campo é Obrigatório',
            maxLength: {
                value: 500,
                message: "Quantidade maxima de caracteres: 500"
            },
        },
    },
    

}


export default cursoValidator