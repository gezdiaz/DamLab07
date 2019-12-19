import React, { useState, useEffect, Style } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Picker, View, Text, Button, Modal } from 'react-native';
import { estilosPrincipal, primaryColor, styles, primaryTextColor,primaryDarkColor } from '../commons/main-styles';
import { TextInput, State } from 'react-native-gesture-handler';
import { urlJSONServer } from '../AppLab07';


// Falta que actualice solo las listas cuyas ofertas fueron modificadas, porque hace un PUT de toda la lista buscada.
const Catalogo = (props) => {

    const maxPrice = 999999999;
    const base64IconPrefijo = 'data:image/jpg;base64, '
    const buscarDefault = {
        rubro: null,
        titulo: '',
        precioMin: 0,
        precioMax: maxPrice,
        oferta: 0,
    }

    var filtroRubro = '';
    var filtroTitulo = '';
    var filtroPrecios = '';
    var filtroOferta = '';
    const filtroFechaMs = new Date().getTime(); //Fecha Actual en milisegundos



    const urlBusqueda = urlJSONServer + '/clasificados?';
    var busquedaFinalUrl = urlBusqueda;
    const [modalIsShown, setModalIsShown] = useState(true);
    const [listaRubros, setListaRubros] = useState([]);
    const [actualizarLista, setActualizarLista] = useState(true);
    const [rubroSeleccionado, setRubroSeleccionado] = useState(null);
    const [buscarClasificado, setBuscarClasificado] = useState(buscarDefault);
    const [listaResultado, setListaResultado] = useState([]);
    const [buscarEnApi, setBuscarEnApi] = useState(false);
    const [cambiarOferta, setCambiarOferta] = useState(false);
    const [guardarDatos, setGuardarDatos] = useState(false);
    const [showACtivityIndicator, setShowActivityIndicator] = useState(false);

    const [base64Icon, setBase64Icon] = useState('https://png.pngtree.com/element_our/png_detail/20181124/businessman-vector-icon-png_246587.jpg')



    useEffect(
        () => {
            const doGet = () => {
                fetch(urlJSONServer + '/rubros')
                    .then(res => {
                        return res.json()
                    })
                    .then(lista => {

                        setActualizarLista(false);
                        setListaRubros(lista);

                    })
            };

            const doGetSearchResult = () => {
                fetch(busquedaFinalUrl, {
                    method: 'GET'

                }).then(res => {
                    setShowActivityIndicator(true);
                    return res.json()
                })
                    .then(lista => {
                        let listaSearchAPI = [];
                        lista.forEach(elemento => {
                            let fechaElemento = new Date(elemento.fecha);
                            if (fechaElemento.getTime() > filtroFechaMs) {
                                listaSearchAPI = listaSearchAPI.concat(elemento);
                            }
                        });
                        setListaResultado(listaSearchAPI);
                        setShowActivityIndicator(false);
                    })
            };

            const doActualizarDatos = (clasificado) => {
                setShowActivityIndicator(true);
                fetch(urlJSONServer + '/clasificados/'.concat(clasificado.id.toString()), {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(clasificado)
                }
                ).then(res => {
                    setShowActivityIndicator(false);
                    return res.json()
                })
                    .catch(error => console.log("error en api rest, en actualizar Clasificado."))
            };

            if (actualizarLista) {
                doGet();
            }
            if (buscarEnApi) {

                setModalIsShown(false);
                filtroRubro = 'rubro.id='.concat(buscarClasificado.rubro.id.toString());
                filtroTitulo = '&titulo_like='.concat(buscarClasificado.titulo.toString());
                filtroPrecios = ('&precio_gte='.concat(buscarClasificado.precioMin.toString()).concat('&precio_lte=').concat(buscarClasificado.precioMax.toString()));
                filtroOferta = ('&oferta_gte='.concat(buscarClasificado.oferta.toString()));
                busquedaFinalUrl = busquedaFinalUrl.concat(filtroRubro).concat(filtroTitulo).concat(filtroPrecios).concat(filtroOferta);
                doGetSearchResult();
                reiniciarFiltrosBusqueda();
                setBuscarEnApi(false);

            }
            if (cambiarOferta) {
                setCambiarOferta(false);
            }

            if (guardarDatos) {

                listaResultado.forEach(clasificado => {
                    doActualizarDatos(clasificado);
                });
                setGuardarDatos(false);
            }


        }
    )

    const reiniciarFiltrosBusqueda = () => {
        setBuscarClasificado({
            rubro: rubroSeleccionado,
            titulo: '',
            precioMin: 0,
            precioMax: maxPrice,
            oferta: 0,
        })
    }

    const actualizarEstadoBuscar = (nombre, valor) => {
        const nuevo = { ...buscarClasificado, [nombre]: valor };
        if (nombre === 'rubro') {
            setRubroSeleccionado(valor);
        }
        setBuscarClasificado(nuevo);
    }

    const crearItem = (item) => {
        setBase64Icon(base64IconPrefijo.concat(item.foto.base64));
        if (item.rubro.destacar) {
            return (
                <View style={{backgroundColor:primaryColor, margin: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, }}>{item.titulo}</Text>
                    <Text style={{ fontSize: 20, }}>Precio:  ${item.precio}</Text>
                    <Text style={{ fontSize: 20, }}>Cantidad Ofertas: {item.oferta}</Text>
                    <Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10 }} defaultSource={require('./persona.png')} source={{ uri: base64Icon }}></Image>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignContent: 'center' }}>
                            <Button color={'green'} title="Ofertar" onPress={() => { item.oferta++; setCambiarOferta(true) }} /></View>
                    </View>
                </View>);
        }
        else {
            return (
                <View style={{ backgroundColor:primaryColor,margin: 5, alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, }}>{item.titulo}</Text>
                    <Text style={{ fontSize: 20, }}>Precio:  ${item.precio}</Text>
                    <Text style={{ fontSize: 20, }}>Cantidad Ofertas: {item.oferta}</Text>
                    <Image style={{ alignSelf: 'center', width: 300, height: 300, marginVertical: 10 }} defaultSource={require('./persona.png')} source={{ uri: base64Icon }}></Image>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignContent: 'center' }}>
                            <Button color={'blue'} title="Ofertar" onPress={() => { item.oferta++; setCambiarOferta(true) }} /></View>
                    </View>
                </View>);
        }
    }


    const pickerItems = () => {
        return (

            listaRubros.map((x, i) => {
                return (<Picker.Item label={x.descripcion} key={i} value={x} />)
            }));

    }
    return (
        <View style={{ flex: 1,backgroundColor:primaryTextColor}}>

            <Modal visible={modalIsShown} presentationStyle={'fullScreen'}>

                <ScrollView >
                    <View style={{backgroundColor:primaryColor, alignItems: 'center', margin: 5, flex: 1 }} >
                        <Text style={estilosPrincipal.titulo}>Buscar clasificado</Text>
                        <Text style={styles.headerBuscar}>Buscar por rubro</Text>
                        <Picker selectedValue={rubroSeleccionado} style={{ width: '80%' }}
                            onValueChange={val => actualizarEstadoBuscar('rubro', val)}>
                            {pickerItems()}
                        </Picker>
                        <Text style={styles.headerBuscar}>Buscar por titulo</Text>
                        <TextInput style={estilosPrincipal.inputText} onChangeText={(val) => actualizarEstadoBuscar('titulo', val)}></TextInput>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={estilosPrincipal.etiqueta, { flexDirection: 'column', margin: 5, flex: 0.5 }}>
                                <Text style={styles.headerBuscar}>Precio min</Text>
                                <TextInput keyboardType={"numeric"} style={estilosPrincipal.inputText} onChangeText={(val) => actualizarEstadoBuscar('precioMin', val)}></TextInput>
                            </View>

                            <View style={{ flexDirection: 'column', margin: 5, flex: 0.5 }}>
                                <Text style={styles.headerBuscar} keyboardType={"numeric"}>Precio max</Text>
                                <TextInput keyboardType={"numeric"} style={estilosPrincipal.inputText} onChangeText={(val) => actualizarEstadoBuscar('precioMax', val)}></TextInput>
                            </View>
                        </View >
                        <Text style={estilosPrincipal.etiquetaOfertaCatalogo}>Buscar por cantidad de ofertas</Text>
                        <TextInput style={estilosPrincipal.inputText} keyboardType={"numeric"} onChangeText={(val) => actualizarEstadoBuscar('oferta', parseInt(val))}></TextInput>
                        <View style={{ alignContent: 'center', flexDirection: 'row', margin: 5 }}>
                            <View style={{ flex: 0.65, marginHorizontal: 5, marginBottom: 5 }}><Button title="Buscar" onPress={() => { setBuscarEnApi(true); }}></Button></View>
                            <View style={{ flex: 0.35, marginHorizontal: 4, marginBottom: 5 }}><Button title="Cancelar" onPress={()=>setModalIsShown(false)}></Button></View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <View style={{ flex: 0.1, flexDirection:'row',backgroundColor:primaryDarkColor } }>
               
                <Text style={estilosPrincipal.tituloResultadoBusqueda}> Resultados</Text>
                <ActivityIndicator style={{marginLeft:50, flex:0.2,backgroundColor:primaryDarkColor}} size={"large"} color={'white'} animating={showACtivityIndicator}></ActivityIndicator>
            </View>
  
            <View style={{ flex: 0.91, backgroundColor:primaryTextColor }}>
                <FlatList
                    style={{backgroundColor:primaryColor }}
                    data={listaResultado}
                    renderItem={({ item }) => (crearItem(item))}
                    keyExtractor={item => item.id} />
            </View>
            <View style={{backgroundColor:primaryColor, flex: 0.08, alignItems: 'center',paddingTop:5}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, marginHorizontal: 5 }}><Button color={primaryDarkColor} title="Buscar" style={{ position: 'absolute' }} onPress={() => setModalIsShown(true)}></Button></View>
                    <View style={{ flex: 0.5, marginHorizontal: 5  }}><Button color={primaryDarkColor}  title="Listo" style={{ position: 'absolute' }} onPress={() => setGuardarDatos(true)}></Button></View>
                </View>
            </View>
           
        </View>
    );
}
export default Catalogo; 