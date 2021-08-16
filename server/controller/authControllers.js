const User = require('../models/User');
const alertError = (err) => {
    let errors = {name: '',email: '', password: ''}
    //console.log(`error message: ${err.message}`);
    //console.log(`error code: ${err.code}`);
    //console.log('err', err)
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        let errors = alertError(error);
        res.status(400).json({errors})
        //res.status(400).send('Fail to create user');
    }
    res.send('singup')
}
module.exports.login = (req, res) => {
    res.send('login')
}
module.exports.logout = (req, res) => {
    res.send('logout')
}