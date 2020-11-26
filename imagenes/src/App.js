import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    //leer state de pagina actual
    let pagina = this.state.pagina;

    //leer si la pagina es 1
    if(pagina === 1) return null;

    //restar 1 a la pagina actual
    pagina--;

    //agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    //leer state de pagina actual
    let pagina = this.state.pagina;

    //sumar 1 a la pagina actual
    pagina++;

    //agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=19149455-b0d0a20f840bd8d78f22d84e9&q=${termino}&per_page=30&page=${pagina}`;

    // console.log(url)

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino, 
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  render(){
    return(
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>

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

export default App;
