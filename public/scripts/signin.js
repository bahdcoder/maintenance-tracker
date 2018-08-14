/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const baseUrl = 'https://maintenance-tracker-app.herokuapp.com/api/v1/auth/login/';

const signIn = (event) => {
  event.preventDefault();

  const email = document.getElementById('emailL').value;
  const password = document.getElementById('passwordL').value;

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
    body: JSON.stringify({ email, password }),

  })
    .then((response) => {
      if (response.status === 401) {
        document.getElementById('existingmsg').innerHTML = 'Please check that your password or email is correct';
      }
      return response.json();
    })
    .then((signinData) => {
      if (signinData.status === 'fail') {
        document.getElementById('emailmsgL').innerHTML = signinData.data.errors.email || '';
        document.getElementById('passwordmsgL').innerHTML = signinData.data.errors.password || '';
      } else {
        localStorage.setItem('token', signinData.data.token);
        page(signinData.data.user.role);
      }
    }).catch(err => err.message);
};
document.getElementById('signinBtn').addEventListener('click', signIn);
