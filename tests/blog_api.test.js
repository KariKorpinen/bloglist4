const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  //console.log("all blogs ", response.body)
  expect(response.body.length).toBe(helper.initialBlogs.length)
})
test('is id defined', async () => {
  const response = await api.get('/api/blogs')
  //console.log("all blogs ", response.body)
  console.log("body id", response.body[0].id)
  //Blog.find({}).then(blogs => {
    //response.json(blogs.map(blog => blog.toJSON()))})
    //console.log("body id 2", response)

  //expect(response.body.length).toBe(helper.initialBlogs.length)
  expect(response.body[0].id).toBeDefined()
})
/*
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
/////////////////////////////////////////
  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'Browser can execute only Javascript'
  )/////////////////////////////////////7
})
*/
test('a valid blog can be added ', async () => {
  const newBlog = {
    ///////////////////////////////7
    title: "TDD harms architecture part 2", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 2
    //content: 'async/await simplifies making async calls',
    //important: true,
    /////////////////////////////7777
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
///////////////////////////
  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'TDD harms architecture part 2'
  )////////////////////////7
})
test('if likes value is empty, it get 0 to its value ', async () => {
  const newBlog = {
    ///////////////////////////////7
    title: "TDD harms architecture part 3", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html" 
    //likes: 2
    //content: 'async/await simplifies making async calls',
    //important: true,
    /////////////////////////////7777
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
///////////////////////////
  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes).toContain(0)
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    /////////////////////////////////////////777
    author: "Robert C. Martin", 
    likes: 5
    //////////////////////////////////////77
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})
/*
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )
///////////////////////////////////////7
  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
  //////////////////////////////////////////
})
*/
afterAll(() => {
  mongoose.connection.close()
})