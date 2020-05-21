import { IPostSummaryList, IPost } from '../models/models';
import { nonAbortablefetch, HttpMethod } from '../http';
import {
  IPostSummaryResourceList,
  IPostSummaryResource,
  IPostResource,
} from '../models/resources';
import { uuidString } from '../models/types';

import postFixtures from '../data/post-summary-fixtures.json';

export class PostService {
  public static async getPostSummaryList(): Promise<IPostSummaryList> {
    const response: Response = await nonAbortablefetch(
      'https://the-annotated-life-api.herokuapp.com/posts/',
      HttpMethod.GET,
      undefined,
      new Headers({ Accept: 'application/json' })
    );

    const postSummariesListResource: IPostSummaryResourceList = postFixtures as IPostSummaryResourceList;

    return {
      posts: postSummariesListResource.posts.map(
        (postResource: IPostSummaryResource) => {
          return {
            uuid: postResource.object_id,
            title: postResource.title_text,
            body: postResource.summary_text,
            pubDate: postResource.date_published,
            footer: postResource.footer_text,
          };
        }
      ),
    };
  }

  public static async getPostDetail(objectID: uuidString): Promise<IPost> {
    // const response: Response = await nonAbortablefetch(
    //   `https://the-annotated-life-api.herokuapp.com/posts/${objectID}/`,
    //   HttpMethod.GET,
    //   undefined,
    //   new Headers({ Accept: 'application/json' })
    // );

    const postResource: IPostResource = {
      object_id: '16fd2706-8baf-433b-82eb-8c7fada847da',
      object_url: '16fd2706-8baf-433b-82eb-8c7fada847da',
      title_text: 'Post number one',
      date_published: '2020-05-07',
      date_written: '2020-05-07',
      body_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      footer_text: "I'm a footer",
      author_url: 'https://author.com',
      author_id: '16fd2706-8baf-433b-82eb-8c7fada847da',
      tags: ['tag1', 'tag2'],
      references: [],
      summary_text: '',
    };

    return {
      uuid: postResource.object_id,
      title: postResource.title_text,
      body: postResource.body_text,
      pubDate: postResource.date_published,
      footer: postResource.footer_text,
    };
  }
}
