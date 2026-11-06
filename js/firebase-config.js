// ═══════════════════════════════════════════════════════════════
//  KHI NÀO CHÁU VỀ — Firebase Cloud Configuration
// ═══════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyAr_gsTnSYlcGI8CsdVdA1N9GiNB0ZK9Yk",
  authDomain: "khi-nao-chau-ve.firebaseapp.com",
  projectId: "khi-nao-chau-ve",
  storageBucket: "khi-nao-chau-ve.firebasestorage.app",
  messagingSenderId: "210540086986",
  appId: "1:210540086986:web:9ef73e5e504097ab6c1633",
  measurementId: "G-P7WJZ7J773"
};

let fbApp = null;
let fbDb  = null;
let fbStorage = null;

function isFirebaseConfigured() {
  return firebaseConfig &&
         firebaseConfig.apiKey &&
         firebaseConfig.projectId;
}

if (typeof firebase !== 'undefined' && isFirebaseConfigured()) {
  try {
    if (!firebase.apps.length) {
      fbApp = firebase.initializeApp(firebaseConfig);
    } else {
      fbApp = firebase.app();
    }
    fbDb = firebase.firestore();
    fbStorage = firebase.storage();
    console.log('✅ Firebase Cloud đã được kết nối thành công tới khi-nao-chau-ve!');
  } catch (err) {
    console.error('❌ Lỗi khởi tạo Firebase:', err);
  }
}
