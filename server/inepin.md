# API Documentation

- Client Url:
  https://jatisuryo-inapinaja.web.app/
- Server Url:
  https://inapinaja-server.jatisuryo.com/

## EndPoints :

### Admin EndPoints

- 1. `POST /lodgings`
- 2. `GET /lodgings`
- 3. `GET /lodgings/:id`
- 4. `DELETE /lodgings/:id`
- 5. `GET /types`
- 6. `POST /register/admin`
- 7. `POST /login`
- 8. `PATCH /lodgingStatus/:id`
- 9. `PUT /lodgings/:id`
- 10. `POST /google-sign`
- 11. `GET /histories`

### Customer EndPoints

- 1. `POST /inapinaja/register`
- 2. `POST /inapinaja/login`
- 3. `GET /inapinaja/lodging`
- 4. `POST /inapinaja/barcode`
- 5. `GET /inapinaja/wishlist`
- 6. `POST /inapinaja/wishlist`
- 7. `GET /inapinaja/lodging/:id`
- 8. `POST /inapinaja/google-sign`

&nbsp;

## ADMIN

## 1. POST /lodgings

Description:

- create data lodging to database

_Request_

- Headers:

```json
{
   "access_token": string
}
```

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:

```json
{
  "name": String,
  "facility": Text,
  "roomCapacity": Integer,
  "imgUrl": String,
  "authorId": Integer,
  "location": String,
  "price": Integer,
  "typeId": Integer
}
```

_Response ( 201 - Created )_

- Body:

