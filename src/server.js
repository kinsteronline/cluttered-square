const http = require('http')

const contentMaker = () => {
  return new Promise((resolve, reject) => {
    return resolve(JSON.stringify({ 'cluttered': 'square' }))
  })
}

const pinger = () => {
  return new Promise((resolve, reject) => {
    return resolve('ping!')
  })
}

const handler = async (req, res) => {

  try {

    let content = await contentMaker()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('X-Promising', 'yes')
    res.end(content, 'utf-8')

  } catch (err) {

    res.statusCode = 500
    res.end('error 😱')
  }
}

const server = http.createServer(handler)

server.on('request', async (req, res) => {
  console.log(await pinger())
})

server.listen(9000, () => {
  console.log('listening on 9k')
})


