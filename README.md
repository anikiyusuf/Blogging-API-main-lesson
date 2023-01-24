This is a Blogging-API that allows new users to create an account and sign in with their registered email and password. Registered Users that are logged in can do functionalities like creating, publishing, editing or deleting a blog.

A user can do CRUD (create, delete, update, delete) on his own blogs but can only read other users blogs.

A view count is attached to each blog such that when a blog is read, its number of views is increased accordingly

This API is light and user friendly for non ITs as it was built using a views engine (ejs).

API Functionalities:
To Sign Up, input your FirstName, LastName, Email and Password.
To Log in, input your registered Email and correct password.

Token session lasts for an hour. This means you'll be logged out and to log in again to use the API after an hour of idleness
