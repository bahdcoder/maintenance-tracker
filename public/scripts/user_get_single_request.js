/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */
const id = localStorage.getItem('id');
const baseUrl = `https://maintenance-tracker-app.herokuapp.com/api/v1/users/requests/${id}`;

const singleRequest = document.getElementById('detailsRequest');
const requestId = () => {
  window.location.href = 'https://maintenance-tracker-ui.herokuapp.com/client/editrequest.html';
};

const getSingleRequest = (request) => {
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
  const statusClass = document.createElement('div');
  const statusLabel = document.createElement('label');
  const edit = document.createElement('p');
  const editLink = document.createElement('a');

  edit.addEventListener('click', requestId);
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
  editLink.innerHTML = 'Edit';

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


  card.className = ('detailsrequest-card');
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
  edit.className = ('status');
  title.className = ('breaks');
  department.className = ('breaks');
  description.className = ('breaks');
  equipment.className = ('breaks');
  sn.className = ('breaks');
  card.appendChild(statusClass);
  statusClass.appendChild(statusLabel);
  card.appendChild(statusClass);
  statusClass.appendChild(edit);
  edit.appendChild(editLink);
  editLink.setAttribute('id', `${request.id}`);
  singleRequest.appendChild(card);
};

window.onload = () => {
  const gottenToken = localStorage.getItem('token');

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
        getSingleRequest(requestData.data.request);
      }
    }).catch(err => err.message);
};
