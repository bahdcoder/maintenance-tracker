/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */
const baseUrl = 'https://maintenance-tracker-app.herokuapp.com/api/v1/requests';
const allRequests = document.getElementById('allRequests');
const filter = document.getElementById('filter');
let requests;
const requestId = (event) => {
  const { id } = event.target;
  localStorage.setItem('id', `${parseInt(id, 10)}`);
  window.location.href = 'https://maintenance-tracker-ui.herokuapp.com/client/adminuserdetails.html';
};

const getNewRequest = (request) => {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const titleLabel = document.createElement('label');
  const titleText = document.createElement('span');
  const sn = document.createElement('p');
  const snLabel = document.createElement('label');
  const snText = document.createElement('span');
  const statusClass = document.createElement('div');
  const statusLabel = document.createElement('label');
  const details = document.createElement('p');
  const detailsLink = document.createElement('a');

  details.addEventListener('click', requestId);
  titleText.innerHTML = request.title;
  titleLabel.innerHTML = 'Title: ';
  snText.innerHTML = request.serialnumber;
  snLabel.innerHTML = 'S/N: ';
  statusLabel.innerHTML = request.requeststatus;
  detailsLink.innerHTML = 'Details';

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

  card.className = ('requests-card');
  card.appendChild(title);
  title.appendChild(titleLabel);
  titleLabel.appendChild(titleText);
  card.appendChild(sn);
  sn.appendChild(snLabel);
  snLabel.appendChild(snText);
  details.className = ('status');
  card.appendChild(statusClass);
  statusClass.appendChild(statusLabel);
  card.appendChild(statusClass);
  statusClass.appendChild(details);
  details.appendChild(detailsLink);
  detailsLink.setAttribute('id', `${request.requestid}`);
  allRequests.appendChild(card);
};
const filterReq = () => {
  if (filter.value === 'all') {
    allRequests.innerHTML = '';
    requests.forEach(request => getNewRequest(request));
  } else {
    const filterRequest = requests.filter(req => filter.value === req.requeststatus);
    allRequests.innerHTML = '';
    filterRequest.forEach((req) => {
      getNewRequest(req);
    });
  }
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
        requests = requestData.data.request;
        requests.forEach(request => getNewRequest(request));
      }
    }).catch(err => err.message);
};
filter.addEventListener('change', filterReq);
