import { StyleSheet } from 'react-native';

const fondo = 'white';
export const primaryColor = '#0091ea';
export const primaryLightColor = '#64c1ff';
export const primaryDarkColor = '#0064b7';
export const primaryTextColor = '#ffffff';
export const primaryDarkTextColor = '#000000';
const colorInputTexto = '#1c313a';

export const estilosPrincipal = StyleSheet.create({
    contenedor: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: fondo,
        marginHorizontal: 16,
    },
    titulo: {
        color: primaryTextColor,
        backgroundColor: primaryDarkColor,
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
    },
    etiqueta: {
        backgroundColor:primaryLightColor,
        color: primaryDarkTextColor,
        fontSize: 20,
        alignSelf: "center",
    },
    etiquetaOfertaCatalogo: {
        color: primaryDarkTextColor,
        fontSize: 19,
        alignSelf: "center",
    },
    inputText: {
        color: colorInputTexto,
        backgroundColor: primaryLightColor,
        fontSize: 18,
        width: '100%',
    },
    btnGuardar: {
        width: '50%',
        marginVertical: 5,
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
        fontSize: 32,
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
});

