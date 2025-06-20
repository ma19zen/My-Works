document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navbarToggle = document.getElementById('navbar__toggle');
    const navbarList = document.getElementById('navbar__list');

    sections.forEach(section => {
      const navList = document.getElementById('navbar__list');
      const navItem = document.createElement('li');
      const navLink = document.createElement('a');
      navLink.className = 'menu__link';
      navLink.href = `#${section.id}`;
      navLink.textContent = section.dataset.nav;
      navItem.appendChild(navLink);
      navList.appendChild(navItem);
    });

    navbarToggle.addEventListener('click', function() {
        navbarList.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });

    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', function() {
            navbarList.classList.remove('active');
            navbarToggle.classList.remove('active');
        });
    });
  
    document.querySelectorAll('.menu__link').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
window.addEventListener('scroll', function() {
    let currentSection;
    sections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= window.innerHeight / 3 && sectionRect.bottom >= window.innerHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    sections.forEach(section => {
        section.classList.remove('active');
    });
    if (currentSection) {
        document.getElementById(currentSection).classList.add('active');
    }

    document.querySelectorAll('.menu__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

//comment section
  const commentForm = document.getElementById('commentForm');
  const commentItems = document.getElementById('commentItems');

  commentForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const comment = document.getElementById('comment').value;
      const commentItem = document.createElement('li');
      commentItem.textContent = `${name} (${email}):  ${comment}`;
      commentItems.appendChild(commentItem);
      commentForm.reset();
  });
});