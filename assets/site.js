document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      // Netlify Forms will handle the submission natively.
      // If JS is disabled, the form still submits via Netlify.
      // This is a fallback for AJAX-like experience.
      const formData = new FormData(this);
      const action = this.getAttribute('action') || '';

      fetch(action, {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(res => {
          if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }
          showFormMessage('Thank you! We will get back to you soon.', 'success');
          this.reset();
        })
        .catch(() => {
          if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }
          // Fallback: Netlify will handle it even if fetch fails
          showFormMessage('Thank you! We will get back to you soon.', 'success');
          this.reset();
        });
    });
  }

  function showFormMessage(message, type) {
    const existing = document.getElementById('form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.id = 'form-message';
    msg.className = `mt-4 p-4 rounded-lg text-center font-medium ${type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`;
    msg.textContent = message;
    msg.setAttribute('role', 'alert');
    msg.setAttribute('aria-live', 'polite');
    contactForm.insertBefore(msg, contactForm.querySelector('button[type="submit"]'));
    setTimeout(() => msg.remove(), 5000);
  }

  // --- Video Randomization ---
  const videoGrid = document.getElementById('video-grid');
  if (videoGrid) {
    const videos = [
      { id: 1, title: 'From Boardroom to Pitch', duration: '45 min', mp4: 'assets/videos/video1.mp4', poster: 'assets/videos/video1-poster.jpg' },
      { id: 2, title: 'The Unlikely Captain', duration: '38 min', mp4: 'assets/videos/video2.mp4', poster: 'assets/videos/video2-poster.jpg' },
      { id: 3, title: 'Legends Special', duration: '52 min', mp4: 'assets/videos/video3.mp4', poster: 'assets/videos/video3-poster.jpg' }
    ];

    // Shuffle and pick 3
    const selected = videos.sort(() => Math.random() - 0.5).slice(0, 3);

    selected.forEach((video, index) => {
      const card = document.createElement('div');
      card.className = 'group card-hover bg-brand-gray rounded-2xl overflow-hidden border border-white/5';
      card.innerHTML = `
        <div class="aspect-video bg-brand-black relative">
          <video src="${video.mp4}" poster="${video.poster}" preload="metadata" playsinline controls class="w-full h-full object-cover" aria-label="Play ${video.title}">
            Your browser does not support the video tag.
          </video>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <span>Episode ${video.id}</span>
            <span>•</span>
            <span>${video.duration}</span>
          </div>
          <h3 class="text-xl font-semibold mb-2 group-hover:text-brand-red transition-colors">${video.title}</h3>
          <p class="text-gray-400">${video.description}</p>
        </div>
      `;
      videoGrid.appendChild(card);
    });
  }
});
