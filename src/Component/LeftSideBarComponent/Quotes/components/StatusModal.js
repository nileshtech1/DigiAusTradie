import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import QuotesStyle from '../../../../utils/Stylesheet/QuotesStyle';

const StatusModal = ({
  isStatusModalVisible,
  setIsStatusModalVisible,
  acceptedChecked,
  setAcceptedChecked,
  rejectedChecked,
  setRejectedChecked,
  handleChangeStatus,
}) => {
  if (!isStatusModalVisible) return null;

  return (
    <View style={QuotesStyle.modalContainer}>
      <View style={QuotesStyle.modalContent}>
        <Text style={QuotesStyle.cardLabel}>Edit Status</Text>

        <View style={QuotesStyle.checkboxContainer}>
          <View style={QuotesStyle.checkboxItem}>
            <Checkbox
              status={acceptedChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setAcceptedChecked(!acceptedChecked);
                setRejectedChecked(false);
              }}
            />
            <Text style={QuotesStyle.statusText}>Accepted</Text>
          </View>

          <View style={QuotesStyle.checkboxItem}>
            <Checkbox
              status={rejectedChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setRejectedChecked(!rejectedChecked);
                setAcceptedChecked(false);
              }}
            />
            <Text style={QuotesStyle.statusText}>Declined</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => setIsStatusModalVisible(false)}
            style={QuotesStyle.Button1}>
            <Text style={QuotesStyle.modalButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChangeStatus}
            style={QuotesStyle.Button2}>
            <Text style={QuotesStyle.modalButtonText}>Change Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StatusModal;