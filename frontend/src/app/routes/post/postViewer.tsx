import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentLayout } from '../../../components/layouts';
import { PostView } from '../../../features/posts/components';
import PostAPI from '../../../features/posts/api/post';
import { Post } from '../../../features/posts/types';
import { DiscussionEmbed } from 'disqus-react';
import { SignedIn, useUser } from '@clerk/clerk-react';

export const PostViewer: React.FC = () => {
  const { user } = useUser();
  const role: string | undefined = user?.publicMetadata.role as string;
  const isAdmin = role === 'admin';
  const navigate = useNavigate();

  const { postId } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await PostAPI.GetByID(postId);
        setPost(postData);
      }
    };
    fetchData();
  }, []);
  return (
    <ContentLayout>
      <div className="lg:w-3/5 m-auto">
        {post && (
          <>
            <SignedIn>
              {isAdmin && (
                <input
                  className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
                  type="button"
                  value={'Update Post'}
                  onClick={() => {
                    navigate(`/post/update/${post.uuid}`);
                  }}
                />
              )}
            </SignedIn>
            <PostView post={post} />
            <DiscussionEmbed
              shortname="staging-15"
              config={{
                url: `http://statign-15.disqus.com/post/${postId}`,
                identifier: postId,
                title: post?.title,
              }}
            />
          </>
        )}
      </div>
    </ContentLayout>
  );
};
