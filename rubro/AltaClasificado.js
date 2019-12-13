import React, { useState, useEffect, Style } from 'react'
import { Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Picker, DatePickerAndroid,View, Text, Button, Modal, ImageBackground } from 'react-native';
import estilosPrincipal from '../commons/main-styles';
import { TextInput, State } from 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera'


const AltaClasificado = (props) => {
    
    const rubroDefault = {
        id: null,
        descripcion: 'descripcion default',
        orden: 1,
        destacar: false
    }

    const altaClasificadoDefault ={
        rubro: rubroDefault,
        titulo: 'titulo default',
        descripcion: 'descripcion default',
        precio: '0',
        correoElectronico: 'xxx@xxx',
        fecha: new Date(),
        foto: -1,
    }

    const[altaClasificado, setAltaClasificado]= useState(altaClasificadoDefault /*props.altaClasificadoDefaul */);
    const[listaRubros, setListaRubros] = useState([]);
    const[rubroSeleccionado, setRubroSeleccionado] = useState(rubroDefault /*props.rubroDefault */);
    const[titulo, setTitulo] = useState('');
    const[descripcion, setDescripcion] = useState('');
    const[precio, setPrecio] = useState('0');
    const[correo, setCorreo] = useState('');
    const[actualizarLista, setActualizarLista] = useState(true);
    const[dateSelected, setDateSelected] = useState(new Date());
    const[guardarClasificado, setGuardar]= useState(false);
    const[takePhoto, setTakePhoto] = useState (false);
    const[base64Icon,setBase64Icon] = useState('https://png.pngtree.com/element_our/png_detail/20181124/businessman-vector-icon-png_246587.jpg')
   
    const fechaMinima = new Date();
    const options = {
        date: new Date(fechaMinima.getFullYear+100,11,31) ,
        minDate: new Date(fechaMinima.getFullYear(), fechaMinima.getMonth(),fechaMinima.getDay()+9),
        maxDate: new Date(fechaMinima.getFullYear()+100, fechaMinima.getMonth(),fechaMinima.getDay()),
        mode: 'calendar',
    }
    const base64IconPrefijo = 'data:image/jpg;base64, '
    const capture={
        flex: 0,
        backgroundColor: 'violet',
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 50,
        alignSelf: 'center',
        marginTop: 500,
      }
    const showDatePicker= async()=>{
        try {
            //Abriri el dialogo con DatePicker
            const {action, year, month, day} = await DatePickerAndroid.open(
                //options
                {date: new Date(),
                minDate: options.minDate,
                maxDate: options.maxDate,
                mode: options.mode }
                );
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
              actualizarEstadoAlta('fecha',new Date(year,month, day));
              setDateSelected(new Date(year,month, day));
            }
          } catch ({code, message}) {
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
                        body: JSON.stringify(altaClasificado),
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
        
            if(actualizarLista){
                doGet();
                setActualizarLista(false);
            }
            if(guardarClasificado){
                doPost();
            }
        }
    )
    
      const pickerItems = () => {
        return( 
            
            listaRubros.map( (x,i) => { 
            return( <Picker.Item label={x.descripcion} key={i} value={x} />)} ));
    }

    const takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        actualizarEstadoAlta('foto', data);
        setBase64Icon(base64IconPrefijo.concat(data.base64));
        setTakePhoto(false);
        //  eslint-disable-next-line
        console.log(data.uri);
      };
    
    const actualizarEstadoAlta = (nombre, valor) => {
        const altaNueva = { ...altaClasificado, [nombre]: valor };
        setAltaClasificado(altaNueva);
    }
      
    return (
        <ScrollView >
            <Text style={estilosPrincipal.titulo}> NUEVO CLASIFICADO</Text>
            <Text style={estilosPrincipal.etiqueta}  >Seleccionar rubro</Text>
            <Picker selectedValue={altaClasificado.rubro} style={{ width: '50%' }}
                onValueChange={val => actualizarEstadoAlta('rubro',val)}>
                 {pickerItems()}
            </Picker>            
            <Text style={estilosPrincipal.etiqueta}>Titulo</Text>
            <TextInput style={estilosPrincipal.inputText} onChangeText={val => actualizarEstadoAlta('titulo',val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Descripción</Text>
            <TextInput style={estilosPrincipal.inputText}  multiline = {true} numberOfLines={5} onChangeText={val => actualizarEstadoAlta('descripcion',val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Precio</Text>
            <TextInput style={estilosPrincipal.inputText}  keyboardType={"numeric"} onChangeText={val => actualizarEstadoAlta('precio',val)}> </TextInput>
            <Text style={estilosPrincipal.etiqueta}>Su correo electrónico</Text>
            <TextInput style={estilosPrincipal.inputText}  keyboardType={"email-address"} onChangeText={val => actualizarEstadoAlta('correoElectronico',val)}> </TextInput>
            <View style = {{borderWidth:5,borderColor:'violet', borderRadius:10,marginHorizontal:10, marginBottom:10,marginTop:10, backgroundColor: 'violet'}}>
            <TouchableWithoutFeedback
            onPress={showDatePicker.bind(this)}>
            <Text style={{color:'white',fontSize: 20, alignSelf: 'center'}}> Seleccionar fecha fin oferta</Text>
          </TouchableWithoutFeedback></View>
            <Button style={estilosPrincipal.btnGuardar}  title = "Tomar foto"  onPress = {()=>setTakePhoto(true)}></Button>
            <Modal visible = {takePhoto}>
                <RNCamera
                    autoFocus = {RNCamera.Constants.AutoFocus.on}
                    style={{ position:'absolute', top: 0, left: 0, right:0, bottom: 0}}>
                    {({ camera, status}) => {
                if (status == 'READY') {
                return (
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => takePicture(camera)} style={capture}>
                    <Text style={{ fontSize: 20, color:'white', textAlign:'center'}}>FOTO</Text>
                    </TouchableOpacity>
                </View>
                );
            }}}
                   
             </RNCamera>
          </Modal>
         
          <Image style={{alignSelf:'center', width: 300, height:300, marginVertical:10} } defaultSource={require('./persona.png')} source={{uri: base64Icon}}></Image>
          <Button style={estilosPrincipal.btnGuardar} title="Guardar" onPress={()=>setGuardar(true)}></Button>
        </ScrollView>
    );
    
}

export default AltaClasificado; 


