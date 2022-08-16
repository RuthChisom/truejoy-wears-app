# truejoy-wears-app
 An authentication system for a clothing line, with the following features 1. Register, Login, Logout (use bcrypt to hash password) 2. Add roles for users, staff, managers, admin 3. protect the user route, staff route, manager route, and admin route with JSON web token 4. password recovery


- create account for all users via get /register route
- login via post /login route
- logout via delete /logout route
- only managers can update or delete users
- only admin can view all users
![i4gzuri_auth_task](https://user-images.githubusercontent.com/30495094/183904716-cf4cc1b5-7208-4e39-aa38-9c82b3deac8d.png)
