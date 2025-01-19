import { fetchDataCache, saveToLocaleStorage } from "@/models/helpers";
import type { MainState, Post, PostResponse } from "@/type";
import { defineStore } from "pinia";

const POSTS_URL = location.origin + '/cetix/test.json'

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
      saveToLocaleStorage<PostResponse>(POSTS_URL, { posts: this.posts });
    },

    async getPosts() {
      try {
        this.isLoading = true;
        const resp = await fetchDataCache<PostResponse>(POSTS_URL);
        this.setPosts(resp.posts);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
