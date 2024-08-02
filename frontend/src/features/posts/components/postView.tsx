import React, { ReactElement, useEffect, useState } from 'react';
import { Post } from '../types';
import { SignedIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface PostViewInterface {
  post: Post;
  cantUpdate?: boolean;
}

enum ElementType {
  TEXT,
  BREAK,
  IMAGE,
}

interface Element {
  content?: string;
  type: ElementType;
}

const tagElementType: { [key: string]: ElementType } = {
  b: ElementType.BREAK,
  i: ElementType.IMAGE,
  p: ElementType.TEXT,
};

export const PostView: React.FC<PostViewInterface> = ({
  post,
  cantUpdate,
}: PostViewInterface) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<Element[]>([]);

  const processContent = async () => {
    let newContent = [];
    let contentText = post.content;
    let contentLength = contentText.length;
    let currentText = '';

    let inBracket = false;
    let elementText = '';

    for (var i = 0; i < contentLength; i++) {
      if (!inBracket) {
        if (contentText[i] === '<') {
          inBracket = true;
          if (currentText.length > 0) {
            newContent.push({ content: currentText, type: ElementType.TEXT });
            currentText = '';
          }
          continue;
        }
        currentText += contentText[i];
      } else {
        if (contentText[i] === '>') {
          if (elementText.length <= 0) elementText += 'b';
          const [tagName, content] = elementText.split('|');
          newContent.push({ content: content, type: tagElementType[tagName] });
          inBracket = false;
          elementText = '';
          continue;
        }
        elementText += contentText[i];
      }
    }
    newContent.push({ content: currentText, type: ElementType.TEXT });
    setContent(newContent);
  };

  const getDisplay = (element: Element): React.ReactNode => {
    switch (element.type) {
      case ElementType.TEXT:
        return <p className="break-words text-2xl">&emsp;{element.content}</p>;
      case ElementType.BREAK:
        return <br />;
      case ElementType.IMAGE:
        return (
          <p>
            <img src={element.content} />
          </p>
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    processContent();
  }, [post]);

  return (
    <div className="lg:w-3/5 m-auto">
      {cantUpdate && (
        <SignedIn>
          <input
            className="bg-space-cadet-blue text-platinum px-10 py-5 rounded-lg"
            type="button"
            value={'Update Post'}
            onClick={() => {
              navigate(`/post/update/${post.uuid}`);
            }}
          />
        </SignedIn>
      )}
      <p className="text-4xl font-bold">{post?.title}</p>
      <p>Created: {post?.created_at?.split('T')[0]}</p>

      <div>
        {content.map((element: Element, index: number) => {
          return (
            <React.Fragment key={index}>{getDisplay(element)}</React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
