<script setup lang="ts">
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumn/tasksColumn'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTask = async () => {
  try {
    const { data, error, status } = await tasksWithProjectsQuery
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      tasks.value = data || []
      console.log('Tasks:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}
await getTask()
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>

<style scoped>
/* No additional styles required since TailwindCSS handles it */
</style>
