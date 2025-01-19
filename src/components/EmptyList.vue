<template>
  <div
    :style="{ height }"
    class="d-flex align-center justify-center w-100"
  >
    <div>Список пуст</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  height: {
    type: Number,
    default: () => 0,
  }
});
</script>
