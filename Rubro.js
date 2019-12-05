import React from 'react';
import { View, Text, Button, TextInput, Picker, Switch } from 'react-native';

const Rubro = () => {
    return (
        <View >
            <Text >Rubro</Text>
            <Text>Nombre</Text>
            <TextInput />
            <Text>Orden en el catalogo</Text>
            <Picker>
                <Picker.Item label="#1" value="1" />
                <Picker.Item label="#2" value="2" />
            </Picker>
            <Text>Destacar</Text>
            <Switch />
            <Button title="Guardar" />
        </View>

    )
}

export default Rubro;