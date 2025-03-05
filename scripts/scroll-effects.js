// Observer for featured logos
const observerFeatured = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.featured__logos h3').forEach(el => {
  observerFeatured.observe(el);
});

// Observer for contact info boxes
const observerBoxes = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.contact-info__box').forEach(box => {
  observerBoxes.observe(box);
});

// Observer for values
const observerValues = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const h3 = entry.target.querySelector('h3');
      if (h3) h3.classList.add('animate');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.values__value').forEach(box => {
  observerValues.observe(box);
});

