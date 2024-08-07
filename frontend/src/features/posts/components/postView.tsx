import React, { useEffect, useState } from 'react';
import { Post, Tag } from '../types';

interface PostViewInterface {
  post: Post;
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
}: PostViewInterface) => {
  const [content, setContent] = useState<Element[]>([]);
  const tags = post.tags
    ?.map((tag: Tag) => {
      return tag.name;
    })
    .join(', ');

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
        return <p className="break-words text-xl">&emsp;{element.content}</p>;
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
    <>
      <p className="text-7xl font-bold text-center">{post?.title}</p>
      <p className="text-center my-5">
        Created: {post?.created_at?.split('T')[0]}
      </p>
      {tags?.length > 0 && <p className="text-center my-5">Tags: {tags}</p>}
      <div>
        {content.map((element: Element, index: number) => {
          return (
            <React.Fragment key={index}>{getDisplay(element)}</React.Fragment>
          );
        })}
      </div>
    </>
  );
};
