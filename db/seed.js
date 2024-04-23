const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const { faker } = require("@faker-js/faker");

//imports  will go to the top HERE^^^^


const createUser = async () => {
  // use a for loop to make 3 users for the db
  for(let i = 0; i < 3;i++){
    await prisma.user.create({
      data: {
        username: faker.person.fullName(),
        password: faker.internet.password()
  // faker will create 3 random users for us with a username and password
      }
    })
  }
}

const createPost = async () => {
  // for loop to make use 9 post for our users
  for(let i = 0; i < 9;i++){
    await prisma.post.create({
      data: {
        title:faker.music.songName(),
        content:faker.lorem.sentence(),
        //faker will give me 9 post with unique titles and content for each one 
        userid: (i % 3) + 1
        // userid will let me set 3 post to 3 differnt users
      }
    })
  }
   
}

const main = async () => {
  await createUser();
  await createPost();


};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
module.exports = main;