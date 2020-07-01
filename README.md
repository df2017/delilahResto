# Delilah Resto

## Descriptions

Api Delilah Resto - Acamica Project

## Pre-Installing Project
```
Modify password key in file config.json. 
Path: /config/config.json. 
Should enter the root password of the database
```
## Installing Project
```cmd
1. npm install
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npx sequelize-cli db:seed:all
```
## Run Project

```cmd
npm start
```
## Download Postman
To click [Postman](https://www.postman.com/downloads/)

#### Import file in postman - Path: 

* /tools/Delilah API.postman_collection.json
* /tools/URL.postman_environment.json

## Documentation 
### Examples Request Http

#### Register New User
+ POST /api/v1/users/register
> body **required**
```json
{
  "userName": "string",
  "name": "string",
  "surname": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string",
  "password": "string",
  "role": 0
}
```

#### Login user
+ POST /api/v1/users/login
> body **required**
```json
{
  "userName": "string",
  "password": "string"
}
```

#### Create new product (*only admin user)
+ POST /api/v1/products

> header **required**
```
Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ
```

> body (form-data) **required**

```javascript
  const formData = new FormData();

  formData.append("name", "Hamburger");
  formData.append("price", "250");
  formData.append("description", "beef, tomatoe, chesse");
  formData.append("image", fileInput.files[0]);
```
