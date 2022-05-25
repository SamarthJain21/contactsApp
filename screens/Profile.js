import React, { useState, useEffect } from 'react'
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   Dimensions,
   StatusBar,
   FlatList,
   ActivityIndicator,
   Linking
} from 'react-native';
import * as Contacts from 'expo-contacts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getColorByLetter } from '../utils';

export default function Profile({ navigation, route }) {
   const [contactInfo, setContactInfo] = useState(null);
   const [phoneNumbers, setPhoneNumbers] = useState([]);

   useEffect(() => {
      getContact(route.params.contactInfo.id);
   }, [route.params.contactInfo.id])

   function getContact(id) {
      Contacts.getContactByIdAsync(id)
         .then((contact) => setContactInfo(
            {
               ...contact,
               color: getColorByLetter(contact.name[0])
            }
         )
         )
         .catch((error) => console.log(error));
   }


   function makeCall(phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`)
   }


   function deleteContact(contactID){
      // write permission needed
      Contacts.removeContactAsync(contactID.id)
               .then(() => navigation.navigate('MyContacts'))
         .catch((error)=>{
            console.log(error)
         })

   }


   if (!contactInfo) {
      return <ActivityIndicator size={32} />
   } else {
      // remove duplicate values
      contactInfo.phoneNumbers.forEach(obj=>{
         if(!phoneNumbers.some(o=>o.number.split(" ").join("")===obj.number.split(" ").join(""))){
            phoneNumbers.push({...obj})
         }
      })
      
   }

   return (
      <View style={styles.container}>
         <ImageBackground
            source={{ uri: contactInfo.hasThumbnail ? contactInfo.thumbNailpath : null }}
            style={{ ...styles.backgroundImage, backgroundColor: contactInfo.color }}
         >
            {
               !contactInfo.hasThumbnail
                  ?
                  <FontAwesome5 name='user-alt' size={125} color='white' />
                  :
                  null
            }
            <AntDesign
               onPress={() => deleteContact(contactInfo)}
               name='delete' size={28} color='white'
               style={{ position: 'absolute', top: StatusBar.currentHeight, right: 20 }}
            />
            <Text style={styles.mainText}>{contactInfo.name}</Text>
         </ImageBackground>

         <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
               data={phoneNumbers}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (

                  <View style={styles.phonenNumberContainer}>
                     <Text style={{ fontSize: 16, marginLeft: 10 }}>{item.number}</Text>
                     <MaterialIcons name='call' size={28} color='green'
                        onPress={() => makeCall(item.number)} />
                  </View>
               )}
            />
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   backgroundImage: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height / 3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   mainText: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold'
   },
   phonenNumberContainer: {
      flex: 1,
      marginHorizontal: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      elevation: 5,
      paddingVertical: 20,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})
