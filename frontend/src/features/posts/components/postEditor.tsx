import React from 'react';
import { Post } from '../types';

interface PostEditorProps {
  post: Post;
  updatePost: React.Dispatch<React.SetStateAction<Post>>;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  updatePost,
}: PostEditorProps) => {
  return (
    <>
      <p>Title:</p>
      <input
        className="border-2 border-black w-full"
        type="text"
        value={post.title}
        onChange={(e) => {
          updatePost({ ...post, title: e.target.value });
        }}
      />
      <p>Content:</p>
      <textarea
        className="border-2 border-black w-full min-h-36"
        value={post.content}
        onChange={(e) => {
          updatePost({ ...post, content: e.target.value });
        }}
      />
    </>
  );
};
