import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Card} from 'react-native-paper';
import VectorIcon from '../../../../ReusableComponent/VectorIcon';
import Colors from '../../../../Assets/Style/Color';
import QuotesStyle from '../../../../utils/Stylesheet/QuotesStyle';
import {useSelector} from 'react-redux';
import moment from 'moment';

const QuoteCard = ({
  item,
  handleCardClick,
  handleEditClick,
  handleAddSchedule,
  handleEditStatus,
  capitalizeFirstLetter,
  getTotalPrice,
}) => {
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  

  return (
    <Card style={QuotesStyle.card}>
      <Card.Content>
        <View key={item.quotation_no}>
          <View style={QuotesStyle.cardRow}>
            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Customer</Text>
              <Text style={QuotesStyle.cardValue}>
                {capitalizeFirstLetter(item.customer_name)}
              </Text>
              <View style={QuotesStyle.locationContainer}>
                <VectorIcon
                  icon="Entypo"
                  name="location-pin"
                  size={14}
                  color={Colors.white_text_color}
                />
                <Text style={QuotesStyle.locationText}>
                  {item.category_address || 'item.category_address'}
                </Text>
              </View>
            </View>

            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Date</Text>
              <Text style={QuotesStyle.cardValue}>
                {moment(item?.created_at).format('DD MMM YYYY')}
              </Text>
            </View>

            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Amount</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={QuotesStyle.cardValue}>
                  ${getTotalPrice(item).total}
                </Text>
                {getTotalPrice(item).showPlus && (
                  <VectorIcon
                    icon="Feather"
                    name="plus"
                    size={14}
                    color={Colors.banana_Yellow_color}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={QuotesStyle.cardRow}>
            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Quote No</Text>
              <Text style={QuotesStyle.cardValue}>
                {item.quotation_serial_no || 'N/A'}
              </Text>
            </View>
            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Status</Text>
              <View style={{flexDirection: 'row'}}>
                {item.status?.toLowerCase() === 'sent' ? (
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => handleEditStatus(item)}>
                    <VectorIcon
                      icon="Feather"
                      name="edit"
                      size={14}
                      color={Colors.white_text_color}
                    />
                  </TouchableOpacity>
                ) : null}
                <Text
                  style={[
                    QuotesStyle.cardValue,
                    {
                      color:
                        item?.status?.toLowerCase() === 'accepted'
                          ? '#278824FF'
                          : item?.status?.toLowerCase() === 'draft'
                          ? '#C2BFBFFF'
                          : item?.status?.toLowerCase() === 'sent'
                          ? '#D4B506FF'
                          : 'red',
                    },
                  ]}>
                  {item?.status || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={QuotesStyle.cardItem}>
              <Text style={QuotesStyle.cardLabel}>Category</Text>
              <Text style={QuotesStyle.cardValue}>
                {capitalizeFirstLetter(item?.category_type)}
              </Text>
            </View>
          </View>
          {InvoiceList?.Invoices?.some(
            invoice =>
              invoice?.reference === item?.quotation_serial_no ||
              invoice?.reference === item?.quotation_no,
          ) ? (
            <View style={QuotesStyle.cardRowNew}>
              <Button
                style={QuotesStyle.cardItem1}
                mode="text"
                icon="eye"
                textColor="#ffffff"
                onPress={() => handleCardClick(item)}>
                <Text style={QuotesStyle.cardLabel1}>View</Text>
              </Button>
              <Button
                style={QuotesStyle.invoicedButton}
                mode="text"
                icon="lock"
                textColor="#ffffff">
                <Text style={QuotesStyle.cardLabel1}>Invoiced</Text>
              </Button>
            </View>
          ) : (
            <View style={QuotesStyle.cardRow}>
            <Button
              style={QuotesStyle.cardItem1}
              mode="text"
              icon="eye"
              textColor="#ffffff"
              onPress={() => handleCardClick(item)}>
              <Text style={QuotesStyle.cardLabel1}>View</Text>
            </Button>
          
            <Button
              style={
                ['declined', 'deleted'].includes(item?.status?.toLowerCase())
                  ? QuotesStyle.disabledButton
                  : QuotesStyle.cardItem1
              }
              mode="text"
              icon={
                ['declined', 'deleted'].includes(item?.status?.toLowerCase())
                  ? 'lock'
                  : 'pencil'
              }
              disabled={['declined', 'deleted'].includes(item?.status?.toLowerCase())}
              textColor="#ffffff"
              onPress={() => handleEditClick(item)}>
              <Text style={QuotesStyle.cardLabel1}>Edit</Text>
            </Button>
          
            <Button
              style={
                ['declined', 'deleted'].includes(item?.status?.toLowerCase())
                  ? QuotesStyle.disabledButton
                  : QuotesStyle.cardItem1
              }
              mode="text"
              icon={
                ['declined', 'deleted'].includes(item?.status?.toLowerCase())
                  ? 'lock'
                  : 'plus'
              }
              textColor="#ffffff"
              disabled={['declined', 'deleted'].includes(item?.status?.toLowerCase())}
              onPress={() => handleAddSchedule(item)}>
              <Text style={QuotesStyle.cardLabel1}>Schedule</Text>
            </Button>
          </View>
          
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

export default QuoteCard;
