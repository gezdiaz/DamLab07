import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Button, Picker, Switch, Text, TextInput, View } from 'react-native';
import { estilosPrincipal,primaryColor,styles, primaryDarkColor} from '../commons/main-styles.js';
import { declareOpaqueType } from '@babel/types';
import { urlJSONServer } from '../AppLab07';
import ListaClasificados from './ListaClasificados.js';

// const rubroDefault = {
//     id: null,
//     descripcion: 'descripcion default',
//     orden: 1,
//     destacar: false
// }

const Rubro = (p) => {

    const props = p.navigation.state.params;
    const navigation = p.navigation;

    var listaClasificados = [];
    var contadorClasificadosNoActualizados = -1;
    const [rubro, setRubro] = useState(props.rubro);
    const [guardar, setGuardar] = useState(false);
    //const [listaClasificados, setListaClasificados] = useState([]);
    const [showActivityIndicator,setShowActivityIndicator] = useState(false);
    // const [contadorClasificadosNoActualizados, setContador] = useState(-1);
    
    
    console.log('En Rubro');
    console.log('Modo editar: ' + props.modoEditar);

    const volver = () => {
        props.onGoBack();
        navigation.goBack(null);
    }

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
                    volver();
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
                    setShowActivityIndicator(false);
                    volver();
                })
                    .catch(response => {
                        console.log("error en api rest, en Rubro. Método PUT");
                        console.log(response);
                    });
            };


            const doActualizarClasificado = (clasificado) => {
                clasificado.rubro = rubro;
                fetch(urlJSONServer + '/clasificados/' + clasificado.id,
                    {
                        method: 'PUT',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify(clasificado),
                    }
                ).then(response => {
                    return response.json();
                }).then(data => {
                    setContador(contadorClasificadosNoActualizados-1);                    
                })
                    .catch(response => {
                        console.log("error en api rest, en Rubro. Método PUT");
                        console.log(response);
                    });
            };

            const doGetClasificados = () => {
                setGuardar(false);
                setShowActivityIndicator(true);
                fetch(urlJSONServer + '/clasificados?rubro.id='+rubro.id)
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        listaClasificados = lista;
                        contadorClasificadosNoActualizados = listaClasificados.length;
                        lista.forEach(element => {
                            doActualizarClasificado(element);
                        });
                        doPut()
                    })
            };
     

            if (guardar) {
                if (props.modoEditar) {      
                    doGetClasificados();
                } else {
                    doPost();
                }
                // volver();
            };
        }, [guardar]

       
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
            <View style={{flexDirection:'row', backgroundColor:primaryDarkColor}}>
                <View style={{flex:0.8}}>
                <Text style={estilosPrincipal.titulo}>Rubro</Text></View>
                <ActivityIndicator  style={{flex:0.2}} color={'white'} size={'large'} animating={showActivityIndicator}></ActivityIndicator>
            </View>
            <Text style={styles.header}>Nombre</Text>
            <TextInput value={rubro.descripcion} style={estilosPrincipal.inputText}
                onChangeText={val => actualizarEstado('descripcion', val)} />
            <Text style={styles.headerOrdenRubro}>Orden en el catalogo</Text>
            <Picker selectedValue={rubro.orden} style={{ width: '50%' }}
                onValueChange={val => actualizarEstado('orden', val)}>
                <Picker.Item style={{ color: '#fff' }} label="#1" value="1" />
                <Picker.Item style={{ color: '#fff' }} label="#2" value="2" />
            </Picker>
            <Text style={styles.header}>Destacar</Text>
            <Switch
                value={rubro.destacar}
                onValueChange={val => actualizarEstado('destacar', val)}
            />
            <View style={estilosPrincipal.btnGuardar}>
                <Button style={estilosPrincipal.btnGuardar} title="Guardar" onPress={doGuardar} />
            </View>
            <View style={estilosPrincipal.btnGuardar}>
                <Button title="volver" onPress={() => volver()} />
            </View>
        </View >

    )
}

export default Rubro;