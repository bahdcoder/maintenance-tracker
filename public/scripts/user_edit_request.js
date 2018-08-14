/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */
const id = localStorage.getItem('id');
const baseUrl = `https://maintenance-tracker-app.herokuapp.com/api/v1/users/requests/${id}`;
const gottenToken = localStorage.getItem('token');
const department = document.getElementById('department');
const equipment = document.getElementById('equipment');
const serialnumber = document.getElementById('serialNumber');
const title = document.getElementById('requestTitle');
const description = document.getElementById('requestDescription');


window.onload = () => {
  fetch(baseUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json,*/*',
      'Content-Type': 'application/json',
      Token: gottenToken,
    },
  })
    .then((response) => {
      if (response.status === 404) {
        document.getElementById('requestErr').innerHTML = 'No request available yet';
      }
      return response.json();
    })
    .then((requestData) => {
      if (requestData.status === 'success') {
        const { request } = requestData.data;
        department.value = request.department;
        equipment.value = request.equipment;
        serialnumber.value = request.serialnumber;
        title.value = request.title;
        description.value = request.description;
      }
    }).catch(err => err.message);
};

const editRequest = (event) => {
  event.preventDefault();
  fetch(baseUrl, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json,*/*',
      'Content-Type': 'application/json',
      Token: gottenToken,
    },
    body: JSON.stringify({
      department: department.value,
      equipment: equipment.value,
      serialnumber: serialnumber.value,
      title: title.value,
      description: description.value,
    }),

  })
    .then((response) => {
      if (response.status === 409) {
        document.getElementById('createRequestE').innerHTML = 'Request already exists';
      }
      else if (response.status === 403) {
        document.getElementById('createRequestE').innerHTML = 'You cannot edit, request no longer pending!';
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
document.getElementById('editRequest').addEventListener('click', editRequest);

