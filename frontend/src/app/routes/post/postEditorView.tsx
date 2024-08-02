import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentLayout } from '../../../components/layouts';
import { PostView, PostEditor } from '../../../features/posts/components';
import { GetPostByID } from '../../../features/posts/api/get-posts';
import { Post } from '../../../features/posts/types';
import { UpdatePost } from '../../../features/posts/api/update-post';
import { CreatePost } from '../../../features/posts/api/create-post';
import { useAuth } from '@clerk/clerk-react';

export const PostEditorView: React.FC = () => {
  const { getToken } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: 'new post',
    content: '',
  });

  const submitPostData = async () => {
    try {
      let retPost: Post | undefined;
      let token = await getToken();
      if (postId && token) {
        retPost = await UpdatePost(token, post);
      } else {
        retPost = await CreatePost(token, post);
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
        const postData = await GetPostByID(postId);
        setPost(postData);
      }
    };
    fetchData();
  }, []);

  return (
    <ContentLayout>
      <input
        className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
        type="button"
        value={'Save Post'}
        onClick={() => {
          submitPostData();
        }}
      />
      <div className="flex">
        <div className="flex-auto w-64 p-10">
          <PostView post={post} />
        </div>
        <div className="flex-auto w-64 p-10">
          <PostEditor post={post} updatePost={setPost} />
        </div>
      </div>
    </ContentLayout>
  );
};
