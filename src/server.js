const http = require('http')

const contentMaker = () => {
  return new Promise((resolve, reject) => {
    return resolve(JSON.stringify({ 'cluttered': '🔲' }))
  })
}

// pinger :: IncomingMessage -> Promise String
const pinger = (request) => {
  return new Promise((resolve, reject) => {
    return resolve(`Pinged for ${request.url}`)
  })
}

const handler = async (req, res) => {

  try {

    let content = await contentMaker()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('X-Promising', 'yes')

    res.end(content, 'utf-8', () => {
      console.log('done & gone')
    })

  } catch (err) {
    res.statusCode = 500
    res.end('error 😱')

  }
}

const port = parseInt(process.env.WWW_PORT, 10) || 9000
const host = process.env.WWW_HOST || '127.0.0.1'

const server = http.createServer(handler)
server.listen(port, host)

server.on('request', async (req, res) => {
  console.log(await pinger(req))
})

server.on('listening', () => {
  const { address, port } = server.address()
  console.log(`listening on ${address}:${port}`)
})


