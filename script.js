// Function to generate the calendar table
function generateCalendar() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('monthYear');

  monthYear.textContent = `${monthNames[month]} ${year}`;

  // Calculate the first day of the current month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let currentDate = new Date(year, month, 1);

  let html = '';
  for (let i = 0; i < 4; i++) {
    html += '<tr>';
    for (let j = 0; j < 10; j++) {
      if (currentDate >= firstDay && currentDate <= lastDay) {
        html += `<td>${currentDate.getDate()}</td>`;
      } else {
        html += '<td ></td>'; // Add empty cells for days outside the current month
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    html += '</tr>';
  }
  calendar.innerHTML = html;

  // Add click event listeners to each td
  const tdElements = calendar.querySelectorAll('td');
  tdElements.forEach((td) => {
    td.addEventListener('click', handleCellClick);
  });
}

// Function to retrieve usernames from the API and create the user table
function loadUsernames() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      const userTable = document.getElementById('userTable');
      userTable.innerHTML = '';

      const currentDayOfMonth = new Date().getDate();

      for (let i = 0; i < 4; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
          const user = users[i * 10 + j];
          const index = i * 10 + j;
          const cell = document.createElement('td');
          cell.textContent = user ? user.username : '';

          // Check if the index matches the current day of the month
          if (index === currentDayOfMonth - 1) {
            cell.classList.add('selected'); // Append a class for styling
          }

          row.appendChild(cell);
          cell.dataset.index = index;
        }
        userTable.appendChild(row);
      }
    });
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let selectedDates = [];

// Load selected dates from local storage
if (localStorage.getItem('selectedDates')) {
  selectedDates = JSON.parse(localStorage.getItem('selectedDates'));
}

// Function to update the UI with selected dates
function updateSelectedDatesUI() {
  const selectedDatesDiv = document.getElementById('selectedDates');
  const formattedDates = selectedDates.map((date) => date);
  selectedDatesDiv.textContent = `[${formattedDates.join(', ')}]`;
}

//click function

const handleCellClick = (e) => {
  const cell = e.target;
  const date = Number(cell.innerHTML);
  selectedDates.push(date);
  localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
  updateSelectedDatesUI();
  cell.classList.add('selected');
};
const handleDelete = () => {
  localStorage.removeItem('selectedDates');
  selectedDates = [];
  updateSelectedDatesUI();
};

//calling calander function
generateCalendar();
updateSelectedDatesUI();

// Highlight the current date
const today = new Date();
const currentDay = today.getDate();
const cells = document.querySelectorAll('td');
cells.forEach((cell) => {
  if (Number(cell.innerHTML) === currentDay) {
    cell.classList.add('selected');
  }
});

loadUsernames();
