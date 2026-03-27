import React from 'react';
import {
    Modal,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native';
import VectorIcon from './VectorIcon';

const DropdownList = ({
    isVisible,
    toggleDropdown,
    data,
    searchQuery,
    setSearchQuery,
    onSelect
}) => {
    const filteredData = data.filter(item =>
        item?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 === 0 ? 'white' : '#f2f2f2';

        return (
            <TouchableOpacity onPress={() => onSelect(item)} style={[styles.modalItem, { backgroundColor }]}> 
                <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={toggleDropdown}
        >
            <StatusBar barStyle="light-content" backgroundColor='#010742DA' />
            <TouchableWithoutFeedback onPress={toggleDropdown}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.searchInputContainer}>
                            <VectorIcon icon='FontAwesome' name='search' color='black' size={20} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchQuery}
                                placeholderTextColor='#000'
                                onChangeText={setSearchQuery}
                            />
                        </View>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        maxHeight: 400,
        padding: 20,
        borderRadius: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        height: 40,
        flex: 1,
        paddingRight: 10,
        color: '#000'
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: 14,
        fontFamily: 'serif',
    },
});

export default DropdownList;
