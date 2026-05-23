const connectToDatabase = require('../../lib/mongoose')
const {
  compareCompensations,
} = require('../../Server/src/controllers/compensationController')

module.exports = async (req, res) => {
  try {
    await connectToDatabase()
    return compareCompensations(req, res)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to compare compensation entries.',
    })
  }
}
