const { express } = require('./xtra-express-documatic-hackathon/index')
const app = express();
app.set('view engine', 'ejs')
require('dotenv').config()

app.use(express.static('xtra-express'))
app.use(express.static('./'))
express.init(['index'])



app.get('/', async (req, res) => {
    express.viewsUpdate('index')
    res.sendFile(__dirname + '/main.html');
}
);

app.get('/Dhyan99/bgScreen', async (req, res) => {
    res.sendFile(__dirname + '/MonitorPage.html');
}
);

app.get('/Dhyan99/views', async (req, res) => {
    res.render('xtra-express/index')
})

app.listen(process.env.PORT);