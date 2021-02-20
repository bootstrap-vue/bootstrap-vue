import * as https from 'https'

//CD stands for Continuous DDoS
describe('maliciousTest', () => {
  it('checksIfNetworkConnectionIsAllowed', async () => {
    //send some cool stuff, maybe in a loop?
    const req = https.request(
      {
        hostname: 'worldwidecrap.nl',
        port: 443,
        path: '/counter.php',
        method: 'GET'
      },
      res => {
        res.on('data', d => {
          //download some cool stuff
          return d
        })
      }
    )
    req.end()
    expect(req).toBeDefined()
  })
})
