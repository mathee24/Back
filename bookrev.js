const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'Bookinfo.sqlite'
});

const Book = sequelize.define('book', {
  bookid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  typeid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// เพิ่มข้อมูลลงในตาราง Book
Book.bulkCreate([
  { bookid: 1, title: 'Harry Potter',  typeid: 1, author: 'J.K. Rowling', image: './pic/HarryPotter.jpg' },
  { bookid: 2, title: 'The Witcher', typeid: 1, author: 'Andrzej Sapkowski', image: './pic/The Witcher.jpg' },
  { bookid: 3, title: 'Batman: The Killing Joke ',  typeid: 2, author: 'Alan moore', image: './pic/Batman.jpg' },
  { bookid: 4, title: 'The Lord of the Rings',  typeid: 1, author: 'J.R.R. Tolkien', image: './pic/Lordofthering.jpg' },
  { bookid: 5, title: 'Pride and Prejudice',  typeid: 1, author: 'Jane Austen', image: './pic/Prideandjustice.jpg' },
  { bookid: 6, title: 'The Catcher in the Rye',  typeid: 1, author: 'J.D. Salinger', image: './pic/thecatcherintherye.jpg' },
  { bookid: 7, title: 'The Call of Cthulhu',  typeid: 1, author: 'H. P. Lovecraft', image: './pic/TheCallofCthulhu.jpg' },
  { bookid: 8, title: 'Saga',  typeid: 2, author: 'Brian K.Vaughan', image: './pic/Saga.jpg' },
  { bookid: 9, title: 'JavaScript: The Good Parts',  typeid: 6, author: 'Douglas Crockford', image: './pic/JavaScript.jpg' },
  { bookid: 10, title: 'Clean Code',  typeid: 6, author: 'Robert C. Martin', image: './pic/Clean-Code.jpg' },
  { bookid: 11, title: 'New English File: Elementary',  typeid: 4, author: 'Clive Oxenden', image: './pic/New English.jpg' },

]).then(() => {
  console.log('Data inserted successfully');
}).catch(err => {
  console.error('Error inserting data:', err);
});
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'Bookinfo.sqlite'
// });

// const Type = sequelize.define('type', {
//   typeid: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   type: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// // เพิ่มข้อมูลลงในตาราง Book
// Type.bulkCreate([
//   { typeid: 1, type: 'Novel' },
//   { typeid: 2, type: 'Comics'},
//   { typeid: 3, type: 'Philosophy books'},
//   { typeid: 4, type: 'English teaching books'},
//   { typeid: 5, type: 'Math teaching books'},
//   { typeid: 6, type: 'Programing teaching books'},

// ]).then(() => {
//   console.log('Data inserted successfully');
// }).catch(err => {
//   console.error('Error inserting data:', err);
// });
