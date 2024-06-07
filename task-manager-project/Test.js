import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DoneIcon from 'react-native-vector-icons/MaterialIcons';
import NotDoneIcon from 'react-native-vector-icons/MaterialIcons';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import ExitIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListIcon from 'react-native-vector-icons/FontAwesome6';
import styles from './styles';

const Test = () => {
  //display the data using get method
  const [showData, setShowData] = useState([]);
  const [addTask, setAddTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(false);

  //modals usestates
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditShowModal] = useState(false);

  // Function to fetch data from API using axios (db.json)
  const displayAPIData = async () => {
    try {
      const url = 'http://192.168.0.93:3000/todos';
      let results = await axios.get(url);
      setShowData(results.data.reverse());
    } catch (error) {
      console.error('Error Fetching Data', error);
    }
  };
  useEffect(() => {
    displayAPIData();
  }, []);

  // Function to send data to (db.json) Json-Server API using axios
  // Axios Post Method
  const flatListRef = React.useRef();
  const sendAPIData = async () => {
    if (!addTask.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }
    setLoading(true);
    try {
      const url = 'http://192.168.0.93:3000/todos';
      let results = await axios.post(url, {title: addTask, completed: false});
      const data = results.data;
      if (data) {
        setShowData([data, ...showData]);
        setAddTask('');
        setShowModal(false);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }
    } catch (error) {
      console.error('Error adding data', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update(Edit) data using axios
  //Put Method

  const updateAPIData = async () => {
    if (!addTask.trim()) {
      Alert.alert('Task cannot be empty');
      return;
    }
    setLoading(true);
    try {
      const url = `http://192.168.0.93:3000/todos/${editTask.id}`;
      let results = await axios.put(url, {
        title: addTask,
        completed: editTask.completed,
      });
      const updatedTask = results.data;
      if (updatedTask) {
        setShowData(
          showData.map(task =>
            task.id === updatedTask.id ? updatedTask : task,
          ),
        );
        setEditTask(null);
        setAddTask('');
        setEditShowModal(false);
      }
    } catch (error) {
      console.error('Error updating data', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User function
  // Axios Delete Request
  const deleteUserTask = async id => {
    setLoading(true);
    try {
      const url = `http://192.168.0.93:3000/todos/${id}`;
      let results = await axios.delete(url);
      const data = results.data;
      if (data) {
        Alert.alert('Task deleted successfully');
        displayAPIData();
      }
    } catch (error) {
      console.error('Error deleting user', error);
    } finally {
      setLoading(false);
    }
  };

  // Flatlist render component
  const Item = ({title, task, id}) => {
    //Fucntion to update the task has completed or not using axios
    // Put Method (complete task to true  || false)

    const updateTaskStatus = async () => {
      try {
        const url = `http://192.168.0.93:3000/todos/${id}`;
        await axios.patch(url, {completed: !task});
        const updatedData = showData.map(item => {
          if (item.id === id) {
            return {...item, completed: !task};
          } else {
            return item;
          }
        });
        setShowData(updatedData);
      } catch (error) {
        console.error('Error updating task status ', error);
      }
    };

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: task ? '#a7c957' : '#fff',
            borderWidth: 1,
            borderColor: task ? '#f8f7ff' : '#c1121f',
          },
        ]}>
        <View style={styles.taskContainer}>
          <Text style={[styles.tasks, {color: task ? '#fff' : '#000'}]}>
            {title}
          </Text>
        </View>
        <View style={styles.iconsCentered}>
          <TouchableOpacity
            style={styles.iconsCentered}
            onPress={updateTaskStatus}>
            {task ? (
              <DoneIcon
                name="done"
                size={25}
                color="green"
                style={{marginRight: 10}}
              />
            ) : (
              <NotDoneIcon
                name="remove-done"
                size={25}
                color="#c1121f"
                style={{marginRight: 10}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconsCentered}
            onPress={() => {
              setEditTask({id, title, completed: task});
              setAddTask(title);
              setEditShowModal(true);
            }}>
            <EditIcon
              name="edit"
              size={20}
              color="#000"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconsCentered}
            onPress={() => deleteUserTask(id)}>
            <DeleteIcon name="delete" size={25} color="#c1121f" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return <Item title={item.title} task={item.completed} id={item.id} />;
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerCentered}>
        <View style={styles.listIconContainer}>
          <ListIcon color="green" size={30} name="clipboard-list" />
        </View>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity style={styles.listIconContainer}>
          <ExitIcon color="#c1121f" size={30} name="exit-to-app" />
        </TouchableOpacity>
      </View>
      {/* header ends here */}

      {/* displaying data using flatlist */}
      <FlatList
        ref={flatListRef}
        data={showData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {showModal || editModal ? null : (
        <TouchableOpacity
          style={styles.addBtnContainer}
          onPress={() => {
            setShowModal(true);
          }}>
          <Text style={styles.btnTxt}>Add a new task</Text>
        </TouchableOpacity>
      )}

      {/* Add a new task Modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalCentered}>
          <View style={styles.modalSize}>
            <TextInput
              placeholder="Add a Task..."
              autoCapitalize="none"
              style={styles.inputField}
              value={addTask}
              onChangeText={text => {
                setAddTask(text);
              }}
            />
            <View style={styles.modalBtnCentered}>
              <TouchableOpacity
                style={styles.cancelBtnModal}
                onPress={() => setShowModal(false)}>
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtnModal}
                onPress={sendAPIData}>
                <Text style={styles.modalBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#a7c957" />
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit task modal */}
      <Modal visible={editModal} transparent={true} animationType="slide">
        <View style={styles.modalCentered}>
          <View style={styles.modalSize}>
            <TextInput
              placeholder="Edit this Task..."
              style={styles.inputField}
              value={addTask}
              onChangeText={text => {
                setAddTask(text);
              }}
            />
            <View style={styles.modalBtnCentered}>
              <TouchableOpacity
                style={styles.cancelBtnModal}
                onPress={() => {
                  setEditTask(null);
                  setAddTask('');
                  setEditShowModal(false);
                }}>
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtnModal}
                onPress={updateAPIData}>
                <Text style={styles.modalBtnText}>Update</Text>
              </TouchableOpacity>
            </View>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#a7c957" />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Test;
