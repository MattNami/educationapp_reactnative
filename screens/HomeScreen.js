import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '../components/headerText';
import { getLocalGreeting } from '../utils/helpers';
import { images } from '../assets';
import SearchInput from '../components/home/searchInput';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import { themeColors } from '../theme';
import TeacherItem from '../components/home/teacherItem';
import {
  areaFilters,
  institutionData,
  subjectFilters,
  teacherData,
} from '../assets/data/data';
import InstitutionItem from '../components/home/institutionItem';
import SectionHeader from '../components/home/sectionHeader';
import AreaFilter from '../components/home/areaFilter';
import SubjectFilter from '../components/home/subjectFilter';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { avatar } = images;
const { width } = Dimensions.get('window');

const generateUniqueKey = (prefix, index) => {
  return `${prefix}-${index}-${Math.random().toString(36).substr(2, 9)}`;
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Dhammaan Koorsooyinka');
  const [selectedArea, setSelectedArea] = useState(null);
  const [teachers, setTeachers] = useState(teacherData);
  const [institutions, setInstitutions] = useState(
    institutionData.map((inst, index) => ({
      ...inst,
      id: inst.id || generateUniqueKey('inst', index)
    }))
  );
  const [teachersFilterVisible, setTeachersFilterVisible] = useState(false);

  const getLocalGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Subax wanaagsan';
    if (hour < 18) return 'Galab wanaagsan';
    return 'Habeen wanaagsan';
  };

  const toggleTeachersFilter = () => {
    setTeachersFilterVisible(!teachersFilterVisible);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    // Here you would typically filter your data based on the selected area
    console.log('Selected area:', area);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    if (subject === 'Dhammaan Koorsooyinka') {
      setTeachers(teacherData);
    } else {
      const filteredTeachers = teacherData.filter(
        (teacher) => teacher.subject.toLowerCase() === subject.toLowerCase()
      );
      setTeachers(filteredTeachers);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    
    if (query === '') {
      setTeachers(teacherData);
      setInstitutions(institutionData);
      return;
    }

    const filteredTeachers = teacherData.filter(
      (teacher) =>
        teacher.name?.toLowerCase().includes(lowerCaseQuery) ||
        teacher.subject?.toLowerCase().includes(lowerCaseQuery)
    );
    
    const filteredInstitutions = institutionData.filter(
      (institution) =>
        institution.name?.toLowerCase().includes(lowerCaseQuery) ||
        institution.field?.toLowerCase().includes(lowerCaseQuery) ||
        institution.description?.toLowerCase().includes(lowerCaseQuery)
    );
    
    setTeachers(filteredTeachers);
    setInstitutions(filteredInstitutions);
  };

  const handleSearchSubmit = () => {
    // The search is already handled in handleSearch as the user types
    // This is just a placeholder if you want to add any additional logic on submit
    console.log('Search submitted:', searchQuery);
  };

  return (
    <SafeAreaView className="bg-bgWhite px-7 pt-5 pb-[-35px] flex-1">
      {/* Header Area */}
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="font-exo font-semibold text-lg">{getLocalGreeting()}</Text>
          <Text className="font-exo font-semibold text-lg">Ismigaaga</Text>
        </View>
        <View className="bg-bgWhite shadow-xl rounded-xl">
          <Image source={avatar} style={{ height: 62, width: 62 }} />
        </View>
      </View>

      {/* Search Bar */}
      <View className="mt-4 px-4">
        <View className="flex-row items-center">
          {/* Search Icon */}
          <View className="absolute left-4 z-10">
            <MagnifyingGlassIcon size={20} color={themeColors.lightGrayText} />
          </View>
          
          {/* Search Input */}
          <TextInput
            className="flex-1 font-exo font-semibold text-black text-base h-12 bg-white rounded-lg pl-12 pr-4 shadow"
            placeholder="Raadi barayaal, dugsiyo, ama koorsooyin"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          
          {/* Filter Button */}
          <Pressable 
            className="ml-3 p-2 bg-white rounded-lg shadow"
            onPress={toggleTeachersFilter}
          >
            <AdjustmentsVerticalIcon 
              size={24} 
              color={teachersFilterVisible ? themeColors.bgPurple : themeColors.darkGrayText}
            />
          </Pressable>
        </View>
      </View>

      {/* Teachers Section */}
      <View className="mt-2">
        <SectionHeader
          title={'Baraayaasha Caanka ah'}
          onFilterPress={toggleTeachersFilter}
          tintColor={
            teachersFilterVisible
              ? themeColors.bgPurple
              : themeColors.lightGrayText
          }
        />

        {teachersFilterVisible && (
          <View className="flex flex-col my-5 space-y-2">
            <View className="mt-4">
              <AreaFilter onAreaSelect={handleAreaSelect} />
            </View>
            <View className="mt-2">
              <SubjectFilter 
                filters={subjectFilters} 
                onSubjectSelect={handleSubjectSelect} 
              />
            </View>
          </View>
        )}

        <FlatList
          data={teachers}
          horizontal={true}
          className="w-full py-4 bg-transparent"
          renderItem={({ item, index }) => (
            <TeacherItem 
              key={`teacher-${item.id || index}`}
              teacher={item} 
            />
          )}
          keyExtractor={(item, index) => `teacher-${item.id || index}`}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View className="py-4">
              <Text className="text-center text-gray-500">Lama helin barayaal la rabay</Text>
            </View>
          }
        />
      </View>

      {/* Institutions Section */}
      <View className="mt-8 mb-6">
        <SectionHeader 
          title="Masaajid iyo Dugsiyo" 
          showFilter={false} 
        />
        <FlatList
          data={institutions}
          horizontal={true}
          className="w-full py-4 bg-transparent"
          renderItem={({ item, index }) => (
            <InstitutionItem 
              key={`institution-${item.id || index}`}
              institution={item} 
            />
          )}
          keyExtractor={(item, index) => `institution-${item.id || index}`}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View className="py-4">
              <Text className="text-center text-gray-500">Masaajid ama dugsi lama helin</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
