$(document).ready(async function () {

     // DropdownBtns 
     const dropdownBtns = document.querySelectorAll('.dropdown-btn');
     dropdownBtns.forEach(btn => {
          btn.addEventListener('click', () => {
               btn.classList.toggle('active');
               const dropdownContent = btn.nextElementSibling;
               if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
               } else {
                    dropdownContent.style.display = 'block';
               }
          });
     });

     // Fetching Chart Data and using it 
     fetch('/charts_data')
          .then(response => response.json())
          .then(data => {
               // Process the data and create charts
               createCharts(data);
          });

     // Initialize the carousel
     $('#logoCarousel').carousel({
          interval: 1500, // Auto-scroll interval in milliseconds
          pause: 'hover' // Pause on hover
     });


     // Top Recuirters Carousel
     window.addEventListener('resize', updateCarousel);
     updateCarousel(window);

     // CDC TEAM
     cdcTeam('cdc-team');

     // Activities Data
     activitiesData("activities-container");

     // // Instagram Data
     instaPosts("insta-container");


     $('#studentsFeedBack').carousel({
          interval: 1500, // Auto-scroll interval in milliseconds
          pause: 'hover' // Pause on hover
     });

     $('#recruitersFeedBack').carousel({
          interval: 1500, // Auto-scroll interval in milliseconds
          pause: 'hover' // Pause on hover
     });

     // Map At Footer
     var map = L.map('map').setView([22.29378695937245, 73.12215125398146], 15);

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);

     L.marker([22.29378695937245, 73.12215125398146]).addTo(map)
          .bindPopup('Navrachana University')
          .openPopup();


});

async function cdcTeam(containerID) {


     const request = await fetch("/cdc-team")
     const cdc_data = await request.json()

     Object.keys(cdc_data).forEach((key) => {
          const data = cdc_data[key]
          // Create the card element
          const card = $(`
        <div class="col-lg-4">
            <div class="card mb-4 shadow-sm cdc-team">
                <img src="/static/images/team/${data.img}" class="card-img-top" alt="${key}">
                <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.position}</p>
                <p class="card-text">${data.email}</p>
                <p class="card-text">${data.phone}</p>
                </div>
            </div>
        </div>
    `);

          // Append the card to the container
          $("#" + containerID).append(card);
     });

}

function instaPosts(containerID) {

     const posts = {
          "post1": { "img": "post1.png" },
          "post2": { "img": "post2.png" },
          "post3": { "img": "post3.png" },
          "post4": { "img": "post4.png" },
          "post5": { "img": "post5.png" },
          "post6": { "img": "post6.png" },
     }

     // Loop through each post data
     Object.keys(posts).forEach((key) => {
          const data = posts[key];

          // Create the card element using a template literal
          const card = $(`
                 <div class="col-lg-2 col-md-6 d-flex justify-content-center">
                     <img src="/static/images/testimonials/${data.img}" class="mb-4 insta-post" width="300px" height="300px" alt="Instagram Post">
                 </div>
             `);

          // Append the card to the container
          $("#" + containerID).append(card);
     });
}

async function activitiesData(containerID) {
     const request = await fetch("/activities")
     const cdc_data = await request.json()

     Object.keys(cdc_data).forEach((key) => {
          const data = cdc_data[key]
          // Create the card element
          const card = $(`
        <div class="col-md-6 col-lg-4">
            <div class="card mb-4 shadow-sm cdc-team">
                <img src="/static/images/activities/${data.img}" class="card-img-top" alt="${key}">
                <div class="card-body">
                <h4 class="card-title fw-bold">${data.title}</h4>
            </div>
        </div>`);

          // Append the card to the container
          $("#" + containerID).append(card);
     });
}

function toggleSidebar() {
     const sidebar = document.getElementById("sidebar");
     if (sidebar.style.width === "300px") {
          sidebar.style.width = "0";
     } else {
          sidebar.style.width = "300px";
     }
}

window.addEventListener('resize', () => {
     const sidebar = document.getElementById("sidebar");
     if (window.innerWidth >= 768) {
          sidebar.style.width = "0";
     }
});

async function updateCarousel(window) {
     // Fetching Images Array
     const images = await fetch('/images-array');
     const data = await images.json()
     const imgs = data['images'];

     const slides = calculateGrid(window);
     const indicatorsContainer = document.getElementById('carouselIndicators');
     const carouselInner = document.getElementById('carouselInner');

     // Clear existing indicators and inner content
     indicatorsContainer.innerHTML = '';
     carouselInner.innerHTML = '';

     // Loop through images and create carousel items
     for (let i = 0; i < Math.ceil(imgs.length / slides); i++) {
          const indicatorButton = document.createElement('button');
          indicatorButton.type = 'button';
          indicatorButton.dataset.bsTarget = '#logoCarousel';
          indicatorButton.dataset.bsSlideTo = i;
          indicatorButton.className = (i === 0) ? 'active border' : 'border';
          indicatorButton.ariaCurrent = (i === 0) ? 'true' : '';
          indicatorButton.ariaLabel = 'Slide ' + (i + 1);
          indicatorsContainer.appendChild(indicatorButton);

          const carouselItem = document.createElement('div');
          carouselItem.className = 'carousel-item' + (i === 0 ? ' active' : '');

          const rowDiv = document.createElement('div');
          rowDiv.className = 'row';

          for (let j = i * slides; j < (i + 1) * slides && j < imgs.length; j++) {
               const colDiv = document.createElement('div');
               colDiv.className = `col-md-${12 / cols} col-4 mb-2`;
               const img = document.createElement('img');
               img.src = '/static/images/logos/' + imgs[j];
               img.className = 'd-block';
               img.style.height = '90px';
               img.alt = 'Logo ' + (j + 1);
               colDiv.appendChild(img);
               rowDiv.appendChild(colDiv);
          }

          carouselItem.appendChild(rowDiv);
          carouselInner.appendChild(carouselItem);
     }
}
function calculateGrid(window) {

     if (window.innerWidth >= 1200) {
          rows = 2;
          cols = 6;
     }
     else if (window.innerWidth <= 1199 && window.innerWidth >= 768) {
          rows = 2;
          cols = 4;
     }
     else {
          rows = 1;
          cols = 3;
     }
     return rows * cols;
}

function createCharts(chartsData) {
     // Get chart container
     const chartContainer = document.getElementById('chart-container');

     // Loop through chartsData and create charts using Chart.js
     chartsData.forEach((chart, index) => {
          const chartDiv = document.createElement('div');
          chartDiv.classList.add('col-xl-3', 'col-md-6', 'col-12');

          const canvas = document.createElement('canvas');
          canvas.id = `chart_${index}`;
          chartDiv.appendChild(canvas);
          chartContainer.appendChild(chartDiv);

          createChart(canvas, chart[0], chart[1]);
     });
}

function createChart(canvas, chartTitle, chartData) {
     const labels = Object.keys(chartData);
     const values = Object.values(chartData);

     new Chart(canvas, {
          type: 'bar',
          data: {
               labels: labels,
               datasets: [{
                    label: chartTitle,
                    data: values,
                    backgroundColor: '#bd171e'
               }]
          },
          options: {
               plugins: {
                    title: {
                         display: true,
                         text: chartTitle,
                    },
                    legend: false
               },
               responsive: true,
               maintainAspectRatio: false, // Ensure charts fill the div
               animation: {
                    duration: 1000, // Set animation duration (ms)
                    easing: 'easeInOutQuart' // Set animation easing
               },
               scales: {
                    y: {
                         beginAtZero: true
                    }
               }
          }
     });
}


