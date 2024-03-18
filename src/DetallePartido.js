import React from 'react'
import {TextInput,View,Button,StyleSheet,Pressable,Modal,Text}from 'react-native';

const DetallePartido = ({modalDetallePartido, setModalDetallePartido,partido}) => {

  
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //let day = partido.fecha.toLocaleDateString('es-ES', opciones).toLocaleLowerCase();
  //let day = partido.fecha.toDateString()
  return (
    <Modal
    animationType='slide'
    visible={modalDetallePartido}> 
    
    <Text>{partido.name}</Text>
    
    
      
       
        <Button
                title="Volver"
                onPress={() => {setModalDetallePartido(!modalDetallePartido)}}
                />
    </Modal>
  )
}

export default DetallePartido
