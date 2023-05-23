const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3010;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


let todayList = []
let tomorrowList = []


app.get('/', function(req, res) {

    let date = new Date()

    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }

    let today = date.toLocaleDateString('em-us', options)

    res.render('list', { currentList: today, addItem: todayList })
})



app.post('/', function(req, res) {
    let item = req.body.userInput
    console.log(req.body)

    if(req.body.list === 'Tomorrow"s') {
        tomorrowList.push(item)
        res.redirect('/tomorrow')
    } else {
        todayList.push(item)
        res.redirect('/')
    }
    

})



app.get('/tomorrow', function(req, res) {

    res.render('list', { currentList: 'Tomorrow"s', addItem: tomorrowList })
    
})



app.post('/tomorrow', function(req, res) {
    let tomorrowItem = req.body.userInput
    tomorrowList.push(tomorrowItem)
  
})



app.listen(PORT, function() {
    console.log('server is live ' + PORT)
})