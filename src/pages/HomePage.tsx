import { View, Text, StyleSheet, FlatList } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import Entity from "../entities/entities";
export default function HomePage() {
   const [countries, SetCountreis] = useState<Entity[]>([]);
   useEffect(() => {
      var requestOptions = {
         method: 'GET',

      };
      var countryList: Entity[] = [];

      fetch('https://restcountries.com/v3.1/all', requestOptions)
         .then(response => response.json())
         .then(result => {
            result.map(item => {
               countryList.push({
                  id: item.name.common,
                  flagUrl: item.flags.svg,
                  name: item.name.common,
                  ptName: item.translations.por.common,
                  population: item.population,

               })
            })
         })

         .catch(error => console.log('error', error));
      SetCountreis(countryList);

   }, [])





   return (
      <View style={styles.container} >
         <Text style={styles.Title}>Lista de Países</Text>
         <FlatList
            data={(countries)}
            renderItem={(countries) => 
            <View  style={styles.card}>
               <View>
               <Image style={styles.flag} source={{ uri:countries.item.flagUrl}} />
               </View>
               <View>
             <Text style={{ fontSize: 20, fontWeight:'600' }}>{countries.item.name}</Text>
               <Text style={{ fontSize: 20, fontWeight: '400', opacity: 0.6 }}>{countries.item.ptName}</Text>
               <Text>{countries.item.population}</Text>
               </View>
            </View>
            }
            keyExtractor={(item) => item.id}

         />
      </View>

   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#1911',
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
   Title: {
      fontSize: 30,
      fontWeight: '600',
      marginBottom: 30
   },
   card: {
      aspectRatio: 2.8,
      backgroundColor: 'gray',
      shadowColor:'#000',
      borderRadius: 15,
      flexDirection:'row',
      justifyContent: 'flex-start',
      marginVertical:15,
      marginHorizontal:25
   },
   flag:{
     width:80,
   height:80
   }

    

});
