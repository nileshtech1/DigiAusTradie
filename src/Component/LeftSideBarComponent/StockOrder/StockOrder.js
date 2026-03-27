import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import Header from '../../../ReusableComponent/Header';
import SearchBar from '../../../ReusableComponent/SearchBar';
import Colors from '../../../Assets/Style/Color';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {stock_image_path} from '../../../Redux/NWConfig';
import ProductStockStyle from '../../../utils/Stylesheet/ProductStockStyle'; 
import {StyleSheet as RNStyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SendOrderApi} from '../../../Redux/API/SendOrderApi';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {GetStockApi} from '../../../Redux/API/GetStockApi';
import StockOrderStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/StockOrderStyle';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const StockOrder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockCategory, setStockCategory] = useState([]);
  const {StockData} = useSelector(state => state.StockList);
  const {SendOrderLoading} = useSelector(state => state.SendOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [isModalToastVisible, setIsModalToastVisible] = useState(false);
  const {LoginData} = useSelector(state => state.Login);

  useEffect(() => {
    const stockData = async () => {
      if (StockData.status === true) {
        setStockCategory(StockData.Stock);
      }
    };
    stockData();
  }, [StockData]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const displayData = useMemo(() => {
    if (!searchQuery) {
      const uniqueStockTypes = [
        ...new Set(StockData?.Stock?.map(item => item.stock_type) || []),
      ];
      return uniqueStockTypes.map(type => ({type: 'stock_type', value: type}));
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return StockData?.Stock?.filter(item => {
        const stockSubCategory = item.stock_sub_category?.toLowerCase() || '';
        return stockSubCategory.includes(lowerCaseQuery);
      }).map(
        item =>
          ({
            type: 'stock_sub_category',
            value: item,
          } || []),
      );
    }
  }, [searchQuery, StockData]);

  const openModal = product => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const increaseQuantity = () => {
    if (quantity < selectedProduct.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    if (selectedProduct.quantity === '0') {
      alert('This product is out of stock.');
      return;
    }
    const newProduct = {...selectedProduct, quantity};
    setCart(prevCart => [...prevCart, newProduct]);
    closeModal();
  };
  const onPressOk = () => {
    setCart([]);
    setCartModalVisible(false);
    setIsModalToastVisible(false);
  };
  const totalAmount = cart
    .reduce((acc, item) => {
      const itemPrice = parseFloat(item.price.replace('$', '').trim());
      return acc + itemPrice * item.quantity;
    }, 0)
    .toFixed(2);

  const totalQuantity = cart.length;
  const handleRemoveItem = index => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  const renderCartItem = ({item, index}) => (
    <View style={ProductStockStyle.cartItemRow}>
      <View style={ProductStockStyle.cartItemRow1}>
        <Image
          source={{uri: stock_image_path + item.stock_image}}
          style={ProductStockStyle.cartItemImage}
        />
        <View>
          <Text style={ProductStockStyle.cartItemText}>
            {item.stock_sub_category}
          </Text>
          <Text style={ProductStockStyle.cartItemText}>
            Quantity: {item.quantity}
          </Text>
          <Text style={ProductStockStyle.cartItemText}>
            $ {item.price.replace('$', '').trim() * item.quantity}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={ProductStockStyle.deleteIcon}
        onPress={() => handleRemoveItem(index)}>
        <VectorIcon icon="FontAwesome" name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
  const handleSubmit = async () => {
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    const franchiseid = {
      franchise_id: id,
    };
    const user = await AsyncStorage.getItem('User');
    const parsedUser = await JSON.parse(user);
    if (parsedUser.id) {
      const postData = cart.map(item => ({
        franchise_id: parsedUser.id,
        stock_id: item.id,
        stock_type: item.stock_type,
        stock_category: item.stock_sub_category,
        price: item.price,
        quantity: item.quantity,
        status: item.status,
      }));
      dispatch(SendOrderApi(postData)).then(res => {
        if (res.payload.status === true) {
          setCartModalVisible(false);
          dispatch(GetStockApi({token, franchiseid}));
          setIsModalToastVisible(true);
        }
      });
    }
  };

  const renderProductItem = ({item}) => {
    if (item.type === 'stock_type') {
      return (
        <TouchableOpacity
          style={StockOrderStyle.categoryItem}
          onPress={() =>
            navigation.navigate('ProductStock', {category: item.value})
          }>
          <View style={StockOrderStyle.itemContent}>
            <View style={StockOrderStyle.iconContainer}>
              <VectorIcon
                icon="MaterialIcons"
                name="shopping-cart"
                size={20}
                color={Colors.Neon_Blue_Theme_Color}
              />
            </View>
            <View style={StockOrderStyle.textContainer}>
              <Text style={StockOrderStyle.categoryText}>{item.value}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (item.type === 'stock_sub_category') {
      const product = item.value; // Use a more descriptive name
      return (
        <View style={ProductStockStyle.productCard}>
          <TouchableOpacity
            style={ProductStockStyle.productCheckboxContainer}
            onPress={() => openModal(product)}>
            <VectorIcon
              icon="FontAwesome"
              name="plus"
              size={20}
              color={Colors.Neon_Blue_Theme_Color}
            />
          </TouchableOpacity>
          <View style={ProductStockStyle.productNameContainer}>
            <Text style={ProductStockStyle.productName}>
              {product.stock_sub_category}
            </Text>
          </View>
          <View style={ProductStockStyle.productImageContainer}>
            <Image
              source={{uri: stock_image_path + product.stock_image}}
              style={ProductStockStyle.productImage}
            />
          </View>
          <View style={ProductStockStyle.productPriceContainer}>
            <Text style={ProductStockStyle.productPrice}>${product.price}</Text>
          </View>
          <View style={ProductStockStyle.productQuantityContainer}>
            <Text
              style={[
                product.quantity == 0
                  ? ProductStockStyle.productOutQuantity
                  : ProductStockStyle.productQuantity,
                RNStyleSheet.flatten({color: Colors.white_text_color}),
              ]}>
              Pack Size: {product.packet_quantity}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={StockOrderStyle.container}>
      <Header notificationIcon={true} />
      <View style={StockOrderStyle.searchContainer}>
        <Text style={StockOrderStyle.title}>
          {searchQuery ? 'Search Results' : 'Categories'}
        </Text>
        <View style={StockOrderStyle.searchBarContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClear={handleClear}
            onSearch={handleSearch}
            placeholder="Search for Stock"
          />
        </View>
      </View>

      <View style={StockOrderStyle.categoriesContainer}>
        {displayData.length === 0 && searchQuery !== '' ? (
          <View>
            <Text style={StockOrderStyle.noCategoryText}>
              No matching products found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={displayData}
            renderItem={renderProductItem}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={ProductStockStyle.modalContainer}>
          <View style={ProductStockStyle.modalContent}>
            <Text style={ProductStockStyle.modalTitle1}>Enter Quantity</Text>
            {selectedProduct?.quantity == 0 ? (
              <Text style={ProductStockStyle.outOfStock}>Out Of Stock</Text>
            ) : (
              <View>
                <Text style={ProductStockStyle.modalTitle}>
                  Stock Available : {selectedProduct?.quantity}
                </Text>
                <Text style={ProductStockStyle.modalTitle}>
                  Pack Size : {selectedProduct?.packet_quantity}
                </Text>
              </View>
            )}

            <Text style={ProductStockStyle.modalTitle}>
              Product : {selectedProduct?.stock_sub_category}
            </Text>
            {selectedProduct?.quantity != 0 && (
              <View style={ProductStockStyle.quantityContainer}>
                <TouchableOpacity
                  onPress={decreaseQuantity}
                  style={ProductStockStyle.quantityButton}>
                  <Text style={ProductStockStyle.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <TextInput
                  style={ProductStockStyle.quantityInput}
                  value={String(quantity)}
                  onChangeText={text => setQuantity(Number(text))}
                  keyboardType="numeric"
                />

                <TouchableOpacity
                  onPress={increaseQuantity}
                  style={ProductStockStyle.quantityButton}>
                  <Text style={ProductStockStyle.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={ProductStockStyle.modalButtonRow}>
              <Button title="Close" onPress={closeModal} color="red" />
              <Button
                disabled={selectedProduct?.quantity == 0}
                title="Add to Cart"
                onPress={addToCart}
              />
            </View>
          </View>
        </View>
      </Modal>
      {displayData.some(item => item.type === 'stock_sub_category') && (
        <TouchableOpacity
          style={ProductStockStyle.fabButton}
          onPress={() => setCartModalVisible(true)}>
          <VectorIcon
            icon="FontAwesome"
            name="shopping-cart"
            size={30}
            color="#fff"
          />
          {totalQuantity > 0 && (
            <View style={ProductStockStyle.cartBadge}>
              <Text style={ProductStockStyle.cartBadgeText}>
                {totalQuantity}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      <Modal
        transparent={true}
        visible={cartModalVisible}
        animationType="slide"
        onRequestClose={() => setCartModalVisible(false)}>
        <View style={ProductStockStyle.modalContainer}>
          <View style={ProductStockStyle.modalContent1}>
            <View style={ProductStockStyle.cartLabelContainer}>
              <VectorIcon
                icon="FontAwesome5"
                name="shopping-cart"
                size={20}
                color={Colors.blue_theme_Color}
              />
              <Text style={ProductStockStyle.modalTitle1}>Cart</Text>
            </View>
            {cart.length > 0 ? (
              <FlatList
                data={cart}
                renderItem={renderCartItem}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>No product in Cart</Text>
              </View>
            )}
            {cart.length > 0 && (
              <View style={ProductStockStyle.totalAmountContainer}>
                <Text style={ProductStockStyle.totalAmountText}>
                  Total: ${totalAmount}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: 200,
              }}>
              <Button
                title="Close"
                onPress={() => setCartModalVisible(false)}
                color="red"
              />
              <Button title="Send Order" onPress={handleSubmit} color="green" />
            </View>
          </View>
        </View>
      </Modal>
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message="Order Sent Successfully!"
        okText="Ok"
        showCancelButton={false}
      />
      {SendOrderLoading && (
        <View style={ProductStockStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};

export default StockOrder;
