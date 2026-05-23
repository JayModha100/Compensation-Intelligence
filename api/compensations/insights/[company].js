const connectToDatabase = require('../../../lib/mongoose')
const {
  getCompanyInsights,
} = require('../../../Server/src/controllers/compensationController')

module.exports = async (req, res) => {
  try {
    await connectToDatabase()

    const rawUrl = req.url || ''
    const segments = rawUrl.split('?')[0].split('/').filter(Boolean)
    const company = Array.isArray(req.query?.company)
      ? req.query.company[0]
      : req.query?.company || segments[segments.length - 1] || ''

    req.params = {
      ...(req.params || {}),
      company,
    }

    return getCompanyInsights(req, res)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch company insights.',
    })
  }
}
