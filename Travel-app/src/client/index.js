import { handleSubmit } from './js/app.js';
import './styles/style.scss';

// Ensure the form submission is handled by attaching the handleSubmit function to the form
document.getElementById("travel-form").addEventListener("submit", handleSubmit);

// Register the Service Worker if it is supported by the browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('Service Worker registered:', reg);
            })
            .catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    });
}
