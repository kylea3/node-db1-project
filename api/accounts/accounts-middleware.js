const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    return res.status(400).json({ "message": "name and budget are required"})
  } else if (name.trim() < 3 || name.trim() > 100) {
    return res.status(400).json({ "message": "name of account must be between 3 and 100" }) 
  } else if (!Number.isInteger(budget)) {
    return res.status(400).json({ "message": "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    return res.status(400).json({ "message": "budget account must be a number" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const uniqueName = await db('accounts')
    .where('name', req.body.name.trim())
    .first()

    if (uniqueName) {
      next({ status: 400,  message: "that name is taken"})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accountId = await Account.getById(req.params.id);
  if(!accountId) {
    res.status(404).json({ "message": "account not found" })
  } else {
    next()
  }
} catch (err) {
  next(err)
}
}
