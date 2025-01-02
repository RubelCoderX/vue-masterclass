<script setup lang="ts">
import { useProjectsStore } from '@/stores/loaders/project'
import { usePageStore } from '@/stores/page'

import { columns } from '@/utils/tableColumn/projectColumn'

usePageStore().pageData.title = 'Projects'
const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProject } = projectsLoader

await getProject()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
