const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)
  app.get('/admins/all', auth.isInRole('Admin'), controllers.users.adminAll)
  app.get('/admins/add', auth.isInRole('Admin'), controllers.users.adminView)
  app.post('/admins/add', auth.isInRole('Admin'), controllers.users.adminAdd)
  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profileInstagrams)

  app.get('/add', auth.isAuthenticated, controllers.instagram.register)
  app.post('/instagram/addPhoto', auth.isAuthenticated, controllers.instagram.addPhoto)
  app.get('/tag/:tagName', controllers.instagram.searchByTag)
  app.get('/delete/:id', auth.isInRole('Admin'), controllers.instagram.delete)
  app.post('/update/:id', auth.isInRole('Admin'), controllers.instagram.update)
  app.get('/like/:id', auth.isAuthenticated, controllers.instagram.like)
  app.get('/dislike/:id', auth.isAuthenticated, controllers.instagram.dislike)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
