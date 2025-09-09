import { images } from '..';

const { teacher1, teacher2, teacher3, teacher4, school1, school2, school3 } =
  images;
export const welcomeScreenData = {
  title: `Halkaan ka hel A-gaaga`,
  subtitle: `Fadlan geli si aad u aragto talooyin gaar ah`,
};

export const gradesData = [
  'Grade 1-5',
  'Grade 6-9',
  'Grade 10-11',
  'Grade 12-13',
];

export const provincesData = [
  'Awdal',
  'Woqooyi Galbeed',
  'Togdheer',
  'Sanaag',
  'Sool',
  'Bari',
  'Nugaal',
  'Mudug',
  'Galguduud',
  'Hiran'
];

export const teacherData = [
  {
    id: 1,
    name: 'Axmed Maxamed',
    subject: 'Xisaab',
    rating: '4.8',
    students: '250+',
    experience: '10+ sano',
    price: '$15/saac',
    image: teacher1,
    bio: 'Baraha xisaabta ugu khibrad badani wuxuu leeyahay 10 sano oo waxbarid. Wuxuu ku takhasusay xisaabyada sare iyo calculus-ka.',
    education: 'Jaamacadda Hargeysa - Xisaabta Sare',
    contact: {
      phone: '+252 61 1234567',
      whatsapp: '+252 61 1234567',
      email: 'axmed.xisaab@example.com',
      location: 'Hargeysa, Soomaaliland'
    },
    availability: 'Isniinta - Jimcaha, 8:00 subaxnimo - 6:00 galabnimo',
    teachingStyle: 'Dareen leh oo isku xidha aragtida iyo tijaabada'
  },
  {
    id: 2,
    name: 'Aisha Cumar',
    subject: 'Ingiriisi',
    rating: '4.9',
    students: '300+',
    experience: '8 sano',
    price: '$12/saac',
    image: teacher2,
    bio: 'Baraha luqada ingiriisiga ee ugu khibrad badani wuxuu ku takhasusay barashada carabiga iyo af-soomaaliga.',
    education: 'Jaamacadda Camuud - Luqadda Ingiriisiga',
    contact: {
      phone: '+252 63 9876543',
      whatsapp: '+252 63 9876543',
      email: 'aisha.ingiriisi@example.com',
      location: 'Burco, Soomaaliland'
    },
    availability: 'Sabti - Khamiis, 9:00 subaxnimo - 5:00 galabnimo',
    teachingStyle: 'Hab wanaagsan oo ku salaysan isticmaalka luqadda maalin kasta'
  },
  {
    id: 3,
    name: 'Xasan Yuusuf',
    subject: 'Kamiistarada',
    rating: '4.7',
    students: '200+',
    experience: '9 sano',
    price: '$16/saac',
    image: teacher3,
    bio: 'Baraha kimikada ee ugu khibrad badani wuxuu ku takhasusay barashada kimikada iyo cilmi-baarista alaabta.',
    education: 'Jaamacadda Burco - Kimikada',
    contact: {
      phone: '+252 63 7654321',
      whatsapp: '+252 63 7654321',
      email: 'xasan.kimikada@example.com',
      location: 'Burco, Soomaaliland'
    },
    availability: 'Isniinta - Jimcaha, 8:00 subaxnimo - 6:00 galabnimo',
    teachingStyle: 'Dareen leh oo isku xidha aragtida iyo tijaabada'
  },
  {
    id: 4,
    name: 'Maryan Axmed',
    subject: 'Fiisikis',
    rating: '4.9',
    students: '250+',
    experience: '11 sano',
    price: '$17/saac',
    image: teacher4,
    bio: 'Baraha fiisikiska ee ugu khibrad badani wuxuu ku takhasusay barashada fiisikiska iyo cilmi-baarista alaabta.',
    education: 'Jaamacadda Hargeysa - Fiisikiska',
    contact: {
      phone: '+252 63 1234567',
      whatsapp: '+252 63 1234567',
      email: 'maryan.fiisikis@example.com',
      location: 'Hargeysa, Soomaaliland'
    },
    availability: 'Sabti - Khamiis, 9:00 subaxnimo - 5:00 galabnimo',
    teachingStyle: 'Hab wanaagsan oo ku salaysan isticmaalka luqadda maalin kasta'
  },
];

