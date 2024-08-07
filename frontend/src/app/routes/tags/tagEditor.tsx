import React, { useEffect, useRef, useState } from 'react';
import { Tag } from '../../../features/posts/types';
import TagAPI from '../../../features/posts/api/tag';
import { ContentLayout } from '../../../components/layouts';
import { useAuth } from '@clerk/clerk-react';

export const TagEditor: React.FC = () => {
  const { getToken } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const newTagName = useRef<any>();

  const fetchTags = async () => {
    setTags(await TagAPI.GetList());
  };

  const deleteTag = async (tag: Tag) => {
    const token = await getToken();
    if (token) {
      TagAPI.Delete(token, tag);
      const newTags = tags.filter((curTag: Tag) => {
        return tag.name != curTag.name;
      });
      setTags(newTags);
    } else {
      alert('Failed to remove tag');
    }
  };

  const addTag = async (name: string) => {
    const token = await getToken();
    const newTag = { name: name };

    for (var i = 0; i < tags.length; i++) {
      if (tags[i].name === name) {
        alert(`Tag '${name}' already exists`);
        return;
      }
    }

    if (token) {
      await TagAPI.Create(token, newTag);
      fetchTags();
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <ContentLayout>
      <label>New Tag Name: </label>
      <input
        ref={newTagName}
        className="border-2 border-black rounded-lg"
        type="text"
      />
      <input
        className="mx-4 bg-space-cadet-blue px-5 py-2 text-platinum rounded-lg"
        type="button"
        onClick={() => {
          if (newTagName?.current?.value) {
            addTag(newTagName.current.value);
            return;
          }
          alert('Must input valid tagname');
        }}
        value="Add"
      />
      {tags?.length > 0 &&
        tags.map((tag: Tag, index: number) => {
          return (
            <React.Fragment key={index}>
              <p className="my-2">
                <input
                  className="mx-4 bg-red-700 px-5 py-2 text-platinum rounded-lg"
                  type="button"
                  onClick={() => {
                    deleteTag(tag);
                  }}
                  value="Delete"
                />
                {tag.name}
              </p>
            </React.Fragment>
          );
        })}
    </ContentLayout>
  );
};
