import React, {useState,useEffect,} from 'react'
import { View, Button,Text,StyleSheet,Platform, ScrollView,TouchableOpacity,FlatList, } from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
//import Contacts from 'react-native-contacts';
import * as Contacts from 'expo-contacts';




let a = [];

function getContact(contacts){
 
  let back = 0;
  contacts && contacts.map((e,i)=>{
    
    let x = e.number;
    x = x.replace(/\s/g, '');
    if(back === 0){
      back = x;
      a.push(back)
      console.log('PRIMERA '+back);
    }else if(back === x) {
      console.log('SEGUNDA '+back);
      contacts.splice(i)
      back = x;
      a.push(back);
    }
   
    
  });
  
  
  return contacts;
}

const ListItem = ({ title }) => {
  return (
    <View style={styles.item}>
      
      
      <Text>{title.name}</Text>
      {title.phoneNumbers &&
            title.phoneNumbers.map((phoneNumber, i) => (
              
              <View key={i}>
          <Text>{phoneNumber.number + ' ' + i}</Text>
          
        </View>
            ))}
          
    </View>
  );
};

const Perfil = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          //fields: [Contacts.Fields.Emails],
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          //const contact = data[1];
          //console.log(contact);
          setContacts(data);
          
        }
      }
    })();
  }, []);
  /*const renderItem = ({item}) => {
    return(
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text> 
              <Text>{item.phoneNumbers}</Text>
              <Avatar.Text label= 'D' /> 
              
              
            </View>
          </Card.Content>
        </Card>
    );
  };*/
 
/*
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lista de contactos:</Text>
      {contacts.map((contact, index) => (
        <View key={index}>
          <Text>{contact.name}</Text>
          {contact.phoneNumbers &&
            contact.phoneNumbers.map((phoneNumber, i) => (
              <Text key={i}>{phoneNumber.number}</Text>
            ))}
        </View>
      ))}
            </View>
*/

  return (
    
    <View style={styles.container}>
      <FlatList
        data={contacts}
        //renderItem={({ item }) => <ListItem title={item} />}
        renderItem={({ item }) => {
          // Aplica la condición aquí
          if (item.name!==null) {
            
            getContact(item.phoneNumbers)  
            
            //console.log('Tfno: '+item[1].phoneNumbers.length)
            return <ListItem title={item} />;
          } 
        }}
        keyExtractor={item => item.id}
      />
    </View>
    
        
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
export default Perfil
