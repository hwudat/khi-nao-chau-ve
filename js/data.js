// ═══════════════════════════════════════════
//  KHI NÀO CHÁU VỀ — Data Layer (localStorage)
// ═══════════════════════════════════════════

const DB_KEY   = 'kncv_posts';
const NEXT_KEY = 'kncv_next_id';

const EMOTION_MAP = {
  miss:      { label: '🏠 Nhớ nhà',   cls: 'tag-miss'      },
  proud:     { label: '🌟 Tự hào',    cls: 'tag-proud'     },
  happy:     { label: '😊 Vui',       cls: 'tag-happy'     },
  gratitude: { label: '🙏 Biết ơn',   cls: 'tag-gratitude' },
};

function getAllPosts() {
  return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
}

function savePost(post) {
  const posts = getAllPosts();
  const id = parseInt(localStorage.getItem(NEXT_KEY) || '1');
  post.id      = id;
  post.date    = new Date().toISOString();
  post.status  = 'pending';          // pending | approved | rejected
  post.sponsor = post.sponsor || false;
  posts.unshift(post);
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
  localStorage.setItem(NEXT_KEY, id + 1);
  return post;
}

function getApprovedPosts() {
  return getAllPosts().filter(p => p.status === 'approved');
}

function getPendingPosts() {
  return getAllPosts().filter(p => p.status === 'pending');
}

function updatePostStatus(id, status) {
  const posts = getAllPosts();
  const idx   = posts.findIndex(p => p.id === id);
  if (idx !== -1) { posts[idx].status = status; }
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
}

function deletePost(id) {
  const posts = getAllPosts().filter(p => p.id !== id);
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
}

// Seed demo data on first load
function seedDemoData() {
  if (getAllPosts().length > 0) return;
  const demos = [
    { name:'Minh Châu',    location:'TP.HCM',    emotion:'miss',      message:'Bà ơi, con nhớ mùi cơm bà nấu mỗi chiều tà lắm. Khi nào về con sẽ ăn thật nhiều nhé.', imgColor:'#F5EBD8', imgIcon:'🌾', status:'approved' },
    { name:'Thanh Hà',     location:'Hà Nội',    emotion:'proud',     message:'Con đã tốt nghiệp rồi ba mẹ ơi! Thành quả này con dành cho cả gia đình mình.',          imgColor:'#D4E8D0', imgIcon:'🌿', status:'approved', tall:true },
    { name:'Hoàng Long',   location:'Đà Nẵng',   emotion:'gratitude', message:'Ở xa nhưng lòng vẫn hướng về mái ấm. Cảm ơn dự án đã cho con nơi để gửi lời nhớ.',   imgColor:'#FFF3CD', imgIcon:'☀️', status:'approved', sponsor:true },
    { name:'Lan Anh',      location:'Hà Nội',    emotion:'miss',      message:'Hôm nay trời Hà Nội đẹp lắm, con chụp lại gửi cho mẹ xem. Nhớ mẹ nhiều.',             imgColor:'#FFD6CC', imgIcon:'🌸', status:'approved', tall:true },
    { name:'Ẩn danh',      location:'Nha Trang', emotion:'proud',     message:'Mỗi lần nhìn biển con lại nghĩ đến ba, người đã dạy con bơi năm 7 tuổi.',              imgColor:'#C8E6E0', imgIcon:'🌊', status:'approved' },
    { name:'Văn Khoa',     location:'Cần Thơ',   emotion:'happy',     message:'Căn nhà cũ vẫn còn đó, chỉ có người đã thay đổi. Con sẽ về thăm bà vào tết này.',      imgColor:'#E8D5B7', imgIcon:'🏡', status:'approved', tall:true },
    { name:'Thu Trang',    location:'Huế',        emotion:'miss',      message:'Bữa cơm nhà mình có gì đặc biệt đâu, chỉ là rau muống và cá kho thôi, mà nhớ lắm.',   imgColor:'#D6E4F7', imgIcon:'🌊', status:'approved' },
    { name:'Quang Minh',   location:'Hải Phòng', emotion:'gratitude', message:'Ba mẹ đã hy sinh bao nhiêu năm để con có ngày hôm nay. Con biết ơn lắm.',              imgColor:'#EDD5F7', imgIcon:'💜', status:'approved' },
    { name:'Phương Linh',  location:'Vũng Tàu',  emotion:'happy',     message:'Con đã tìm được công việc mình thích rồi! Nhất định sẽ về ăn mừng cùng cả nhà.',      imgColor:'#F7EDD5', imgIcon:'⭐', status:'approved', tall:true },
  ];
  localStorage.setItem(DB_KEY, JSON.stringify(demos));
  localStorage.setItem(NEXT_KEY, '100');
}

// Image to base64 helper
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
