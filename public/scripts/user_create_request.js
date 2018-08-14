/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const baseUrl = 'https://maintenance-tracker-app.herokuapp.com/api/v1/users/requests/';

const newRequest = (event) => {
  event.preventDefault();
  const department = document.getElementById('department').value;
  const equipment = document.getElementById('equipment').value;
  const serialnumber = document.getElementById('serialNumber').value;
  const title = document.getElementById('requestTitle').value;
  const description = document.getElementById('requestDescription').value;

  const gottenToken = localStorage.getItem('token');

  fetch(baseUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json,*/*',
      'Content-Type': 'application/json',
      Token: gottenToken,
    },
    body: JSON.stringify({
      department, equipment, serialnumber, title, description,
    }),

  })
    .then((response) => {
      if (response.status === 409) {
        document.getElementById('createRequestE').innerHTML = 'Request already exists';
      }
      return response.json();
    })
    .then((requestData) => {
      if (requestData.status === 'fail') {
        document.getElementById('departmentE').innerHTML = requestData.data.errors.department || '';
        document.getElementById('equipmentE').innerHTML = requestData.data.errors.equipment || '';
        document.getElementById('serialnumberE').innerHTML = requestData.data.errors.serialnumber || '';
        document.getElementById('titleE').innerHTML = requestData.data.errors.title || '';
        document.getElementById('descriptionE').innerHTML = requestData.data.errors.description || '';
      } else {
        document.getElementById('createRequestS').innerHTML = 'request created successfully';
        window.location.href = 'https://maintenance-tracker-ui.herokuapp.com/client/allrequests.html';
      }
    });
};
document.getElementById('createRequest').addEventListener('click', newRequest);
