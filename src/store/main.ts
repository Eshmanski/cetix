import { fetchDataCache, saveToLocaleStorage } from "@/models/helpers";
import type { MainState, Post, PostResponse } from "@/type";
import { defineStore } from "pinia";

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    posts: [],
    isLoading: false,
  }),

  actions: {
    setPosts(posts: Post[]) {
      this.posts = posts;
    },

    addPost(post: Post) {
      this.posts.unshift(post);
    },

    updatePost(post: Post) {
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = post;

      this.saveState();
    },

    removePost(post: Post) {
      const posts = this.posts = this.posts.filter(p => p.id !== post.id);
      this.setPosts(posts);

      this.saveState();
    },

    saveState() {
      saveToLocaleStorage<PostResponse>('./test.json', { posts: this.posts });
    },

    async getPosts() {
      try {
        const resp = await fetchDataCache<PostResponse>('./test.json');
        this.setPosts(resp.posts);
      } catch (e) {
        console.error(e);
      } finally {
        console.log('finally')
      }
    }
  }
});
