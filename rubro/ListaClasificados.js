import React, { useState, useEffect, Style } from 'react'
import { StyleSheet, View, Text, Button, SectionList, } from 'react-native';
import {primaryColor,primaryDarkColor,primaryLightColor,primaryTextColor,primaryDarkTextColor,estilosPrincipal,styles} from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListaClasificados = (props) => {

    const [actualizar, setActualizar] = useState(true);
    const [data, setData] = useState([]);

    console.log("antes de todo:");
    console.log("actualizar: " + actualizar);
    console.log("data: " + JSON.stringify(data));

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

    const showClasificado = (clasificado)=>{
        
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

    
    function Item({ title }) {
        return (
            <View>
                <Text style={styles.item}>{title}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 , backgroundColor: primaryColor}}>
            <Text style={estilosPrincipal.titulo}>Lista de clasificados</Text>
            <View style={{ flex: 0.87 }}>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <TouchableOpacity onPress={()=>{showClasificado(item)}}><Text style={styles.header}>{title}</Text></TouchableOpacity>
                    )}
                />
            </View>
            <View style={{ flex: 0.13 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}><Button color={primaryDarkColor} title="Ver rubros" onPress={() => props.verRubros()}></Button></View>
                    <View style={{ flex: 0.5 }}><Button color={primaryDarkColor} title="Nuevo clasificado" onPress={() => props.nuevoClasificado()}></Button></View>
                </View>
                <Button color={primaryDarkColor} title="actualizar" style={{ position: 'absolute' }} onPress={() => setActualizar(true)}></Button>
            </View>
        </View>
    )

}

export default ListaClasificados;