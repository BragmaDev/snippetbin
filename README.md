# Snippetbin
Advanced Web Applications course project 

Author: Matti Bragge

Snippetbin is a web application that is built with the MERN stack. It allows users to post code snippets and comment on them. Users can register and log in, and authorization is JWT-based. Only authenticated users can post and vote on snippets and comments, but all users can view them. The application supports multiple screen sizes. 

### Technology description
- Node.js version 18.14.2
- npm version 9.5.0
- Express
- React
- MongoDB

### Installation
1. Clone repository into an empty folder (this will be referred to as the root folder)
1. Inside the root folder, run "npm run install"
1. Inside the root folder, run "npm run build"
1. Set NODE_ENV to "production"
1. Inside the root folder, run "npm run start"
1. The application will now be running on port 5000
1. Go to "localhost:5000" on your browser of choice

### Features
| Feature  | Target points |
| ------------- |:-------------:|
| Basic features      | 25     |
| Utilization of React      | 5     |
| Use of highlight library for code snippets      | 2     |
| Vote (up or down) posts and comments (only one vote per user)      | 3     |
| Use of a pager when there is more than 10 posts available     | 2     |

### User manual
The front page of the application has a list of all snippets that are posted into the database. It also has a post form that can be used if the user is logged in. To register, click on the register button in the header and fill in the username, email, and password fields. The email requires an input that is formatted like an email address, and the password has the following requirements:
- Eight or more characters
- One or more lower case letters
- One or more upper case letters
- One or more numbers
- One or more of the following special characters: ~`!@#$%^&*()-_+={}[]|;:"<>,.\/?

After registering, log in with the email and password of the registered account. To post a snippet, type or paste it into the text field on the front page and press the "post snippet" button. The page should reload and show the new post. The bottom of the post contains the username of its author, buttons for upvoting and downvoting (NOTE: after voting, users can only change their votes and not remove them), the post's rating (all votes summed), and the button to open its comments. On the bottom of the front page there is a pagination element that can be used to switch between pages of posts if there are more than 10. 

By clicking on the "comments" button, the user can read, post, and vote comments. 