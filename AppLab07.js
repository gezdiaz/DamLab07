import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Rubro from './rubro/Rubro';
import ListaRubro from './rubro/ListaRubro';
import AltaClasificado from './rubro/AltaClasificado';
import ListaClasificados from './rubro/ListaClasificados';

export const urlJSONServer = 'http://192.168.1.3:5000';


const rubroDefault = {
    id: null,
    descripcion: 'descripcion default',
    orden: 1,
    destacar: false
}

const clasificadoDefault = {
    rubro: rubroDefault,
    titulo: 'titulo default',
    descripcion: 'descripcion default',
    precio: 0,
    correoElectronico: 'xxx@xxx',
    fecha: new Date(),
    foto:'./rubro/persona.png',
    oferta: 0,
}

export const AppLab07 = () => {

    const [modoRubro, setmodoRubro] = useState(false);
    const [modoListaRubro, setmodoListaRubro] = useState(false);
    const [modoClasificado, setModoClasificado] = useState(false);
    const [modoEditarRubro, setmodoEditarRubro] = useState(false);
    const [modoEditarClasificado, setmodoEditarClasificado] = useState(false);
    const [rubro, setRubro] = useState(rubroDefault);
    const [clasificado, setClasificado] = useState(clasificadoDefault);

    const nuevoRubro = () => {
        setmodoRubro(true);
        setmodoEditarRubro(false);
    }
    const editarRubro = (rubroEditar) => {
        setRubro(rubroEditar);
        setmodoEditarRubro(true);
        setmodoRubro(true);
    }
    const salirmodoRubro = () => setmodoRubro(false);

    const verRubros = () => setmodoListaRubro(true);
    const salirModoListaRubro = () => setmodoListaRubro(false);

    const nuevoClasificado = () => {
        setModoClasificado(true);
        setmodoEditarClasificado(false);
    }
    const editarClasificado = (clasificadoEditar) => {
        setClasificado(clasificadoEditar);
        setmodoEditarClasificado(true);
        setModoClasificado(true);
    }
    const salirModoClasificado = () => setModoClasificado(false);




    if (modoRubro) {
        return (<Rubro volver={salirmodoRubro} rubro={rubro} modoEditarRubro={modoEditarRubro} />);
    } else {
        if (modoListaRubro) {
            return (<ListaRubro nuevoRubro={nuevoRubro} editarRubro={editarRubro} volver={salirModoListaRubro} />);
        } else {
            if (modoClasificado) {
                return (<AltaClasificado clasificado={clasificado} modoEditar={modoEditarClasificado} volver={salirModoClasificado} />)
            } else {
                return (<ListaClasificados nuevoClasificado={nuevoClasificado} verRubros={verRubros} editarClasificado={editarClasificado} />)
            }
        }

    }

}