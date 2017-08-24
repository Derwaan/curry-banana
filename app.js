let express = require('express')
let app = express()

app.get('/', (req, res) => {
	res.sendfile(__dirname + '/public/index.html')
})

app.use(express.static(__dirname + '/public'))

let port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('Running on http://localhost:'+port)
})
