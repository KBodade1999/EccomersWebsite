import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,} from './src/redux/action';

const MainApp = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetch daata error', error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setModalVisible(false);
  };

  const handleIncrement = (productId) => {
    let updatedProducts = products.map(product => {
      if (product.id === productId) {
        const previousQuantity = product.quantity || 1; 
        const newQuantity = previousQuantity + 1; 
        return { ...product, quantity: newQuantity };
      } else {
        return product; 
      }
    });
  
    setProducts(updatedProducts);
  };

  const handleDecrement = (productId) => {
    let updatedPtcs = products.map(product => {
      if (product.id === productId) {
        const previousQuant = product.quantity || 1; 
        const newQuantity = previousQuant - 1; 
  
        return { ...product, quantity: newQuantity };
      } else {
        return product;
      }
    });
  
    setProducts(updatedPtcs);
  };

 
  return (
    <View style={{ flex: 1, padding: 0 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { setSelectedProduct(item); setModalVisible(true); }}>
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetailsContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>Rs. {item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
     <View style={styles.modalContainer}>
       <View style={styles.card1}>
         {selectedProduct && (
            <>
              <Image source={{ uri: selectedProduct.image }} style={styles.productImageDec} />
              {/* <Text style={styles.productTitle}>{selectedProduct.title}</Text> */}
              <View style={{top:0}}>
              <Text style={{color:"black"}} >Description: </Text>
              <Text style={styles.productDescription}>{selectedProduct.description}</Text>
              </View>
              
              <TouchableOpacity style={{backgroundColor:'red',height:50,width:"60%",borderRadius:10,top:40}} title="" onPress={() => handleAddToCart(selectedProduct)}><Text style={{textAlign:'center',marginTop:15,color:'white'}}>Add to Cart</Text></TouchableOpacity>
            </>
          )}
  
          <TouchableOpacity style={{backgroundColor:"rgb(169,169,169)",height:50,width:"35%",borderRadius:10,left:"65%",bottom:10}} title="Close" onPress={() => setModalVisible(false)}><Text style={{textAlign:'center',marginTop:15,left:5,color:'black',fontWeight:'bold'}}>Close</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
      </View>

  
  
  );
};

// Define styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  card1: {
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  productImageDec: {
    width: '30%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
    left:100
  },
  productDescription: {
    fontSize: 14,
    marginVertical: 8,
    left:100,
    width:"60%",
    bottom:30,
    color:'black'

  },
 

  productCard: {
    padding: 10,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
     color:'black'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top:20
  },
  quantityButton: {
    backgroundColor: 'rgb(169,169,169)',
    padding: 5,
    borderRadius: 15,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:"black"
  },
});

export default MainApp;
