/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */


const baseUrl = 'https://maintenance-tracker-app.herokuapp.com/api/v1/auth/signup/';


const signUp = (event) => {
  event.preventDefault();


  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const page = (role) => {
    const userPage = 'https://maintenance-tracker-ui.herokuapp.com/client/allrequests.html';

    const adminPage = 'https://maintenance-tracker-ui.herokuapp.com/client/adminrequests.html';

    switch (role) {
      case 'user':
        window.location.href = userPage;
        break;
      case 'admin':
        window.location.href = adminPage;
        break;
      default:
    }
  };


  fetch(baseUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),

  })
    .then((response) => {
      if (response.status === 409) {
        document.getElementById('existingmsg').innerHTML = 'Email already exists';
      }
      return response.json();
    })
    .then((signupData) => {
      if (signupData.status === 'fail') {
        document.getElementById('namemsg').innerHTML = signupData.data.errors.name || '';
        document.getElementById('emailmsg').innerHTML = signupData.data.errors.email || '';
        document.getElementById('passwordmsg').innerHTML = signupData.data.errors.password || '';
      } else {
        localStorage.setItem('token', signupData.data.token);
        page(signupData.data.user.role);
      }
    }).catch(err => err.message);
};
document.getElementById('signupBtn').addEventListener('click', signUp);
