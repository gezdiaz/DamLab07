import React, { useState, useEffect, Style } from 'react'
import { ActivityIndicator, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Picker, DatePickerAndroid, View, Text, Button, Modal } from 'react-native';
import {estilosPrincipal,primaryColor} from '../commons/main-styles';
import { TextInput, State } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera'
import { urlJSONServer } from '../AppLab07';
import { styles } from '../commons/main-styles';


const AltaClasificado = (p) => {

    const props = p.navigation.state.params;
    const navigation = p.navigation;

    const [takePhoto, setTakePhoto] = useState(false);
    const [base64Icon, setBase64Icon] = useState('https://png.pngtree.com/element_our/png_detail/20181124/businessman-vector-icon-png_246587.jpg')
    const [clasificado, setClasificado] = useState(props.clasificado);
    const [listaRubros, setListaRubros] = useState([]);
    const [actualizarLista, setActualizarLista] = useState(true);
    const [guardarClasificado, setGuardar] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const fechaMinima = new Date();
    const options = {
        date: fechaMinima,
        minDate: new Date(fechaMinima.getFullYear(), fechaMinima.getMonth(), fechaMinima.getDate()),
        maxDate: new Date(fechaMinima.getFullYear() + 100, fechaMinima.getMonth(), fechaMinima.getDate()),
        mode: 'calendar',
    }

    const base64IconPrefijo = 'data:image/jpg;base64, '
    const capture = {
        flex: 0,
        backgroundColor: 'violet',
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 50,
        alignSelf: 'center',
        marginTop: 500,
    }



    const showDatePickerAlta = async () => {

        try {
            //Abriri el dialogo con DatePicker
            const { action, year, month, day } = await DatePickerAndroid.open(
                //options
                {
                    date: new Date(options.date.getFullYear(),options.date.getMonth(),options.date.getDate()+1),
                    minDate: new Date(options.date.getFullYear(),options.date.getMonth(),options.date.getDate()+1),
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


    const showDatePickerEditar = async () => {

        try {
            //Abriri el dialogo con DatePicker
            const { action, year, month, day } = await DatePickerAndroid.open(
                //options
                {
                    date: options.date,
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
                fetch(urlJSONServer + '/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {
                        setListaRubros(lista);
                    })
            };

            const doPost = () => {
                fetch(urlJSONServer + '/clasificados',
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
                    volver();
                })
                    .catch(response => {
                        console.log("error en api rest, en AltaClasificado. Método POST");
                        console.log(response);
                    });
            };

            const doUpdate = () => {
                setShowActivityIndicator(true);
                fetch(urlJSONServer + '/clasificados/'.concat(clasificado.id.toString()), {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(clasificado)
                }
                ).then(res => {
                    setGuardar(false);
                    setShowActivityIndicator(false);
                    return res.json()
                })
                    .catch(error => console.log("error en api rest, en actualizar Clasificado."))
            };

            if (actualizarLista) {
                doGet();
                setActualizarLista(false);
            }
            if (guardarClasificado) {
                if(props.modoEditar){
                    doUpdate();
                }
                else{
                    doPost();
                }
            }
        }
    )

    const volver = () => {
        props.onGoBack();
        p.navigation.goBack(null);
    }

    const pickerItems = () => {
        return (

            listaRubros.map((x, i) => {
                return (<Picker.Item label={x.descripcion} key={i} value={x} />)
            }));
    }


    const takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        actualizarEstadoAlta('foto', data);
        setBase64Icon(base64IconPrefijo.concat(data.base64));
        setTakePhoto(false);
        //  eslint-disable-next-line
        console.log(data.uri);
    };

    const actualizarEstadoAlta = (nombre, valor) => {
        const nuevo = { ...clasificado, [nombre]: valor };
        setClasificado(nuevo);
    }

    const showFoto = () => {
        if(clasificado.foto === 1){
            return(<Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10, backgroundColor: primaryColor }}  source={require('./persona.png')} ></Image>)
        }
        else {
            return(<Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10, backgroundColor: primaryColor }} defaultSource={require('./persona.png')}  source={{uri:base64IconPrefijo.concat(clasificado.foto.base64)}}></Image>)
        }
    }

    if(p.navigation.state.params.modoEditar){
        return(
            <View style={{flex: 1}}>
                <Text style={estilosPrincipal.titulo}>NUEVO CLASIFICADO</Text>
                <ScrollView style={{backgroundColor:primaryColor, flex: 0.9}}>
                    <Text style={styles.header} >Seleccionar rubro</Text>
                    <Picker  selectedValue={clasificado.rubro} style={{ width: '50%' , alignSelf:'center'},styles.item}
                        onValueChange={val => actualizarEstadoAlta('rubro', val)}>
                        {pickerItems()}
                    </Picker>
                    <Text style={styles.header}>Titulo</Text>
                    <TextInput  defaultValue={props.clasificado.titulo} style={estilosPrincipal.inputText} onChangeText={val => actualizarEstadoAlta('titulo', val)}> </TextInput>
                    <Text style={styles.header}>Descripción</Text>
                    <TextInput defaultValue={props.clasificado.descripcion} style={estilosPrincipal.inputText} multiline={true} numberOfLines={5} onChangeText={val => actualizarEstadoAlta('descripcion', val)}> </TextInput>
                    <Text style={styles.header}>Precio</Text>
                    <TextInput defaultValue={props.clasificado.precio.toString()} style={estilosPrincipal.inputText} keyboardType={"numeric"} onChangeText={val => actualizarEstadoAlta('precio', parseInt(val))}> </TextInput>
                    <Text style={styles.header}>Su correo electrónico</Text>
        
                    <TextInput defaultValue={props.clasificado.correoElectronico} style={estilosPrincipal.inputText} keyboardType={"email-address"} onChangeText={val => actualizarEstadoAlta('correoElectronico', val)}> </TextInput>
                    <View style={{ borderWidth: 5, borderColor: 'violet', borderRadius: 10, marginHorizontal: 10, marginBottom: 10, marginTop: 10, backgroundColor: 'violet' }}>
                        <TouchableWithoutFeedback
                            onPress={showDatePickerEditar.bind(this)}>
                            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}> Seleccionar fecha fin oferta</Text>
                        </TouchableWithoutFeedback></View>
                    <Button style={estilosPrincipal.btnGuardar} title="Tomar foto" onPress={() => setTakePhoto(true)}></Button>
                    <Modal visible={takePhoto}>
                        <RNCamera
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            {({ camera, status }) => {
                                if (status == 'READY') {
                                    return (
                                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => takePicture(camera)} style={capture}>
                                                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>FOTO</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            }}
        
                        </RNCamera>
                    </Modal>
        
                    {showFoto()}

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        
                        <View style={{ flex: 0.65, marginHorizontal: 5 }}><Button title="Guardar" onPress={() => setGuardar(true)}></Button></View>
                        <View style={{ flex: 0.35, marginHorizontal: 5, marginBottom: 5 }}><Button title="Cancelar" onPress={() => volver()}></Button></View>
                        
                    </View>
                    
                </ScrollView>
                <ActivityIndicator style={{flex: 0.1, backgroundColor:primaryColor}} color={'white'} size={'large'}  animating={showActivityIndicator}></ActivityIndicator>
            </View>
        );
    }
    else{
        return (
            <ScrollView style={{backgroundColor:primaryColor}}>
                <Text style={estilosPrincipal.titulo}>NUEVO CLASIFICADO</Text>
                <Text style={styles.header}  >Seleccionar rubro</Text>
                <Picker selectedValue={clasificado.rubro} style={{ width: '50%' , alignSelf:'center'},styles.item}
                    onValueChange={val => actualizarEstadoAlta('rubro', val)}>
                    {pickerItems()}
                </Picker>
                <Text style={styles.header}>Titulo</Text>
                <TextInput style={estilosPrincipal.inputText} onChangeText={val => actualizarEstadoAlta('titulo', val)}> </TextInput>
                <Text style={styles.header}>Descripción</Text>
                <TextInput style={estilosPrincipal.inputText} multiline={true} numberOfLines={5} onChangeText={val => actualizarEstadoAlta('descripcion', val)}> </TextInput>
                <Text style={styles.header}>Precio</Text>
                <TextInput style={estilosPrincipal.inputText} keyboardType={"numeric"} onChangeText={val => actualizarEstadoAlta('precio', parseInt(val))}> </TextInput>
                <Text style={styles.header}>Su correo electrónico</Text>
    
                <TextInput style={estilosPrincipal.inputText} keyboardType={"email-address"} onChangeText={val => actualizarEstadoAlta('correoElectronico', val)}> </TextInput>
                <View style={{ borderWidth: 5, borderColor: 'violet', borderRadius: 10, marginHorizontal: 10, marginBottom: 10, marginTop: 10, backgroundColor: 'violet' }}>
                    <TouchableWithoutFeedback
                        onPress={showDatePickerAlta.bind(this)}>
                        <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}> Seleccionar fecha fin oferta</Text>
                    </TouchableWithoutFeedback></View>
                <Button style={estilosPrincipal.btnGuardar} title="Tomar foto" onPress={() => setTakePhoto(true)}></Button>
                <Modal visible={takePhoto}>
                    <RNCamera
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        {({ camera, status }) => {
                            if (status == 'READY') {
                                return (
                                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => takePicture(camera)} style={capture}>
                                            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>FOTO</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        }}
    
                    </RNCamera>
                </Modal>
    
                {showFoto()}
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
    
                    <View style={{ flex: 0.65, marginHorizontal: 5 }}><Button title="Guardar" onPress={() => setGuardar(true)}></Button></View>
                    <View style={{ flex: 0.35, marginHorizontal: 5, marginBottom: 5 }}><Button title="Cancelar" onPress={() => volver()}></Button></View>
    
                </View>
            </ScrollView>
        );
    }

}

export default AltaClasificado;


