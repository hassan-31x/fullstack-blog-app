import {db} from '../db.js'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?'
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json('User alredy exists!')

        //CREATE USER IF NOT EXIST
        const q = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)'
        const values = [
            req.body.username,
            req.body.email,
            req.body.password
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json('user created')
        })
    })
}

export const login = (req, res) => {
    //CHECK IF USER EXISTS
    const q = 'SELECT * FROM users WHERE username = ?'
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json('User not found!')

        //CHECK PASSWORD IF USER EXISTS
        if (req.body.password != data[0].password) 
            return res.status(400).json('Wrong username or password')

        //SET COOKIE IF USER IS VERIFIED
        const token = jwt.sign({id: data[0].id}, "any-jwtkey")
        const {password, ...other} = data[0]
        res.cookie('access_token', token, { //set cookie with name = "access_token" and value is above jwt token
            httpOnly: true //means only browser can reach this cookie
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }).status(200).json('User has been logged out')
}