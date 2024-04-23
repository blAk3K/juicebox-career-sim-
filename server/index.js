const express = require("express");
const app = express();
const jwt = require ("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

require('dotenv').config();

//Imports ^^^^^
app.use(express.urlencoded({extended:true}))


// Endpoint to register a new user
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 
// get all our post made by all users
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.send(posts);
})

//get all post from a single user id
app.get("/api/posts/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  //find postst by userId
  const userPosts = await prisma.post.findMany({
    where: {
      userid: userId,
    },
  });
  res.send(userPosts);
})

// delete post by post id 
app.delete ("/api/posts/:id", async (req, res) => {
  const deletePost = await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(deletePost);
});

// Endpoint to log in
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // If user doesn't exist or password is incorrect, return error
    if (!user || user.password !== password ) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(user, process.env.SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`)
});

