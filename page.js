const studikDatabase = [
    {   title: "Веб-разработчик с нуля до Junior", 
        price: "45000", 
        rating: "4.9", 
        author: "hr@studik.ru" },
    {   title: "Дизайн интерфейсов (UI/UX)", 
        price: "38000", 
        rating: "4.7", 
        author: "design@studik.ru" },
    {   title: "Data Science и машинное обучение", 
        price: "55000", 
        rating: "4.8", 
        author: "data@studik.ru" },
    {   title: "Основы Python для начинающих", 
        price: "12000", 
        rating: "4.6", 
        author: "python@studik.ru" },
    {   title: "Маркетинг в социальных сетях (SMM)", 
        price: "19000", 
        rating: "4.4", 
        author: "smm@studik.ru" },
    {   title: "Управление проектами в IT", 
        price: "32000", 
        rating: "4.8", 
        author: "pm@studik.ru" }
];

let displayedCount = 0;
const length = 3; 
const grid = document.getElementById('courses-grid');
const loadMoreBtn = document.getElementById('load-more');

function renderCourses() {
    const currentBatch = studikDatabase.slice(displayedCount, displayedCount + length);
    
    currentBatch.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div>
                <span class="course-badge">Курс</span>
                <h3>${course.title}</h3>
            </div>
            <div class="course-meta">
                <span class="course-price">${Number(course.price).toLocaleString()} ₽</span>
                <span class="course-rating">★ ${course.rating}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    displayedCount += length;
    
    if (displayedCount >= studikDatabase.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('studik-theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    let activeTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('studik-theme', targetTheme);
});

const courseForm = document.getElementById('course-form');

courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    const formInputs = courseForm.querySelectorAll('input');
    
    formInputs.forEach(input => {
        const errorElement = input.nextElementSibling;
        if (!input.checkValidity()) {
            errorElement.style.display = 'block';
            isFormValid = false;
        } else {
            errorElement.style.display = 'none';
        }
    });

    if (isFormValid) {
        const newCourse = {
            title: document.getElementById('course-title').value,
            price: document.getElementById('course-price').value,
            rating: document.getElementById('course-rating').value,
            author: document.getElementById('course-author').value
        };

        console.log('Новый курс добавлен на Studik:', newCourse);

        studikDatabase.unshift(newCourse);

        grid.innerHTML = '';
        displayedCount = 0;
        renderCourses();

        alert(`Курс "${newCourse.title}" успешно добавлен в каталог!`);
        courseForm.reset();
    }
});

renderCourses();
loadMoreBtn.addEventListener('click', renderCourses);
