import jsonwebtoken from 'jsonwebtoken';

export const generateToken = (id) => {
    return jsonwebtoken.sign({ id: id.toString() }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });}