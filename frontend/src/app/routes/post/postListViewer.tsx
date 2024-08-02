import React, { useEffect, useState } from 'react';
import { SignedIn } from '@clerk/clerk-react';

import { Post } from '../../../features/posts/types';
import { GetPostList } from '../../../features/posts/api/get-posts';
import { PostLink } from '../../../features/posts/components';
import { ContentLayout } from '../../../components/layouts';
import { useNavigate } from 'react-router-dom';

export const PostListViewer: React.FC = () => {
  const [posts, updatePosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const postList = await GetPostList();
      updatePosts(postList);
    };
    fetchData();
  }, []);

  return (
    <ContentLayout>
      <>
        <SignedIn>
          <input
            className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
            type="button"
            value={'Create Post'}
            onClick={() => {
              navigate('/post/create');
            }}
          />
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
