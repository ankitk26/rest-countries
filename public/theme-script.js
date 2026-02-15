// This script runs before React hydrates to prevent theme flash
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    // Ignore errors (e.g., localStorage not available)
  }
})();
