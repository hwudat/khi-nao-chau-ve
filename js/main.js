// ═══════════════════════════════════════════
//  KHI NÀO CHÁU VỀ — Shared Utilities
// ═══════════════════════════════════════════

/* Navbar scroll effect + hamburger */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Scroll-triggered fade-up
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

/* Toast helper */
function showToast(msg, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast'; toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* Format date */
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' });
}

/* Build card HTML */
function buildCardHTML(post, showStatus = false) {
  const emotion = EMOTION_MAP[post.emotion] || { label: '', cls: '' };
  const imgH    = post.tall ? '280' : '200';

  const imgHTML = post.imgBase64
    ? `<img src="${post.imgBase64}" alt="Ảnh" style="width:100%;height:${imgH}px;object-fit:cover;" />`
    : `<div class="card-placeholder" style="height:${imgH}px;background:${post.imgColor||'#F5EBD8'};">${post.imgIcon||'🖼️'}</div>`;

  const sponsorBadge = post.sponsor
    ? `<div class="card-sponsor-badge">🪡 Đồng hành</div>` : '';

  const statusBadge = showStatus
    ? `<div style="position:absolute;bottom:8px;right:10px;font-size:.65rem;font-family:'Nunito',sans-serif;font-weight:800;padding:2px 8px;border-radius:50px;background:${post.status==='approved'?'#D4E8D0':post.status==='rejected'?'#FFD6CC':'#FFF3CD'};color:#333;">${post.status==='approved'?'✅ Đã duyệt':post.status==='rejected'?'❌ Từ chối':'⏳ Chờ duyệt'}</div>` : '';

  return `
    <div class="card fade-up" data-id="${post.id}" data-emotion="${post.emotion||''}">
      ${sponsorBadge}
      <div class="card-img-wrap" style="height:${imgH}px;">
        ${imgHTML}
      </div>
      <div class="card-body">
        <p class="card-message">"${post.message}"</p>
        <div class="card-meta">
          <span class="card-name">${post.name||'Ẩn danh'}</span>
          ${post.location ? `<span class="card-dot">·</span><span class="card-loc">📍 ${post.location}</span>` : ''}
          ${emotion.label ? `<span class="card-tag ${emotion.cls}">${emotion.label}</span>` : ''}
        </div>
        <div style="margin-top:5px;">
          <span class="card-date">${formatDate(post.date)}</span>
        </div>
      </div>
      ${statusBadge}
    </div>`;
}

/* Modal */
function openModal(post) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  const emotion = EMOTION_MAP[post.emotion] || { label: '', cls: '' };

  const imgHTML = post.imgBase64
    ? `<img class="modal-img" src="${post.imgBase64}" alt="Ảnh" />`
    : `<div class="modal-img card-placeholder" style="height:260px;background:${post.imgColor||'#F5EBD8'};">${post.imgIcon||'🖼️'}</div>`;

  document.getElementById('modal-content').innerHTML = `
    ${imgHTML}
    <div class="modal-body">
      <p class="modal-message">"${post.message}"</p>
      <div class="modal-meta">
        <span class="modal-name">${post.name||'Ẩn danh'}</span>
        ${post.location ? `<span class="card-dot">·</span><span class="modal-loc">📍 ${post.location}</span>` : ''}
        ${emotion.label ? `<span class="card-tag ${emotion.cls}">${emotion.label}</span>` : ''}
        <span class="modal-date">${formatDate(post.date)}</span>
      </div>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
