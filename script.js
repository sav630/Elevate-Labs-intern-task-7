document.getElementById('loadUsers').addEventListener('click', () => {
  fetchUsers();
  // Show the reload button after loading users
  document.getElementById('reloadUsers').style.display = 'inline-block';
});

document.getElementById('reloadUsers').addEventListener('click', fetchUsers);

function fetchUsers() {
  fetch('https://randomuser.me/api/?results=5')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      const users = data.results;
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; // Clear previous results

      users.forEach(user => {
        const firstName = user.name.first.toLowerCase();
        const lastName = user.name.last.toLowerCase();
        const generatedEmail = `${firstName}.${lastName}@gmail.com`;

        const userDiv = document.createElement('div');
        userDiv.className = 'user-card';
        userDiv.innerHTML = `
          <img src="${user.picture.medium}" alt="User Photo" />
          <h3>${user.name.first} ${user.name.last}</h3>
          <p><strong>Email:</strong> ${generatedEmail}</p>
          <p><strong>Country:</strong> ${user.location.country}</p>
        `;
        userList.appendChild(userDiv);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      document.getElementById('userList').innerHTML = 'Failed to load users.';
    });
}


