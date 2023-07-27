## Table Of Content

- [Database Structure](#database-structure)

  - [Videos Collection](#videos-collection)
  - [Comments Collection](#comments-collection)
  - [Products Collection](#products-collection)

- [API Structure](#api-structure)
- [API Request Response](#api-request-response)
- [How To Run](#how-to-run-in-local)

## Database Structure

This project have 3 collection, videos, comment, and products.

### Videos Collection

```
{
  id: ObjectId
  title: string
  thumbnail: string
  link: string
}
```

### Comments Collection

```
{
  id: ObjectId
  username: string
  content: string
  videoId: ObjectId
  timeStamp: string
}
```

### products Collection

```
{
  id: ObjectId
  title: string
  price: number
  likProduct: string
  videoId: ObjectId
}
```

## API Structure

Endpoint ready to use

```
GET     /:id
GET     /video/getVideos
GET     /video/get/{id}
GET     /comment/get/{videoId}
GET     /product/get/{videoId}
GET     /product/get/{videoId}
POST    /video/add
POST    /comment/add
POST    /product/add
PATCH   /video/update/{id}
PATCH   /comment/update/{id}
PATCH   /product/update/{id}
DELETE  /video/delete/{id}
DELETE  /comment/delete/{id}
DELETE  /product/delete/{id}

```

## API Request Response

#Video

- Video object

```
{
  id: ObjectId
  title: string
  thumbnail: string
  link: string
}
```

## **GET /:id**

---

Returns the specified video with related comment and product.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
   **Content:**

  ```
  {
    id: <video_id>,
    title: <video_title>,
    thumbnail: <video_thumbnail>,
    link: <video_link>,
    comments:[
        <comment_object>,
        <comment_object>,
        <comment_object>
    ],
    products: [
        <product_object>,
        <product_object>,
        <product_object>
    ]
  }

  ```

- **Error Response:**
- **Code:** 500  
   **Content:** `{ message : "error message" }`

## **GET /video/getVideos**

---

Returns all videos in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  videos: [
           {<video_object>},
           {<video_object>},
           {<video_object>}
         ]
}
```

- **Code:** 500  
  **Content:** `{ message : "error message" }`

## **GET /video/get/:id**

---

Returns the specified video.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <video_object> }`
- **Error Response:**
- **Code:** 404  
   **Content:** `{ message : "video doesn't exist" }`

## **POST /video/add**

---

Creates a new video and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
    title: string,
    thumbnail: string,
    link: string
  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ <video_object> }`
- **Error Response:**
- **Code:** 500  
   **Content:** `{ message : "error message" }`

## **PATCH /video/update/:id**

---

Updates fields on the specified video and returns the updated object.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**

```
  {
    title: string,
    thumbnail: string,
    link: string
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <video_object> }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "video doesn't exist" }`

## **DELETE /video/delete/:id**

---

Deletes the specified video.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:** `{ "video has been deleted" }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "video doesn't exist" }`

#Comment

- Comment object

```
{
  id: ObjectId
  username: string
  content: string
  videoId: ObjectId
  timeStamp: string
}
```

## **GET /comment/get/:videoId**

---

Returns the specified comment.

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <comment_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "comment not found" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message : "error message" }`

## **POST /comment/add**

---

Creates a new comment and returns successful message.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
    id: ObjectId,
    username: string,
    content: string,
    videoId: ObjectId
  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ message:"your comment has been sent successfully" }`
- **Error Response:**
- **Code:** 400  
   **Content:** `{ message : "error message" }`

## **PATCH /comment/update/:id**

---

Updates fields on the specified comment and returns the updated object.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**

```
  {
    username: string,
    content: string,
    videoId: string
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <comment_object> }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "comment doesn't exist" }`

## **DELETE /comment/delete/:id**

---

Deletes the specified comment.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:** `{ "comment has been deleted" }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "comment doesn't exist" }`

#Product

- Product object

```
{
  id: ObjectId
  title: string
  price: number
  likProduct: string
  videoId: ObjectId
}
```

## **GET /product/get/:videoId**

---

Returns the specified product.

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <product_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "product not found" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message : "error message" }`

## **POST /product/add**

---

Creates a new product and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
    title: string,
    price: number,
    linkProduct: string,
    videoId: string
  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ <product_object> }`
- **Error Response:**
- **Code:** 400  
   **Content:** `{ message : "error message" }`

## **PATCH /product/update/:id**

---

Updates fields on the specified product and returns the updated object.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**

```
  {
    title: string,
    price: number,
    linkProduct: string,
    videoId: string
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <product_object> }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "product doesn't exist" }`

## **DELETE /product/delete/:id**

---

Deletes the specified product.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:** `{ "product has been deleted" }`
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message : "product doesn't exist" }`

## How To Run In Local

### Installation

This project use Node version 18.16.0

Make sure to install the dependencies:

```
# yarn
yarn install

# npm
npm install

```

### Development Server

Start the development server on http://localhost:3000

```
# yarn
yarn start

# npm
npm start

```
