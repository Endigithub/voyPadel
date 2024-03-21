import React, { useState, useRef,useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  
} from 'react-native';
import { Card, Avatar } from 'react-native-paper'
import moment from 'moment';
import Swiper from 'react-native-swiper';
import DetallePartido from '../DetallePartido';
import NuevoPartido from '../NuevoPartido';
//import { Agenda } from 'react-native-calendars';


const { width } = Dimensions.get('window');
const partido1 = {id: 1,lugarPartido:'Partido 1',disponibilidad:'completo'}
const partido2 = {id: 2,lugarPartido:'Partido 2',disponibilidad:'Disponible 2 posiciones'}
const fechaHoy = new Date();
const eventos = [
    { id: 1, fecha: fechaHoy, titulo: 'Partido pista 1', hora: '10:00 AM' },
    { id: 2, fecha: fechaHoy, titulo: 'Partido pista 2', hora: '12:30 PM' },
    { id: 3, fecha: fechaHoy, titulo: 'Partido pista 3', hora: '13:00 AM' },
    { id: 4, fecha: fechaHoy, titulo: 'Partido pista 4', hora: '14:30 PM' },
    { id: 5, fecha: '2024-03-02', titulo: 'Partido pista 1', hora: '5:00 PM' },
    { id: 6, fecha: '2024-03-04', titulo: 'Partido pista 11', hora: '09:00 AM' },
  ];
const diaPartidos = [partido1,partido2];


//pasar parametro a hijo
let partido =[];

function detallePartido(item){
  console.log('item' +item.titulo);
    const mensajelistPartido = '';

    partido = item;
    console.log('Partido ' +partido.titulo);
    return partido;
}
function getPartidosFechaSelec(value){
    
   const formatFechaSelec = value.getDate()+"/"+value.getMonth()+"/"+value.getFullYear();
   let fecha;
   const eventosFecha = [];
   eventos.forEach(item=>{
        
        fecha =new Date( item.fecha);
        fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
        if(fecha === formatFechaSelec)
            eventosFecha.push(item);
    })

    return eventosFecha;

}




const Agenda = () => {
//Demomento no lo cargamos.Cargamos eventos
//const [agendaData, setAgendaData] = useState(eventos);
  //configurammos modo calendario España
  const moment = require('moment');
  require('moment/locale/es');
  moment.locale('es');
  moment.updateLocale('es', {
    week: {
      dow: 1 // Establece el primer día de la semana en lunes 
    }
  });
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //ir a otra pantalla
  const [modalDetallePartido, setModalDetallePartido] = useState({})
  const [nuevoPartido, setNuevoPartido] = useState({})
  
  let cont = 0;
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  let day = value.toLocaleDateString('es-ES', opciones).toLocaleLowerCase();
  const [week, setWeek] = useState(moment().week());
  

  const weeks = React.useMemo(() => {

    const start = moment().week(week).startOf('week')
    console.log ("fecha actual despues del add week : " + start.format("MM-DD-YYYY"))
    //const start = moment().startOf('week');
console.log("start: "+ start)
    return [-3,-2,-1, 0, 1, 2, 3].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {

        const date = moment(start).add( adj, 'week').add(index, 'day');
        
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
          month: date.format('MMM')
        };
      });
    });
  }, [week]);
    const detalleDiaPartido = null;
    
   
    const renderItem = ({item}) => {
        return (
          <TouchableOpacity style={{marginRight: 10, marginTop: 17, marginBottom: 10}}
          onPress={() =>{
            setModalDetallePartido(true)
            detallePartido(item)}}>
            <Card>
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>{item.hora}</Text> 
                  <Text>{item.titulo}</Text>
                  <Avatar.Text label= 'D' /> 
                  
                 
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        );
      };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Partidos</Text>
      </View>

      <View style={styles.picker}>
        
        <Swiper
          index={3}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={
            async ind => {
                   //console.log("semana antes de cambiar: " + week)
                   //console.log("ind antes de cambiar: " + ind)
              const newIndex = ind -1;              
              const newWeek = week + newIndex;             
              //setWeek(newWeek); 
              //console.log("semana despues de cambiar: " + newWeek)

              console.log("ind indice:  " + ind)
              //setWeek(ind >= 1 ? week +1 : week -1);             
              //setValue(moment(value).add(newIndex, 'week').toDate());

              /*setTimeout(() => {
                swiper.current.scrollTo(1, false);

              }, 1);*/
          }}>
          {weeks.map((dates, index) => (
            
            <View
              style={[styles.itemRow, { paddingHorizontal: 16 }]}
              key={index}>
              {dates.map((item, dateIndex) => {

                const isActive =  value.toDateString() === item.date.toDateString();
                
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setValue(item.date)}>
                      
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: '#111',
                          borderColor: '#111',
                        },
                      ]}>
                      <Text
                        style={[
                            styles.itemWeekday,
                          isActive && { color: '#fff' },
                        ]}>
                        {item.weekday}
                      </Text>
                      
                      <Text
                        style={[
                            styles.itemDate,
                          isActive && { color: '#fff' },
                        ]}>
                        {item.date.getDate()}
                        
                      </Text>

                      <Text
                        style={[
                            styles.itemMonth,
                          isActive && { color: '#fff' },
                        ]}>
                        {item.month}
                        
                      </Text>

                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 0 }}>
        
        <Text style={styles.subtitle}>{day}</Text>
        
        {/*<Text style={styles.subtitle}>{getPartidosFechaSelec(value)}</Text>*/}
        <View style={styles.placeholder}>
          <View style={styles.placeholderInset}>
           {/* {diaPartidos.map((partido, index) => (
                <TouchableOpacity onPress={() => {
                    setModalDetallePartido(true)
                    test(partido)
                  }} >
                    <Text style={styles.contenidoAgenda} 
                        key={index}>{partido.lugarPartido}{' '}{partido.disponibilidad}</Text>
                </TouchableOpacity>    
                ))}*/}
       <FlatList
        data={getPartidosFechaSelec(value)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      /> 
             
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
            setNuevoPartido(true)
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Crear Partido</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
    <DetallePartido
        modalDetallePartido = {modalDetallePartido}
        setModalDetallePartido = {setModalDetallePartido}
        partido={partido}
    />
    <NuevoPartido
        nuevoPartido = {nuevoPartido}
        setNuevoPartido = {setNuevoPartido}
        />
  </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 5,
  },
  picker: {
    flex: 1,
    maxHeight: 85,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 60,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 10,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 2,
  },
  itemMonth: {
    fontSize: 10,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  contenidoAgenda: {
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    borderRadius: 5, // Radio de la esquina del borde (opcional)
    padding: 10, // Relleno del contenedor (opcional)
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});
export default Agenda
