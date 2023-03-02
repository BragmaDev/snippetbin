# Snippetbin
Advanced Web Applications course project 

Author: Matti Bragge

Snippetbin is a web application that is built with the MERN stack. It allows users to post code snippets and comment on them. Users can register and log in, and authorization is JWT-based. Only authenticated users can post, edit, and vote on snippets and comments, but all users can view them. The application supports multiple screen sizes. All features are specified below in the "Features" section.

### Technology description
- Node.js version 18.14.2
- npm version 9.5.0
- Express
- React
- MongoDB (uses database named "snippetbin")

### Installation
1. Install Node.js version 18.14.2
1. Install MongoDB
1. Clone the Snippetbin repository onto your computer
1. Inside the "server" folder, create a file named ".env"
1. In the ".env" file, write "SECRET=RANDOMSTRING" without quotes and where "RANDOMSTRING" can be anything
1. Open a terminal inside the repository root folder
1. Run "npm run install"
1. Run "npm run build"
1. Set NODE_ENV to "production" 
    - Linux: Run 'NODE_ENV=production'
    - Windows cmd: Run 'SET NODE_ENV=production'
    - Windows PowerShell: Run '$env:NODE_ENV="production"'
1. Run "npm run start"
1. Once the application is running, go to "localhost:5000" on your browser of choice

### Features
| Feature  | Target points |
| ------------- |:-------------:|
| Basic features with well written documentation     | 25     |
| Users can edit their own comments/posts     | 4     |
| Utilization of React      | 5     |
| Use of highlight library for code snippets      | 2     |
| Provide a search that can filter out only those messages that have the searched keyword      | 2     |
| Vote (up or down) posts and comments (only one vote per user)      | 3     |
| Use of a pager when there is more than 10 posts available     | 2     |
| Last edited timestamp is stored and shown with posts/comments     | 2     |
| Own feature: Show toast alerts for errors and certain successful actions (I think this should be accepted because it improves the user experience meaningfully)     | 2     |
|      | Total: 47     |

### User manual

#### Register
1. Click on the register button in the header
1. Fill in credentials that fulfil the requirements listed on the page
1. Click "register"

#### Log in
1. Click on the login button in the header
1. Fill in a registered user's credentials
1. Click "log in"

#### Post a snippet
1. Go to the home page (by clicking on the site logo in the header)
1. Type or paste in a title and a code snippet into the designated fields
1. Click "post snippet"

#### Vote on a post/comment
1. Log in
1. Click the up/down arrow on the bottom of a post/comment
1. To remove a vote, click on the same arrow again

#### View comments
1. Click the "comments" button on the bottom of a post

#### Post a comment
1. Log in
1. Click the "comments" button on the bottom of a post
1. Type a comment into the comment field
1. Click "post comment"

#### Edit a post
1. Log in
1. On a post that has been submitted by the user that is logged in, click the "comments" button
1. Click "Edit post"
1. Edit the title/snippet and click "edit"

#### Edit a comment
1. Log in
1. On the bottom of a comment that has been submitted by the user that is logged in, click the "edit" button
1. Edit the comment and click "edit"

#### Use the pagination
1. If there are more than 10 posts, scroll to the bottom of the home page
1. Click on the pagination buttons

#### Search posts
1. On the home page, type in a search term into the search bar
