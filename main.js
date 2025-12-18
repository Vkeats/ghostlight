// Theme toggle
(function() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }

    let isAnimating = false;

    toggle.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;

        const current = document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark';
        const next = current === 'dark' ? 'light' : 'dark';

        // Lock ghost to current color during animation
        const currentColor = getComputedStyle(toggle).color;
        toggle.style.setProperty('--ghost-pre-transition', currentColor);

        // Trigger float animation
        toggle.classList.add('theme-toggle--animating');
        toggle.addEventListener('animationend', function handler() {
            toggle.classList.remove('theme-toggle--animating');
            toggle.style.removeProperty('--ghost-pre-transition');
            toggle.removeEventListener('animationend', handler);
            isAnimating = false;
        });

        // Pulse emanates from ghost
        if (document.startViewTransition) {
            const rect = toggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            document.documentElement.style.setProperty('--pulse-x', x + 'px');
            document.documentElement.style.setProperty('--pulse-y', y + 'px');

            document.startViewTransition(() => setTheme(next));
        } else {
            setTheme(next);
        }
    });
})();

// Random glitch effect on .tech + ghost eye peek
(function() {
    const tech = document.querySelector('.logo__text--tech');
    const toggle = document.querySelector('.theme-toggle');
    if (!tech) return;

    function triggerGlitch() {
        tech.classList.add('glitch');
        tech.addEventListener('animationend', () => {
            tech.classList.remove('glitch');
        }, { once: true });

        // Ghost notices the glitch after a beat
        if (toggle) {
            setTimeout(() => {
                toggle.classList.add('theme-toggle--peeking');
                setTimeout(() => {
                    toggle.classList.remove('theme-toggle--peeking');
                }, 500);
            }, 300);
        }

        // Random delay between 3-8 seconds
        const nextDelay = 3000 + Math.random() * 5000;
        setTimeout(triggerGlitch, nextDelay);
    }

    // Start after initial random delay
    setTimeout(triggerGlitch, 2000 + Math.random() * 3000);
})();

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const status = form.querySelector('.contact-form__status');
        const button = form.querySelector('.contact-form__submit');

        button.disabled = true;
        status.textContent = 'Sending...';
        status.className = 'contact-form__status';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = 'Message sent.';
                status.classList.add('contact-form__status--success');
                form.reset();
            } else {
                throw new Error('Failed');
            }
        } catch (error) {
            status.textContent = 'Failed to send. Try again.';
            status.classList.add('contact-form__status--error');
        } finally {
            button.disabled = false;
        }
    });
}
