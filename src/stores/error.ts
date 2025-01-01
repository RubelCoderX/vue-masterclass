import type { CustomError, ExtenedPostgrestError } from "@/types/Error"
import type { PostgrestError } from "@supabase/supabase-js"
import { acceptHMRUpdate } from "pinia"

export const useErrorStore = defineStore('error-store',() =>{
    const activeError = ref<null | CustomError| ExtenedPostgrestError>(null)
    const isCustomeError = ref(false)
    const setError = ({error,customCode}:{error:string|PostgrestError|Error,customCode:number})=>{

        if(typeof error === 'string' ) isCustomeError.value=true
        if(typeof error === 'string' || error instanceof Error){
            activeError.value =  typeof error === 'string' ?Error(error):error
        activeError.value.customCode = customCode || 500
        return
        }

        activeError.value = error
        activeError.value.statusCode = customCode || 500
    }
    const clearError = () =>{
        activeError.value = null
        isCustomeError.value = false

    }
    return{
        activeError,
        setError,
        isCustomeError,
        clearError
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
  }