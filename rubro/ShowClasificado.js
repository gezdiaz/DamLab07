import React, { useState, useEffect, Style } from 'react'
import { ScrollView, Image, StyleSheet, View, Text, Button, SectionList, } from 'react-native';
import { styles, primaryColor, primaryDarkColor, primaryLightColor, primaryTextColor, primaryDarkTextColor, estilosPrincipal } from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShowClasificado = (p) => {

    const props = p.navigation.state.params;
    var fechaAMostrar = new Date(props.clasificado.fecha);
    var base64IconPrefijo = 'data:image/jpg;base64, '

    return (
        <View style={{ backgroundColor: primaryColor }}>
            <Text style={estilosPrincipal.titulo}> CLASIFICADO</Text>
            <ScrollView >
                <Text style={styles.headerCentrado} >Rubro</Text>
                <Text style={styles.item}> {props.clasificado.rubro.descripcion}</Text>
                <Text style={styles.headerCentrado}>Titulo</Text>
                <Text style={styles.item}> {props.clasificado.titulo}</Text>
                <Text style={styles.headerCentrado}>Descripción</Text>
                <Text style={styles.item} multiline={true} numberOfLines={5} > {props.clasificado.descripcion} </Text>
                <Text style={styles.headerCentrado}>Precio</Text>
                <Text style={styles.item} > {props.clasificado.precio} </Text>
                <Text style={styles.headerCentrado}>Correo electrónico</Text>

                <Text style={styles.item}> {props.clasificado.correoElectronico} </Text>

                <Text style={styles.headerCentrado}>Fecha fin de oferta</Text>
                 <Text style={styles.item}> {fechaAMostrar.getDate()}/{fechaAMostrar.getMonth()+1}/{fechaAMostrar.getFullYear()}</Text>

                <Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10, backgroundColor: primaryColor }} defaultSource={require('./persona.png')} source={{uri:base64IconPrefijo.concat(props.clasificado.foto.base64)}}></Image>
                <View style={{ alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginBottom: 70 }}>

                    <View style={{ flex: 0.65, marginHorizontal: 5 }}><Button color={primaryDarkColor} title="Editar" onPress={() => props.verRubros()}></Button></View>
                    <View style={{ flex: 0.35, marginHorizontal: 5 }}><Button color={primaryDarkColor} title="Volver" onPress={() => props.verRubros()}></Button></View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ShowClasificado;