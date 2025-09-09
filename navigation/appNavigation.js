import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SelectGradeScreen from '../screens/SelectGradeScreen';
import SelectProvinceScreen from '../screens/SelectProvinceScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import StreamScreen from '../screens/StreamScreen';
import ClassWorkScreen from '../screens/ClassWorkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { themeColors } from '../theme';
import { images } from '../assets';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import PlacesScreen from '../screens/PlacesScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ExamsScreen from '../screens/ExamsScreen';
import TimetableScreen from '../screens/TimetableScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

{
  /** ============== App Navigator =================== */
}
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SelectGrade" component={SelectGradeScreen} />
      <Stack.Screen name="SelectProvince" component={SelectProvinceScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.bgPurple,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Hoyga',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Timetable"
        component={TimetableScreen}
        options={{
          tabBarLabel: 'Jadwalka',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          tabBarLabel: 'Istaagista',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Exams"
        component={ExamsScreen}
        options={{
          tabBarLabel: 'Imtixaanada',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Xogtaada',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.profileIconContainer}>
              <Image
                source={images.avatar}
                style={[
                  styles.profileIcon,
                  { borderColor: color, width: size, height: size }
                ]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  profileIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    borderRadius: 15,
    borderWidth: 2,
  },
});

export default AppNavigation;
