import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../interfaces/IRestaurante';
export const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {

        if (parametros.id) {
            axios.get<IRestaurante>(`http://127.0.0.1:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubemeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {

            axios.put(`http://127.0.0.1:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })

        } else {

            axios.post('http://127.0.0.1:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastro com sucesso!')
                })
        }
    }

    return (<form onSubmit={aoSubemeterForm}>
        <TextField value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="standard" />


        <Button type='submit' variant="outlined">Salvar</Button>


        <Button href='/admin/restaurantes' variant="outlined">Voltar

        </Button>
    </form>
    )
}
