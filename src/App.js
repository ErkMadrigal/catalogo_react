import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultados';

export default class App extends Component {

  state={
    termino: '',
    imagenes: [], 
    pagina: ''

  }

  scroll=()=>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smoorh', 'start');
  }

  paginaAnterior = () =>{
      //leer el state de la pagina actual 
      let pagina = this.state.pagina;
      // leer si la pagina es 1 no ir hacia atras
      if(pagina===1)return null;

      //restar uno a la pagina actual
      pagina -= 1;
      //agregar el cambio de state
      this.setState({
        pagina
      },()=>{
        this.consultaApi();
        this.scroll();
      });
  }
  paginaSiguiente = () =>{
      //leer el state de la pagina actual 
      let pagina = this.state.pagina;
      //sumar uno a la pagina actual
      pagina += 1;
      //agregar el cambio de state
      this.setState({
        pagina
      }, ()=>{
        this.consultaApi();
        this.scroll();

      });
  }

  consultaApi= () =>{ 
  const termino=this.state.termino;
  const pagina = this.state.pagina;
  const url = `https://pixabay.com/api/?key=16517131-581dd66573545ed4f2f4d26e9&q=${termino}&per_page=30&page=${pagina}`;
    
  // console.log(url);
  fetch(url)
  .then(respuesta => respuesta.json())
  .then(resultado => this.setState({imagenes: resultado.hits}))

  }
  
  datosBusqueda = termino =>{
    this.setState({
      termino: termino,
      pagina: 1
    }, ()=>{
      this.consultaApi();
    })
  }

  render() {
    return (
      <div className="app container">
         <div className="jumbotron">
           <p className="lead text-center">Busca tu producto</p>
            <Buscador
              datosBusqueda={this.datosBusqueda}
            />
         </div>
         <div className="row justify-content-center">
            <Resultado
                imagenes={this.state.imagenes}
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente}
            />
          </div>
      </div>
    )
  }
}
