export const validateEmail = (email:string)=>{
    const trimmedEmail = email.trim()
    if(!trimmedEmail)return[]
    const errors = []

    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const isValidEmailFormat = emailRegex.test(trimmedEmail)

    if(!isValidEmailFormat)errors.push('Not a valid email address')


        return errors
    
}

export const validedPassword = (password:string) =>{
    if(!password)return[]

    const errors = []
    if(password.length<=6)errors.push('Password must be at least 6 characters long')

        // if(!password.includes('@'))errors.push('Password must include special characters')

        return errors

}