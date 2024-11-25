# CRUD Operations for a Shopping API
1. GET ALL Listed Items [GET `/listing`]
    - Response:
      ```json
      {
        "data": [
          {
            "id": "string";
            "title": "string";
            "description": "string";
            "seller": "string"; 
            "rating": number;
          }
        ]
      }
2. Get One Listed Item using ID [GET `/listing/<id>`]:
      - Request:
        - params
          ```json
          {
            "id": "string|int"
          }
      - Response:
        ```json
        {
          "data": {
            "id": "string";
            "title": "string";
            "description": "string";
            "seller": "string"; 
            "rating": number;
          }
        }
3. Update Listed Item [PUT `/listing/<id>`]:
    - Request:
       - params
          ```json
          {
            "id": "string|int"
          }
      - Body:
        ```json
        {
          "title": "string"; // optional
          "description": "string"; // optional
          "rating": number; // optional
        }
    - Response:
      ```json
      {
        "data": {
           "id": "string";
            "title": "string";
            "description": "string";
            "seller": "string"; 
            "rating": number;
        }
      }
3. Create a Listing [POST `/listing/`]:
    - Request:
      - Body:
        ```json
        {
            "title": "string"; 
            "description": "string";
            "seller": "string"; 
            "rating": number; //optional
        }
    - Response:
      ```json
      {
        "data": {
            "id": "string";
            "title": "string";
            "description": "string";
            "seller": "string"; 
            "rating": number;
        }
      }
5. Delete Todo Item [DELETE `/listing/<id>`]:
    - Request:
      - params:
        ```json
        {
          "id": "string|int"
        }
    - Response: `200 OK`