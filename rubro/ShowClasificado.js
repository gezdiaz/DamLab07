import React, { useState, useEffect, Style } from 'react'
import { ScrollView, Image, StyleSheet, View, Text, Button, SectionList, } from 'react-native';
import { styles, primaryColor, primaryDarkColor, primaryLightColor, primaryTextColor, primaryDarkTextColor, estilosPrincipal } from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShowClasificado = (p) => {

    const navigate = p.navigation.navigate;
    const props = p.navigation.state.params;
    
    var base64IconPrefijo = 'data:image/jpg;base64, '
    const [clasificadoAMostrar, setClasificadoAMostrar] = useState (props.clasificado)
    const [fechaAMostrar, setFechaAMostrar] = useState(new Date(clasificadoAMostrar.fecha))
    const [actualizar, setActualizar] = useState(false);
    
    useEffect( 
        () => {
            const doGet = () => {
                fetch(urlJSONServer + '/clasificados/' + clasificadoAMostrar.id.toString())
                    .then(res => {
                        return res.json()
                    })
                    .then(clasificado => {
                        setActualizar(false);
                        setClasificadoAMostrar(clasificado);
                        setFechaAMostrar(new Date(clasificadoAMostrar.fecha.getFullYear().clasificadoAMostrar.fecha.getMonth(),clasificadoAMostrar.fecha.getDate()))
                    })
            };

            if(actualizar){
                doGet();
            }
        }
    )

    const volver = () => {
        props.onGoBack();
        p.navigation.goBack(null);
    }
    
    const doActualizar = ()=>{
        setActualizar(true);
    }
    return (
        <View style={{ backgroundColor: primaryColor }}>
            <Text style={estilosPrincipal.titulo}> CLASIFICADO</Text>
            <ScrollView >
                <Text style={styles.headerCentrado} >Rubro</Text>
                <Text style={styles.item}> {clasificadoAMostrar.descripcion}</Text>
                <Text style={styles.headerCentrado}>Titulo</Text>
                <Text style={styles.item}> {clasificadoAMostrar.titulo}</Text>
                <Text style={styles.headerCentrado}>Descripción</Text>
                <Text style={styles.item} multiline={true} numberOfLines={5} > {clasificadoAMostrar.descripcion} </Text>
                <Text style={styles.headerCentrado}>Precio</Text>
                <Text style={styles.item} > {clasificadoAMostrar.precio} </Text>
                <Text style={styles.headerCentrado}>Correo electrónico</Text>

                <Text style={styles.item}> {clasificadoAMostrar.correoElectronico} </Text>

                <Text style={styles.headerCentrado}>Fecha fin de oferta</Text>
                <Text style={styles.item}> {fechaAMostrar.getDate()}/{fechaAMostrar.getMonth()+1}/{fechaAMostrar.getFullYear()}</Text>

                <Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10, backgroundColor: primaryColor }} defaultSource={require('./persona.png')} source={{uri:base64IconPrefijo.concat(clasificadoAMostrar.foto.base64)}}></Image>
                <View style={{ alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginBottom: 70 }}>

                    <View style={{ flex: 0.65, marginHorizontal: 5 }}><Button color={primaryDarkColor} title="Editar" onPress={() => navigate('AltaClasificado', { clasificado: clasificadoAMostrar, modoEditar: true, onGoBack: doActualizar})}></Button></View>
                    <View style={{ flex: 0.35, marginHorizontal: 5 }}><Button color={primaryDarkColor} title="Volver" onPress={() => volver()}></Button></View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ShowClasificado;