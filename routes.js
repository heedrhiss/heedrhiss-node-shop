const fileS = require('fs');

const reqHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write("<body> <form action='/message' method='POST'> <input type='text' name='message'/><button type='submit'>Send</button></form></body>")
        res.write('</html>');
        return res.end()
    }
    if (url === "/message" && method === "POST") {
        const text = []
        req.on('data', (chunk) => {
            text.push(chunk)
        })
        return req.on('end', () => {
            const message = Buffer.concat(text).toString()
            const filtText = message.split('=')[1]
            fileS.writeFile('message.txt', filtText, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', "/")
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Yonko Heedrhiss</title></head>');
    res.write("<body> <h1>Welcome to Heedrhiss Server!</h1> </body>")
    res.write('</html>');
    return res.end()
    // process.exit();
}

module.exports = reqHandler;