# **Authentication and User Management System**

A secure, flexible, and modular system for managing user authentication and account data. Built using **Node.js** and **Express**, it includes essential features like user signup, login, logout, password reset, account status management, and more.

---

## **Features**

### **Authentication**
- **Signup**: Create new user accounts securely.
- **Login**: Authenticate users with email and password.
- **Logout**: Clear session securely.
- **Check Login Status**: Verify if a user is currently logged in using JWT.

### **Password Management**
- Reset forgotten passwords with a secure flow.
- Update passwords for existing accounts.

### **User Management**
- Fetch all user data (restricted to authorized users).
- Retrieve, update, or delete user details.
- Search and filter users based on categories.

### **State Management**
- Activate or deactivate user accounts as needed.
   
   ### **Forgot Password**
   - Recover accounts with a password reset email.
   
   ---
   
   ## **Technology Stack**
   - **Backend**: Node.js, Express.js
   - **Authentication**: JWT, bcrypt
   - **Database**: MongoDB
   - **Testing**: Postman
   
   ---
## **API Endpoints**

### **Authentication**
| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| POST   | `/api/signup`              | Register a new user.           |
| POST   | `/api/login`               | Log in with email and password.|
| DELETE | `/api/logout`              | Log out and clear the session. |
| GET    | `/api/check-login`         | Check if user is logged in.    |
| PATCH  | `/api/reset-password/:id`  | Reset password (requires ID).  |
| POST   | `/api/new-password`        | Update password securely.      |

### **User Management**
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/`                      | Get all user details (auth required).|
| GET    | `/api/dropdownvalue`         | Get dropdown options.               |
| GET    | `/api/user-details/:id`      | Get details for a specific user.    |
| GET    | `/api/filter/:category`      | Filter users based on category (auth required). |
| GET    | `/api/:email`                | Check if a user is an admin.        |
| POST   | `/api/:search`               | Search for users.                   |
| PATCH  | `/api/user-details/:id`      | Update specific user details.       |
| PATCH  | `/api/all-details/:id`       | Update all user details (auth required). |
| DELETE | `/api/all-details/:id`       | Delete a user (auth required).      |

### **State Management**
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| PATCH  | `/api/active/:id`            | Activate a user account.            |
| PATCH  | `/api/deactive/:id`          | Deactivate a user account.          |

### **Forgot Password**
| Method | Endpoint                 | Description                           |
|--------|--------------------------|---------------------------------------|
| POST   | `/api/forgot-password`    | Send password reset instructions.    |

---
---

## **How to Use**

### **Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Nitish0777/assignment_vrv_backend.git
   cd assignment_vrv_backend
