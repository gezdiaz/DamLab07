import React, { useState, useEffect, Style } from 'react'
import {ScrollView, Image,  StyleSheet, View, Text, Button, SectionList, } from 'react-native';
import {styles,primaryColor,primaryDarkColor,primaryLightColor,primaryTextColor,primaryDarkTextColor,estilosPrincipal} from '../commons/main-styles';
import { urlJSONServer } from '../AppLab07';
import { TouchableOpacity } from 'react-native-gesture-handler';

 export const ShowClasificado = (props)=>{
    return (
        <View style={{backgroundColor: primaryColor}}>
            <Text style={estilosPrincipal.titulo}> CLASIFICADO</Text>
            <ScrollView >
                <Text style={styles.headerCentrado} >Rubro</Text>
                <Text style={styles.item}> Aca va la descripcion del rubro</Text>
                <Text style={styles.headerCentrado}>Titulo</Text>
                <Text style={styles.item}> Aca va el titulo del clasificado</Text>
                <Text style={styles.headerCentrado}>Descripción</Text>
                <Text style={styles.item} multiline={true} numberOfLines={5} > aca va la descripcion del clasificado </Text>
                <Text style={styles.headerCentrado}>Precio</Text>
                <Text style={styles.item} > Aca va el precio del clasificado </Text>
                <Text style={styles.headerCentrado}>Correo electrónico</Text>

                <Text style={styles.item}> Aca va el correo electronico</Text>
                
                <Text style={styles.headerCentrado}>Fecha fin de oferta</Text>
                <Text style={styles.item}> dd/mm/yyyy</Text>

                <Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10, backgroundColor:primaryColor}} defaultSource={require('./persona.png')} source={require('./persona.png')}></Image>
                <View style={{ alignItems:'center', flexDirection: 'row', alignContent: 'center',marginBottom:70}}>

                <View style={{ flex: 0.65,marginHorizontal:5 }}><Button color={primaryDarkColor} title="Editar" onPress={() => props.verRubros()}></Button></View>
                <View style={{ flex: 0.35,marginHorizontal:5 }}><Button color={primaryDarkColor} title="Volver" onPress={() => props.verRubros()}></Button></View>
                </View>
            </ScrollView>
        </View>
    );
 }