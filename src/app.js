const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//setup handlebars engine and views location
app.set('view engine', 'hbs') //how you setup handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lou Rod'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Lou Rod'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I see that you are looking for help',
        title: 'help',
        name: 'Lou Rod'

    }) 
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {
        if (error) {
          return res.send({error})
        } 
     
        forecast(longitude, latitude, (error, forecastData) => {
           if(error) {
              return res.send({error})
           }
           res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })  
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//* is the wild card character matches anything that hasn't been mathced
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'That help article does not exist',
        title: 'Error 404',
        name: 'Lou Rod'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'That page does not exist',
        title: 'Error 404',
        name: 'Lou Rod'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})