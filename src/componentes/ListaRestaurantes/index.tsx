import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { Axios, AxiosRequestConfig } from 'axios';


//Paramentro que vamos enviar para API
interface IParamentroBusca {
  ordering?: string
  search?: string
}

// fazendo a implatação das  api
const ListaRestaurantes = () => {

  const [restaurantes, setResraurantes] = useState<IRestaurante[]>([])

  const [proximaPagina, setProximaPagina] = useState('')

  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')

  //vamos carregar os dados pelo axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setResraurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }
  // Cada busca Montamos um objeto de opcões

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParamentroBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }


  useEffect(() => {
    //vamos obter os restaurantes passado o link url
    carregarDados('http://127.0.0.1:8000/api/v1/restaurantes/')
  }, [])




  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <input
        type="text"
        value={busca}
        onChange={evento => setBusca(evento.target.value)} />
      <button type='submit'>Buscar</button>
    </form>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<Button variant='outlined'
      onClick={() => carregarDados(paginaAnterior)}
      disabled={!paginaAnterior}>Página Anterior
    </Button>}

    {<Button
      variant='outlined'
      onClick={() => carregarDados(proximaPagina)}
      disabled={!proximaPagina}>Próxima Página
    </Button>}
  </section>)
}

export default ListaRestaurantes