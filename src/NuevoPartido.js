import React from 'react'
import {TextInput,View,Button,StyleSheet,Pressable,Modal,Text}from 'react-native';

const NuevoPartido = ({nuevoPartido,setNuevoPartido}) => {
  return (
    <Modal
        animationType='slide' 
        visible={nuevoPartido}>
        <Text>Nuevo partido</Text>
        <Button
                title="Volver"
                onPress={() => {setNuevoPartido(!nuevoPartido)}}
                />
    </Modal>
  )
}

export default NuevoPartido
