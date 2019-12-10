import React, { useState, useEffect, Style } from 'react'
import { View, Text, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import estilosPrincipal from '../commons/main-styles';
import { Divider } from 'react-native';

const ListaRubro = ({ navigation }) => {

    const [listaRubros, setListaRubros] = useState([]);
    const [actualizar, setActualizar] = useState(true);

    useEffect(
        () => {
            const doGet = () => {
                fetch('http://192.168.1.3:5000/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        setListaRubros(lista);
                        setActualizar(false);
                    })
            }
            if (actualizar) {
                doGet();
            }
        }
    )

    const listaOrdenada = () => {
        listaRubros.sort((a, b) => {
            return a.orden > b.orden;
        });
        return listaRubros;
    }

    const crearItem = (item) => {
        return (<View style={{ margin: 5, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, }}>{item.descripcion}</Text>
            <Text style={{ fontSize: 15, }}>Orden: {item.orden}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginHorizontal: 2.5 }}><Button title="Editar" onPress={() => navigation.navigate('Rubro', { rubro: item })} /></View>
                <View style={{ marginHorizontal: 2.5 }}><Button title="Eliminar" /></View>
            </View>
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
            <View style={{ flex: 0.1, marginHorizontal: 16, }}>
                <Button title="actualizar" style={{ position: 'absolute' }} onPress={() => setActualizar(true)}></Button>
            </View>
        </View>
    )
}

export default ListaRubro;