import React, {useState} from 'react'
import { Text,Card, Avatar } from 'react-native-paper'
import { Agenda,LocaleConfig,CalendarProvider  } from 'react-native-calendars';
import {View, TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import moment from 'moment';
import NuevoPartido from './NuevoPartido';
import DetallePartido from './DetallePartido';




const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let fecha ;
let fechaActual = new Date();
//control de carga inicial
let cargado = false;




//pasar parametro a hijo
let partido =[];
function detallePartido(item){
  
    const mensajelistPartido = '';

    partido = item;
    
    return partido;
}


const timeToString = (time) => {
  const date = new Date(time);
//fecha=date.toLocaleDateString('es-ES', opciones).toLocaleLowerCase();
  fecha=date;
  return date.toISOString().split('T')[0];
};
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom','Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};

LocaleConfig.defaultLocale = 'es';

const theme = {
  agendaDayTextColor: 'blue',
  agendaDayNumColor: 'green',
  agendaTodayColor: 'red',
  agendaKnobColor: '#768390',
  //la parte de arriba de los dias
  //calendarBackground: '#2d333b',
  //es el fondo 
 // reservationsBackgroundColor: "#000000",
 
};

function compuebaControlCarga(){
  const mesAhora = fechaActual.getMonth();
  const fechaCambio = new Date();
  const mesCambio = fechaCambio.getMonth()
  if(mesAhora !== mesCambio || !cargado){
    return true;
  }
  return false;
}

function getDiaMesRest () {
  
  let f = new Date();

    const anio = f.getFullYear(); 
    const mes = f.getMonth();
    const dia = f.getDate();
    console.log('dia ' +dia);
    const ultimoDiaDelMes = new Date(anio, mes + 1, 0);
    //const ultimoDiaDelMes = new Date(anio, 3 + 1, 0);//Pruebas
    console.log('ultimoDiaDelMes ' +ultimoDiaDelMes.getDay());
    //para completar ultima semana de mes
    const diasMes = ultimoDiaDelMes.getDay()!==0? 7-ultimoDiaDelMes.getDay():ultimoDiaDelMes.getDay();
    console.log('diasMes ' +diasMes);
    //se suman los dias  para completar semana
    //Los dias a mostrar
    //const restDiaMes =(ultimoDiaDelMes.getDate()-(dia!==0?-1:1))+diasMes;
    console.log('ultimoDiaDelMes.getDate() ' +ultimoDiaDelMes.getDate());
    //let ultimasemena = calcularNumeroSemanas(anio,mes + 1);
    const ultimasemana = calcularNumeroSemanas(anio,3 + 1);
    const semanaActual = obtenerSemanaDelMes();
    console.log('ultimasemana ' +ultimasemana+ 'semanaActual '+semanaActual);
    let finDiasMes = ultimoDiaDelMes.getDate();
    
    
    //if(ultimoDiaDelMes.getDate()=== 30 || (ultimasemana === semanaActual)){//pruebas
      if(ultimoDiaDelMes.getDate()=== dia || (ultimasemana === semanaActual)){ 
      finDiasMes = 0;
      const nextMes = new Date(anio, 3 + 2, 0);
      console.log('nextMes ' +nextMes);
      //dias a mostrar para el siguiente mes
      //calcular los dias que hay del mes actual en la 1ª semana del siguiente mes de inicio  
        const residuoDiasMes = 7-diasMes;
      //calcular los dias que quedan de fin mes
      
      const diaProxMes = nextMes.getDay();
      const proxDiaMes = 7-diaProxMes;
      console.log('nextMes tiene ' +nextMes.getDate()+' residuoDiasMes '+residuoDiasMes+ ' proxDiaMes '+proxDiaMes);
      finDiasMes = nextMes.getDate()+((residuoDiasMes+proxDiaMes)-1);//resto -1 xk me saca un dia de mas
     
    }else{
      finDiasMes=(finDiasMes-dia)+1;
    }
    //const finDiasMes = ultimoDiaDelMes.getDate()=== dia ? 0 :ultimoDiaDelMes.getDate();
     
    console.log('finDiasMes ' +finDiasMes);
    //let d = calcularFechaMes(); 
  
       
    
    return finDiasMes;

}
function calcularNumeroSemanas(anio, mes) {
  // Obtener la fecha del primer día del mes
  const primerDia = new Date(anio, mes, 1);
  const primerDiaSemana = primerDia.getDay(); // 0 (domingo) a 6 (sábado)
  // Obtener la fecha del último día del mes
  const ultimoDia = new Date(anio, mes + 1, 0);
  const ultimoDiaMes = ultimoDia.getDate();
  // Calcular la diferencia en días entre el primer y último día del mes
  const diferenciaDias = ultimoDiaMes + primerDiaSemana - 1;
  // Calcular el número aproximado de semanas
  const numeroSemanas = Math.ceil(diferenciaDias / 7);

  return numeroSemanas;
}

