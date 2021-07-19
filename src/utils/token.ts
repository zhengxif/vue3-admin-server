import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/auth'

export const createToken = (payload: any) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '6h' })
}