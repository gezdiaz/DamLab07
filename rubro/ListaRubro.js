import React, { useState, useEffect, Style } from 'react'
import { View, Text, Button, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import estilosPrincipal from '../commons/main-styles';


const ListaRubro = (props) => {

    const [listaRubros, setListaRubros] = useState([]);
    const [actualizar, setActualizar] = useState(true);
    const [eliminarRubro, setEliminarRubro] = useState(false);
    const [eliminarRubroi, setEliminarRubroi] = useState(null);
    const [modalIsShown, setModalIsShown] = useState(false)

    useEffect(
        () => {
            const doGet = () => {
                fetch('http://192.168.1.2:5000/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        setActualizar(false);
                        setListaRubros(lista);
                    })
            }
            const doDelete = () => {
                fetch('http://192.168.1.2:5000/rubros/' + eliminarRubroi.id, {
                    method: 'DELETE',
                    headers: {
                        'content-Type': 'application/json',
                    },
                }).then(response => {
                    return response.json();
                }).then(data => {
                    setEliminarRubro(false)
                    setActualizar(true)
                })
                    .catch(response => {
                        console.log("error en api rest, en eliminar Rubro.");
                        console.log(response);
                    });
            };
            if (actualizar) {
                doGet();
            }
            if (eliminarRubro) {
                doDelete();
            }
        }
    )

    const doElimiarRubro = (item) => {
        setModalIsShown(false);
        setEliminarRubro(true);
    }

    const listaOrdenada = () => {
        listaRubros.sort((a, b) => {
            if (a.orden === b.orden) {
                return a.descripcion > b.descripcion;
            } else {
                return a.orden > b.orden;
            }
        });
        return listaRubros;
    }

    const crearItem = (item) => {
        return (
            <View style={{ margin: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, }}>{item.descripcion}</Text>
                <Text style={{ fontSize: 15, }}>Orden: {item.orden}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: 2.5 }}><Button title="Editar" onPress={() => { props.editarRubro(item) }} /></View>
                    <View style={{ marginHorizontal: 2.5 }}><Button title="Eliminar" onPress={() => setModalIsShown(true)} /></View>
                </View>

                <Modal transparent={'true'} visible={modalIsShown} >
                    <View style={{ backgroundColor: 'grey', marginBottom: 10, marginTop: 200, marginHorizontal: 75, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={estilosPrincipal.etiqueta, { justifyContent: 'center' }}>Esta seguro que desea eliminar el item?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={estilosPrincipal.btnGuardar, { margin: 10 }}>
                                <Button title="Si" onPress={() => doElimiarRubro(item)} > </Button>
                            </View>
                            <View style={estilosPrincipal.btnGuardar, { margin: 10 }}>
                                <Button title="No" onPress={() => setModalIsShown(false)}></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.9, marginHorizontal: 16, }}>
                <FlatList
                    data={listaOrdenada()}
                    renderItem={({ item }) => (crearItem(item))}
                    keyExtractor={item => item.id} />
            </View>
            <View style={{ flex: 0.1, marginHorizontal: 16, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ felx: 0.05, marginHorizontal: 5, }}><Button title="Actualizar" style={{ position: 'absolute' }} onPress={() => setActualizar(true)}></Button></View>
                    <View style={{ felx: 0.05, marginHorizontal: 5, }}><Button title="Volver" style={{ position: 'absolute' }} onPress={() => props.volver()}></Button></View>
                </View>
            </View>
        </View>
    )
}

export default ListaRubro;