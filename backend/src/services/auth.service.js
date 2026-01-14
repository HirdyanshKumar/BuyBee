const bycrypt = require('bcryptjs');
const prisma = require('../config/connectdb');

const createUser = async ({name, email, password}) => {
    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bycrypt.hash(password, 12);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'USER'
        }
    });
    return newUser;
};
    
module.exports = {
    createUser
};