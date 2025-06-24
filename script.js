window.addEventListener('load', () => {
  const spinner = document.getElementById('spinner');
  spinner.style.opacity = '0';
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 500);

  // Gallery images
  const images = [
    'Assets/civic boot.jpg',
    'Assets/civic exterior.jpg',
    'Assets/civic interior.jpg',
    'Assets/civic wheel.jpg',
    'Assets/civic.jpg',
    'Assets/engine.jpg',
    'Assets/inside engine wash.jpg',
    'Assets/work interior.jpg',
    'Assets/engine 2.jpg',
    'Assets/civic boot.jpg'
  ];

  // Dynamically add images to gallery with animation
  const galleryContainer = document.querySelector('.gallery-container');
  if (galleryContainer) {
    images.forEach((src) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');
      item.innerHTML = `<img src="${src}" alt="Gallery Image" loading="lazy">`;
      galleryContainer.appendChild(item);

      // Trigger animation when item is in view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(item);
    });

    // Mobile swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;

    const updateStack = () => {
      const items = galleryContainer.querySelectorAll('.gallery-item');
      requestAnimationFrame(() => {
        items.forEach((item, index) => {
          const zIndex = items.length - Math.abs(index - currentIndex);
          const scale = 1 - (Math.abs(index - currentIndex) * 0.1);
          const zTranslate = (index - currentIndex) * -50;
          item.style.zIndex = zIndex;
          item.style.transform = `translateZ(${zTranslate}px) scale(${scale > 0.1 ? scale : 0.1})`;
          item.style.opacity = index === currentIndex ? 1 : 0.8 - (Math.abs(index - currentIndex) * 0.1);
        });
      });
    };

    galleryContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    galleryContainer.addEventListener('touchmove', (e) => {
      touchEndX = e.changedTouches[0].screenX;
    });

    galleryContainer.addEventListener('touchend', () => {
      const deltaX = touchEndX - touchStartX;
      const items = galleryContainer.querySelectorAll('.gallery-item');
      if (deltaX > 50 && currentIndex > 0) {
        currentIndex--;
      } else if (deltaX < -50 && currentIndex < items.length - 1) {
        currentIndex++;
      }
      updateStack();
    });

    // Initialize stack
    updateStack();
  }

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

  // Debounced Back to Top
  let scrollTimeout;
  const backToTop = document.getElementById('back-to-top');
  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }, 100));

  // Booking Form Submission with WhatsApp Redirect
  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = document.getElementById('booking-form');
    const formData = new FormData(form);

    const vehicleType = formData.get('vehicle-type');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const location = formData.get('location') || 'Not provided';
    const services = formData.getAll('services');
    const date = formData.get('date');
    const message = formData.get('message');

    if (!vehicleType) {
      alert('Please select a vehicle type.');
      return;
    }
    if (services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    if (!name || !email || !phone || !location || !date) {
      alert('Please fill out all required fields.');
      return;
    }

    const servicesString = services.join(', ');
    const whatsappMessage = `New Booking Details:\nVehicle Type: ${vehicleType}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nServices: ${servicesString}\nPreferred Date: ${date}\nAdditional Notes: ${message || 'None'}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '233240768005';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log('Form Data:', { vehicleType, name, email, phone, location, services: servicesString, date, message });
    console.log('WhatsApp URL:', whatsappURL);

    window.open(whatsappURL, '_blank');

    const formMessage = document.getElementById('form-message');
    formMessage.classList.add('success');
    formMessage.innerText = 'Booking submitted! Redirecting to WhatsApp...';
    setTimeout(() => {
      formMessage.innerText = '';
    }, 3000);
  });

  // Toggle Services based on Vehicle Type
  function toggleServices() {
    const vehicleType = document.getElementById('vehicle-type').value;
    const saloonServices = document.getElementById('saloon-services');
    const suvServices = document.getElementById('suv-services');

    if (vehicleType === 'saloon') {
      saloonServices.style.display = 'block';
      suvServices.style.display = 'none';
    } else if (vehicleType === 'suv') {
      saloonServices.style.display = 'none';
      suvServices.style.display = 'block';
    } else {
      saloonServices.style.display = 'none';
      suvServices.style.display = 'none';
    }
  }

  // Add event listener to vehicle type select
  const vehicleTypeSelect = document.getElementById('vehicle-type');
  if (vehicleTypeSelect) {
    vehicleTypeSelect.addEventListener('change', toggleServices);
  }
});