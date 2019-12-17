import React, { useState, useEffect, Style } from 'react'
import { StyleSheet, View, Text, Button, SectionList, } from 'react-native';
import estilosPrincipal from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';

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
    foto: require('./persona.png'),
    oferta: 0,
}

const ListaClasificados = (p) => {

    const navigate = p.navigation.navigate;

    const [actualizar, setActualizar] = useState(true);
    const [data, setData] = useState([]);

    console.log("Lista Clasificados");

    useEffect(() => {
        const getClasificados = () => {
            fetch(urlJSONServer + '/clasificados')
                .then(res => {
                    return res.json()
                })
                .then(lista => {
                    console.log("lista de clacificados recibida: " + lista);
                    actualizarDatos(lista);
                    setActualizar(false);
                })
                .catch(err => console.log('Se produjo un error al obtener los clasificados:' + err))
        }
        console.log("useEffect actualizar: " + actualizar);
        if (actualizar) {
            console.log("entra a actualizar")
            getClasificados();
        }
    });

    const doActualizar = () => {
        setActualizar(true);
    }

    const actualizarDatos = (listaClasificados) => {
        console.log("funcion actualizarDatos");
        fetch(urlJSONServer + '/rubros')
            .then(res => {
                return res.json()
            })
            .then(listaRubros => {
                console.log("lista de rubros recibida: " + listaRubros);
                crearData(listaClasificados, listaRubros);
            })
            .catch(err => console.log("error en getRubros: " + err));
    }

    const crearData = (listaClasificados, listaRubros) => {
        var nuevoData = [];
        listaRubros.forEach(rubro => {
            var elemento = {};
            elemento.title = rubro.descripcion;
            elemento.data = [];
            listaClasificados.forEach(clasificado => {
                if (clasificado.rubro.descripcion === rubro.descripcion) {
                    elemento.data.push(clasificado.titulo);
                }
            })
            nuevoData.push(elemento);
        });
        setData(nuevoData);
        console.log("data: " + data);
        console.log("nuevoData: " + nuevoData);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 16,
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
        },
        header: {
            fontSize: 32,
        },
        title: {
            fontSize: 24,
        },
    });


    function Item({ title }) {
        return (
            <View>
                <Text>{title}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={estilosPrincipal.titulo}> Lista de clasificados</Text>
            <View style={{ flex: 0.87 }}>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </View>
            <View style={{ flex: 0.13 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}><Button title="Ver rubros" onPress={() => navigate('ListaRubro', { onGoBack: doActualizar })}></Button></View>
                    <View style={{ flex: 0.5 }}><Button title="Nuevo clasificado" onPress={() => navigate('AltaClasificado', { clasificado: clasificadoDefault, modoEditar: false, onGoBack: doActualizar })}></Button></View>
                </View>
                <Button title="actualizar" style={{ position: 'absolute' }} onPress={() => doActualizar()}></Button>
            </View>
        </View>
    )

}

export default ListaClasificados;