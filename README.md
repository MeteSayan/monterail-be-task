## Description

Monterail Back End Task. The purpose of this task is to create a reservation system.

## Installation
- The configuration file should be checked before deployment (config/default.js).
- Tested node versions v14.17.0 & v16.16.0
- Nestjs must be installed (npm i -g @nestjs/cli). 
- PostgreSQL must be installed. Database settings can be changed in configuration file.

```bash
$ yarn
```

## Running the app

```bash
# watch mode
$ yarn start:dev
```

## Swagger

```
/api/docs
```

# Endpoints

## Login
```
# Admin & user credentials in config/default.js
# Admin -> username = admin1234 password = 4321admin
# User -> username = user1234 password = 4321user
/api/authentication/login
```
## Ticket
```
# Get all tickets
GET /api/ticket/tickets

# Get ticket with id
GET /api/ticket/tickets/:id

# Update tickets
PUT /api/ticket/tickets

# Get all reserved tickets
GET /api/ticket/reserved-tickets

# Get reserved ticket with event id
GET /api/ticket/reserved-tickets/:id
```

## Order
```
# Get all orders
GET /api/order

# Get order with id
GET /api/order/:id

# Update order
PUT /api/order
```

## Event
```
# Get all events
GET /api/event

# Create event
POST /api/event

# Update event
PUT /api/event

# Delete event
DELETE /api/event

# Get event by id
GET /api/event/:id
```

# Example Requests

### POST /api/event
```
{
    "title": "Rock Fest",
    "description": "August rock festival",
    "seats": [
        {
            "row": 4,
            "col": 4,
            "sellingOption": "avoid one",
            "price": 15
        },
        {
            "row": 5,
            "col": 6,
            "sellingOption": "even",
            "price": 20
        },
        {
            "row": 6,
            "col": 6,
            "sellingOption": "all together",
            "price": 30
        }
    ],
    "type": "Festival"
}
```
```
{
    "title": "Rock Fest",
    "description": "August rock festival",
    "seats": [
        {
            "row": 4,
            "col": 4,
            "sellingOption": "avoid one",
            "price": 15
        },
        {
            "row": 5,
            "col": 6,
            "sellingOption": "even",
            "price": 20
        }
    ],
    "type": "Festival"
}
```
### PUT /api/ticket/tickets
```
{
    "eventId": 1,
    "seats": [
        {
            "row": 4,
            "col": 1
        },
        {
            "row": 4,
            "col": 2
        }
    ],
    "sellingOption": "even"
}
```
```
{
    "eventId": 1,
    "seats": [
        {
            "row": 0,
            "col": 1
        },
        {
            "row": 1,
            "col": 1
        }
    ],
    "sellingOption": "all together"
}
```
