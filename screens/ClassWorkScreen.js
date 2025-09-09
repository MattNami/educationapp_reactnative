import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { themeColors } from '../theme';

const { width } = Dimensions.get('window');

// Mock data for assignments
const assignmentsData = [
  {
    id: '1',
    title: 'Layliyada Xisaabta',
    subject: 'Xisaab',
    dueDate: 'Maanta',
    points: 100,
    type: 'assignment',
    status: 'pending',
    description: 'Dhammee layliyada 1-10 ee qaybta 5aad. Hubi inaad dhamaystirto dhammaan su\'aalaha.',
    attachment: '📎 Qaybta5_Layliyada.pdf'
  },
  {
    id: '2',
    title: 'Mashruuc Sayniska',
    subject: 'Saynis',
    dueDate: '3 maalmood oo hadhay',
    points: 150,
    type: 'project',
    status: 'in-progress',
    description: 'Gudbi warqad cilmi-baaris oo ku saabsan cusboonaysiinta cimilada.',
    attachment: '📎 Qoraal_Cilmi-Baarista.docx'
  },
  {
    id: '3',
    title: 'Imtixaan Taariikhda',
    subject: 'Taariikh',
    dueDate: 'Maanta',
    points: 50,
    type: 'quiz',
    status: 'completed',
    score: '45/50',
    description: 'Dagaalkii Labaad Aduunka - Dhacdooyinka iyo Shakhsiyaadka Muhiimsan',
    attachment: '📊 Eeg Natiijooyinka'
  },
  {
    id: '4',
    title: 'Qoraal Suugaaneed',
    subject: 'Af Soomaaliga',
    dueDate: '3 maalmood oo hadhay',
    points: 80,
    type: 'essay',
    status: 'pending',
    description: 'Qor qoraal ku saabsan muhiimadda akhlaaqda bulshada. Ugu yaraan 3 warqadood.',
    attachment: '📝 Qaabka Qoraalka'
  },
  {
    id: '5',
    title: 'Tijaabo Kimistariga',
    subject: 'Kimistariga',
    dueDate: '5 maalmood oo hadhay',
    points: 120,
    type: 'lab',
    status: 'pending',
    description: 'Samee tijaabo ku saabsan sida asalka iyo cusla\'da u kala duwan yihiin. Qor warbixin dheeraad ah.',
    attachment: '🧪 Qaabka Warbixinta Tijaabadaha'
  },
  {
    id: '6',
    title: 'English Research Paper',
    subject: 'English',
    dueDate: '4 days left',
    points: 90,
    type: 'essay',
    status: 'pending',
    description: 'Write a research paper on the impact of technology on education. Minimum 5 pages with references.',
    attachment: '📝 ResearchPaper.docx'
  },
  {
    id: '7',
    title: 'Physics Lab',
    subject: 'Physics',
    dueDate: '2 days left',
    points: 110,
    type: 'lab',
    status: 'in-progress',
    description: 'Conduct an experiment on the laws of motion. Write a detailed report.',
    attachment: '🔬 Lab Report Template.pdf'
  },
  {
    id: '8',
    title: 'Math Worksheet',
    subject: 'Math',
    dueDate: 'Today',
    points: 85,
    type: 'worksheet',
    status: 'pending',
    description: 'Complete worksheet 1-10 from chapter 3. Make sure to complete all the problems.',
    attachment: '📊 Worksheet.pdf'
  },
  {
    id: '9',
    title: 'Geography Project',
    subject: 'Geography',
    dueDate: '5 days left',
    points: 95,
    type: 'project',
    status: 'pending',
    description: 'Create a presentation on the different regions of Somalia. Include maps and information on climate and geography.',
    attachment: '🌍 Presentation.pptx'
  },
  {
    id: '10',
    title: 'English Quiz',
    subject: 'English',
    dueDate: 'Today',
    points: 75,
    type: 'quiz',
    status: 'completed',
    score: '70/75',
    description: 'Quiz on English literature.',
    attachment: '📊 View Results'
  }
];

