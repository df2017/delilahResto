# Delilah Resto

## Descriptions

Api Delilah Resto - Acamica Project

## Pre requirements
```
Node v12.18.0
MariaDB (Based in MySQL) v10.3
```
## Download MariaDB
```
To click [MariaDB](https://downloads.mariadb.org/mariadb/)
```
## Pre-Installing Project
```
Modify password key in file config.json. 
Path: /config/config.json. 
Should enter the root password of the database
```
## Installing Project
```
1. npm install
2. npx sequelize-cli db:create (Create database)
3. npx sequelize-cli db:migrate (Create All tables)
4. npx sequelize-cli db:seed:all (Populate any tables)
```
## Run Project

```
npm start
```
## Download Postman
```
To click [Postman](https://www.postman.com/downloads/)
```
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

#### Create order and save
+ POST /api/v1/order/products

> header **required**
```
Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ
```

> body (form-data) **required** - Include array products in detail

```json
{
  "order": {
    "id_user": 2,
    "id_status": 1,
    "pay": 2
  },
  "detail": [
    {
      "id_product": 3,
      "amountProduct": 3
    },
    {
      "id_product": 1,
      "amountProduct": 5
    }
  ]
}
```

### Tables parametric

CRUD Http request - only admin user
```
Table pay_type
Table order_status
Table user_role
```