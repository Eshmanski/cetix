export type Post = {
  id: string;
  name: string;

  isNew?: boolean;
}

export type MainState = {
  posts: Post[];
  isLoading: boolean;
}

export type PostResponse = {
  posts: Post[];
}
