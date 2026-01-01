import express from 'express';
import { Sequelize, DataTypes, Model } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table } from '@sequelize/core/decorators-legacy';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const app = express()
const port = 3000

app.use(express.json());

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'books.db'
});
class Book extends Model {}
Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'books',
  timestamps: false
});
function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(401).json({ error: 'No token'})
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json( { error: 'Invalid token'})
    }
    req.user = user
    next()
  })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/books', async (req, res) => {
  const books = await Book.findAll()
  res.json(books)
})

app.get('/api/books/:bookId', async (req, res) => {
  const books = await Book.findOne({
    where: { id: req.params.bookId }
  })
  res.json(books)
})

app.post('/api/books', authenticateToken, async (req, res) => {
  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  })
  res.send(book.id)
})

app.delete('/api/books/:bookId', authenticateToken, async (req, res) => {
  const deleted = await Book.destroy({
    where: { id: req.params.bookId }
  })
  if (deleted === 0) {
    res.send("Book not found")
    return;
  }
  res.send("Book deleted")
})