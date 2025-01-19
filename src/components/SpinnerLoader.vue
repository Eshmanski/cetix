<template>
  <div class="d-flex align-center justify-center w-100">
    <div :class="$style['spinner']" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.spinner {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #ffffff #ffffff00;
  animation: l1 1s infinite;
}

@keyframes l1 {to{transform: rotate(.5turn)}}
</style>
