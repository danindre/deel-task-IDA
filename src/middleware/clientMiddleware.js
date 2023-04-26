const clientMiddleware = async (req, res, next) => {
  const profile = req.profile
  if(profile.type !== 'client') return res.status(400).json({
    success: false,
    message: 'Invalid operation',
    data: null
  })
  next()
}
module.exports = {clientMiddleware}