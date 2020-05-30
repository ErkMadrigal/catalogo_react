import React, { Component } from 'react'

export default class Buscador extends Component {

    busquedaRef = React.createRef();

    obtenerDatos = e =>{
        e.preventDefault();

        // tomamos el valor del input y lo mandamos al componente princiapl
        const termino = this.busquedaRef.current.value;
        
        this.props.datosBusqueda(termino);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.obtenerDatos}>
                    <div className="row">
                        <div className="form-group col-md-8">
                            <input ref={this.busquedaRef} type="text" className="form-control
                                form-control-lg" placeholder="buscar. Ejemplo: Audifonos"/>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar"/>
                        </div>
                    </div>
                </form> 
            </div>
        )
    }
}
