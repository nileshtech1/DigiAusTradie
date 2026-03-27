import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../ReusableComponent/Header';
import {WebView} from 'react-native-webview';
import Colors from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {expense_image, invoice_pdf_path} from '../../../Redux/NWConfig';
import { useNavigation } from '@react-navigation/native';
import { DeleteExpenseApi } from '../../../Redux/API/DeleteExpenseApi';
import { GetExpenseListApi } from '../../../Redux/API/GetExpenseListApi';
import Loader from '../../../ReusableComponent/Loader';

const ExpenseList = () => {
  const {ExpenseList} = useSelector(state => state.ExpenseListSlice);
  const {LoginData} = useSelector(state => state.Login);
  const {DeleteExpenseLoading} = useSelector(state => state.DeleteExpense);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const franchiseId = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = { franchise_id: franchiseId };
    dispatch(GetExpenseListApi({ token, franchiseid }));
  }, []);

  const handleEdit = expenseData => {
    navigation.navigate('EditExpense', { expense: expenseData });
  };

  const handleDelete = async (expenseData) => {
    const franchiseId = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = { franchise_id: franchiseId };
    const id = expenseData?.id;
  
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            const res = await dispatch(DeleteExpenseApi(id));
  
            if (res.payload.status === true) {
              // success case
              Alert.alert("Success", res.payload.message || "Expense deleted successfully");
              dispatch(GetExpenseListApi({ token, franchiseid }));
            } else {
              // failure case
              Alert.alert("Error", res.payload.message || "Something went wrong");
            }
          },
        },
      ]
    );
  };


  const openPdfModal = url => {
    setModalUrl(url);
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      setModalUrl('');
    }, 2000);
  };

  const renderExpenseItem = (row, index) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.vendorInfo}>
          <VectorIcon
            name="storefront-outline"
            size={24}
            color={Colors.blue_theme_Color}
          />
          <Text style={styles.paidToText}>
            {row.paid_to === null ? 'No Vendor' : row.paid_to}
          </Text>
        </View>
        <Text style={styles.costText}>${row.cost}</Text>
      </View>

      <View style={styles.cardBody}>
        <DetailRow icon="calendar-month-outline" text={row.date_paid} />
        <DetailRow icon="tag-outline" text={row.type_of_expense} />
        <DetailRow icon="text-box-outline" text={row.description} />
        <DetailRow icon="receipt" text={`GST: ${row.GST ? 'Yes' : 'No'}`} />
      </View>

      {row.expense_image && (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: expense_image + row?.expense_image}}
            style={styles.image}
          />
        </View>
      )}

      <View style={styles.cardFooter}>
        {row.invoice_pdf &&
          <TouchableOpacity
            disabled={
              row.invoice_pdf == null ||
              row.invoice_pdf == '' ||
              row.invoice_pdf == '0'
            }
            style={styles.pdfButton}
            onPress={() => openPdfModal(invoice_pdf_path + row.invoice_pdf)}>
            <VectorIcon
              name="file-pdf-box"
              size={24}
              color={Colors.white_Icon_Color}
            />
            <Text style={styles.pdfText}>
              {row.invoice_pdf == null ||
              row.invoice_pdf == '' ||
              row.invoice_pdf == '0'
                ? 'No Invoice'
                : 'Download Invoice'}
            </Text>
          </TouchableOpacity>
       }

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleDelete(row)}>
          <VectorIcon
            name="delete-outline"
            size={24}
            color={Colors.red_crayola_color}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(row)}>
          <VectorIcon
            name="pencil-outline"
            size={24}
            color={Colors.blue_theme_Color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const DetailRow = ({icon, text}) => (
    <View style={styles.detailRow}>
      <VectorIcon name={icon} size={20} color="#8A8A8A" />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {ExpenseList?.xero_response && ExpenseList.xero_response.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {ExpenseList.xero_response.map((row, index) =>
            renderExpenseItem(row, index),
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No expenses found</Text>
        </View>
      )}
      <Loader visible={DeleteExpenseLoading} />


      {/* PDF Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <WebView
              source={{uri: modalUrl}}
              style={styles.webview}
              javaScriptEnabled={true}
              startInLoadingState={true}
            />
            <Text style={styles.modalText}>Downloading PDF...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.black_bg_Theme},
  contentContainer: {padding: 16, paddingBottom: 40},
  card: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 12,
  },
  vendorInfo: {flexDirection: 'row', alignItems: 'center'},
  paidToText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E0E0E0',
    marginLeft: 10,
  },
  costText: {fontSize: 22, fontWeight: 'bold', color: Colors.blue_theme_Color},
  cardBody: {marginBottom: 16},
  detailRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  detailText: {fontSize: 16, color: '#B0B0B0', marginLeft: 15},
  imageContainer: {marginVertical: 10},
  image: {width: 80, height: 80, borderRadius: 12},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  pdfText: {color: '#FFF', marginLeft: 10, fontSize: 16, fontWeight: '600'},
  editButton: {padding: 8, backgroundColor: '#2C2C2C', borderRadius: 20},
  emptyListContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyListText: {fontSize: 18, color: '#A0A0A0'},

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 200,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  webview: {width: 1, height: 1, opacity: 0},
  modalText: {fontSize: 16, color: '#000', margin: 10, textAlign: 'center'},
});
