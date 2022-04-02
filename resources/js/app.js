// @ts-ignore
import Alpine from 'alpinejs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

// @ts-ignore
window.Alpine = Alpine;

Alpine.start();

AOS.init({
  once: true,
});

const callIcon = document.querySelector('#call-icon');
const callUs = document.querySelector('#call-us');

if (callIcon && callUs) {
  // @ts-ignore
  callIcon.addEventListener('click', () => callUs.click());
}
