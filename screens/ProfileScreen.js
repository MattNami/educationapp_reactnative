import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Mock user data
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserData({
        name: 'Iman Abdukadir Abdullahi ',
        email: 'mattbrydengregorbhai@gmail.com',
        grade: 'Fasalka 12aad',
        avatar: require('../assets/images/avatar.png'),
        stats: {
          lessons: 42,
          hours: 128,
          rating: 4.8
        }
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuPress = (screen) => {
    switch(screen) {
      case 'MyLearning':
        Alert.alert('Barashadayda', 'Halkan waxaad arki kartaa dhammaan barashadaada');
        break;
      case 'Schedule':
        Alert.alert('Jadwalka', 'Halkan waxaad aragtaa jadwalkaaga barashada');
        break;
      case 'Achievements':
        Alert.alert('Guulaha', 'Halkan waxaad aragtaa guulahaaga');
        break;
      case 'Help':
        Alert.alert('Ilaali & Gargaar', 'Halkan ka hel gargaar iyo caawimaad');
        break;
      case 'Logout':
        Alert.alert(
          'Ka bax',
          'Ma hubtaa inaad rabto inaad ka baxdo?',
          [
            {
              text: 'Jooji',
              style: 'cancel',
            },
            {
              text: 'Haa, ka bax',
              onPress: () => {
                // Handle logout logic here
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              },
            },
          ]
        );
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#6C63FF', '#8A7CFF']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Boggaaga</Text>
        </LinearGradient>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={userData.avatar} 
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userGrade}>{userData.grade}</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.lessons}</Text>
              <Text style={styles.statLabel}>Darsad</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.hours}</Text>
              <Text style={styles.statLabel}>Saacado</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.rating}</Text>
              <Text style={styles.statLabel}>Qiimaynta</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuPress('MyLearning')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.menuIconText}>📚</Text>
            </View>
            <Text style={styles.menuText}>Barashadayda</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuPress('Schedule')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.menuIconText}>📅</Text>
            </View>
            <Text style={styles.menuText}>Jadwalka</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuPress('Achievements')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FFD166' }]}>
              <Text style={styles.menuIconText}>🏆</Text>
            </View>
            <Text style={styles.menuText}>Guulaha</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuPress('Help')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#7E57C2' }]}>
              <Text style={styles.menuIconText}>❓</Text>
            </View>
            <Text style={styles.menuText}>Ilaali & Gargaar</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutButton]}
            onPress={() => handleMenuPress('Logout')}
          >
            <View style={[styles.menuIcon, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.menuIconText}>🚪</Text>
            </View>
            <Text style={[styles.menuText, { color: '#FF6B6B' }]}>Ka bax</Text>
            <Text style={[styles.menuArrow, { color: '#FF6B6B' }]}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  headerGradient: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: -60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: -70,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#364356',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#636D77',
    marginTop: 5,
  },
  userGrade: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginVertical: 10,
    backgroundColor: '#F0F2FF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F2FF',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#364356',
  },
  statLabel: {
    fontSize: 12,
    color: '#636D77',
    marginTop: 5,
  },
  menuContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#364356',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#FFF5F5',
  },
});

export default ProfileScreen;
