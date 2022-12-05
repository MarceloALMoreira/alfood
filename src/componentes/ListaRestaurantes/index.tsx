import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { useEffect, useState } from 'react';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';


// fazendo a implatação das  api
const ListaRestaurantes = () => {

  const [restaurantes, setResraurantes] = useState<IRestaurante[]>([])

  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    //vamos obter os restaurantes passado o link url
    axios.get<IPaginacao<IRestaurante>>('http://127.0.0.1:8000/api/v1/restaurantes/')
      .then(resposta => {
        setResraurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setResraurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)

      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais} className={style.Buttao}>Ver mais</button>}
  </section>)
}

export default ListaRestaurantes