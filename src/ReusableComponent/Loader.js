import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const Loader = ({ visible, message = "Loading..." }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  loaderBox: {
    padding: 25,
    backgroundColor: "#222",
    borderRadius: 12,
    alignItems: "center",
    minWidth: 180,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default Loader;
