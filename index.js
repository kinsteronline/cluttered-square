const http = require('http')

const contentMaker = () => {
  return new Promise((resolve, reject) => {
    return resolve(JSON.stringify({ "cluttered": "box" }))
  })
}

const handler = async (req, res) => {
  try {

    let content = await contentMaker()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('X-Promising', 'yes')
    res.setHeader('Content-Length', content.length)

    res.end(content)

  } catch (err) {
    res.statusCode = 500
    res.end('error time')

  }
}


const port = parseInt(process.env.WWW_PORT, 10) || 9000
const host = process.env.WWW_HOST || '127.0.0.1'

const server = http.createServer(handler)
server.listen(port, host)

server.on('request', handler)

server.on('listening', function () {
  console.log(`listening on ${host}:${port}`)
})


