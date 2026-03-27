import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Colors from '../Assets/Style/Color';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 40;

const hours = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

const minutes = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
  '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
];

const meridiem = ['AM', 'PM'];

const parseSelectedTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') {
    return { hour: '12', minute: '00', meridiem: 'AM' };
  }

  const cleanTimeStr = timeStr.replace(/\s+/g, ' ').trim();

  const parts = cleanTimeStr.split(' ');
  if (parts.length !== 2) return { hour: '12', minute: '00', meridiem: 'AM' };

  const [time, mer] = parts;
  const [h, m] = time.split(':');

  if (!h || !m || !mer) return { hour: '12', minute: '00', meridiem: 'AM' };

  let parsedHour = h.padStart(2, '0');
  if (!hours.includes(parsedHour)) {
       const hourInt = parseInt(h, 10);
       if (mer.toUpperCase() === 'AM' && hourInt === 0) {
           parsedHour = '12';
       } else if (mer.toUpperCase() === 'PM' && hourInt === 0) {
            parsedHour = '12';
       } else if (hourInt >= 1 && hourInt <= 12) {
           parsedHour = h.padStart(2, '0');
       } else {
           parsedHour = '12';
       }
   }

  return {
    hour: parsedHour,
    minute: m.padStart(2, '0'),
    meridiem: mer.toUpperCase() === 'PM' ? 'PM' : 'AM',
  };
};

const CustomTimePicker = ({
  visible,
  onClose,
  onConfirm,
  selectedTime,
}) => {
  const { hour: defaultHour, minute: defaultMinute, meridiem: defaultMeridiem } = parseSelectedTime(selectedTime);

  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute);
  const [ampm, setAmPm] = useState(defaultMeridiem);

  const initializeTime = useCallback(() => {
    const { hour, minute, meridiem } = parseSelectedTime(selectedTime);
    setHour(hour);
    setMinute(minute);
    setAmPm(meridiem);
  }, [selectedTime]);

  useEffect(() => {
    if (visible) {
      initializeTime();
    }
  }, [visible, initializeTime]);

  const confirmTime = () => {
    const finalTime = `${hour}:${minute} ${ampm}`;
    onConfirm(finalTime);
    onClose();
  };

  const hourListRef = React.useRef(null);
  const minuteListRef = React.useRef(null);
  const ampmListRef = React.useRef(null);

  useEffect(() => {
      if (visible) {
          const timer = setTimeout(() => {
              const hourIndex = hours.findIndex(i => i === hour);
              if (hourIndex !== -1 && hourListRef.current) {
                  hourListRef.current.scrollToIndex({ index: hourIndex, animated: false });
              }

              const minuteIndex = minutes.findIndex(i => i === minute);
               if (minuteIndex !== -1 && minuteListRef.current) {
                  minuteListRef.current.scrollToIndex({ index: minuteIndex, animated: false });
              }

               const ampmIndex = meridiem.findIndex(i => i === ampm);
               if (ampmIndex !== -1 && ampmListRef.current) {
                  ampmListRef.current.scrollToIndex({ index: ampmIndex, animated: false });
              }
          }, 100);

          return () => clearTimeout(timer);
      }
  }, [visible, hour, minute, ampm]);


  const renderColumn = (data, selectedValue, onChange, listRef) => (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item) => item}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => {
          if (info?.flatListRef) {
             info.flatListRef.scrollToIndex({ index: info?.index || 0, animated: true });
          } else if (listRef?.current) {
             listRef.current.scrollToIndex({ index: info?.index || 0, animated: true });
          }
        }, 100);
      }}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={(event) => {
        const index = Math.round(
          event.nativeEvent.contentOffset.y / ITEM_HEIGHT
        );
        if (index >= 0 && index < data.length) {
             onChange(data[index]);
        } else {
            console.warn("Scroll ended out of bounds");
        }
      }}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={[
            styles.itemText,
            item === selectedValue && styles.selectedItemText
          ]}>
            {item}
          </Text>
        </View>
      )}
    />
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Time</Text>
          <View style={styles.columns}>
            {renderColumn(hours, hour, setHour, hourListRef)}
            {renderColumn(minutes, minute, setMinute, minuteListRef)}
            {renderColumn(meridiem, ampm, setAmPm, ampmListRef)}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmTime}>
              <Text style={styles.confirm}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: Colors.black_bg_Theme,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 20,
    borderColor: Colors.white_Icon_Color,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    color: Colors.white_text_color,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  list: {
    height: ITEM_HEIGHT * 5,
  },
  listContent: {
    paddingVertical: ITEM_HEIGHT * 2,
    alignItems: 'center',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    color: Colors.white_text_color,
  },
  selectedItemText: {
    color: Colors.black_text_color,
    backgroundColor: Colors.Neon_Blue_Theme_Color,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancel: {
    backgroundColor: Colors.grey_bg_Color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: Colors.white_text_color,
    fontSize: 16,
    borderRadius: 10,
    overflow: 'hidden'
  },
  confirm: {
    backgroundColor: Colors.grey_bg_Color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: Colors.Neon_Blue_Theme_Color,
    fontSize: 16,
    borderRadius: 10,
    overflow: 'hidden'
  },
});

export default CustomTimePicker;