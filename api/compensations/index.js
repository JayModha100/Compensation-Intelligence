const connectToDatabase = require('../../lib/mongoose')
const {
  createCompensationEntry,
  getAllCompensations,
} = require('../../Server/src/controllers/compensationController')

module.exports = async (req, res) => {
  try {
    await connectToDatabase()

    if (req.method === 'POST') {
      return createCompensationEntry(req, res)
    }

    if (req.method === 'GET') {
      return getAllCompensations(req, res)
    }

    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to process compensation request.',
    })
  }
}
