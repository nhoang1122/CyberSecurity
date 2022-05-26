const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        
        if (users[i].username === username) {
          const existing = bcrypt.compareSync(password, users[i].passwordHash)
          
          if (existing) {
            console.log('HITTA')
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash;
            res.status(200).send(userToReturn)
            return;
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const { username, email, firstName, lastName, password, confirmPass} = req.body
        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt);

        let userObj = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash
        }

        users.push(userObj)
        let userToReturn = {...userObj}
        delete userToReturn.passwordHash;
        res.status(200).send(userToReturn)

    }
}