function obtenerSemanaDelMes() {
  
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate(); // Día del mes actual
  const mesActual = fechaActual.getMonth();
  const primerDiaMes = new Date(fechaActual.getFullYear(), mesActual+1 , 1);
  const primerDiaSemana = primerDiaMes.getDay(); // Día de la semana del primer día del mes (0: domingo, 1: lunes, ..., 6: sábado)

  // Calcular la semana del mes
  const semanaDelMes = Math.ceil((diaActual + primerDiaSemana) / 7);
  
 

  return semanaDelMes;
}


const Mensajes  = () => {

  const moment = require('moment');
  require('moment/locale/es');
  moment.locale('es');
  moment.updateLocale('es', {
    week: {
      dow: 1 // Establece el primer día de la semana en lunes 
    }
  });

 //ir a otra pantalla
const [modalDetallePartido, setModalDetallePartido] = useState({})
const [nuevoPartido, setNuevoPartido] = useState({}) 

  const [visibleMonths, setVisibleMonths] = useState([]);
  const currentMonth = visibleMonths.length > 0 ? visibleMonths[0].month+1 : null;
  const handleVisibleMonthsChange = (months) => {
    
    setVisibleMonths(months);
    
  };
  //let mesBack = 0 ;
  const mostrarMes =(item)=>{
    
    /*if(mesBack ===0){
      
      mesBack=currentMonth;
    }*/
      
    let meses = new Map();
  meses.set(1,'Enero');
  meses.set(2,'Febrero');
  meses.set(3,'Marzo');
  meses.set(4,'Abril');
  meses.set(5,'Mayo');
  meses.set(6,'Junio');
  meses.set(7,'Julio');
  meses.set(8,'Agosto');
  meses.set(9,'Septiembre');
  meses.set(10,'Octubre');
  meses.set(11,'Noviembre');
  meses.set(12,'Diciembre');
  
  /*if(currentMonth !== mesBack){
  
  mesBack=currentMonth;
  
  } */ 
  
  return meses.get(currentMonth);
  
  
  
  }
  




const [items, setItems] = useState({});
const [value, setValue] = useState(new Date());
let w = new Date();
let m = w.getMonth();
let formatFechaSelec = w.getFullYear()+"-"+(m+1)+"-"+w.getDate();

  const loadItems = (day) => {
    //para controlar si se ha cargado inicialmente
    cargado = true;

    let d = moment().format('MMMM');
    console.log('day '+d+ ' a ' +mostrarMes());
    const restDiaMes = getDiaMesRest();

    
    setTimeout(() => {
     // for (let i = -15; i < 85; i++) {
      for (let i = -15; i < restDiaMes; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          //const numItems = Math.floor(Math.random() * 3 + 1);
          const numItems = 1;
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }

      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
      
    }, 1000);
    
    
  };

  const renderItem = (item) => {
    return (
      
      <TouchableOpacity 
      style={{marginRight: 10, marginTop: 17}}
      onPress={() =>{
        setModalDetallePartido(true)
        detallePartido(item)}}
      >
      {/* <View>
       <Text>{mostrarMes()}</Text>
        
      </View> */}
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };






  

  return (
    <View style={{flex: 1}}>
{/*<CalendarProvider date="">*/}
      <Agenda
//oculto los meses de la cabecera
        hideKnob={false}
        firstDay={1}
        hideExtraDays={true}//ocultar los días que no pertenecen al mes actual
       // showOnlySelectedMonth={true}
        items={items}
        loadItemsForMonth={compuebaControlCarga()?loadItems:null}
        selected={formatFechaSelec}

        //selected={'2024-04-30'}//Pruebas
        renderItem={renderItem}
        showMonth={true}
        current={true}
        
      //displayLoadingIndicator={true}
        //showWeekNumbers={true}
        //showMonth={true}
       
       
        onVisibleMonthsChange={handleVisibleMonthsChange}
        //hideDayNames={true}
       
  
        theme={theme}
        style={{ backgroundColor: 'white', borderRadius: 50 }}
      />
  {/*</CalendarProvider>*/}

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
      <NuevoPartido
        nuevoPartido = {nuevoPartido}
        setNuevoPartido = {setNuevoPartido}
        />
       <DetallePartido
        modalDetallePartido = {modalDetallePartido}
        setModalDetallePartido = {setModalDetallePartido}
        partido={partido} />  
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
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
});

export default Mensajes
