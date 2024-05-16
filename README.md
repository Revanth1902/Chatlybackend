# Chatlybackend
Chatly backend: Node.js, Express.js, MongoDB, Socket.IO. Manage users, groups, messages. Easy setup, scalable architecture. Contribute and connect!


## Chatly Messaging Backend API Documentation

### Base URL
```
https://your-backend-domain.com/api
```

### Endpoints

#### Users

- **Signup**
  - `POST /users/signup`
  - Create a new user account.
  
  **Request Body:**
  ```json
  {
    "username": "example_user",
    "name": "John Doe",
    "password": "password123"
  }
  ```

  **Response:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "_id": "user_id",
      "username": "example_user",
      "name": "John Doe"
    }
  }
  ```

- **Login**
  - `POST /users/login`
  - Authenticate user credentials and log in.
  
  **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "password123"
  }
  ```

  **Response:**
  ```json
  {
    "user": {
      "username": "example_user",
      "name": "John Doe"
    }
  }
  ```

- **Get User Details**
  - `GET /users/:username`
  - Retrieve details of a user by username.
  
  **Response:**
  ```json
  {
    "user": {
      "username": "example_user",
      "name": "John Doe",
      "profilePicture": "profile_pic_url"
    }
  }
  ```

- **Update Profile Picture**
  - `PUT /users/:username/profile-picture`
  - Update the profile picture of a user.
  
  **Request Body:**
  ```json
  {
    "profilePicture": "new_profile_pic_url"
  }
  ```

  **Response:**
  ```json
  {
    "message": "Profile picture updated successfully"
  }
  ```

- **Send Request**
  - `POST /users/:senderId/send-request/:receiverId`
  - Send a friend request from sender to receiver.
  
  **Response:**
  ```json
  {
    "message": "Request sent successfully",
    "request": {
      "_id": "request_id",
      "sender": "sender_id",
      "receiver": "receiver_id",
      "status": "pending"
    }
  }
  ```

#### Groups

- **Create Group**
  - `POST /groups/create`
  - Create a new group.
  
  **Request Body:**
  ```json
  {
    "name": "Example Group",
    "imageUrl": "group_image_url",
    "users": ["user_id_1", "user_id_2"]
  }
  ```

  **Response:**
  ```json
  {
    "message": "Group created successfully",
    "group": {
      "_id": "group_id",
      "name": "Example Group",
      "imageUrl": "group_image_url",
      "users": ["user_id_1", "user_id_2"]
    }
  }
  ```

- **Send Message to Group**
  - `POST /groups/:groupId/messages`
  - Send a message to a group.
  
  **Request Body:**
  ```json
  {
    "sender": "sender_id",
    "message": "Hello, Group!"
  }
  ```

  **Response:**
  ```json
  {
    "message": "Message sent successfully"
  }
  ```

#### Messages

- **Create Message**
  - `POST /messages/create`
  - Create a new message.
  
  **Request Body:**
  ```json
  {
    "sender": "sender_id",
    "message": "Hello, World!"
  }
  ```

  **Response:**
  ```json
  {
    "message": "Message created successfully",
    "newMessage": {
      "_id": "message_id",
      "sender": "sender_id",
      "message": "Hello, World!",
      "createdAt": "message_creation_date"
    }
  }
  ```

---

This detailed documentation provides examples for each API endpoint, making it easier for users to understand how to interact with your messaging backend. Make sure to replace placeholders like `user_id`, `group_id`, etc., with actual IDs in your API responses.