export const institutionData = [
  {
    name: 'Jaamacadda Hargeysa',
    field: 'Dugsi Sare oo Jaamacadeed',
    description: 'Jaamacadda ugu weyn Soomaaliland, waxay bixisaa koorsooyin kala duwan oo heer jaamacadeed ah. Waxay leedahay jaamacado kala duwan oo ku yaal magaalada Hargeysa.',
    rating: '4.7',
    reviews: '1,245',
    location: 'Hargeysa, Soomaaliland',
    established: '2000',
    students: '15,000+',
    contact: {
      phone: '+252 63 1234567',
      email: 'info@uh.edu.so',
      website: 'www.uh.edu.so',
      address: 'Mendayaha, Hargeysa, Soomaaliland'
    },
    image: { uri: 'https://www.uh.edu.so/wp-content/uploads/2022/01/logo.png' },
  },
  {
    name: 'Jaamacadda Camuud',
    field: 'Dugsi Sare oo Jaamacadeed',
    description: 'Jaamacad aad u caan ku ah barnaamijyadeeda waxbarasho sare iyo cilmi-baarista. Waxay ku taallaa magaalada Burco.',
    rating: '4.5',
    reviews: '987',
    location: 'Burco, Soomaaliland',
    established: '2004',
    students: '8,500+',
    contact: {
      phone: '+252 63 7654321',
      email: 'info@camuud.edu.so',
      website: 'www.camuud.edu.so',
      address: 'Burco, Togdheer, Soomaaliland'
    },
    image: { uri: 'https://www.camuud.edu.so/wp-content/uploads/2021/05/logo.png' },
  },
  {
    name: 'Jaamacadda SIMAD',
    field: 'Maamulka iyo Teknoolojiyada',
    description: 'Jaamacad caan ku ah barnaamijyadeeda ganacsiga iyo teknoolojiyada macluumaadka. Waxay ku taallaa magaalada Muqdisho.',
    rating: '4.6',
    reviews: '1,100',
    location: 'Muqdisho, Soomaaliya',
    established: '1999',
    students: '12,000+',
    contact: {
      phone: '+252 61 1234567',
      email: 'info@simad.edu.so',
      website: 'www.simad.edu.so',
      address: 'KM4, Wadada Islii, Muqdisho'
    },
    image: { uri: 'https://www.simad.edu.so/wp-content/uploads/2020/12/simad-logo.png' },
  },
  {
    name: 'Jaamacadda Gollis',
    field: 'Cilmibaarista iyo Teknoolojiyada',
    description: 'Jaamacad horumarsan oo ku taalla magaalada Hargeysa, aad u wanaagsan aqoonta sayniska iyo injineernimada.',
    rating: '4.3',
    reviews: '876',
    location: 'Hargeysa, Soomaaliland',
    established: '2004',
    students: '6,000+',
    contact: {
      phone: '+252 63 9876543',
      email: 'admissions@gollisuniversity.org',
      website: 'www.gollisuniversity.org',
      address: 'Jigjiga Yar, Hargeysa'
    },
    image: { uri: 'https://gollisuniversity.org/wp-content/uploads/2021/03/logo.png' },
  },
  {
    name: 'Jaamacadda Banaadir',
    field: 'Caafimaadka iyo Saynisyada Bulshada',
    description: 'Jaamacad ka shaqeysa sidii loo horumarin lahaa aqoonta caafimaadka iyo cilmi-baadista bulshada Soomaaliyeed.',
    rating: '4.4',
    reviews: '765',
    location: 'Muqdisho, Soomaaliya',
    established: '2002',
    students: '9,000+',
    contact: {
      phone: '+252 61 9876543',
      email: 'info@banaadiruniversity.edu.so',
      website: 'www.banaadiruniversity.edu.so',
      address: 'KM5, Wadada Tarabunka, Muqdisho'
    },
    image: { uri: 'https://banaadiruniversity.edu.so/wp-content/uploads/2021/07/logo.png' },
  },
  {
    name: 'Jaamacadda Nugaal',
    field: 'Dhaqaalaha iyo Maamulka',
    description: 'Jaamacad ka shaqeysa horumarinta aqoonta dhaqaalaha iyo maamulka ee gobolka Bari.',
    rating: '4.2',
    reviews: '654',
    location: 'Laas Caanood, Khaatumo',
    established: '2004',
    students: '5,500+',
    contact: {
      phone: '+252 90 1234567',
      email: 'admission@nugaaluniversity.org',
      website: 'www.nugaaluniversity.org',
      address: 'Laas Caanood, Khaatumo'
    },
    image: { uri: 'https://nugaaluniversity.org/wp-content/uploads/2021/06/logo.png' },
  },
];

