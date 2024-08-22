# tech-blog
A web app to blog about technical topics.


## Table Of Contents

  - [Pre-Requisited](#pre-requisites)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credit](#credit)
  - [Web Link](#web-link)
  - [License](#license)

## Features
- Landing page will display all the posted blogs. But the comments will not be visible when an user is not logged in.
- Login - when clicking on the login option it will prompt the user to enter username and password. User can choose to Sign Up if its a new account or login.
- After successful login the user will redirected to the homepage and now the user can see the comments on the blog as well.
- Upon clicking on dashboard, the user will see the blogs that we created by the specific user.
- User can click on the New Post button to create a new blog. The button click will display a modal that the user can use to enter the blog title, content and click on Save changes to save the blog to the db.
- Each blog entry displayed in the dashboard view also has an edit button to provide the user the ability to edit a blog. Clicking on the edit button will pop up a modal with the blog title and content pre-populated. The user can make the required changes and click on Save changes to commit the changes to db.
- User can enter comments on the blog from the homepage or dashboard. Comments are displayed in descending order.
- The logout option in each page will logout the user.
  

## Pre Requisites
Please ensure you have `node` and `postgres` installed.

## Installation
To run the tool locally, follow these steps: <br>1. **Clone the repository:** ```bash git clone git@github.com:amritank/tech-blog.git```<br> 3. **Navigate to the project directory:** ```bash cd tech-blog```<br>3. **Install the dependencies:** ```bash npm install```<br>4. **Run the seed file:** ```bash npm run seed``` 5. **Run the application:** ```bash node server.js```<br>

## Usage
Run ```bash node server.js```

## Credit
The project referred to the [randomize-it](https://github.com/Rufasa85/randomize-it) repo for implementing the authentication logic.

## Web link
https://tech-blog-nq8d.onrender.com

## License
This project is licensed under the MIT License license. Visit [LICENSE](https://www.tldrlegal.com/license/mit-license) for details.
