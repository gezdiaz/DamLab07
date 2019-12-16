import React, { useEffect, useState } from 'react';
import { Button, Picker, Switch, Text, TextInput, View } from 'react-native';
import estilosPrincipal from '../commons/main-styles.js';
import { declareOpaqueType } from '@babel/types';
import { urlJSONServer } from '../AppLab07';

// const rubroDefault = {
//     id: null,
//     descripcion: 'descripcion default',
//     orden: 1,
//     destacar: false
// }

const Rubro = (props) => {

    const [flag, setFlag] = useState(false);
    const [rubro, setRubro] = useState(props.rubro);
    const [guardar, setGuardar] = useState(false);

    console.log('modo editar: ' + props.modoEditarRubro);

    useEffect(
        () => {
            const doPost = () => {
                fetch(urlJSONServer + '/rubros',
                    {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify(rubro),
                    }
                ).then(response => {
                    return response.json();
                }).then(data => {
                    setGuardar(false);
                    props.volver();
                })
                    .catch(response => {
                        console.log("error en api rest, en Rubro. Método POST");
                        console.log(response);
                    });
            };
            const doPut = () => {
                fetch(urlJSONServer + '/rubros/' + rubro.id,
                    {
                        method: 'PUT',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify(rubro),
                    }
                ).then(response => {
                    return response.json();
                }).then(data => {
                    setGuardar(false);
                    props.volverLista();
                })
                    .catch(response => {
                        console.log("error en api rest, en Rubro. Método PUT");
                        console.log(response);
                    });
            };
            if (guardar) {
                if (props.modoEditarRubro) {
                    doPut();
                } else {
                    doPost();
                }
                props.volver();
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
                <Button title="volver" onPress={() => props.volver()} />
            </View>
        </View >

    )
}

export default Rubro;