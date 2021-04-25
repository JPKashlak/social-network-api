# Social Network API

## Description
A NoSQL database used to store social media user names, thoughts, reactions, and friends.

## Built With
Javascript, MongoDB, Mongoose, Express, Moment

## Usage
From the root directory run "npm start" in the terminal to activate the server. From there use the corresponding URLs to GET, POST, PUT, and DELETE data:
* Users
    * View all users: `GET localhost:3001/api/users`
    * View user by ID: `GET localhost:3001/api/users/:userId`
    * Add new user: `POST localhost:3001/api/users`
        * Requires: { "username": "", "email": "" }
    * Update user data: `PUT localhost:3001/api/users`
    * Remove user: `DELETE localhost:3001/api/users/:userId`
    * Add new friend connection: `POST localhost:3001/api/users/:userid/friends/:friendId`
    * Delete friend connection: `Delete localhost:3001/api/users/:userid/friends/:friendId`
* Thoughts
    * View all thoughts: `GET localhost:3001/api/thoughts`
    * View thought by ID: `GET localhost:3001/api/thoughts/:thoughtId`
    * Add new thought: `POST localhost:3001/api/thoughts`
        * Requires: {"thoughtText": "", "username": "", "userId": ""}
    * Update thought data: `PUT localhost:3001/api/thoughts/:thoughtId`
    * Remove thought: `Delete localhost:3001/api/thoughts/:thoughtId`
    * Add reaction to thought: `POST localhost:3001/api/thoughts/:id/reactions`
        * Requires: {"reactionBody": "", "username": ""}
    * Delete reaction to thought: `DELETE localhost:3001/api/thoughts/:id/reactions`

# Tutorial
Video Walkthrough: https://drive.google.com/file/d/1gE-y2tPKXVWEQfZZZkuAflXqe2VdcfGR/view

## Questions
If you have any further questions about this application / repository feel free to contact me at: 
* [GitHub](https://github.com/jpkashlak)
* E-Mail: jpkashlak@gmail.com