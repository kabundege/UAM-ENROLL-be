# Description

API documentation for UAM - Enlorment ( Signup & Verification ) microservice 


## Installation

> Run
-  Yarn or npm install
-  touch .env

```env

DB_URL = XXXXXXXXXXXXXXXXX
MONGO_USERNAME = XXXXXXXXX
MONGO_PASSWORD = XXXXXXXXX
MONGO_URL =  XXXXXXXXXXXXX
JWT_SECRET = XXXXXXXXXXXXX
EMAIL = XXXXXXXXXXXXXXXXXX
PASSWORD = XXXXXXXXXXXXXXX

```

## Quick find

### Welcome

- [Welcome Route](#1)

### SignUp

- [User Sign Up](#2)

### Verify Account

- [Account verification](#3)

## Endpoints

### 1. Welcome ~ ( GET Request )

Endpoint

```text
/
```

Body : None

Response:

```json
{
  "status": 200,
  "message": "Welcome to enrollment microservice",
}
```


### 2. Sign Up ~ ( POST Request )

Endpoint

```text
/signup
```

Body:
```json
    "profilePhoto": "https://picsum.photos/200/300",
    "name": "Christopher Kwizera",
    "email": "christophekwizera@gmail.com",
    "password": "zxcvbnm",
    "gender": "Male",
    "age": "60",
    "national_id": "1234567890987654",
    "phoneNumber": "07812345678",
    "document": "https://picsum.photos/200/300",
    "dateOfBirth": "1962-01-01",
    "maritalStatus": "SINGLE",
    "nationality": "Rwandan"
```

Response:

```json
{
  "status": 201,
  "message": "Signup successfully!",
  "data": { 
    "token":"bckejfhoaslkcnrvnksdbzxv...etc"
    }
}
```


### 3. Account Verification ~ ( POST Request )

Endpoint

```text
/verify-account
```

Headers:
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmlzdG9waGVrd2l6ZXJhQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDc4NDgyNDI5NSIsImlhdCI6MTY2MDQ5OTI0MH0.u41lfhFl4VNU2Uz-SuMFjK-GWNbdeH8dkS1mhbsrwPI
```

Body:
```json
  "code" : 123
```

Response:

```json
{
  "status": 200,
  "message": "Account verified successfully!",
}
```
