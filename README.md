# truejoy-wears-app
 An authentication system for a clothing line, with the following features 1. Register, Login, Logout (use bcrypt to hash password) 2. Add roles for users, staff, managers, admin 3. protect the user route, staff route, manager route, and admin route with JSON web token 4. password recovery


- create account for all users via /register route
- login via /login route
- only managers can update or delete users
- only admin can view all users
