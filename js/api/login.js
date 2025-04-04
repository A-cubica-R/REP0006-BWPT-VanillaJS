document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
    const loginButton = document.getElementById('login-button');
    if (!loginButton) {
        console.error('Login button not found');
        return;
    }
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('Login button clicked');
        window.location.href = '../html/principal.html';
    });
});