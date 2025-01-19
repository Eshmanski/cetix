<template>
  <div
    ref="wrapperEl"
    class="py-10 w-50 h-100"
  >
    <div
      class="d-flex align-center w-100"
      :style="{ height: heightTool + 'px' }"
    >
      <v-text-field
        v-model:model-value="search"
        clearable
        hide-details
        density="compact"
        variant="outlined"
        theme="light"
        max-width="300"
        prepend-icon="mdi-magnify"
        @click:clear="search = ''"
      />

      <div class="d-flex align-center justify-end flex-fill">
        <v-btn
          icon="mdi-plus"
          size="small"
          class="ma-1"
          @click.stop="addNew"
        />
      </div>
    </div>

    <spinner-loader
      v-if="mainStore.isLoading"
      :style="{ height: heightList + 'px' }"
    />

    <empty-list
      v-else-if="filteredList.length === 0"
      :style="{ height: heightList + 'px' }"
    />

    <v-virtual-scroll
      v-else
      ref="virtualScroll"
      :height="heightList"
      :items="filteredList"
    >
      <template #default="{ item }">
        <post-card
          :post="item"
          :selected="selected"
          @remove="remove"
          @update="update"
          @select="selected = $event"
        />
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { toRegexp } from '@/models/helpers';
import { useMainStore } from '@/store/main';
import type { Post } from '@/type';
import uniqid from 'uniqid';
import type { VVirtualScroll } from 'vuetify/components/VVirtualScroll';

const mainStore = useMainStore();

const search = ref('');
const heightTool: Ref<number> = ref(50);
const heightList: Ref<number> = ref(0);
const selected: Ref<Post | null> = ref(null);
const virtualScroll: Ref<VVirtualScroll | null> = ref(null)
const wrapperEl: Ref<HTMLDivElement> = ref(document.createElement('div'));

const filteredList = computed(() => {
  if (search.value.length < 3) return mainStore.posts;

  const result: Post[] = [];
  const reg = toRegexp(search.value);

  mainStore.posts.forEach(post => {
    const isMatch = reg.test(post.id) || reg.test(post.name);

    if (isMatch) result.push(post);
  });

  return result;
})

function addNew() {
  search.value = '';
  const id = uniqid();
  const name = '';
  const newPost = { id, name, isNew: true };

  mainStore.addPost(newPost);
  if (virtualScroll.value) virtualScroll.value.scrollToIndex(0);
}

function update(post: Post) {
  mainStore.updatePost(post);
}

function remove(post: Post) {
  if (selected.value?.id === post.id) selected.value = null;
  mainStore.removePost(post);
}

let observer: ResizeObserver | null = null;
onMounted(() => {
  observer = new ResizeObserver(entries => {
    const height = (entries[0].contentRect.height ?? 0) - heightTool.value;

    if (height === heightList.value) return;
    else heightList.value = height;
  });

  observer.observe(wrapperEl.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style lang="scss" module>
.tools {
  height: 30px;
}
</style>
