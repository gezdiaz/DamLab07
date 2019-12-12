import React, { useState, useEffect, Style } from 'react'
import { StyleSheet, View, Text, Button, SectionList, } from 'react-native';

const ListaClasificados = () => {

    const [actualizar, setActualizar] = useState(true);
    const [data, setData] = useState([]);

    console.log("antes de todo:");
    console.log("actualizar: " + actualizar);
    console.log("data: " + JSON.stringify(data));

    useEffect(() => {
        const getClasificados = () => {
            fetch('http://192.168.1.2:5000/clasificados')
                .then(res => {
                    return res.json()
                })
                .then(lista => {
                    console.log("lista de clacificados recibida: " + lista);
                    actualizarDatos(lista);
                    setActualizar(false);
                })
        }
        console.log("useEffect actualizar: " + actualizar);
        if (actualizar) {
            console.log("entra a actualizar")
            getClasificados();
        }
    });

    const actualizarDatos = (listaClasificados) => {
        console.log("funcion actualizarDatos");
        fetch('http://192.168.1.2:5000/rubros')
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
        <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    )

}

export default ListaClasificados;