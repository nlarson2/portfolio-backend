export interface CreatePostInput {
  content: string;
}

export const CreatePost = async ({ content }: CreatePostInput) => {
  return await fetch('http://127.0.0.1:44444/posts/new-post', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: content }),
  });
};
