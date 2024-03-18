import React, {useState} from 'react';
import { View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Agenda from './utils/Agenda'

const Screen1 = ({ navigation }) => {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayPress = (date) => {
    setSelectedDate(date);
  };

  const [selected, setSelected] = useState('');
  return (
    
      
      <Agenda/>
    
    
  )
}

export default Screen1
