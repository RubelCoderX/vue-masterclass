<script setup lang="ts">
usePageStore().pageData.title = 'Home Page'
</script>
<template>
  <div class="">
    <h1>Home Page</h1>
    <!-- <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to Projects 1</RouterLink> -->
  </div>
</template>

<style scoped></style>
