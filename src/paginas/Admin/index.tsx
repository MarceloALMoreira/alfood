import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Restaurante from '../../componentes/ListaRestaurantes/Restaurante'
import IRestaurante from '../../interfaces/IRestaurante'
const AdmRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect(() => {
        axios.get<IRestaurante[]>('http://127.0.0.1:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    })


    return (

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )

}
export default AdmRestaurantes