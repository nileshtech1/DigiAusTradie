// TimerModal.js
import React from 'react';
import {Modal, View, Text, TimeModalStyleheet, TouchableOpacity} from 'react-native';
import {Title} from 'react-native-paper';
import Colors from '../Assets/Style/Color';
import TimeModalStyle from '../utils/Stylesheet/TimeModalStyle';

const TimerModal = ({
  visible,
  elapsedTime,
  onStop,
  onPause,
  onStart,
  showButton,
}) => {
  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onStop}>
      <View style={TimeModalStyle.modalContainer}>
        <View style={TimeModalStyle.modalContent}>
          {/* <View style={TimeModalStyle.row}>
          <View>
          <Text style={TimeModalStyle.Date}>19-Dec-2024</Text>
          <Text style={TimeModalStyle.Day}>Thursday</Text>
          </View>
          <View>
          <Text style={TimeModalStyle.Title}>Job-1/5</Text>
          <Text style={TimeModalStyle.CustomerName}>John Doe</Text>
          </View>
          </View> */}
          <Text style={TimeModalStyle.timerText}>{formatTime(elapsedTime)}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {showButton ? (
              <TouchableOpacity style={TimeModalStyle.stopButtonresume} onPress={onStart}>
                <Text style={TimeModalStyle.stopButtonText}>Resume</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={TimeModalStyle.stopButtonPause} onPress={onPause}>
                <Text style={TimeModalStyle.stopButtonText}>Pause</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={TimeModalStyle.stopButton} onPress={onStop}>
              <Text style={TimeModalStyle.stopButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default TimerModal;
