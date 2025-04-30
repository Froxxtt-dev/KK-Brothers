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

  // Capture form data using FormData
  const form = document.getElementById('booking-form');
  const formData = new FormData(form);

  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const location = formData.get('location') || 'Not provided';
  const services = formData.getAll('services'); // Get all selected services
  const date = formData.get('date');
  const message = formData.get('message');

  // Validate services (must select at least 1)
  if (services.length === 0) {
    alert('Please select at least one service.');
    return;
  }

  // Validate other required fields
  if (!name || !email || !phone || !location || !date) {
    alert('Please fill out all required fields.');
    return;
  }

  // Join services into a single string
  const servicesString = services.join(', ');

  // Log form data for debugging
  console.log('Form Data:', {
    name,
    email,
    phone,
    location,
    services: servicesString,
    date,
    message
  });

  // Format the message for WhatsApp with proper line breaks
  const whatsappMessage = `New Booking Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nServices: ${servicesString}\nPreferred Date: ${date}\nAdditional Notes: ${message || 'None'}`;

  // Encode the message for the URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // WhatsApp number and redirect URL
  const whatsappNumber = '233240768005';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Log the WhatsApp URL for debugging
  console.log('WhatsApp URL:', whatsappURL);

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