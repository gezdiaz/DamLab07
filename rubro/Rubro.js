import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Picker, Switch } from 'react-native';
import { restElement } from '@babel/types';
import estilosPrincipal from '../commons/main-styles.js';

const rubroDefault = {
    id: null,
    descripcion: 'descripcion default',
    orden: 1,
    destacar: false
}

const Rubro = ({ navigation }) => {

    const [flag, setFlag] = useState(false);
    const [rubro, setRubro] = useState(rubroDefault);
    const [guardar, setGuardar] = useState(false);

    useEffect(
        () => {
            const doPost = () => {
                fetch('http://192.168.1.3:5000/rubros',
                    {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify(rubro),
                    }
                ).then(response => {
                    return response.json();
                }).then(data => setGuardar(false))
                    .catch(response => {
                        console.log("error en api rest, en Rubro.");
                        console.log(response);
                    });
            };
            if (guardar) {
                doPost();
            };
        }
        , [guardar]
    )

    const actualizarEstado = (nombre, valor) => {
        const rubroNuevo = { ...rubro, [nombre]: valor };
        setRubro(rubroNuevo);
    }

    const doGuardar = () => {
        setGuardar(true)
    };

    if (navigation.state.params.rubro != null) {
        setRubro(navigation.getParam('rubro', null));
    }

    return (
        <View style={estilosPrincipal.contenedor}>
            <Text style={estilosPrincipal.titulo}>Rubro</Text>
            <Text style={estilosPrincipal.etiqueta}>Nombre</Text>
            <TextInput value={rubro.descripcion} style={estilosPrincipal.inputText}
                onChangeText={val => actualizarEstado('descripcion', val)} />
            <Text style={estilosPrincipal.etiqueta}>Orden en el catalogo</Text>
            <Picker selectedValue={rubro.orden} style={{ width: '50%' }}
                onValueChange={val => actualizarEstado('orden', val)}>
                <Picker.Item style={{ color: '#fff' }} label="#1" value="1" />
                <Picker.Item style={{ color: '#fff' }} label="#2" value="2" />
            </Picker>
            <Text style={estilosPrincipal.etiqueta}>Destacar</Text>
            <Switch
                value={rubro.destacar}
                onValueChange={val => actualizarEstado('destacar', val)}
            />
            <View style={estilosPrincipal.btnGuardar}>
                <Button style={estilosPrincipal.btnGuardar} title="Guardar" onPress={doGuardar} />
            </View>
            <View style={estilosPrincipal.btnGuardar}>
                <Button title="volver" onPress={() => navigation.navigate('Lista')} />
            </View>
        </View >

    )
}

export default Rubro;