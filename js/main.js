(function () {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    if (!sections.length || !navLinks.length) return;

    /** Document Y of element top (works regardless of offsetParent). */
    function sectionTopY(el) {
        return el.getBoundingClientRect().top + window.scrollY;
    }

    const sidebarCharacter = document.getElementById('sidebar-character');

    function setActiveById(id) {
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        if (sidebarCharacter) {
            sidebarCharacter.dataset.section = id;
        }
    }

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const docEl = document.documentElement;
        const atBottom = window.innerHeight + scrollY >= docEl.scrollHeight - 3;

        if (atBottom) {
            setActiveById(sections[sections.length - 1].id);
            return;
        }

        const trigger = scrollY + Math.min(160, window.innerHeight * 0.22);
        let activeId = sections[0].id;

        sections.forEach((section) => {
            if (trigger >= sectionTopY(section)) {
                activeId = section.id;
            }
        });

        setActiveById(activeId);
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();
})();
