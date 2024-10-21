// Toggle navigation menu on mobile
document.getElementById("menuToggle").onclick = function () {
    this.classList.toggle("active");
    const navLinks = document.getElementById("navLinks");
    if (navLinks.style.maxHeight === "0px" || navLinks.style.maxHeight === "") {
      navLinks.style.maxHeight = "150px";
    } else {
      navLinks.style.maxHeight = "0px";
    }
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    // Chart 1: Sales Data Analysis
    const ctx1 = document.getElementById('chart1').getContext('2d');
    const chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Sales',
                data: [15000, 20000, 18000, 22000],
                borderColor: '#f0a500',
                backgroundColor: 'rgba(240, 165, 0, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        // Collect form data
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const instructions = document.getElementById('instructions').value;
    
        // Create a new workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const ws_data = [
            ["Name", "Service", "Instructions"],
            [name, service, instructions],
        ];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Contact Info");
    
        // Generate a file and trigger a download
        XLSX.writeFile(wb, "contact_info.xlsx");
    
        // Clear the form
        document.getElementById('contact-form').reset();
    });
    

    // Chart 2: Healthcare Data Visualization
    const ctx2 = document.getElementById('chart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Age 20-30', 'Age 30-40', 'Age 40-50'],
            datasets: [{
                label: 'Patients',
                data: [300, 450, 200],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbxVJT8PTobeYueFwrlehNAhkS-nrpriwQ_lMM-FLeeGbDA3yZgFCCwtmeF52KIncz3yFw/exec'
const form = document.forms['submit-to-google-sheet']
const success = document.getElementById('success');
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => { 
    success.innerHTML = "data successfully submit"
    })
.catch(error => console.error('Error!', error.message))
})
