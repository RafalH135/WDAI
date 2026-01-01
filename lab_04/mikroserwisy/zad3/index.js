import bcrypt from 'bcryptjs';
import express from 'express';
import { Sequelize, DataTypes, Model } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = 10
const app = express()
const port = 3002

app.use(express.json());

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'users.db'
});
class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/api/register', async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,saltRound)
    })
    res.send(user.id)
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    console.log(req.body);
    console.log(user);


    if(!user){
      return res.status(401).json({ error: 'Invalid credentials1'})
    }

    const correct = await bcrypt.compare(req.body.password, user.password)

    if(!correct){
      return res.status(401).json({ error: 'Invalid credentials2'})
    }

    const token = jwt.sign({
      userId: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '1h' });

    res.json({ token });
})