<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumn/projectColumn'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProject = async () => {
  try {
    const { data, error } = await projectsQuery
    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      projects.value = data || []
      console.log('Projects:', data)
    }
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}
await getProject()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
