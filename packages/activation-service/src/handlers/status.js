const status = async (req, res) => {
  res.end(JSON.stringify({
    status: 'ok'
  }))
}

module.exports = {
  status
}
