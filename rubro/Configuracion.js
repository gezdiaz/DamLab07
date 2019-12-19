import React, { useState, useEffect, Style } from 'react'
import {  View, Text} from 'react-native';
import { styles, primaryColor, estilosPrincipal } from '../commons/main-styles';


const Configuracion= () => {

    return(
        <View style={{backgroundColor: primaryColor, flex:1}}>
            <Text style={estilosPrincipal.titulo}>Configuracion</Text>
            <Text style={styles.estamosTrabajando}>Estamos trabajando en esto ...</Text>
        </View>
    );
}

export default Configuracion;