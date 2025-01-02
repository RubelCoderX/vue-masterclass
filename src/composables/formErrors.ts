import type { LoginForm } from "@/types/AuthForm"
import type { AuthError } from "@supabase/supabase-js"

type FormErrors<Type> ={
    [Property in keyof Type]: string[]
}
export const useFormErrors=()=>{
    const serverError = ref('')
    const realtimeError = ref<FormErrors<LoginForm>>()

    const handleServerError = (error:AuthError)=>{
        serverError.value =
        error.message === 'Invalid login credentials' 
        ? 'Incorrect email or password' 
        : error.message
    }

    const handleLoginForm =async (formData:LoginForm) =>{
        realtimeError.value={
            email:[],
            password:[]
        }

        const {validateEmail,validedPassword} = await import('@/utils/formValidation')

        const emailErrors = validateEmail(formData.email)
        if(emailErrors.length)realtimeError.value.email=emailErrors

        const passwordErrors = validedPassword(formData.password)   
        if(passwordErrors.length)realtimeError.value.password=passwordErrors
    }
    return{
serverError,
handleServerError,
realtimeError,
handleLoginForm

    }
}