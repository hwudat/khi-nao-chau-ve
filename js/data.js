// ═══════════════════════════════════════════════════════════════
//  KHI NÀO CHÁU VỀ — Unified Data Layer (Firestore Cloud + Local)
// ═══════════════════════════════════════════════════════════════

const DB_KEY   = 'kncv_posts';
const NEXT_KEY = 'kncv_next_id';

const EMOTION_MAP = {
  miss:      { label: '🏠 Nhớ nhà',   cls: 'tag-miss'      },
  proud:     { label: '🌟 Tự hào',    cls: 'tag-proud'     },
  happy:     { label: '😊 Vui',       cls: 'tag-happy'     },
  gratitude: { label: '🙏 Biết ơn',   cls: 'tag-gratitude' },
};

// ── Tự động dọn dẹp toàn bộ dữ liệu mẫu cũ trên trình duyệt ──
function cleanOldDemoData() {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) return;
  try {
    const list = JSON.parse(stored);
    const hasDemo = list.some(p => p.name === 'Minh Châu' || p.name === 'Thanh Hà' || p.name === 'Hoàng Long' || p.id < 100);
    if (hasDemo) {
      localStorage.removeItem(DB_KEY);
      localStorage.removeItem(NEXT_KEY);
      console.log('🧹 Đã xóa sạch toàn bộ lời nhắn mẫu demo.');
    }
  } catch (e) {
    localStorage.removeItem(DB_KEY);
  }
}
cleanOldDemoData();

// ── Hàm nén ảnh tự động trước khi lưu lên Cloud (Không cần dùng Firebase Storage) ──
function compressImage(file, maxDimension = 900, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

// ── Hàm lưu trữ cục bộ (Fallback) ──
function getLocalPosts() {
  return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
}

function saveLocalPost(post) {
  const posts = getLocalPosts();
  const id = String(Date.now());
  post.id      = id;
  post.date    = new Date().toISOString();
  post.status  = 'pending';
  post.sponsor = post.sponsor || false;
  posts.unshift(post);
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
  return post;
}

// ── CÁC HÀM XỬ LÝ CHÍNH VỚI FIRESTORE ──

async function getAllPosts() {
  if (typeof fbDb !== 'undefined' && fbDb) {
    try {
      const snap = await fbDb.collection('posts').orderBy('date', 'desc').get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn('Lỗi đọc Firestore, dùng local:', err);
    }
  }
  return getLocalPosts();
}

async function getApprovedPosts() {
  if (typeof fbDb !== 'undefined' && fbDb) {
    try {
      const snap = await fbDb.collection('posts')
                             .where('status', '==', 'approved')
                             .get();
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      list.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
      return list;
    } catch (err) {
      console.warn('Lỗi đọc Firestore, dùng local:', err);
    }
  }
  return getLocalPosts().filter(p => p.status === 'approved');
}

async function savePost(post, imageFile = null) {
  post.date    = new Date().toISOString();
  post.status  = 'pending';
  post.sponsor = false;

  // Nén ảnh gọn nhẹ (~50KB) để lưu thẳng vào Firestore miễn phí 100%
  if (imageFile) {
    try {
      post.imgBase64 = await compressImage(imageFile);
    } catch (err) {
      console.warn('Không thể nén ảnh, thử đọc thông thường:', err);
      try { post.imgBase64 = await fileToBase64(imageFile); } catch (e) {}
    }
  }

  // Lưu document vào Firestore Cloud
  if (typeof fbDb !== 'undefined' && fbDb) {
    try {
      const docRef = await fbDb.collection('posts').add(post);
      post.id = docRef.id;
      return post;
    } catch (err) {
      console.error('Lỗi lưu bài viết vào Firestore, lưu dự phòng vào máy:', err);
    }
  }

  // Dự phòng LocalStorage
  return saveLocalPost(post);
}

async function updatePostStatus(id, status) {
  if (typeof fbDb !== 'undefined' && fbDb && typeof id === 'string' && id.length > 5) {
    try {
      await fbDb.collection('posts').doc(id).update({ status });
      return;
    } catch (err) {
      console.warn('Lỗi update Firestore:', err);
    }
  }
  const posts = getLocalPosts();
  const idx = posts.findIndex(p => String(p.id) === String(id));
  if (idx !== -1) {
    posts[idx].status = status;
    localStorage.setItem(DB_KEY, JSON.stringify(posts));
  }
}

async function togglePostSponsor(id) {
  if (typeof fbDb !== 'undefined' && fbDb && typeof id === 'string' && id.length > 5) {
    try {
      const doc = await fbDb.collection('posts').doc(id).get();
      if (doc.exists) {
        const cur = doc.data().sponsor || false;
        await fbDb.collection('posts').doc(id).update({ sponsor: !cur });
        return !cur;
      }
    } catch (err) {
      console.warn('Lỗi update sponsor Firestore:', err);
    }
  }
  const posts = getLocalPosts();
  const idx = posts.findIndex(p => String(p.id) === String(id));
  if (idx !== -1) {
    posts[idx].sponsor = !posts[idx].sponsor;
    localStorage.setItem(DB_KEY, JSON.stringify(posts));
    return posts[idx].sponsor;
  }
  return false;
}

async function deletePost(id) {
  if (typeof fbDb !== 'undefined' && fbDb && typeof id === 'string' && id.length > 5) {
    try {
      await fbDb.collection('posts').doc(id).delete();
      return;
    } catch (err) {
      console.warn('Lỗi xóa Firestore:', err);
    }
  }
  const posts = getLocalPosts().filter(p => String(p.id) !== String(id));
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
