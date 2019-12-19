import { StyleSheet } from 'react-native';


export const primaryColor = '#0091ea';
export const primaryLightColor = '#64c1ff';
export const primaryDarkColor = '#0064b7';
export const primaryTextColor = '#ffffff';
export const primaryDarkTextColor = '#000000';
const colorInputTexto = '#1c313a';
const fondo = primaryColor;

export const estilosPrincipal = StyleSheet.create({
    contenedor: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: fondo
    },
    titulo: {
        color: primaryTextColor,
        backgroundColor: primaryDarkColor,
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
    },
    tituloResultadoBusqueda:{
        color: primaryTextColor,
        backgroundColor: primaryDarkColor,
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        flex:0.8
    },
    etiqueta: {
        backgroundColor:primaryLightColor,
        color: primaryDarkTextColor,
        fontSize: 20,
        alignSelf: "center",
    },
    etiquetaOfertaCatalogo: {
        color: primaryTextColor,
        fontSize: 19,
        alignSelf: "center",
    },
    inputText: {
        alignSelf: 'center',
        backgroundColor: primaryLightColor,
        padding: 10,
        marginBottom: 8,
        borderRadius:10,
        fontSize: 18,
        width: '95%',
    },
    btnGuardar: {
        width: '50%',
        marginVertical: 5,
        borderRadius: 10,
    },
    btnGuardar: {
        width: '100%',
        margin: 5,
        borderRadius: 10,
    },
});

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: primaryLightColor,
        padding: 20,
        marginBottom: 8,
        marginHorizontal:8,
        borderRadius:10
    },
    header: {
        marginHorizontal:5,
        fontSize: 32,
        backgroundColor:primaryColor,
        color:'white'
    },
    headerBuscar: {
        marginHorizontal:5,
        fontSize: 23,
        backgroundColor:primaryColor,
        color:'white'
    },
    headerOrdenRubro: {
        marginHorizontal:5,
        fontSize: 25,
        backgroundColor:primaryColor,
        color:'white'
    },
    headerCentrado: {
        fontSize: 32,
        backgroundColor:primaryColor,
        color:'white',
        alignSelf:'center'
    },
    title: {
        fontSize: 24,
    },
    estamosTrabajando:{
        backgroundColor: primaryLightColor,
        padding: 20,
        marginVertical: 10,
        marginHorizontal:8,
        borderRadius:10
    }
});

