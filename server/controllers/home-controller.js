let Instagram = require('mongoose').model('Instagram')

module.exports = {
  index: (req, res) => {
    Instagram
      .find()
      .limit(100)
      .sort({date: -1})
      .then(photos => {
        console.log(photos)
        photos.forEach((photo) => {
        Instagram.findByIdAndUpdate({ _id: photo._id }, {$inc: { views: 1 }}, function (err, data) {
          if (err) console.log(err)
          })
        })
        // Instagram
        // .update({'tags.hashTags': req.params.tagName}, {$inc: { views: 1 }})
        // .exec()
        // .then((updated) => {
        //     console.log('Viewssss')
        //     console.log('Updated' + updated)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
          res.render('home/index', {user: req.user, photos: photos})
      })
      .catch((err) => {
        console.log(err)
      })
    //res.render('home/index')
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
