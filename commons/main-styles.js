import { StyleSheet } from 'react-native';

const fondo = 'white';
const primaryColor = '#7e57c2';
const primaryLightColor = '#E1E2E1';
const primaryDarkColor = '#4d2c91';
const primaryTextColor = '#ffffff';
const primaryDarkTextColor = '#000000';
const colorInputTexto = '#1c313a';

const estilosPrincipal = StyleSheet.create({
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
        color: primaryDarkTextColor,
        fontSize: 20,
        alignSelf: "center",
    },
    inputText: {
        color: colorInputTexto,
        backgroundColor: primaryLightColor,
        fontSize: 18,
        width: '100%',
    },
    btnGuardar: {
        width: '100%',
        marginVertical: 5,
    },
});
export default estilosPrincipal;
