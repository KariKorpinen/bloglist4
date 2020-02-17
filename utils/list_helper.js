const _ = require('lodash')

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0 
    : blogs.reduce(reducer, 0) || 0 // / array.length
}

const favoriteBlog = (blogs) => {
	let maxIndex = null
  let maxValue = -1
  for (let prop in blogs) {
    if (blogs.hasOwnProperty(prop)) {
      let value = blogs[prop].likes
      if (value > maxValue) {
        maxIndex = prop
        maxValue = value
      }
    }
  }
  const title2 = blogs[maxIndex].title.toString()
  const author2 = blogs[maxIndex].author.toString()
  const likes2 = blogs[maxIndex].likes
  const retu2 = `{"title": "${title2}","author": "${author2}", "likes": ${likes2} }`
  //console.log("retu2 ", retu2)
  const retu3 = JSON.parse(retu2)
  //console.log("retu3 ", retu3)
  return retu3
}

const mostBlogs = (blogs) => {

const result = _(blogs)
  .countBy('author')
  .map((count, author) => ({ author, count }))
  .value()
const data = _.orderBy(result, ['author','count'], ['desc', 'desc']);
const authorM = data[0].author.toString()
const blogsM = data[0].count
const retuM = `{"author": "${authorM}","blogs": ${blogsM} }`
const retuM2 = JSON.parse(retuM)
  return retuM2
}
const mostLikes = (blogs) => {
   const result = _(blogs)
     .groupBy('author')
     .map((obj, key) => ({ 'author': key, 'likes': _.sumBy(obj, 'likes') }))
     .value()
   const data = _.orderBy(result, ['likes'], ['desc']);
   const mostBlogsAutor = data[0].author.toString()
   const mostBlogsLikes = data[0].likes
   const retuMost = `{"author": "${mostBlogsAutor}","likes": ${mostBlogsLikes} }`
   const retuMost2 = JSON.parse(retuMost)
   
  return retuMost2
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}