// Mosques and Schools Data
export const placesData = {
  masajid: [
    {
      id: 'm1',
      name: 'Masaajidka Jaamacada Hargeysa',
      location: 'Hargeysa',
      description: 'Masaajid weyn oo ku yaal Jaamacadda Hargeysa, waxaana lagu dabaaldegaa ducooyin iyo casharada diinta.',
      contact: '+252 63 1234567',
      prayerTimes: {
        fajr: '4:30',
        dhuhr: '12:30',
        asr: '15:45',
        maghrib: '18:15',
        isha: '19:45'
      },
      image: require('../images/classWorkIcon.png')
    },
    {
      id: 'm2',
      name: 'Masaajidka Sh. Maxamuud Walaal',
      location: 'Hargeysa',
      description: 'Masaajid caan ah oo ku yaal magaalada Hargeysa, waxaana lagu daraa ducooyin iyo casharada diinta maalintii kasta.',
      contact: '+252 63 7654321',
      prayerTimes: {
        fajr: '4:30',
        dhuhr: '12:30',
        asr: '15:45',
        maghrib: '18:15',
        isha: '19:45'
      },
      image: require('../images/classWorkIcon.png')
    }
  ],
  dugsi: [
    {
      id: 'd1',
      name: 'Dugsi Sare Al-Najah',
      location: 'Hargeysa',
      description: 'Dugsi sare oo ka tirsan Jaamacadda Hargeysa, waxaana lagu baraa fannado kala duwan oo heer sare ah.',
      contact: '+252 63 9876543',
      grades: ['1-8', '9-12'],
      subjects: ['Xisaab', 'Cilmiga Bulshada', 'Sayniska', 'Ingiriisiga'],
      image: require('../images/classWorkIcon.png')
    },
    {
      id: 'd2',
      name: 'Dugsi Sare Al-Furqaan',
      location: 'Burco',
      description: 'Dugsi sare oo ku yaal magaalada Burco, waxaana lagu baraa fannado kala duwan oo heer sare ah.',
      contact: '+252 63 4567890',
      grades: ['1-12'],
      subjects: ['Quraanka', 'Xisaab', 'Carabiga', 'Sayniska'],
      image: require('../images/classWorkIcon.png')
    }
  ]
};

// Somali Regions (Gobollada)
export const somaliRegions = [
  'Awdal',
  'Woqooyi Galbeed',
  'Togdheer',
  'Sanaag',
  'Sool',
  'Bari',
  'Nugaal',
  'Mudug',
  'Galgaduud',
  'Hiiraan',
  'Shabeellaha Dhexe',
  'Shabeellaha Hoose',
  'Banaadir',
  'Baay',
  'Bakool',
  'Gedo',
  'Jubbada Dhexe',
  'Jubbada Hoose'
];

// Major Somali Districts (Degmooyin)
export const somaliDistricts = [
  'Hargeysa',
  'Burco',
  'Berbera',
  'Borama',
  'Burao',
  'Erigavo',
  'Las Anod',
  'Garowe',
  'Galkacyo',
  'Dhusamareb',
  'Beledweyne',
  'Jowhar',
  'Mogadishu',
  'Marka',
  'Kismayo',
  'Baidoa',
  'Bardera',
  'Afgooye',
  'Jalalaqsi'
];

export const areaFilters = ['Jasiirad', 'Gobol', 'Degmooyin'];

export const subjectFilters = [
  'Dhammaan Koorsooyinka',
  'xisaab',
  'ingiriisi',
  'kamiistarada',
  'fiisikis',
];
