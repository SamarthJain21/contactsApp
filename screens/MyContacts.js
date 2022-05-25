import React, { useState, useEffect } from 'react'
import {
   View,
   Text,
   FlatList,
   StyleSheet,
   TouchableOpacity,
   Touchable
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';

import ContactCard from '../components/ContactCard';
import Profile from './Profile';

export default function MyContacts({ navigation }) {


   const isFocused = useIsFocused();
   // console.log(isFocused)

   const [myContacts, setMyContacts] = useState([]);

   useEffect(() => {
      getAllContacts();
   }, [isFocused])

   async function getAllContacts() {
      try {
         // 
         const { status } = await Contacts.requestPermissionsAsync();
         if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
               fields: [Contacts.Fields.Emails],
            });
            // console.log(fields);

            if (data.length > 0) {
               const contact = data;
               setMyContacts(contact)
               // console.log(contact);
            }
         }
      } catch (error) {
         console.log(error);
      }
   }



   return (
      <View style={styles.container}>
         <Ionicons
            name='add-circle'
            size={62}
            color='green'
            style={styles.addIcon}
         // onPress={() => navigation.navigate('CreateContact')}
         />
         <FlatList
            data={myContacts}
            keyExtractor={(item) => item.recordID}
            renderItem={({ item }) => (
               <TouchableOpacity
               onPress={() => navigation.navigate('Profile', {
                  contactInfo: { id: item.id }
               })
            }
               >
                  <ContactCard contactInfo={item} />
               </TouchableOpacity>
            )}
         />
      </View>

   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   addIcon: {
      bottom: 20,
      right: 20,
      position: 'absolute',
      zIndex: 1,
   }
})