import React, { useState, useEffect, Style } from 'react'
import { Image, TouchableWithoutFeedback, ScrollView, Picker, DatePickerAndroid, View, Text, Button, Modal } from 'react-native';
import estilosPrincipal from '../commons/main-styles';
import { TextInput } from 'react-native-gesture-handler';


const AltaClasificado = (props) => {

    const [clasificado, setClasificado] = useState(props.clasificado);
    const [listaRubros, setListaRubros] = useState([]);
    const [actualizarLista, setActualizarLista] = useState(true);
    const [guardarClasificado, setGuardar] = useState(false);



    const fechaMinima = new Date();
    const options = {
        date: new Date(fechaMinima.getFullYear + 100, 11, 31),
        minDate: new Date(fechaMinima.getFullYear(), fechaMinima.getMonth(), fechaMinima.getDay() + 9),
        maxDate: new Date(fechaMinima.getFullYear() + 100, fechaMinima.getMonth(), fechaMinima.getDay()),
        mode: 'calendar',
    }

    const showDatePicker = async () => {
        try {
            //Abriri el dialogo con DatePicker
            const { action, year, month, day } = await DatePickerAndroid.open(
                //options
                {
                    date: new Date(),
                    minDate: options.minDate,
                    maxDate: options.maxDate,
                    mode: options.mode
                }
            );
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                actualizarEstadoAlta('fecha', new Date(year, month, day));
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    useEffect(
        () => {
            const doGet = () => {
                fetch('http://192.168.1.2:5000/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        setListaRubros(lista);
                    })
            };

            const doPost = () => {
                fetch('http://192.168.1.2:5000/clasificados',
                    {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json',
                        },
                        body: JSON.stringify(clasificado),
                    }
                ).then(response => {
                    return response.json();
                }).then(data => {
                    setGuardar(false);
                })
                    .catch(response => {
                        console.log("error en api rest, en Rubro. Método POST");
                        console.log(response);
                    });
            };

            if (actualizarLista) {
                doGet();
                setActualizarLista(false);
            }
            if (guardarClasificado) {
                doPost();
            }
        }
    )

    const pickerItems = () => {
        return (

            listaRubros.map((x, i) => {
                return (<Picker.Item label={x.descripcion} key={i} value={x} />)
            }));
    }

    const actualizarEstadoAlta = (nombre, valor) => {
        const nuevo = { ...clasificado, [nombre]: valor };
        setClasificado(nuevo);
    }
    return (
        <ScrollView >
            <Text style={estilosPrincipal.titulo}> NUEVO CLASIFICADO</Text>
            <Text style={estilosPrincipal.etiqueta}  >Seleccionar rubro</Text>
            <Picker selectedValue={clasificado.rubro} style={{ width: '50%' }}
                onValueChange={val => actualizarEstadoAlta('rubro', val)}>
                {pickerItems()}
            </Picker>
            <Text style={estilosPrincipal.etiqueta}>Titulo</Text>
            <TextInput style={estilosPrincipal.inputText} onChangeText={val => actualizarEstadoAlta('titulo', val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Descripción</Text>
            <TextInput style={estilosPrincipal.inputText} multiline={true} numberOfLines={5} onChangeText={val => actualizarEstadoAlta('descripcion', val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Precio</Text>
            <TextInput style={estilosPrincipal.inputText} keyboardType={"numeric"} onChangeText={val => actualizarEstadoAlta('precio', val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Su correo electrónico</Text>
            <TextInput style={estilosPrincipal.inputText} keyboardType={"email-address"} onChangeText={val => actualizarEstadoAlta('correoElectronico', val)}> </TextInput>
            <View style={{ borderWidth: 5, borderColor: 'violet', borderRadius: 10, marginHorizontal: 10, marginBottom: 10, marginTop: 10, backgroundColor: 'violet' }}>
                <TouchableWithoutFeedback
                    onPress={showDatePicker.bind(this)}>
                    <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}> Seleccionar fecha fin oferta</Text>
                </TouchableWithoutFeedback></View>
            <Button style={estilosPrincipal.btnGuardar} title="Tomar foto"></Button>
            <Image source={require('./persona.png')}></Image>
            <Button style={estilosPrincipal.btnGuardar} title="Guardar" onPress={() => setGuardar(true)}></Button>
        </ScrollView>
    );
}

export default AltaClasificado;


