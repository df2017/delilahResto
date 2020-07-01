# Delilah Resto

## Descriptions

Api Delilah Resto - Acamica Prject

## Pre-Installing Project
```
Modify password key in file config.json. 
Path: /config/config.json. 
Should enter the root password of the database
```
## Installing Project
```
1. npm install
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npx sequelize-cli db:seed:all
```
## Run Project

```
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
```
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