// Mock data for study materials
const studyMaterials = [
  {
    id: '1',
    title: 'Buugga Xisaabta',
    type: 'pdf',
    subject: 'Xisaab',
    chapters: 12,
    size: '15.2 MB',
    description: 'Buugga aasaasiga ah ee xisaabta fasalka 12aad, oo ku saleysan manhajka cusub.'
  },
  {
    id: '2',
    title: 'Buugga Tijaabadaha Sayniska',
    type: 'pdf',
    subject: 'Saynis',
    chapters: 8,
    size: '8.7 MB',
    description: 'Qaab-dhismeedka tijaabadaha sayniska ee la sameyn karo guriga iyo fasalka.'
  },
  {
    id: '3',
    title: 'Khariidadda Taariikhda',
    type: 'image',
    subject: 'Taariikh',
    chapters: 6,
    size: '3.2 MB',
    description: 'Khariidad iyo sawirro muujinaya wakhtiyada taariikhiga ah.'
  },
  {
    id: '4',
    title: 'Islamic Studies Textbook',
    type: 'pdf',
    subject: 'Islamic Studies',
    chapters: 10,
    size: '5.8 MB',
    description: 'Textbook on Islamic studies.'
  },
  {
    id: '5',
    title: 'English Dictionary',
    type: 'pdf',
    subject: 'English',
    chapters: 1,
    size: '12.4 MB',
    description: 'Dictionary for English language learners.'
  },
  {
    id: '6',
    title: 'Geography Textbook',
    type: 'pdf',
    subject: 'Geography',
    chapters: 7,
    size: '9.6 MB',
    description: 'Textbook on geography.'
  },
  {
    id: '7',
    title: 'Science Glossary',
    type: 'pdf',
    subject: 'Science',
    chapters: 5,
    size: '7.8 MB',
    description: 'Glossary of scientific terms.'
  },
  {
    id: '8',
    title: 'Math Workbook',
    type: 'pdf',
    subject: 'Math',
    chapters: 9,
    size: '14.3 MB',
    description: 'Workbook for math problems.'
  },
  {
    id: '9',
    title: 'Social Studies Textbook',
    type: 'pdf',
    subject: 'Social Studies',
    chapters: 7,
    size: '9.1 MB',
    description: 'Textbook on social studies.'
  },
  {
    id: '10',
    title: 'Math Formula Sheet',
    type: 'pdf',
    subject: 'Math',
    chapters: 8,
    size: '11.2 MB',
    description: 'Formula sheet for math.'
  },
  {
    id: '11',
    title: 'Science Reference Book',
    type: 'pdf',
    subject: 'Science',
    chapters: 6,
    size: '8.5 MB',
    description: 'Reference book for science.'
  },
  {
    id: '12',
    title: 'English Literature Book',
    type: 'pdf',
    subject: 'English',
    chapters: 4,
    size: '6.7 MB',
    description: 'Book on English literature.'
  }
];

// Subject icons mapping
const getSubjectIcon = (subject) => {
  const iconSize = 24;
  const iconColor = '#4A6FA5';
  
  const icons = {
    'Xisaab': <MaterialIcons name="calculate" size={iconSize} color={iconColor} />,
    'Saynis': <MaterialIcons name="science" size={iconSize} color={iconColor} />,
    'Taariikh': <MaterialIcons name="history-edu" size={iconSize} color={iconColor} />,
    'Af Soomaaliga': <MaterialIcons name="translate" size={iconSize} color={iconColor} />,
    'Kimistariga': <MaterialIcons name="public" size={iconSize} color={iconColor} />,
    'default': <MaterialIcons name="menu-book" size={iconSize} color={iconColor} />
  };

  return icons[subject] || icons['default'];
};

