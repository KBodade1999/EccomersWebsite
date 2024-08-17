// // import React from "react";
// // import { NavigationContainer } from "@react-navigation/native";
// // import HomeStackNavigator from "./src/navigation/Navigation";

// // export default function App() {
// //   return (
// // <NavigationContainer>
// //   <HomeStackNavigator/>
// // </NavigationContainer>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Text, TouchableOpacity, Modal, Button, Image } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { addToCart } from './src/redux/action';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const dispatch = useDispatch();

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     setModalVisible(false);
//   };

//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <FlatList
//         data={products}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => { setSelectedProduct(item); setModalVisible(true); }}>
//             <View style={{ padding: 10, borderBottomWidth: 1 }}>
//               <Text>{item.title}</Text>
//               <Text>${item.price}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       <Modal visible={modalVisible} transparent={true}>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
//             {selectedProduct && (
//               <>
//                 <Image source={{ uri: selectedProduct.image }} style={{ width: 200, height: 200 }} />
//                 <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{selectedProduct.title}</Text>
//                 <Text>{selectedProduct.description}</Text>
//                 <Text style={{ marginTop: 10, fontSize: 18 }}>${selectedProduct.price}</Text>
//                 <Button title="Add to Cart" onPress={() => handleAddToCart(selectedProduct)} />
//               </>
//             )}
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default App;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainApp from './Home';
import HomeStackNavigator from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <HomeStackNavigator />
      </NavigationContainer>
     
    </Provider>
  );
};

export default App;

