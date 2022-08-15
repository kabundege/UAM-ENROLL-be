# Description

API documentation for UAM - Enlorment ( Signup & Verification ) Service main API


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

### SignUp

- [User Sign In ](#1)


## Endpoints


### 1. Sign Up ~ ( POST Request )

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
  "statusCode": 201,
  "message": "Signup successfully!",
  "data": { 
    "token":"bckejfhoaslkcnrvnksdbzxv...etc"
    }
}
```
