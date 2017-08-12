let homeController = require('./home-controller')
let usersController = require('./users-controller')
let instagramController = require('./instagram-controller')

module.exports = {
  home: homeController,
  users: usersController,
  instagram: instagramController
}
