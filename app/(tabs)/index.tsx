import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

const recentRides = [
  {
    id: '1',
    from: 'Delhi',
    to: 'Jaipur',
    date: '10 May, 2024',
    status: 'Completed',
    price: '₹499',
  },
  {
    id: '2',
    from: 'Mumbai',
    to: 'Pune',
    date: '8 May, 2024',
    status: 'Completed',
    price: '₹299',
  },
];

const upcomingRides = [
  {
    id: '1',
    from: 'Bangalore',
    to: 'Chennai',
    date: '15 May, 2024',
    time: '10:00 AM',
    seats: 3,
    price: '₹799',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>Devansh B</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Where do you want to go?"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Rides</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingRides.map(ride => (
            <TouchableOpacity
              key={ride.id}
              style={styles.rideCard}
              onPress={() => router.push('/')}
            >
              <View style={styles.rideHeader}>
                <View style={styles.rideLocations}>
                  <View style={styles.locationDot} />
                  <View style={styles.locationLine} />
                  <View style={[styles.locationDot, styles.locationDotEnd]} />
                </View>
                <View style={styles.rideDetails}>
                  <Text style={styles.rideText}>{ride.from}</Text>
                  <Text style={styles.rideTime}>{ride.time}</Text>
                  <Text style={styles.rideText}>{ride.to}</Text>
                </View>
              </View>
              <View style={styles.rideFooter}>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                  <Text style={styles.rideSeats}>{ride.seats} seats left</Text>
                </View>
                <Text style={styles.ridePrice}>{ride.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Rides</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentRides.map(ride => (
            <TouchableOpacity key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideLocations}>
                  <View style={styles.locationDot} />
                  <View style={styles.locationLine} />
                  <View style={[styles.locationDot, styles.locationDotEnd]} />
                </View>
                <View style={styles.rideDetails}>
                  <Text style={styles.rideText}>{ride.from}</Text>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                  <Text style={styles.rideText}>{ride.to}</Text>
                </View>
              </View>
              <View style={styles.rideFooter}>
                <Text style={styles.rideStatus}>{ride.status}</Text>
                <Text style={styles.ridePrice}>{ride.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FBFAF6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#20382F',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20382F',
  },
  seeAll: {
    fontSize: 14,
    color: '#006AFF',
  },
  rideCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rideHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rideLocations: {
    marginRight: 12,
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006AFF',
  },
  locationDotEnd: {
    backgroundColor: '#FF3B30',
  },
  locationLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  rideDetails: {
    flex: 1,
  },
  rideText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#20382F',
  },
  rideTime: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideSeats: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  rideStatus: {
    fontSize: 14,
    color: '#4CAF50',
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#006AFF',
  },
 
}); 


