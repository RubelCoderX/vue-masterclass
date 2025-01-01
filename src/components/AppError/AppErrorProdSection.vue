<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode: number
  statusCode: number
  isCustomeError: boolean
}>()

const error = ref({
  code: 500,
  msg: 'Ops,Something went wrong',
})

if (props.isCustomeError) {
  error.value.code = props.customCode
  error.value.msg = props.message
}
if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry, We couldn't find this page"
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode }}</h1>
    <p class="error__msg">{{ message }}</p>

    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
