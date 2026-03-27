import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../../../Assets/Style/Color';
import Header from '../../../ReusableComponent/Header';

const FreeDirectory = () => {
  const [form, setForm] = useState({
    name: '',
    trade: '',
    contact: '',
    abn: '',
    suburb: '',
    gst: '',
    rating: '',
    photo: null,
    workImages: [],
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const pickSingleImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.assets?.length > 0) {
        setForm({ ...form, photo: response.assets[0] });
      }
    });
  };

  const pickMultipleImages = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, selectionLimit: 5 },
      (response) => {
        if (response.assets?.length > 0) {
          setForm({ ...form, workImages: response.assets });
        }
      }
    );
  };

  const handleSubmit = () => {
    // console.log('Form Data:', form);
  };

  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Free Tradie Directory</Text>

        {[
          { label: 'Business Name', field: 'name' },
          { label: 'Trade Type', field: 'trade' },
          { label: 'Contact Number', field: 'contact', keyboardType: 'phone-pad' },
          { label: 'ABN', field: 'abn' },
          { label: 'Suburb', field: 'suburb' },
          { label: 'GST (Registered / Not Registered)', field: 'gst' },
          { label: 'Rating', field: 'rating', keyboardType: 'numeric' },
        ].map((input, idx) => (
          <TextInput
            key={idx}
            label={input.label}
            value={form[input.field]}
            onChangeText={(text) => handleChange(input.field, text)}
            mode="outlined"
            style={styles.input}
            keyboardType={input.keyboardType || 'default'}
            theme={{
              colors: {
                primary: Colors.blue_theme_Color,
                text: Colors.white_text_color,
                placeholder: '#888',
                background: Colors.black_bg_Theme,
              },
            }}
          />
        ))}

        <TouchableOpacity style={styles.uploadBox} onPress={pickSingleImage}>
          {form.photo ? (
            <Image source={{ uri: form.photo.uri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.uploadText}>+ Upload Business Photo</Text>
          )}
        </TouchableOpacity>

        {/* Work Images Upload */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickMultipleImages}>
          <Text style={styles.uploadText}>+ Upload Work Images (Max 5)</Text>
        </TouchableOpacity>

        <View style={styles.imagesContainer}>
          {form.workImages.map((img, idx) => (
            <Image key={idx} source={{ uri: img.uri }} style={styles.workImage} />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          buttonColor={Colors.blue_theme_Color}
          textColor="#fff"
        >
          Save
        </Button>
      </ScrollView>
    </View>
  );
};

export default FreeDirectory;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.white_text_color,
    textAlign: 'center',
  },
  input: {
    marginBottom: 14,
    backgroundColor: Colors.black_bg_Theme,
    borderRadius: 8,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.blue_theme_Color,
    borderRadius: 12,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    backgroundColor: '#1c1c1e',
  },
  uploadText: {
    color: '#999',
    fontSize: 15,
  },
  imagePreview: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  workImage: {
    width: 85,
    height: 85,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.blue_theme_Color,
  },
  button: {
    marginTop: 25,
    borderRadius: 10,
    paddingVertical: 6,
  },
});
