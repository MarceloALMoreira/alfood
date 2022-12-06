import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../interfaces/IRestaurante';
import http from '../../http';
import { Link as RouterLink} from 'react-router-dom';
export const FormularioRestaurante = () => {

    const parametros = useParams()
    useEffect(() => {

        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])
    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const aoSubemeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
        } else {

            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastro com sucesso!')
                })
        }
    }

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant='h6'>
                            Adminstração
                        </Typography>
                        <Box>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* Conteudo da pagina */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                            <Box component="form"
                                sx={{width: '100%'}}
                                onSubmit={aoSubemeterForm}>
                                <TextField value={nomeRestaurante}
                                    // onChange={evento => setNomeRestaurante(evento.target.value)}
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined">Salvar</Button>
                                <Button sx={{ marginTop: 1, marginLeft: 1 }} href='/admin/restaurantes' variant="outlined">Voltar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>

    )
}
