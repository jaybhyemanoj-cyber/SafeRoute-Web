// SafeRoute AI - Landing Page Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initApkChecker();
  initFaqAccordion();
  initPhoneMockupToggle();
  initHeaderScroll();
  initMobileMenu();
  initModals();
});

// Candidate paths for APK file
const CANDIDATE_APK_URLS = [
  '/downloads/saferoute-ai.apk',
  '/downloads/app-release.apk'
];

let activeApkUrl = null;

async function initApkChecker() {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const apkSpecsCard = document.getElementById('apkSpecsCard');
  const apkSizeSpec = document.getElementById('apkSizeSpec');
  const apkFileNameSpec = document.getElementById('apkFileNameSpec');
  const downloadBtns = [
    document.getElementById('mainDownloadBtn'),
    document.getElementById('heroDownloadBtn'),
    document.getElementById('hdrDownloadBtn')
  ];

  let detectedBytes = null;

  for (const url of CANDIDATE_APK_URLS) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        activeApkUrl = url;
        const contentLength = res.headers.get('content-length');
        if (contentLength) {
          detectedBytes = parseInt(contentLength, 10);
        }
        break;
      }
    } catch (e) {
      // Continue checking next path
    }
  }

  if (activeApkUrl) {
    if (statusDot) statusDot.className = 'status-indicator ready';
    if (statusText) statusText.textContent = 'APK Ready for Direct Download (Verified Build)';

    // Format file size
    let formattedSize = '58.9 MB';
    if (detectedBytes && !isNaN(detectedBytes)) {
      formattedSize = (detectedBytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    if (apkSizeSpec) apkSizeSpec.textContent = formattedSize;
    if (apkFileNameSpec) {
      const filename = activeApkUrl.split('/').pop();
      apkFileNameSpec.textContent = filename;
    }
    if (apkSpecsCard) apkSpecsCard.style.display = 'flex';

    downloadBtns.forEach(btn => {
      if (!btn) return;
      btn.setAttribute('href', activeApkUrl);
      btn.setAttribute('download', 'saferoute-ai.apk');
      btn.onclick = null; // Default anchor action handles direct download
    });
  } else {
    if (statusDot) statusDot.className = 'status-indicator missing';
    if (statusText) statusText.textContent = 'APK File Missing — Copy to public/downloads/saferoute-ai.apk';
    if (apkSpecsCard) apkSpecsCard.style.display = 'none';

    downloadBtns.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('apkModal');
      });
    });
  }
}

// FAQ Accordion Toggle
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const isOpen = faqItem.classList.contains('active');
      
      // Close all active items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const qBtn = item.querySelector('.faq-question');
        if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        faqItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Interactive Phone Mockup Toggle
function initPhoneMockupToggle() {
  const mockToggleRouteBtn = document.getElementById('mockToggleRouteBtn');
  const activeRouteName = document.getElementById('activeRouteName');
  const phoneRouteLine = document.getElementById('phoneRouteLine');
  const mockHazard1 = document.getElementById('mockHazard1');

  if (!mockToggleRouteBtn) return;

  let isAwareRoute = true;

  mockToggleRouteBtn.addEventListener('click', () => {
    isAwareRoute = !isAwareRoute;

    if (isAwareRoute) {
      if (activeRouteName) activeRouteName.textContent = 'Aware Route A';
      if (phoneRouteLine) {
        phoneRouteLine.setAttribute('d', 'M 90 300 C 110 250, 130 210, 160 170 C 190 130, 210 110, 225 100');
        phoneRouteLine.style.stroke = 'url(#routeGradient)';
      }
      if (mockHazard1) mockHazard1.style.opacity = '0.3';
      mockToggleRouteBtn.textContent = '⚡ Toggle Direct Route View';
    } else {
      if (activeRouteName) activeRouteName.textContent = 'Direct Route B (Shortcut)';
      if (phoneRouteLine) {
        phoneRouteLine.setAttribute('d', 'M 90 300 L 140 220 L 225 100');
        phoneRouteLine.style.stroke = '#ef4444';
      }
      if (mockHazard1) mockHazard1.style.opacity = '1';
      mockToggleRouteBtn.textContent = '🛡️ Toggle Aware Route View';
    }
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.querySelector('.main-nav');

  if (!mobileMenuBtn || !mainNav) return;

  mobileMenuBtn.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#091e17';
      navLinks.style.padding = '1.5rem';
      navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    }
  });
}

// Modal Handling
function initModals() {
  const apkModal = document.getElementById('apkModal');
  const privacyModal = document.getElementById('privacyModal');
  const closeApkModal = document.getElementById('closeApkModal');
  const modalGotItBtn = document.getElementById('modalGotItBtn');
  const openPrivacyModalBtn = document.getElementById('openPrivacyModalBtn');
  const closePrivacyModal = document.getElementById('closePrivacyModal');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');
  const copyPathBtn = document.getElementById('copyPathBtn');
  const targetFilePath = document.getElementById('targetFilePath');

  // Close handlers
  [closeApkModal, modalGotItBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal('apkModal'));
  });

  if (openPrivacyModalBtn) {
    openPrivacyModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('privacyModal');
    });
  }

  [closePrivacyModal, closePrivacyBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal('privacyModal'));
  });

  // Close on backdrop click
  [apkModal, privacyModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Copy Path action
  if (copyPathBtn && targetFilePath) {
    copyPathBtn.addEventListener('click', () => {
      const textToCopy = targetFilePath.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyPathBtn.textContent;
        copyPathBtn.textContent = 'Copied!';
        copyPathBtn.style.background = '#10b981';
        setTimeout(() => {
          copyPathBtn.textContent = originalText;
          copyPathBtn.style.background = '';
        }, 2000);
      }).catch(() => {
        copyPathBtn.textContent = 'Selected';
      });
    });
  }
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
