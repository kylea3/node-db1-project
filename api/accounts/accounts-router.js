const router = require('express').Router()
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')
const Account = require('./accounts-model')


router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body;
  const account = { name: name.trim(), budget: budget}
  console.log(account);
  Account.create(account)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body;
  const account = { name: name.trim(), budget: budget };
  const updated = await Account.updateById(req.params.id, account)
  res.status(200).json(updated)
    try {
      res.status(200).json(updated)
    }
    catch (err) {
      next(err)
    }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
