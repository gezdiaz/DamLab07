import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Rubro from './rubro/Rubro';
import ListaRubro from './rubro/ListaRubro';

const rubroDefault = {
    id: null,
    descripcion: 'descripcion default',
    orden: 1,
    destacar: false
}

const AppLab07 = () => {

    const [modoRubro, setmodoRubro] = useState(false);
    const [rubro, setRubro] = useState(rubroDefault);
    const [modoEditar, setModoEditar] = useState(false);

    const nuevoRubro = () => {
        setmodoRubro(true);
        setModoEditar(false);
    }
    const editarRubro = (rubroEditar) => {
        setRubro(rubroEditar);
        setModoEditar(true);
        setmodoRubro(true);
    }
    const salirmodoRubro = () => setmodoRubro(false);

    if (modoRubro) {
        return (<Rubro volverLista={salirmodoRubro} rubro={rubro} modoEditar={modoEditar} />);
    } else {
        return (<ListaRubro nuevoRubro={nuevoRubro} editarRubro={editarRubro} />);
    }

}

export default AppLab07;