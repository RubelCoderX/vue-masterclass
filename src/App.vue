<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured((error) => errorStore.setError({ error, customCode: 500 }))

onMounted(async () => {
  useAuthStore().trackAuthChanges()
})
</script>
<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
