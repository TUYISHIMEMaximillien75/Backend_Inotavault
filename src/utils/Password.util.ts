import bcrypt from "bcrypt"

export const hashPassword = async (password: string) =>{
    const hashedPassowrd = await bcrypt.hash(password,10)
    return hashedPassowrd;
}

export const comparePassword = async (password: string, hashedPassword: string) =>{
    return await bcrypt.compare(password, hashedPassword)
}
