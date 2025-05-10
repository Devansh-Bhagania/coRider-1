import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const API_URL = 'https://qa.corider.in/assignment/chat';

export default function ChatScreen() {
  const currentUserId = 'me';
  const [tripName, setTripName] = useState('');
  const [tripFrom, setTripFrom] = useState('');
  const [tripTo, setTripTo] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFloatingPadVisible, setIsFloatingPadVisible] = useState(false);


  const scrollFlag = useRef(false);

  const fetchChats = useCallback(async (pageToLoad) => {
    if (loading || allLoaded) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`${API_URL}?page=${pageToLoad}`);
      const { chats = [], name, from, to } = data;

      if (pageToLoad === 0) {
        setTripName(name);
        setTripFrom(from);
        setTripTo(to);
      }

      if (!chats.length) {
        setAllLoaded(true);
      } else {

        const normalized = chats
          .map(c => ({
            id: c.id,
            message: c.message,
            time: c.time.split(' ')[1],
            rawTime: c.time.replace(' ', 'T'),
            avatar: c.sender.image,
            isMine: c.sender.self,
          }))
          .sort((a, b) => new Date(a.rawTime) - new Date(b.rawTime))
          .map(({ rawTime, ...rest }) => rest);

        if (pageToLoad === 0) {
          setMessages(normalized);
        } else {

          setMessages(prev => [...prev, ...normalized]);
        }
        setPage(pageToLoad);
      }
    } catch (err) {
      console.error('Failed to fetch chats', err);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded]);

  useEffect(() => { fetchChats(0); }, []);

  const renderItem = ({ item }) => (
    <View style={[
      styles.bubble,
      item.isMine ? styles.bubbleRight : styles.bubbleLeft
    ]}>
      {!item.isMine && item.avatar && (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      )}
      <View>
        <Text style={[
          styles.text,
          item.isMine && { color: '#fff' }
        ]}>
          {item.message.split('<br>').map((line, i, arr) => (
            <Text key={i}>
              {line}
              {i < arr.length - 1 && '\n'}
            </Text>
          ))}
        </Text>
        {/* <Text style={[
          styles.time,
          item.isMine && { color: '#ddd' }
        ]}>
          {item.time}
        </Text> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() =>
          router.push("/")
        }>
          <Ionicons name="arrow-back" size={24} color="#20382F" />
        </TouchableOpacity>
        <Text style={styles.title}>{tripName}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => { }}>
          <Feather name="edit-3" size={20} color="#20382F" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{ marginLeft: 16 }}
        >
          <Feather name="more-vertical" size={20} color="#20382F" />
        </TouchableOpacity>
      </View>


      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity style={styles.modalBg} onPress={() => setMenuVisible(false)} />
        <View style={styles.menu}>
          {['Members', 'Share Number', 'Report'].map((label, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <MaterialIcons
                name={
                  label === 'Members' ? 'people' :
                    label === 'Share Number' ? 'call' :
                      'report'
                }
                size={18}
                color="#20382F"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.menuText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>


      <View style={styles.tripInfo}>
        <View style={styles.avatars}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=17' }} style={styles.avatarSmall} />
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=32' }} style={[styles.avatarSmall, { left: 20 }]} />
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.tripText}>
            From <Text style={{ fontWeight: '700' }}>{tripFrom}</Text>
          </Text>
          <Text style={styles.tripText}>
            To   <Text style={{ fontWeight: '700' }}>{tripTo}</Text>
          </Text>
        </View>
      </View>


      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.sepText}>10 MAY, 2025</Text>
        <View style={styles.line} />
      </View>

      {/* CHAT */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ paddingBottom: 120 }}
        onScrollBeginDrag={() => { scrollFlag.current = true; }}
        onEndReached={() => {
          if (scrollFlag.current && !loading && !allLoaded) {
            fetchChats(page + 1);
            scrollFlag.current = false;
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />

      {/* ACTION PAD */}
      {isFloatingPadVisible && (
        <View style={styles.floatingPad}>
          {['camera', 'videocam', 'attach-file'].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.padBtn} onPress={() => { }}>
              <MaterialIcons name={icon} size={24} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* INPUT BAR */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Reply to @Rohit Yadav"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.attachIcon}
          onPress={() => setIsFloatingPadVisible(!isFloatingPadVisible)}
        >
          <Feather name="paperclip" size={20} color="#20382F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn}>
          <Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FBFAF6'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FBFAF6'
  },

  title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#20382F'
  },

  modalBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },

  menu: {
    position: 'absolute',
    top: 56,
    right: 16,
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    paddingVertical: 8
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12
  },

  menuText: {
    fontSize: 16,
    color: '#20382F'
  },

  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  avatars: {
    width: 44,
    height: 44,
    position: 'relative'
  },
  avatarSmall: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FBFAF6',
    top: 6,
    left: 0
  },

  tripText: {
    fontSize: 14,
    color: '#4A4A4A'
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9'
  },
  sepText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#9B9B9B'
  },

  bubble: {
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },

  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF'
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#006AFF'
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#20382F'
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    color: '#888'
  },
  floatingPad: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#006AFF',
    borderRadius: 32,
    padding: 4
  },
  padBtn: {
    padding: 8,
    marginHorizontal: 4
  },
  inputBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#EEE'
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 20
  },
  attachIcon: {
    marginLeft: 12
  },
  sendBtn: {
    marginLeft: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
