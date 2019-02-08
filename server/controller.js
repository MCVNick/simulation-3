const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const { session } = req

        let user = await db.user.check_user({ username: username })
        user = user[0]
        if (user) {
            return res.status(400).send('User already created')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.user.register_user({ username: username, password: hash })
        newUser = newUser[0]

        session.user = { ...newUser }

        res.status(201).send(session.user)
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const { session } = req

        let user = await db.user.login({ username: username })
        user = user[0]
        if (!user) {
            return res.status(400).send('User not found')
        }

        const foundUser = bcrypt.compareSync(password, user.password)
        if (foundUser) {
            delete user.password
            session.user = user
            res.send(session.user)
        }
        else {
            res.status(401).send('Incorrect password')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getAllMessages: async (req, res) => {
        const db = req.app.get('db')
        let { userposts, search } = req.query
        const { id } = req.params
        search ? search = '%' + search + '%' : search = ''
        userposts == 'false' ? userposts = false : userposts = true
        
        let messages = []
        
        console.log(search, userposts)
        if (userposts && search) {
            console.log('1')
            messages = await db.messages.get_user_filter_posts({ id, search })
        } else if (!userposts && !search) {
            console.log('2')
            messages = await db.messages.get_other_posts({ id })
        } else if (!userposts && search) {
            console.log('3')
            messages = await db.messages.get_other_posts_filter({ id, search })
        } else {
            console.log('4')
            messages = await db.messages.get_user_posts({ id })
        }
        
        return res.status(200).send(messages)
    },
    getUser: (req, res) => {
        const {user} = req.session

        if(user) {
            res.send(user)
        } else {
            res.status(401).send('Forbidden')
        }
    }
}