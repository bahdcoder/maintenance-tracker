/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */
const id = localStorage.getItem('id');
const baseUrl = `https://maintenance-tracker-app.herokuapp.com/api/v1/requests/${id}`;
const singleRequest = document.getElementById('detailsRequest');
const statusBtn1 = document.getElementById('approve');
const statusBtn2 = document.getElementById('disapprove');
const statusBtn3 = document.getElementById('resolve');
const gottenToken = localStorage.getItem('token');

const adminGetSingleRequest = (request) => {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const titleLabel = document.createElement('label');
  const titleText = document.createElement('span');
  const department = document.createElement('p');
  const departmentLabel = document.createElement('label');
  const departmentText = document.createElement('span');
  const equipment = document.createElement('p');
  const equipmentLabel = document.createElement('label');
  const equipmentText = document.createElement('span');
  const sn = document.createElement('p');
  const snLabel = document.createElement('label');
  const snText = document.createElement('span');
  const description = document.createElement('p');
  const descriptionLabel = document.createElement('label');
  const descriptionText = document.createElement('span');
  const statusLabelClass = document.createElement('div');
  const statusLabel = document.createElement('label');

  titleText.innerHTML = request.title;
  titleLabel.innerHTML = 'Title: ';
  departmentText.innerHTML = request.department;
  departmentLabel.innerHTML = 'Department: ';
  equipmentText.innerHTML = request.equipment;
  equipmentLabel.innerHTML = 'Equipment: ';
  snText.innerHTML = request.serialnumber;
  snLabel.innerHTML = 'S/N: ';
  descriptionText.innerHTML = request.description;
  descriptionLabel.innerHTML = 'Description: ';
  statusLabel.innerHTML = request.requeststatus;


  const { requeststatus } = request;
  switch (requeststatus) {
    case 'pending':
      statusLabel.className = ('yellow');
      break;
    case 'approved':
      statusLabel.className = ('green');
      break;
    case 'disapproved':
      statusLabel.className = ('red');
      break;
    case 'resolved':
      statusLabel.className = ('green');
      break;
    default:
  }

  switch (requeststatus) {
    case 'pending':
      statusBtn1.disabled = false;
      statusBtn2.disabled = false;
      statusBtn3.disabled = true;
      break;
    case 'approved':
      statusBtn1.disabled = true;
      statusBtn2.disabled = false;
      statusBtn3.disabled = false;
      break;
    case 'disapproved':
      statusBtn1.disabled = false;
      statusBtn2.disabled = true;
      statusBtn3.disabled = true;
      break;
    case 'resolved':
      statusBtn1.disabled = true;
      statusBtn2.disabled = true;
      statusBtn3.disabled = true;
      break;
    default:
  }

  card.appendChild(title);
  title.appendChild(titleLabel);
  titleLabel.appendChild(titleText);
  card.appendChild(department);
  department.appendChild(departmentLabel);
  departmentLabel.appendChild(departmentText);
  card.appendChild(equipment);
  equipment.appendChild(equipmentLabel);
  equipmentLabel.appendChild(equipmentText);
  card.appendChild(sn);
  sn.appendChild(snLabel);
  snLabel.appendChild(snText);
  card.appendChild(description);
  description.appendChild(descriptionLabel);
  descriptionLabel.appendChild(descriptionText);
  title.className = ('breaks');
  department.className = ('breaks');
  description.className = ('breaks');
  equipment.className = ('breaks');
  sn.className = ('breaks');
  statusLabelClass.className = ('status');
  card.appendChild(statusLabelClass);
  statusLabelClass.appendChild(statusLabel);
  singleRequest.appendChild(card);
};


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
        adminGetSingleRequest(requestData.data.request);
      }
    }).catch(err => err.message);
};
const addRequestStatus = (event) => {
  const status = event.target.title;
  const url = `https://maintenance-tracker-app.herokuapp.com/api/v1/requests/${id}/${status}`;

  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json,*/*',
      'Content-Type': 'application/json',
      Token: gottenToken,
    },
  })
    .then((response) => {
      response.json();
    })
    .then((requestData) => {
      if (requestData.status === 200) {
        document.getElementById('requestMsg').innerHTML = requestData.message;
      } else {
        document.getElementById('requestErr').innerHTML = requestData.message;
      }
    }).catch(err => err.message);
};
document.getElementById('approve').addEventListener('click', addRequestStatus);
document.getElementById('disapprove').addEventListener('click', addRequestStatus);
document.getElementById('resolve').addEventListener('click', addRequestStatus);

