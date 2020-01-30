import React, { useState, useEffect, Style } from 'react'
import { View, Text, Button, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { estilosPrincipal, primaryColor,primaryDarkColor, styles } from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';

const rubroDefault = {
    id: null,
    descripcion: 'descripcion default',
    orden: 1,
    destacar: false
}

const ListaRubro = (props) => {

    
    const [listaRubros, setListaRubros] = useState([]);
    const [listaClasificados, setListaClasificados] = useState([])
    const [getListaClasificados, setGetListaClasificados] = useState(false);
    const [actualizar, setActualizar] = useState(true);
    const [eliminarRubro, setEliminarRubro] = useState(false);
    const [rubroAEliminar, setRubroAEliminar] = useState(null);
    const [modalIsShown, setModalIsShown] = useState(false);
    const [clasificadoAEliminar,setClasificadoAEliminar] = useState(null);
    const [eliminarClasificado,setEliminarClasificado] = useState(false);

    console.log('En lista rubro:');

    useEffect(
        () => {
            const doGet = () => {
                fetch(urlJSONServer + '/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        setActualizar(false);
                        setListaRubros(lista);
                    })
            }
            const doGetListaClasificados = () => {
                fetch(urlJSONServer + '/clasificados?rubro.id=' + rubroAEliminar.id.toString())
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                       setGetListaClasificados(false);
                       lista.forEach(element => {
                           doDeleteClasificado(element);
                       });

                       doDelete()
                        
                    })
            }
            const doDeleteClasificado = (clasificado) => {

                fetch(urlJSONServer + '/clasificados/' + clasificado.id, {
                    method: 'DELETE',
                    headers: {
                        'content-Type': 'application/json',
                    },
                }).then(response => {
                    return response.json();
                }).then(data => {
                    
                })
                    .catch(response => {
                        console.log("error en api rest, en eliminar Clasificado.");
                        console.log(response);
                    });
            };

            const doDelete = () => {
                
                fetch(urlJSONServer + '/rubros/' + rubroAEliminar.id, {
                    method: 'DELETE',
                    headers: {
                        'content-Type': 'application/json',
                    },
                }).then(response => {
                    return response.json();
                }).then(data => {
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

            if(getListaClasificados){
                doGetListaClasificados()
            } 
        }
    )

    // const doDeleteClasificados = () =>{
    //     console.log('entra a doDeleteClasificados')
    //     setEliminarRubro(true);
    //     listaClasificados.forEach(element => {
    //         setClasificadoAEliminar(element);
    //         setEliminarClasificado(true);
    //     });
    // }

    const doElimiarRubro = () => {
        setModalIsShown(false);
        setGetListaClasificados(true);       
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

    // const volver = () => {
    //     props.navigation.state.params.onGoBack();
    //     props.navigation.goBack(null)
    // }

    const doActualizar = () => {
        setActualizar(true)
    }

    const crearItem = (item) => {
        return (
            <View style={{ margin: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, }}>{item.descripcion}</Text>
                <Text style={{ fontSize: 15, }}>Orden: {item.orden}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: 2.5 }}><Button title="Editar" onPress={() => { props.navigation.navigate('Rubro', { rubro: item, modoEditar: true, onGoBack: doActualizar }) }} /></View>
                    <View style={{ marginHorizontal: 2.5 }}><Button title="Eliminar" onPress={() => {
                        setModalIsShown(true);
                        setRubroAEliminar(item);
                    }} /></View>
                </View>

                <Modal /* transparent={'true'} */ visible={modalIsShown}>
                    <View style={{ backgroundColor: primaryColor,  marginTop: 200,  alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={styles.headerBuscar}>¿Está seguro que desea eliminar el item?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{margin:5,width:'50%'}}>
                                <Button title="Si" onPress={() => doElimiarRubro()} > </Button>
                            </View>
                            <View style={{margin:5,width:'50%'}}>
                                <Button title="No" onPress={() => setModalIsShown(false)}></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>);
    }

    return (
        <View style={{ flex: 1 , backgroundColor:primaryColor}}>
            <Text style={estilosPrincipal.titulo}> Lista de rubros</Text>
            <View style={{ flex: 0.82, marginHorizontal: 16, }}>
                <FlatList
                    data={listaOrdenada()}
                    renderItem={({ item }) => (crearItem(item))}
                    keyExtractor={item => item.id} />
            </View>
            <View style={{ flex: 0.18,  alignItems: 'center', flexDirection: 'column' }}>
    
                <View style={{ width:'50%',marginVertical:5 }}><Button color={primaryDarkColor} title="Nuevo rubro"onPress={() => props.navigation.navigate('Rubro', { rubro: rubroDefault, modoEditar: false, onGoBack: doActualizar })}></Button></View>               
                <View style={{width:'50%', marginBottom: 5 }}><Button color={primaryDarkColor}  title="Actualizar" style={{ position: 'absolute' }} onPress={() => doActualizar()}></Button></View>

            </View>
        </View>
    )
}

export default ListaRubro;