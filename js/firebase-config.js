// ═══════════════════════════════════════════════════════════════
//  KHI NÀO CHÁU VỀ — Firebase Cloud Configuration & Initialization
// ═══════════════════════════════════════════════════════════════

// Mặc định hoặc lấy cấu hình đã lưu từ trang Quản Trị (Admin)
let firebaseConfig = null;

try {
  const savedConfig = localStorage.getItem('kncv_firebase_config');
  if (savedConfig) {
    firebaseConfig = JSON.parse(savedConfig);
  }
} catch (e) {
  console.warn('Chưa tìm thấy cấu hình Firebase đã lưu:', e);
}

// Nếu bạn muốn dán trực tiếp cấu hình Firebase vào code, hãy điền vào bên dưới:
if (!firebaseConfig || !firebaseConfig.projectId) {
  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
}

let fbApp = null;
let fbDb  = null;
let fbStorage = null;

function isFirebaseConfigured() {
  return firebaseConfig &&
         firebaseConfig.apiKey &&
         firebaseConfig.apiKey.length > 5 &&
         firebaseConfig.projectId &&
         firebaseConfig.projectId.length > 2;
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
    console.log('✅ Firebase Cloud đã được kích hoạt thành công!');
  } catch (err) {
    console.error('❌ Lỗi khởi tạo Firebase:', err);
  }
}
