<template>
  <div :class="$style['post-card']" class="pa-2">
    <v-card
      :subtitle="`ID: ${ post.id }`"
      :color="isSelected ? 'indigo' : 'white'"
      :variant="isSelected ? 'flat' : 'tonal'"
      class="cursor-pointer"
      @click="select"
    >
      <template #title>
        <div
          :class="$style['title-size']"
          class="d-flex align-center"
        >
          <div class="flex-fill">
            Post
          </div>

          <div v-if="isSelected && !isEdit">
            <v-btn
              density="comfortable"
              icon="mdi-pencil"
              size="small"
              class="ma-1"
              @click.stop="isEdit = true"
            />

            <v-btn
              density="comfortable"
              icon="mdi-delete"
              size="small"
              class="ma-1"
              @click.stop="remove"
            />
          </div>

          <div v-else-if="isSelected && isEdit">
            <v-btn
              density="comfortable"
              icon="mdi-content-save"
              size="small"
              class="ma-1"
              @click.stop="save"
            />

            <v-btn
              density="comfortable"
              icon="mdi-close"
              size="small"
              class="ma-1"
              @click.stop="cancel"
            />
          </div>
        </div>
      </template>

      <template #text>
        <div v-if="!isEdit">
          {{ post.name }}
        </div>

        <div v-else>
          <textarea
            v-model="editablePost.name"
            :class="$style['input']"
            @click.stop=""
          />
        </div>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/type';
import { computed, onUpdated, ref, watch, type PropType, type Ref } from 'vue';

const emit = defineEmits([ 'update', 'remove', 'select' ]);

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },

  selected: {
    type: Object as PropType<Post | null>,
    default: () => null,
  }
});

const editablePost: Ref<Post> = ref({ ...props.post })
const isEdit: Ref<boolean> = ref(props.post.isNew ? true : false);

const isSelected = computed(() => {
  return props.selected && props.selected.id === props.post.id;
});

function save() {
  emit('update', editablePost.value);
  isEdit.value = false;
}

function remove() {
  emit('remove', props.post);
}

function cancel() {
  if (props.post.isNew) remove();
  else isEdit.value = false;
}

function select() {
  if (isSelected.value && !isEdit.value) {
    emit('select', null);
  } else emit('select', props.post);
}

watch(isEdit, isEdit => {
  if (isEdit) editablePost.value = { id: props.post.id, name: props.post.name };
});

watch(isSelected, (newV, oldV) => {
  if (!newV && oldV) isEdit.value = false;
});

onUpdated(() => {
  if (props.post.isNew) {
    editablePost.value = { id: props.post.id, name: props.post.name };
    isEdit.value = true;
    select();
  }
});
</script>

<style lang="scss" module>
.post-card {
  &:global(.v-card):hover {
    background-color: #3e3d43;
  }
}

.title-size {
  height: 30px;
}

.input {
  border: none;
  outline: none;
  width: 100%;
  background-color: white;
  color: black;
  padding: 2px;
}
</style>