const ClassWorkScreen = () => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [expandedItem, setExpandedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const slideAnim = useRef(new Animated.Value(0)).current; 

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    
    setTimeout(() => {
      setIsLoading(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 10,
          useNativeDriver: true,
        })
      ]).start();
    }, 300);
  };

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.bgPurple || '#6C63FF'} />
        </View>
      );
    }

    const data = activeTab === 'assignments' ? assignmentsData : studyMaterials;
    const renderItem = activeTab === 'assignments' ? renderAssignmentItem : renderMaterialItem;

    if (data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'assignments' 
              ? 'Ma jiraan hawlaha hadda' 
              : 'Ma jiraan qorallo la heli karo hadda'}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderAssignmentItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          borderLeftWidth: 5,
          borderLeftColor: 
            item.status === 'completed' ? '#4CAF50' : 
            item.status === 'in-progress' ? '#FFC107' : '#F44336'
        }
      ]}
    >
      <TouchableOpacity 
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.assignmentHeader}>
          <View style={styles.assignmentInfo}>
            <Text style={styles.assignmentSubject}>{item.subject}</Text>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.dueDate}>
                {item.dueDate === 'Maanta' ? 'Maanta' : 
                 item.dueDate.includes('maalmood') ? item.dueDate : 
                 item.dueDate}
              </Text>
              <Text style={styles.points}>{item.points} dhibcood</Text>
            </View>
          </View>
          <View style={[
            styles.statusBadge,
            item.status === 'completed' ? styles.completedBadge :
            item.status === 'in-progress' ? styles.inProgressBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'completed' ? 'Dhammeeyay' :
               item.status === 'in-progress' ? 'Socda' : 'Sugaya'}
            </Text>
          </View>
        </View>
        
        {expandedItem === item.id && (
          <View style={styles.expandedContent}>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.attachment}>
              <Text style={styles.attachmentText}>{item.attachment}</Text>
            </TouchableOpacity>
            
            {item.status !== 'completed' ? (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>Fiiri Faahfaahin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>
                    {item.status === 'in-progress' ? 'Sii Wad' : 'Bilow'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.completedContainer}>
                <Text style={styles.scoreText}>Qiimahaaga: {item.score}</Text>
                <TouchableOpacity style={styles.viewResultsButton}>
                  <Text style={styles.viewResultsText}>Eeg Natiijooyinka</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMaterialItem = ({ item }) => (
    <Animated.View 
      style={[
        styles.materialCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.materialIcon}>
        <Text style={styles.materialIconText}>
          {item.type === 'pdf' ? '📚' : '🖼️'}
        </Text>
      </View>
      <View style={styles.materialInfo}>
        <Text style={styles.materialTitle}>{item.title}</Text>
        <Text style={styles.materialSubject}>{item.subject}</Text>
        <Text style={styles.materialDetails}>
          {item.chapters} qaybood • {item.size}
        </Text>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Soo Dejiso</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shuqulaha Fasalka</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
          onPress={() => handleTabChange('assignments')}
          disabled={isLoading}
        >
          <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
            Hawlaha
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'materials' && styles.activeTab]}
          onPress={() => handleTabChange('materials')}
          disabled={isLoading}
        >
          <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>
            Qorallo Barasho
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: themeColors.bgPurple || '#6C63FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: themeColors.bgPurple || '#6C63FF',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentSubject: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dueDate: {
    fontSize: 13,
    color: '#6B7280',
    marginRight: 12,
  },
  points: {
    fontSize: 13,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  inProgressBadge: {
    backgroundColor: '#FEF9C3',
  },
  pendingBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  attachment: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  attachmentText: {
    color: '#4B5563',
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    borderWidth: 1,
    borderColor: themeColors.bgPurple || '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  viewButtonText: {
    color: themeColors.bgPurple || '#6C63FF',
    textAlign: 'center',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: themeColors.bgPurple || '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  completedContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginBottom: 8,
  },
  viewResultsButton: {
    padding: 8,
  },
  viewResultsText: {
    color: themeColors.bgPurple || '#6C63FF',
    fontWeight: '500',
  },
  materialCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  materialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialIconText: {
    fontSize: 20,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  materialSubject: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  materialDetails: {
    fontSize: 13,
    color: '#6B7280',
  },
  downloadButton: {
    padding: 8,
    marginLeft: 8,
  },
  downloadButtonText: {
    color: themeColors.bgPurple || '#6C63FF',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClassWorkScreen;
