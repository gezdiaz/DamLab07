import React, { useState, useEffect, Style } from 'react'
import { StyleSheet, View, Text, Button, SectionList } from 'react-native';
import { primaryColor, primaryDarkColor, primaryLightColor, primaryTextColor, primaryDarkTextColor, estilosPrincipal, styles } from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

var listaClasificadosGlobal = [];

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
                    listaClasificadosGlobal = lista;
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

    const showClasificado = (clasificadoVer) => {
        navigate('ShowClasificado', { clasificado: clasificadoVer });
    }
    const getElementosAMostar = () =>{
        var elementoAMostar = {};
                        
            var dataAMostar = [elementoAMostar];
            
            data.forEach(element => {
                elementoAMostar.rubro = element.rubro.descripcion;
                //elementoAMostar.listaClasificado = element.data.toString();
                dataAMostar.push(elementoAMostar);
            });
            return (dataAMostar);
    }
    const crearData = (listaClasificados, listaRubros) => {

        var nuevoData = [];
        listaRubros.forEach(rubro => {
            var elemento = {};
            // elemento.title = rubro.descripcion;
            elemento.title = rubro.descripcion;
            elemento.data = [];
            listaClasificados.forEach(clasificado => {
                if (clasificado.rubro.descripcion === rubro.descripcion) {
                    // elemento.data.push('Id: '.concat(clasificado.id).concat('\n').concat(clasificado.titulo));
                    elemento.data.push(clasificado);

                }
            })
            nuevoData.push(elemento);
        });
        setData(nuevoData);
        console.log("data: " + data);
        console.log("nuevoData: " + nuevoData);
    }


    function Item({ title }) {
        console.log(title);
       
    }

    function crearItem(clasificado){
         return (
            <View>
                <TouchableOpacity onPress={() => { showClasificado(clasificado) }}><Text style={styles.item}>{clasificado.titulo}</Text></TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
            <Text style={estilosPrincipal.titulo}>Lista de clasificados</Text>
            <View style={{ flex: 0.87 }}>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => crearItem(item)}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </View>
            <View style={{ flex: 0.13 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}><Button color={primaryDarkColor} title="Ver rubros" onPress={() => navigate('ListaRubro', { onGoBack: doActualizar })}></Button></View>
                    <View style={{ flex: 0.5 }}><Button color={primaryDarkColor} title="Nuevo clasificado" onPress={() => navigate('AltaClasificado', { clasificado: clasificadoDefault, modoEditar: false, onGoBack: doActualizar })}></Button></View>
                </View>
                <Button color={primaryDarkColor} title="actualizar" style={{ position: 'absolute' }} onPress={() => doActualizar()}></Button>
            </View>
        </View>
    )

}

export default ListaClasificados;