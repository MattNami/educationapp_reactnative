import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator,
  StyleSheet,
  Animated,
  RefreshControl,
  Dimensions,
  FlatList
} from 'react-native';
import { themeColors } from '../theme';

const { width } = Dimensions.get('window');

// Mock data services
const fetchAnnouncements = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Soo dhawoow Dugsiga!',
          content: 'Waxaan ku faraxsannahay inaan ku bilawno sanad dugsiyeedka cusub. Hubi buugyada waxbarashada cusboonaysiinta oo u diyaar garoob socdaal waxbarasho xiiso leh oo la socda kooxda barayaasha xirfadleyda ah.',
          date: '2 saacadood ka hor',
          author: 'Maamulaha Dugsiga',
          authorAvatar: require('../assets/images/avatar.png'),
          expanded: false
        },
        {
          id: '2',
          title: 'Diiwaangelinta Mashruuca Sayniska',
          content: 'Taariikhda ugu dambaysa ee diiwaangelinta mashruuca sayniska waa la kordhiyey ilaa Jimcaha. Fadlan hubi in mashruucaagu raaco tilmaamaha la siiyay fasalka.',
          date: '1 maalin ka hor',
          author: 'Dr. Cusmaan',
          authorAvatar: require('../assets/images/avatar.png'),
          expanded: false
        },
      ]);
    }, 800);
  });
};

const fetchAssignments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Shaqo Guriga Xisaabta',
          subject: 'Xisaab',
          dueDate: 'Berri, 9:00 subaxnimo',
          points: 100,
          submitted: false,
          description: 'Dhammee layliyada 1-10 ee bogga 45aad. Tus dhammaan shaqadaada si aad u hesho dhammaan tirakoobka.'
        },
        {
          id: '2',
          title: 'Mashruuc Saynis',
          subject: 'Sayniska',
          dueDate: 'Jimcaha, 2:00 galabnimo',
          points: 150,
          submitted: true,
          description: 'Gudbi warqadda cilmi-baaristaada ku saabsan neefsashada unugyada.'
        },
      ]);
    }, 800);
  });
};

const fetchActivities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Wada hadal Fasalka',
          type: 'wadahadal',
          time: '10:30 subaxnimo',
          description: 'Waxaad ka qayb qaadatay wadahalka fasalka ee ku saabsan Taariikhda Aduunka.'
        },
        {
          id: '2',
          title: 'Imtixaan Yare oo La Dhammeeyay',
          type: 'imtixaan',
          time: 'Shalay',
          description: 'Waxaad heshay 95% imtixaanka Xisaabta.'
        },
      ]);
    }, 800);
  });
};

const StreamScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('announcements');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const loadData = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setRefreshing(true);

      const [announcementsData, assignmentsData, activitiesData] = await Promise.all([
        fetchAnnouncements(),
        fetchAssignments(),
        fetchActivities()
      ]);

      setAnnouncements(announcementsData);
      setAssignments(assignmentsData);
      setActivities(activitiesData);
      
      // Animate content in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
      
    } catch (error) {
      console.error('Error loading data:', error);
      // In a real app, you might want to show an error message to the user
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleAnnouncement = (id) => {
    setAnnouncements(prevAnnouncements =>
      prevAnnouncements.map(announcement =>
        announcement.id === id
          ? { ...announcement, expanded: !announcement.expanded }
          : announcement
      )
    );
  };

  const handleRefresh = () => {
    loadData(true);
  };

  const renderAnnouncement = ({ item }) => (
    <Animated.View 
      style={[
        styles.card, 
        styles.announcementCard,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}
    >
      <View style={styles.announcementHeader}>
        <Image source={item.authorAvatar} style={styles.avatar} />
        <View style={styles.announcementInfo}>
          <Text style={styles.announcementAuthor}>{item.author}</Text>
          <Text style={styles.announcementDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      {item.expanded && (
        <Text style={styles.announcementContent}>{item.content}</Text>
      )}
      <TouchableOpacity 
        onPress={() => toggleAnnouncement(item.id)}
        style={styles.readMoreButton}
      >
        <Text style={styles.readMoreText}>
          {item.expanded ? 'Dhowro Dheeraad' : 'Akhri Dheeraad'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAssignment = ({ item }) => (
    <Animated.View 
      style={[
        styles.card, 
        styles.assignmentCard,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}
    >
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentSubject}>{item.subject}</Text>
        <View style={[
          styles.statusBadge, 
          item.submitted ? styles.submittedBadge : styles.pendingBadge
        ]}>
          <Text style={styles.statusText}>
            {item.submitted ? 'Diiwaangeliyay' : 'Diiwaangelin'}
          </Text>
        </View>
      </View>
      <Text style={styles.assignmentTitle}>{item.title}</Text>
      <View style={styles.assignmentDetails}>
        <Text style={styles.detailText}>
          {item.dueDate}
        </Text>
        <Text style={styles.detailText}>
          {item.points} point
        </Text>
      </View>
      <Text style={styles.assignmentDescription}>{item.description}</Text>
      {!item.submitted && (
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Diiwaangeli Hawlaha</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderActivity = ({ item }) => (
    <Animated.View 
      style={[
        styles.card, 
        styles.activityCard,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}
    >
      <View style={styles.activityHeader}>
        <View style={[
          styles.activityIcon,
          { backgroundColor: item.type === 'wadahadal' ? '#E3F2FD' : '#E8F5E9' }
        ]}>
          <Text style={[
            styles.activityIconText,
            { color: item.type === 'wadahadal' ? '#1976D2' : '#388E3C' }
          ]}>
            {item.type === 'wadahadal' ? '' : ''}
          </Text>
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.activityDescription}>{item.description}</Text>
    </Animated.View>
  );

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.bgPurple} />
        </View>
      );
    }

    switch (activeTab) {
      case 'announcements':
        return (
          <FlatList
            data={announcements}
            renderItem={renderAnnouncement}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[themeColors.bgPurple]}
                tintColor={themeColors.bgPurple}
              />
            }
          />
        );
      case 'assignments':
        return (
          <FlatList
            data={assignments}
            renderItem={renderAssignment}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[themeColors.bgPurple]}
                tintColor={themeColors.bgPurple}
              />
            }
          />
        );
      case 'activities':
        return (
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[themeColors.bgPurple]}
                tintColor={themeColors.bgPurple}
              />
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dhaqdhaqaaq</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'announcements' && styles.activeTab]}
          onPress={() => setActiveTab('announcements')}
        >
          <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>
            Dhaqdhaqaaq
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
          onPress={() => setActiveTab('assignments')}
        >
          <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
            Hawlaha
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={[styles.tabText, activeTab === 'activities' && styles.activeTabText]}>
            Dhaqdhaqaaqyada
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
    backgroundColor: '#F8F9FF',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#364356',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6C63FF',
  },
  tabText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Announcement Card Styles
  announcementCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementAuthor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#364356',
  },
  announcementDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#364356',
    marginBottom: 8,
  },
  announcementContent: {
    fontSize: 14,
    color: '#636D77',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#6C63FF',
    fontWeight: '500',
    fontSize: 14,
  },
  // Assignment Card Styles
  assignmentCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  assignmentSubject: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  submittedBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFECB3',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#364356',
    marginBottom: 8,
  },
  assignmentDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#636D77',
    marginRight: 16,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#636D77',
    lineHeight: 20,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Activity Card Styles
  activityCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#364356',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  activityDescription: {
    fontSize: 14,
    color: '#636D77',
    lineHeight: 20,
  },
});

export default StreamScreen;