```json
{
  "message": "success add data",
  "createLodging": {
    "id": 19,
    "name": "Kos Singgahsini",
    "facility": "Dapur\nAir Minum\nCuci Setrika\nPembantu\nKeamanan\nParkir Motor\nParkir Mobil",
    "roomCapacity": 1,
    "imgUrl": "https://www.sewakost.com/files/08-2019/ad24940/kos-1233200306_large.jpeg",
    "authorId": 2,
    "location": "Sumedang",
    "price": 700000,
    "typeId": 2,
    "updatedAt": "2023-05-15T16:14:49.695Z",
    "createdAt": "2023-05-15T16:14:49.695Z"
  }
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 400 - Bad Request )_

- Body:

```json
{
  "message": "Price must be minimal 100000"
}
```

&nbsp;

## 2. GET /lodgings

Description:

- Get all lodging from database

- Headers:

```json
{
   "access_token": string
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "success get data",
    "lodging": [
        {
            "id": 1,
            "username": "jati",
            "email": "jati.suryo@gmail.com",
            "password": "12345678",
            "role": "admin",
            "phoneNumber": "7739563723",
            "address": "56387 Westerfield Court",
            "createdAt": "2023-05-15T12:16:11.126Z",
            "updatedAt": "2023-05-15T12:16:11.126Z"
        },
        {
            "id": 2,
            "username": "cforson1",
            "email": "cweaving1@tamu.edu",
            "password": "7Grnp1VU",
            "role": "admin",
            "phoneNumber": "3333548532",
            "address": "2005 Springs Plaza",
            "createdAt": "2023-05-15T12:16:11.126Z",
            "updatedAt": "2023-05-15T12:16:11.126Z"
        },
        ...,
    ]
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

&nbsp;

## 3. GET /lodgings/:id

Description:

- Get lodging by id from database

- Headers:

```json
{
   "access_token": string
}
```

- params:

```json
{
   "id": integer
}
```

_Response (200 - OK)_

- Body:

```json
{
  "message": "success get data by id",
  "lodging": {
    "id": 2,
    "name": "Wisma Nadhifasa",
    "facility": "Drilled Shafts",
    "roomCapacity": 2,
    "imgUrl": "http://dummyimage.com/105x204.png/5fa2dd/ffffff",
    "authorId": 2,
    "location": "Bandung",
    "price": 1000000,
    "typeId": 2,
    "createdAt": "2023-05-15T15:47:06.163Z",
    "updatedAt": "2023-05-15T15:47:06.163Z"
  }
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging with id {id} is not found"
}
```

&nbsp;

## 4. DELETE /lodgings/:id

Description:

- Delete lodging by id

- Headers:

```json
{
   "access_token": string
}
```

- params:

```json
{
   "id": integer
}
```

_Response (200 - OK)_

- Body:

```json
{
  "message": "{lodging name} success to delete",
  "item": {
    "id": 1,
    "name": "ApartKos",
    "facility": "Structural & Misc Steel Erection",
    "roomCapacity": 1,
    "imgUrl": "http://dummyimage.com/237x128.png/cc0000/ffffff",
    "authorId": 1,
    "location": "Jakarta",
    "price": 300000,
    "typeId": 1,
    "createdAt": "2023-05-15T15:47:06.163Z",
    "updatedAt": "2023-05-15T15:47:06.163Z"
  }
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging is not found"
}
```

_Response ( 403 - Forbidden )_

- Body:

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 5. GET /types

Description:

- Get all type from database

- Headers:

```json
{
   "access_token": string
```

_Response ( 200 - OK )_

- Body:

```json
{
  "message": "success get all data",
  "type": [
    {
      "id": 1,
      "name": "Rooms",
      "createdAt": "2023-05-15T12:16:11.131Z",
      "updatedAt": "2023-05-15T12:16:11.131Z"
    },
    {
      "id": 2,
      "name": "Homes",
      "createdAt": "2023-05-15T12:16:11.131Z",
      "updatedAt": "2023-05-15T12:16:11.131Z"
    },
    {
      "id": 3,
      "name": "Villas",
      "createdAt": "2023-05-15T12:16:11.131Z",
      "updatedAt": "2023-05-15T12:16:11.131Z"
    }
  ]
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

&nbsp;

## 6. POST /register/admin

Description:

- register user admin to database

- Headers:

```json
{
   "access_token": string
}
```

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:

```json
    {
        "username": string,
        "email": string,
        "password": string,
    }
```

_Response ( 201 - Created )_

- Body:

```json
{
  "message": "success register data",
  "created": {
    "id": 22,
    "username": "jati251",
    "email": "jati.suryo98@gmail.com",
    "password": "$2a$08$lcH0kaV7vgN5/Pfh3MrFu.xxle9hFrUII260hMj61oxOFGSKguF/S",
    "role": "Admin",
    "updatedAt": "2023-05-16T05:15:15.880Z",
    "createdAt": "2023-05-16T05:15:15.880Z",
    "phoneNumber": null,
    "address": null
  }
}
```

_Response ( 400 - Bad Request )_

- Body:

```json
{
  "message": "Username already in use!"
}
```

&nbsp;

## 7. POST /login

Description:

- user login

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:

```json
    {
        "email": string,
        "password": string,
    }
```

_Response ( 200 - OK )_

- Body:

```json
{
  "message": "Login succeessful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphdGkuc3VyeW85OEBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODQyMTQ0ODR9.FBN8jTB5TDf16xTxJqiqBegu9yROSfCM5mbktXVv2bU",
  "email": "jati.suryo98@gmail.com",
  "role": "Admin"
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Email or password is invalid"
}
```

&nbsp;

## 8. PATCH /lodgingStatus/:id

Description:

- change lodging status

_Request_

- Headers:

```json
{
   "access_token": string
}
```

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- params:

```json
{
   "id": integer
}
```

- Body:

```json
    {
        "status": string,
    }
```

_Response ( 200 - OK )_

- Body:

```json
{
  "message": "success update data",
  "lodging": {
    "id": 11,
    "name": "Villa Anggrek",
    "facility": "Kitchen\r\nKolam Renang\r\nLaundry\r\nPembantuKeamanan\r\nParkir Motor\r\nParkir Mobil\r\nAC",
    "roomCapacity": 4,
    "imgUrl": "https://pix10.agoda.net/hotelImages/413/4137488/4137488_18011106170060976848.jpg?ca=6&ce=1&s=1024x768",
    "authorId": 3,
    "location": "Surabaya",
    "price": 5000000,
    "typeId": 3,
    "status": "Active",
    "createdAt": "2023-05-20T06:02:05.100Z",
    "updatedAt": "2023-05-26T07:25:18.279Z"
  }
}
```

_Response ( 401 - Unauhotrized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 403 - Forbidden )_

- Body:

```json
{
  "message": "You are not authorized"
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging is not found"
}
```

&nbsp;

## 9. PUT /lodgings/:id

Description:

- update lodging data

_Request_

- Headers:

```json
{
   "access_token": string
}
```

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- params:

```json
{
   "id": integer
}
```

- Body:

```json
{
  "name": String,
  "facility": Text,
  "roomCapacity": Integer,
  "imgUrl": String,
  "authorId": Integer,
  "location": String,
  "price": Integer,
  "typeId": Integer
}
```

_Response ( 200 - OK )_

- Body:

```json
{
  "message": "success update data",
  "name": "House garden"
}
```

_Response ( 400 - Bad Request )_

- Body:

```json
{
  "message": ["Price must be minimal 100000"]
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 403 - Forbidden )_

- Body:

```json
{
  "message": "You are not authorized"
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging is not found"
}
```

&nbsp;

## 10. POST /google-sign

Description:

- user login with google

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

```json
{
  "google_token": string
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "Login succeessful",
    "access_token": string,
    "id": integer,
    "email": string,
    "role": string,
    "username": string,
}
```

&nbsp;

## 11. GET /histories

Description:

- Get all history logs from database

- Headers:

```json
{
   "access_token": string
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "success get data",
    "history": [
         {
            "id": 40,
            "title": "House garden",
            "description": "Lodging with id 32 is updated",
            "updatedBy": "jati.suryo@gmail.com",
            "createdAt": "2023-05-28T16:51:39.129Z",
            "updatedAt": "2023-05-28T16:51:39.129Z"
        },
        {
            "id": 39,
            "title": "Puri Indah",
            "description": "Lodging with id 13 status has been updated from Active into Inactive",
            "updatedBy": "jati.suryo@gmail.com",
            "createdAt": "2023-05-28T16:43:46.606Z",
            "updatedAt": "2023-05-28T16:43:46.606Z"
        },
        {
            "id": 38,
            "title": "Villa Anggrek",
            "description": "Lodging with id 11 status has been updated from Active into Inactive",
            "updatedBy": "jati.suryo@gmail.com",
            "createdAt": "2023-05-28T16:31:49.260Z",
            "updatedAt": "2023-05-28T16:31:49.260Z"
        },
        ...,
    ]
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```
&nbsp;

## CUSTOMER

## 1. POST /inapinaja/register

Description:

- register customer to database

- Headers:

```json
{
   "access_token": string
}
```

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:

```json
    {
        "username": string,
        "email": string,
        "password": string,
    }
```

_Response ( 201 - Created )_

- Body:

```json
{
  "message": "success register data",
  "created": {
    "id": 22,
    "username": "jati251",
    "email": "jati.suryo98@gmail.com",
    "password": "$2a$08$lcH0kaV7vgN5/Pfh3MrFu.xxle9hFrUII260hMj61oxOFGSKguF/S",
    "role": "Admin",
    "updatedAt": "2023-05-16T05:15:15.880Z",
    "createdAt": "2023-05-16T05:15:15.880Z",
    "phoneNumber": null,
    "address": null
  }
}
```

_Response ( 400 - Bad Request )_

- Body:

```json
{
  "message": "Username already in use!"
}
```

&nbsp;

## 2. POST /inapinaja/login

Description:

- customer login

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body:

```json
    {
        "email": string,
        "password": string,
    }
```

_Response ( 200 - OK )_

- Body:

```json
{
  "message": "Login succeessful",
  "access_token": string,
  "email": "jati.suryo98@gmail.com",
  "role": "Customer"
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Email or password is invalid"
}
```

&nbsp;

## 3. GET /inapinaja/lodging

Description:

- Get all lodging with limit and pagination from database

- Body:

```json
{
   "page": integer
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "success get all data",
    "lodging": {
        "count": 28,
        "rows": [
            {
                "id": 25,
                "name": "Kos Singgahsini",
                "facility": "Dapur\nAir Minum\nCuci Setrika\nPembantu\nKeamanan\nParkir Motor\nParkir Mobil",
                "roomCapacity": 1,
                "imgUrl": "https://artikel.rumah123.com/news-content/img/2022/01/10094722/kos-kosan-arief-muhammad.jpg",
                "authorId": 1,
                "location": "Jakarta",
                "price": 100000,
                "typeId": 2,
                "status": "Active",
                "createdAt": "2023-05-23T09:26:14.559Z",
                "updatedAt": "2023-05-23T09:26:14.559Z",
                "Type": {
                    "id": 2,
                    "name": "Homes",
                    "createdAt": "2023-05-20T06:01:38.592Z",
                    "updatedAt": "2023-05-20T06:01:38.592Z"
                }
            },
            {
                "id": 35,
                "name": "Swallow Garden",
                "facility": "Elegan\nParkir luas\nSecurity 24/jam\nAc\ngreat View",
                "roomCapacity": 1,
                "imgUrl": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80",
                "authorId": 1,
                "location": "Semarang",
                "price": 300000,
                "typeId": 1,
                "status": "Active",
                "createdAt": "2023-06-01T16:59:23.383Z",
                "updatedAt": "2023-06-01T16:59:23.383Z",
                "Type": {
                    "id": 1,
                    "name": "Rooms",
                    "createdAt": "2023-05-20T06:01:38.592Z",
                    "updatedAt": "2023-05-20T06:01:38.592Z"
                }
            },
            {
                "id": 27,
                "name": "El dorado",
                "facility": "Shower\nBeach\nKaraoke",
                "roomCapacity": 8,
                "imgUrl": "https://images.unsplash.com/photo-1528913775512-624d24b27b96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                "authorId": 1,
                "location": "Cirebon",
                "price": 1000000,
                "typeId": 8,
                "status": "Active",
                "createdAt": "2023-05-24T12:26:51.918Z",
                "updatedAt": "2023-05-24T12:26:51.918Z",
                "Type": {
                    "id": 8,
                    "name": "Beach",
                    "createdAt": "2023-05-21T16:25:38.616Z",
                    "updatedAt": "2023-05-21T16:25:38.616Z"
                }
            },
             ...
        ]
    }
}
```


&nbsp;

## 4. POST /inapinaja/barcode


Description:

- Get barcode from third party api

- Body:

```json
{
   "page": "https://inapinaja.web.app/detail/35"
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "success created barcode",
    "barcode": "<svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\t viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\n\t\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"100\" height=\"100\" viewBox=\"0 0 2000 2000\" x=\"0\" y=\"0\" shape-rendering=\"crispEdges\"><defs/><rect x=\"0\" y=\"0\" width=\"2000\" height=\"2000\" fill=\"#ffffff\"/><rect x=\"517\" y=\"149\" width=\"46\" height=\"46\" fill=\"#000000\"/><rect x=\"655\" y=\"149\" width=\"46\" height=\"46\" fill=\"#000000\"/><rect x=\"701\" y=\"149\" width=\"46\" height=\"46\" fill=\"#000000\"/><rect x=\"747\" y=\"149\" width=\"46\" "
    
  ...
}
```

&nbsp;

## 5. GET /inapinaja/wishlist

Description:

- Get customer's wishlist from database

- Headers:

```json
{
   "access_token": string
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "success get wishlist",
    "wishList": [
        {
            "id": 1,
            "userId": 1,
            "lodgingId": 42,
            "createdAt": "2023-06-03T16:41:40.590Z",
            "updatedAt": "2023-06-03T16:41:40.590Z",
            "Lodging": {
                "id": 42,
                "name": "Heaven Gate",
                "facility": "cocok untuk bulan madu\nprivate karaoke\nparkir luas\nada bar\n",
                "roomCapacity": 4,
                "imgUrl": "https://images.unsplash.com/photo-1623298460174-371443cc45f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                "authorId": 1,
                "location": "Bogor",
                "price": 750000,
                "typeId": 3,
                "status": "Active",
                "createdAt": "2023-06-01T17:09:57.814Z",
                "updatedAt": "2023-06-01T17:09:57.814Z",
                "Type": {
                    "id": 3,
                    "name": "Villas",
                    "createdAt": "2023-05-20T06:01:38.592Z",
                    "updatedAt": "2023-05-20T06:01:38.592Z"
                }
            }
        },
        {
            "id": 2,
            "userId": 1,
            "lodgingId": 16,
            "createdAt": "2023-06-03T17:00:53.722Z",
            "updatedAt": "2023-06-03T17:00:53.722Z",
            "Lodging": {
                "id": 16,
                "name": "Wangsa 2 ",
                "facility": "Dapur\r\nAir Minum\r\nCuci Setrika\r\nPembantuKeamanan\r\nParkir Motor\r\nParkir Mobil\r\nKolam Renang",
                "roomCapacity": 4,
                "imgUrl": "https://www.jamesedition.com/stories/wp-content/uploads/2020/12/1_Israel.jpg",
                "authorId": 3,
                "location": "Bandung",
                "price": 3500000,
                "typeId": 3,
                "status": "Archived",
                "createdAt": "2023-05-20T06:02:05.100Z",
                "updatedAt": "2023-05-26T10:05:45.876Z",
                "Type": {
                    "id": 3,
                    "name": "Villas",
                    "createdAt": "2023-05-20T06:01:38.592Z",
                    "updatedAt": "2023-05-20T06:01:38.592Z"
                }
            }
        },
      ...

    ]
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

&nbsp;

## 6. POST /inapinaja/wishlist

Description:

- create customer's wishlist to database

- Headers:

```json
{
   "access_token": string
}
```

- Body:

```json
{
   "id": integer
}
```

_Response ( 201 - Created )_

- Body:

```json
{
    "message": "success created wishlist",
    "newWishList": {
        "id": 8,
        "userId": 1,
        "lodgingId": 11,
        "updatedAt": "2023-06-05T01:47:14.882Z",
        "createdAt": "2023-06-05T01:47:14.882Z"
    }
}
```

_Response ( 401 - Unauthorized )_

- Body:

```json
{
  "message": "Unauthenticated access"
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging is not found"
}
```

&nbsp;

## 7. GET /inapinaja/lodging/:id

Description:

- Get lodging by id from database

- params:

```json
{
   "id": integer
}
```

_Response (200 - OK)_

- Body:

```json
{
  "message": "success get data by id",
  "lodging": {
    "id": 2,
    "name": "Wisma Nadhifasa",
    "facility": "Drilled Shafts",
    "roomCapacity": 2,
    "imgUrl": "http://dummyimage.com/105x204.png/5fa2dd/ffffff",
    "authorId": 2,
    "location": "Bandung",
    "price": 1000000,
    "typeId": 2,
    "createdAt": "2023-05-15T15:47:06.163Z",
    "updatedAt": "2023-05-15T15:47:06.163Z"
  }
}
```

_Response ( 404 - Not Found )_

- Body:

```json
{
  "message": "Lodging is not found"
}
```

&nbsp;

## 8. POST /inapinaja/google-sign

Description:

- customer login with google

_Request_

- Headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

```json
{
  "google_token": string
}
```

_Response ( 200 - OK )_

- Body:

```json
{
    "message": "Login succeessful",
    "access_token": string,
    "id": integer,
    "email": string,
    "role": string,
    "username": string,
}
```

&nbsp;

&nbsp;

## Global Error

_Response ( 500 - Internal Server Error )_

- Body:

```json
{
  "message": "Internal server error"
}
```
