import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../../../components/templates';
import { Post } from '../../../features/posts/types';
import { GetPostList } from '../../../features/posts/api/get-posts';
import { PostLink } from '../../../features/posts/components';
import { ContentLayout } from '../../../components/layouts';

export const PostListViewer: React.FC = () => {
  const [posts, updatePosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const postList = await GetPostList();
      updatePosts(postList);
    };
    fetchData();
  }, []);

  return (
    <ContentLayout>
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
    </ContentLayout>
  );
};
