// Random glitch effect on .tech
(function() {
    const tech = document.querySelector('.logo__text--tech');
    if (!tech) return;

    function triggerGlitch() {
        tech.classList.add('glitch');
        tech.addEventListener('animationend', () => {
            tech.classList.remove('glitch');
        }, { once: true });

        // Random delay between 3-8 seconds
        const nextDelay = 3000 + Math.random() * 5000;
        setTimeout(triggerGlitch, nextDelay);
    }

    // Start after initial random delay
    setTimeout(triggerGlitch, 2000 + Math.random() * 3000);
})();

document.querySelector('.contact-form').addEventListener('submit', async function(e) {
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
