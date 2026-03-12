const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/child-age', function (req, res) {
  res.render('child-age')
})

router.post('/child-age', function (req, res) {
  const answer = req.session.data['child-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-age': 'Select how old your child is' }
    return res.render('child-age')
  }
  if (answer === 'over-16-years-old') {
    return res.redirect('/ineligible-child-age')
  }
  res.redirect('/receiving-benefits')
})

router.get('/ineligible-child-age', function (req, res) {
  res.render('ineligible-child-age')
})

router.get('/receiving-benefits', function (req, res) {
  res.render('receiving-benefits')
})

router.post('/receiving-benefits', function (req, res) {
  const answer = req.session.data['receiving-benefits']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'receiving-benefits': 'Select yes if you receive any of these benefits' }
    return res.render('receiving-benefits')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-receiving-benefits')
  }
  res.redirect('/national-insurance-number')
})

router.get('/ineligible-receiving-benefits', function (req, res) {
  res.render('ineligible-receiving-benefits')
})

router.get('/national-insurance-number', function (req, res) {
  res.render('national-insurance-number')
})

router.post('/national-insurance-number', function (req, res) {
  const answer = req.session.data['national-insurance-number']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'national-insurance-number': 'Enter your National Insurance number' }
    return res.render('national-insurance-number')
  }
  res.redirect('/child-name')
})

router.get('/child-name', function (req, res) {
  res.render('child-name')
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-name': 'Enter your child\'s full name' }
    return res.render('child-name')
  }
  res.redirect('/school-name')
})

router.get('/school-name', function (req, res) {
  res.render('school-name')
})

router.post('/school-name', function (req, res) {
  const answer = req.session.data['school-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'school-name': 'Enter the name of your child\'s school' }
    return res.render('school-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
