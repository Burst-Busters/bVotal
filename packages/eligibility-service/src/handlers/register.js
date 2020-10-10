const register = (req, res) => {
    // TODO: implement here
    res.end(`register: ${JSON.stringify(req.body)}`);
}

module.exports = {
    register
}
