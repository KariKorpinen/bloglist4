const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const userA = body.username.length
  const pwA = body.password.length
  //console.log("user post ", userA)
  //console.log("pw post ", pwA)

  if (!user.username || userA < 3 || !body.password || pwA < 3) {
    return response.status(401).json({ error: 'username or password not ok, min 3 chars' })
  }

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter