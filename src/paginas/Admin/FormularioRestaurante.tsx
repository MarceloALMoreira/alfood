import { useState } from 'react'
import { TextField, Button } from '@mui/material';
import axios from 'axios';
export const FormularioRestaurante = () => {


    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubemeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://127.0.0.1:8000/api/v2/restaurantes/',
            { nome: nomeRestaurante })
            .then(() => {
                alert('Restaurante cadastro com sucesso!')
            })
    }


    return (<form onSubmit={aoSubemeterForm}>
        <TextField value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="standard" />


        <Button type='submit' variant="outlined">Salvar</Button>
    </form>
    )
}
