import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

import { ContentLayout } from '../../../components/layouts';
import PostAPI from '../../../features/posts/api/post';
import TagAPI from '../../../features/posts/api/tag';
import { PostView, PostEditor } from '../../../features/posts/components';
import { Post, SelectTag, Tag } from '../../../features/posts/types';

export const PostEditorView: React.FC = () => {
  const { getToken } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    title: 'new post',
    content: '',
  });
  const [selectedTags, setSelectedTags] = useState<{
    [key: number]: SelectTag;
  }>({});

  const fetchTags = async () => {
    const tags = await TagAPI.GetList();
    const tagMap: { [key: number]: SelectTag } = {};
    tags.map((tag: Tag) => {
      if (!tag.id) throw 'Error';
      tagMap[tag.id] = { selected: false, tag: tag };
    });

    console.log(post.tags)
    if (post.tags) {
      for (var i = 0; i < post.tags.length; i++) {
        if (!post.tags[i].id) {
          alert(`error occured: ${post.tags[i].id}`);
          continue;
        }
        const key: number = post.tags[i].id as number;
        tagMap[key].selected = true;
      }
    }
    console.log(tagMap);
    setSelectedTags(tagMap);
  };

  const submitPostData = async () => {
    try {
      let retPost: Post | undefined;
      let token = await getToken();
      if (postId && token) {
        retPost = await PostAPI.Update(token, post);
      } else if (token) {
        retPost = await PostAPI.Create(token, post);
      } else {
        throw 'error';
      }

      if (!retPost) {
        alert('Failed to create post');
      } else {
        navigate(`/post/${retPost.uuid}`);
      }
    } catch {}
  };

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await PostAPI.GetByID(postId);
        setPost(postData);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      fetchTags();
    };
    fetchData();
  }, [post]);


  const selected =
    'bg-space-cadet-blue text-platinum px-10 py-5 w-28 border-space-cadet-blue border-2';
  const notSelected =
    'bg-slate-100 text-black px-10 py-5 w-28 border-space-cadet-blue border-2';

  return (
    <ContentLayout>
      <div className="lg:w-3/5 m-auto">
        <input
          className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
          type="button"
          value={'Save Post'}
          onClick={() => {
            submitPostData();
          }}
        />

        <input
          className={(preview ? selected : notSelected) + ' ml-3 rounded-l-lg'}
          type="button"
          value={'Preview'}
          onClick={() => {
            setPreview(true);
          }}
        />
        <input
          className={(!preview ? selected : notSelected) + ' rounded-r-lg'}
          type="button"
          value={'Edit'}
          onClick={() => {
            setPreview(false);
          }}
        />
        {preview ? (
          <PostView post={post} />
        ) : (
          <PostEditor
            post={post}
            updatePost={setPost}
            selectedTags={selectedTags}
            updateSelectedTags={setSelectedTags}
          />
        )}
      </div>
    </ContentLayout>
  );
};
