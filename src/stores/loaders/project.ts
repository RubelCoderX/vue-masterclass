import type {Projects } from "@/utils/supaQueries"
import  {projectsQuery } from "@/utils/supaQueries"
import { useMemoize } from "@vueuse/core"

export const useProjectsStore = defineStore('project-store',()=>{
    const projects = ref<Projects | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loadProjects = useMemoize(async(key:string) =>await projectsQuery)

    const validateCache = () =>{
      if(projects.value?.length){
        projectsQuery.then(({data}) =>{
            if(JSON.stringify(projects.value) === JSON.stringify(data)){
                console.log('Cached and fresh data matched!')
            }else{
                console.log('Something hans changed!');
                loadProjects.delete('projects')
            }
        })
    }
    }
 
const getProject = async () => {
    
  
   
    const { data, error } = await loadProjects('projects')
    if (error) {
      console.error('Error fetching projects:', error)
    } 
      projects.value = data || []
      validateCache()
   
  
}
return { projects, getProject }
})