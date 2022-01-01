# Project Overview

![create](https://github.com/brian99na/create/blob/main/src/images/android-chrome-512x512.png?raw=true)

#[CREATE]

## Project Links

- [Frontend Repo](https://github.com/brian99na/project-2)
- [Backend Repo](https://github.com/brian99na/create-django-backend)

- [Deployed Frontend](https://brian99na.github.io/create/)
- [Deployed Backend](http://create-art.herokuapp.com/all/)


## Project Description

This project is a social media website that allows users to upload short snippets that features their work in the form of a short video or image.

###Tech Stack
- React, HTML, SASS, JavaScript
- Django, Python, Postgresql

###Currently V1
- Full CRUD functionality
- User authentication w/ rest framework tokens
- Public and authenticated views for posts

- #### Working on...
    - AWS S3 Bucket file upload working locally, currently only supports image/video __links__ for post submission.
    - Adding more fields to user/post models for likes, bookmarks, bio, etc.


## Wire-frames

- [Wire-frames](https://www.figma.com/file/eXg9KbZjNAU4Skm2P8qfwB/Create-Wireframes?node-id=0%3A1)

### MVP/PostMVP

#### MVP
- Build out the backend with user and post models with both public views for viewing posts 
and users and user authenticated views for posting/editing
- Build essential components
    - Homepage for viewing all posts
    - Sign in/up page
    - Create post modal
    - User and post pages
- CSS Styling

#### PostMVP

- Working upload button to AWS S3 bucket
- Add an option to turn off or on autoplay on all videos
- Add a way to compress uploaded files when storing in aws
- User optimization w/ file resizing

## Components

| Component | Description | 
| --- | :---: |  
| Index | Sets up app with Router | 
| Header | Nav burger, Site Text, Site Icon | 
| App | Contains Routes for components |
| Homepage | Contains images/videos from users, loads localstorage token, loads tags | 
| Post page | Contains all information from a single post |
| Profile Page | Individual User Page |
| Create Post Page | Modal for creating new post |
| SignIn/SignUp Page | Individual Page for signing in/up |

| Component | Priority | Estimated Time | Time Invested |
| --- | :---: |  :---: | :---: | :---: |
| Create React app and files for all components | H | 1hr | 1hrs |
| Navbar | H | 1hr | 4hrs |
| Create 'Homepage' (fetch data, display images randomized) | H | 4hrs | 15hrs |
| Create 'Profile' Page Template | H | 3hrs | 5hrs |
| Create 'Post' Page Template | H | 3hrs | 6hrs |
| Create 'Create' modal | H | 4hrs | 8hrs |
| Create 'Sign Up/Sign In' Page Template | H | 3hrs | 5hrs |
| Styling | H | 4hrs | 12hrs |
| Backend models/views/serializers | H | 1hr | 5hrs |
| Backend Deployment | H | 1hr | 10hrs |
| Frontend Deployment | H | 1hr | 1hr |
| Total | H | 23.5hrs | 72hrs |

