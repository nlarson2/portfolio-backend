import React, { useEffect, useState } from 'react';
import { SignedIn, useUser } from '@clerk/clerk-react';

import { Post } from '../../../features/posts/types';
import PostAPI from '../../../features/posts/api/post';
import { PostLink } from '../../../features/posts/components';
import { ContentLayout } from '../../../components/layouts';
import { useNavigate } from 'react-router-dom';

export const PostListViewer: React.FC = () => {
  const { user } = useUser();
  const role: string | undefined = user?.publicMetadata.role as string;
  const isAdmin = role === 'admin';

  const [posts, updatePosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const postList = await PostAPI.GetList();
      updatePosts(postList);
    };
    fetchData();
  }, []);

  return (
    <ContentLayout>
      <>
        <SignedIn>
          {isAdmin && (
            <input
              className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
              type="button"
              value={'Create Post'}
              onClick={() => {
                navigate('/post/create');
              }}
            />
          )}
        </SignedIn>
        <div className="">
          {posts?.length > 0 ? (
            posts.map((post: Post, index: number) => {
              return (
                <React.Fragment key={index}>
                  <PostLink post={post} />
                </React.Fragment>
              );
            })
          ) : (
            <p>No Posts Available</p>
          )}
        </div>
      </>
    </ContentLayout>
  );
};
