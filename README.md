# Maintenance-tracker
[![Build Status](https://travis-ci.org/OKiMaureen/Maintenance-tracker.svg?branch=develop)](https://travis-ci.org/OKiMaureen/Maintenance-tracker)
<a href="https://codeclimate.com/github/OKiMaureen/Maintenance-tracker/maintainability"><img src="https://api.codeclimate.com/v1/badges/225b5d371a7731f835b7/maintainability" /></a>
<a href="https://codeclimate.com/github/OKiMaureen/Maintenance-tracker/test_coverage"><img src="https://api.codeclimate.com/v1/badges/225b5d371a7731f835b7/test_coverage" /></a>
[![Coverage Status](https://coveralls.io/repos/github/OKiMaureen/Maintenance-tracker/badge.svg?branch=ft-signup-157973703)](https://coveralls.io/github/OKiMaureen/Maintenance-tracker?branch=ft-signup-157973703)


## Maintenance Tracker
Maintenance Tracker App is an application that provides users with the ability to reach out to  operations or repairs department regarding repair or maintenance requests and monitor the  status of their request. 

## UI hosted on gh pages
https://okimaureen.github.io/Maintenance-tracker/ui

## Client sid ehosted on Heroku
https://maintenance-tracker-ui.herokuapp.com/client/


## Client side hosted on Heroku
https://maintenance-tracker-ui.herokuapp.com/client/


## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started


### Prerequisites for installation
1. Node js

2. Express

3. Git


### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/OKiMaureen/Maintenance-tracker
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.

e.g npm start

4. Install postman to test all endpoints on port 3000.

### Test
run test using 'npm test'.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>creates  a new user</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>logs in a user</td></tr>

<tr><td>GET</td> <td>/api/v1/users/requests</td>  <td>Gets all requests for a user</td></tr>

<tr><td>GET</td> <td>/api/v1/users/requests/:requestId</td>  <td>Gets request by Id for a user</td></tr>

<tr><td>POST</td> <td>/api/v1/users/requests</td> <td> Creates a user's requests</td></tr>

<tr><td>PUT</td> <td>/api/v1/users/requests/:requestId</td> <td>Modify a user's pending request</td></tr>

<tr><td>GET</td> <td>/api/v1/requests</td> <td>Gets all users request for an admin</td></tr>

<tr><td>GET</td> <td>/api/v1/requests/:requestId</td> <td>Gets details of a user request for admin</td></tr>

<tr><td>PUT</td> <td>/api/v1/requests/:requestId/approve</td> <td>Approve a pending or disapproved request</td></tr>

<tr><td>PUT</td> <td>/api/v1/requests/:requestId/disapprove</td> <td>Disapprove a pending or approved request</td></tr>

<tr><td>PUT</td> <td>/api/v1/requests/:requestId/resolve</td> <td>Resolve an approved request</td></tr>
</table>

### Coding Style
* Airbnb style guide. 

## Features

### Users
 * A users can create an account and log in.
 * A user can create maintenance or repairs request.
 * A user can view all his/her requests.
 * A user can view a sinle request
 * A user can edit a request. 

 ### Admin

 * An admin can view all maintenance/repairs requests on the application.
 * An admin can filter requests.
 * An admin can approve/reject a repair/maintenance request.    
 * An admin can mark request as resolved once it is done.

## Built With

* NodeJs-EXPRESS: It is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.

* PostgreSql: It is used for the databse.

* Vannila Javascript: It is used for scripting the client side.

* Fetch Api: It is used for making Api calls to the client side.

## Author
* Oki Maureen

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgement
I acknowledge the individuals from the organisation and groups below. They were a great source of motivation in completing this project.
* Andela.
* Andela Learning Facilitators.
* Andela cycle 32 Andela21.
