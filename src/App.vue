<template>
  <v-app>
    <v-main class="fill-height">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useMainStore } from './store/main';

const mainStore = useMainStore();
 onMounted(() => {
  mainStore.getPosts();
 });
</script>
