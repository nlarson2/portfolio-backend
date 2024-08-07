import React from 'react';
import { Post, SelectTag } from '../types';

interface PostEditorProps {
  post: Post;
  updatePost: React.Dispatch<React.SetStateAction<Post>>;
  selectedTags: { [key: number]: SelectTag };
  updateSelectedTags: React.Dispatch<
    React.SetStateAction<{ [key: number]: SelectTag }>
  >;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  updatePost,
  selectedTags,
  updateSelectedTags,
}: PostEditorProps) => {
  const updateTags = async (key: number) => {
    //update display
    const newSelectedTags: { [key: number]: SelectTag } = {
      ...selectedTags,
    };
    newSelectedTags[key].selected = !newSelectedTags[key].selected;
    updateSelectedTags(newSelectedTags);

    //update post
    const newPostTags = [];
    for (let key in newSelectedTags) {
      if (newSelectedTags[key].selected)
        newPostTags.push(newSelectedTags[key].tag);
    }
    updatePost({ ...post, tags: newPostTags });
    console.log(newPostTags);
  };

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

      {selectedTags && (
        <div className="flex">
          {Object.entries(selectedTags).map(([key, value]) => {
            return (
              <p className="m-2">
                {value.tag.name}:
                <input
                  type="checkbox"
                  checked={value.selected}
                  onChange={() => {
                    updateTags(key as number);
                  }}
                />
              </p>
            );
          })}
        </div>
      )}
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
