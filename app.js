const crypto = require('crypto')
const express = require('express')
const { Writable } = require('stream')
const api_helper = require('./api_helper')
const app = express()
const port = 3000
const stream = require('stream')


app.get('/test', (req, res) => res.send('How To Download File In Express Web App!'))

/**
 * Route to render the index HTML page.
 */
app.get('/index', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

function* gen() {
    yield `id,name,password`
    for (let i = 0; i < 70_000_000; i++) {
        yield `${i},name-${i},${crypto.randomBytes(8).toString('hex')}`
    }
    yield `id,name,password`
}

/*
** Route to download the file from the specified URL  
*/
app.get('/download', (req, res, next) => {
    console.log("start...")
    res.status(200)
    res.attachment('data-' + Date.now() + ".csv")
    const r = stream.Readable.from(gen(), {encoding: 'utf8'})
    r.pipe(res)
    console.log("end...")
    next()
})

app.listen(port, () => console.log(`App listening on port ${port}!`))