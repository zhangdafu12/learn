const { URL } = require('url')

module.exports = () => ({
  name: 'esbuild:http',
  setup(build) {
    let https = require('https')
    let http = require('http')

    // 1 拦截 CDN 请求
    // 拦截间接依赖的路径，并重写路径
    // tip: 间接依赖同样会被自动带上 `http-url`的 namespace
  build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args) => ({
    path: new URL(args.path, args.importer).toString(),
    namespace: 'http-url',
  }))
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`Downloading : ${url}`)
          let lib = url.startsWith('https') ? https : http
          let req = lib.get(url, (res) => {
            if ([301, 302, 307].includes(res.statusCode)) {
              // 重定向
              fetch(new URL(res.headers.location, url).toString())
              req.abort()
            } else if (res.statusCode === 200) {
              // 响应成功
              let chunks = []
              res.on('data', (chunk) => chunks.push(chunk))
              res.on('end', () => resolve(Buffer.concat(chunks)))
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`))
            }
          })
        }
        fetch(args.path)
      })
      return { contents }
    })
  },
})
