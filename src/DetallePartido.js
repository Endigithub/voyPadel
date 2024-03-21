import React from 'react'
import {TextInput,View,Button,StyleSheet,Pressable,Modal,Text,ImageBackground,SafeAreaView}from 'react-native';

const DetallePartido = ({modalDetallePartido, setModalDetallePartido,partido}) => {
  const image = {uri: './img/headDetallePartido.jpg'};
  
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //let day = partido.fecha.toLocaleDateString('es-ES', opciones).toLocaleLowerCase();
  //let day = partido.fecha.toDateString()
  return (
    <Modal
    animationType='slide'
    visible={modalDetallePartido}> 
    
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
        <ImageBackground source={require('../img/headDetallePartido.jpg')} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>{partido.titulo}</Text>
        </ImageBackground>
     </View>
     </SafeAreaView> 
    
    
      
       
        <Button
                title="Volver"
                onPress={() => {setModalDetallePartido(!modalDetallePartido)}}
                />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    //height: 200,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default DetallePartido
