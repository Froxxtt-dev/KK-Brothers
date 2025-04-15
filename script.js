window.addEventListener('load', () => {
  const spinner = document.getElementById('spinner');
  spinner.style.opacity = '0';
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 500);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Stats Counter
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCount();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(counter);
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Booking Form Submission with WhatsApp Redirect
document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Capture form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value;

  // Format the message for WhatsApp with proper line breaks
  const whatsappMessage = `New Booking Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nPreferred Date: ${date}\nAdditional Notes: ${message || 'None'}`;

  // Encode the message for the URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // WhatsApp number and redirect URL
  const whatsappNumber = '233240768005';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, '_blank');

  // Display success message
  const formMessage = document.getElementById('form-message');
  formMessage.classList.add('success');
  formMessage.innerText = 'Booking submitted! Redirecting to WhatsApp...';
  setTimeout(() => {
    formMessage.innerText = '';
  }, 3000);
});

// Newsletter Subscription
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  const message = document.getElementById('newsletter-message');

  // Store email in localStorage
  let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    message.classList.add('success');
    message.innerText = 'Subscribed successfully!';
  } else {
    message.classList.add('error');
    message.innerText = 'Email already subscribed!';
  }

  setTimeout(() => {
    message.innerText = '';
  }, 3000);

  // Reset form
  document.getElementById('newsletter-form').reset();
});

// Show subscribers on double-click of subscribe button (for demo purposes)
document.querySelector('.newsletter-form .btn').addEventListener('dblclick', () => {
  const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
  if (subscribers.length > 0) {
    alert('Subscribed Emails:\n' + subscribers.join('\n'));
  } else {
    alert('No subscribers yet!');
  }
});
