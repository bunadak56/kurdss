(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('header');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const fontSizeSlider = document.getElementById('font-size');
    const fontFamilySelect = document.getElementById('font-family');
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const newsletterForm = document.getElementById('newsletter-form');
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');

    // Event Listeners
    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('scroll', handleScroll);
    settingsToggle.addEventListener('click', toggleSettings);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    fontSizeSlider.addEventListener('input', changeFontSize);
    fontFamilySelect.addEventListener('change', changeFontFamily);
    searchToggle.addEventListener('click', toggleSearch);
    closeSearch.addEventListener('click', toggleSearch);
    newsletterForm.addEventListener('submit', handleNewsletter);
    acceptCookies.addEventListener('click', acceptCookieConsent);

    // Functions
    function init() {
        checkCookieConsent();
        loadUserPreferences();
        initContentSlider();
    }

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function toggleSettings() {
        settingsPanel.classList.toggle('active');
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        saveUserPreference('darkMode', darkModeToggle.checked);
    }

    function changeFontSize() {
        document.documentElement.style.setProperty('--base-font-size', `${fontSizeSlider.value}px`);
        saveUserPreference('fontSize', fontSizeSlider.value);
    }

    function changeFontFamily() {
        document.body.style.fontFamily = fontFamilySelect.value;
        saveUserPreference('fontFamily', fontFamilySelect.value);
    }

    function toggleSearch() {
        searchOverlay.classList.toggle('hidden');
        if (!searchOverlay.classList.contains('hidden')) {
            searchInput.focus();
        }
    }

    function handleNewsletter(e) {
        e.preventDefault();
        // Implement newsletter signup logic here
        console.log('Newsletter signup');
    }

    function checkCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            cookieConsent.classList.remove('hidden');
        }
    }

    function acceptCookieConsent() {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.add('hidden');
    }

    function saveUserPreference(key, value) {
        localStorage.setItem(key, value);
    }

    function loadUserPreferences() {
        const darkMode = localStorage.getItem('darkMode');
        const fontSize = localStorage.getItem('fontSize');
        const fontFamily = localStorage.getItem('fontFamily');

        if (darkMode === 'true') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }

        if (fontSize) {
            fontSizeSlider.value = fontSize;
            document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
        }

        if (fontFamily) {
            fontFamilySelect.value = fontFamily;
            document.body.style.fontFamily = fontFamily;
        }
    }

    function initContentSlider() {
        // Implement content slider logic here
        console.log('Content slider initialized');
    }

    // Search functionality
    let debounceTimer;
    searchInput.addEventListener('input', debounceSearch);

    function debounceSearch() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(searchInput.value);
        }, 300);
    }

    function performSearch(query) {
        // Implement search logic here
        console.log(`Searching for: ${query}`);
    }

    // API Module
    const API = (function() {
        const BASE_URL = 'https://api.fikruraman.com/v1';

        async function get(endpoint) {
            try {
                const response = await fetch(`${BASE_URL}${endpoint}`);
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function post(endpoint, data) {
            try {
                const response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

        return {
            get,
            post,
        };
    })();

    // Use API module
    API.get('/articles').then(articles => {
        console.log('Fetched articles:', articles);
    });
})();
