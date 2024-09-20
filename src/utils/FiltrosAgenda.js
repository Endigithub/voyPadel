import React, { useState } from 'react';
import {TextInput,View,Button,StyleSheet,Pressable,Modal,Text,TouchableOpacity}from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';





/*
const eventos = [
    { id: 1, fecha: fechaHoy, titulo: 'Partido pista 1', hora: '10:00 AM', ubicacion:'A' },
    { id: 2, fecha: fechaHoy, titulo: 'Partido pista 2', hora: '10:00 AM', ubicacion:'A'  },
    { id: 3, fecha: fechaHoy, titulo: 'Partido pista 3', hora: '13:00 AM', ubicacion:'B'  },
    { id: 4, fecha: fechaHoy, titulo: 'Partido pista 4', hora: '14:30 PM', ubicacion:'B'  },
    { id: 5, fecha: '2024-03-02', titulo: 'Partido pista 1', hora: '5:00 PM', ubicacion:'A'  },
    { id: 6, fecha: '2024-03-04', titulo: 'Partido pista 11', hora: '09:00 AM', ubicacion:'A'  },
  ];
*/
let sumCategorias = [];
let filterType = false;

const FiltrosAgenda = ({filtroAgenda ,setFiltroAgenda,eventosDate,eventosCloned,enviarDatoAlPadre  }) => {

  const [values, setValues] = useState([0, 100]);

  const multiSliderValuesChange = (values) => {
    setValues(values);
  };
  const [value, setValue] = useState(0);

  
    
    const [filter, setFilter] = useState([]);
   
    
    const [buttonColor, setButtonColor] = useState('blue');
    const [buttonColors, setButtonColors] = useState({button1: 'blue', button2: 'blue', button3: 'blue'});
    
    let datosFiltrados = [];
   
    const onValueChange = (newValue) => {
      filterType = true;
      sumCategorias = eventosCloned.filter(i=>i.distancia<=newValue);
     
  
      setFilter(sumCategorias);
      console.log('filterType',filterType);
      //console.log('filter',eventosCloned.filter(i=>i.distancia<=newValue));
      setValue(newValue);
    };
    const applyFilterCategoria = (categoria) => {
      sumCategorias.push(categoria);
      setFilter(sumCategorias);
      filterType = false;
      console.log('entraaa',categoria);
     }; 
     const removeFilterCategoria = (categoria) =>{
      setFilter(filter.filter(i => i !== categoria)); 
      filterType = false;
      sumCategorias = sumCategorias.filter(i => i !== categoria)
     }; 
     const removeAllFilters = () =>{
      setFilter([]);
      sumCategorias = [];
      console.log('removeAllFilters.removeAllFilters:', eventosCloned);
      datosFiltrados = eventosCloned;
      setButtonColors({button1: 'blue', button2: 'blue', button3: 'blue'})
     };

     const renderFilteredItems = () => {
      //aki tengo que saber si vengo de haber filtrado anteriormente. Si es asi aplicar eventosCloned
      
      console.log('Render filterType',filterType);
        if (filter.length === 0) {    
          return eventosCloned.map(item => (      
          
            <Text key={item.id}>{item.titulo  + '//'+ item.hora + '//'+ item.categoria+ '//'+item.distancia}</Text>
          ));
        }
        let filteredData = [];
        if(filterType){
          
          console.log('filteRender',filter);
          console.log('eventosCloned',eventosCloned);
          filteredData = filter;
        }else{
          filter.forEach(f=>{
          console.log('filterType es',filterType);
          const res = eventosCloned.filter(i => i.categoria === f);
          console.log('res',res);                  
          filteredData.push(...res);
        });
        }
        
        
       
        
        datosFiltrados = filteredData;
        
        
        return filteredData.map(filteredItem => (
          
          <Text key={filteredItem.id}>{filteredItem.titulo + '//'+ filteredItem.hora + '//'+ filteredItem.categoria+ '//'+filteredItem.distancia}</Text>
        ));
      };

      
//Para el padre
const enviarDato = () => {
  // Llama a la función del padre y pasa el dato como parámetro 
 enviarDatoAlPadre(datosFiltrados);
 setFiltroAgenda(!filtroAgenda); 
  
};
//FIN PADRE



const filtrarCategoria = (buttonId,item) => {
  // Genera un nuevo objeto de colores con el color del botón actualizado
  const newButtonColors = { ...buttonColors };
  newButtonColors[buttonId] = newButtonColors[buttonId] === 'blue' ? 'red' : 'blue';
  setButtonColors(newButtonColors);
  
  if(item && newButtonColors[buttonId] === 'red')applyFilterCategoria(item); else removeFilterCategoria(item);
  
};




  return (
    <Modal
        animationType='slide'         
        visible={filtroAgenda}>
       

    
    

    <View>
          {renderFilteredItems()}
      </View>

    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColors.button1 }]}
        onPress={() => filtrarCategoria('button1','A')}>
        <Text style={styles.buttonText}>A</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColors.button2 }]}
        onPress={() => filtrarCategoria('button2','B')}>
        <Text style={styles.buttonText}>B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColors.button3 }]}
        onPress={() => filtrarCategoria('button3','C')}>
        <Text style={styles.buttonText}>C</Text>
      </TouchableOpacity>
    </View>       




    <View>
      <Button 
        title="Quitar filtro" 
        onPress={() => removeAllFilters('')}/>
      
    </View>
    <Button
      title="Aplicar Filtros"
      onPress={enviarDato}/>

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Slider Values: {values.join(' - ')}</Text>
      <MultiSlider
        values={values}
        min={0}
        max={100}
        step={1}
        sliderLength={300}
        onValuesChange={multiSliderValuesChange}
        selectedStyle={{ backgroundColor: 'blue' }}
        unselectedStyle={{ backgroundColor: 'lightgray' }}
        containerStyle={{ height: 40 }}
        markerStyle={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'blue' }}
      />
    </View>
    <View style={styles.container}>
      <Text style={styles.label}>Value: {value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#007AFF"
        value={value}
        //onValueChange={onValueChange}
        onValueChange={newValue => onValueChange(Math.round(newValue))}
      />
    </View>
    
    </Modal>
  )
}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
  },
});

export default FiltrosAgenda
