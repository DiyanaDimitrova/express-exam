let Instagram = require('mongoose').model('Instagram')
let User = require('mongoose').model('User')
function parseTags(message) {
  let hashTags = message.match(/(?:#(\w+))/g)
  let userTags = message.match(/(?:@(\w+))/g) || []
  if (hashTags) {
    hashTags = hashTags.map(function (v) {
      return v.replace('#', '')
    })
  }
  if (userTags) {
    userTags = userTags.map(function (v) {
      return v.replace('@', '')
    })
  }
  let tags = {
    hashTags: hashTags,
    userTags: userTags
  }
  return tags
}
module.exports = {
  register: (req, res) => {
    res.render('instagram/register')
  },
  addPhoto: (req, res) => {
    let instagramPhoto = req.body
    let tags = parseTags(instagramPhoto.description)
    tags.userTags.push(req.user.username)
    console.log(tags)
    if (instagramPhoto.description === '') {
      instagramPhoto.globalError = 'Message is required!'
    } else {
      instagramPhoto.tags = tags
      Instagram
        .create(instagramPhoto)
        .then(instagramPhoto => {
          res.redirect('/')
        })
    }
  },
  searchByTag: (req, res) => {
    let hashTag = req.params.tagName
    console.log(hashTag)
    Instagram
      .find({'tags.hashTags': req.params.tagName})
      .limit(100)
      .sort({date: -1})
      .then(photosByTag => {
        console.log(photosByTag)
        photosByTag.forEach((photo) => {
        Instagram.findByIdAndUpdate({ _id: photo._id }, {$inc: { views: 1 }}, function (err, data) {
          if (err) console.log(err)
          })
        })
        res.render('instagram/photosByTag', {user: req.user, photosByTag: photosByTag})
      })
      .catch((err) => {
        console.log(err)
      })
  },
  delete: (req, res) => {
    // let id =
    Instagram
    .findByIdAndRemove(req.params.id)
    .then(res.redirect('/'))
    .catch((err) => {
      console.log(err)
    })
  },
  update: (req, res) => {
    let url = req.body.url
    let description = req.body.description
    let tags = parseTags(description)
    tags.userTags.push(req.user.username)
    if (url && url !== null && description && description !== null) {
      Instagram
      .findByIdAndUpdate(req.params.id, {
        $set: { url: url, description: description, tags: tags }
      })
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (url && url !== null) {
      Instagram
      .findByIdAndUpdate(req.params.id, {
        $set: { url: url }
      })
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (description && description !== null) {
      Instagram
      .findByIdAndUpdate(req.params.id, {
        $set: { description: description, tags: tags }
      })
      .exec()
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  like: (req, res) => {
    let id = req.params.id
    let user = req.user.username
    Instagram.update({ _id: id }, {$push: { likes: user }}, function (err, data) {
      if (err) console.log(err)
      res.redirect('/')
    })
  },
  dislike: (req, res) => {
    let id = req.params.id
    let user = req.user.username
    Instagram.update({ _id: id }, {$pull: { likes: user }}, function (err, data) {
      if (err) console.log(err)
      res.redirect('/')
    })
  }
}
