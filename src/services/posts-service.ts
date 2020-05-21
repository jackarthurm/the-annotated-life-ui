import { IPostSummaryList, IPost } from '../models/models';
import { nonAbortablefetch, HttpMethod } from '../http';
import {
  IPostSummaryResourceList,
  IPostSummaryResource,
} from '../models/resources';
import { uuidString, urlString } from '../models/types';

const url: urlString = 'https://the-annotated-life-api.herokuapp.com/';

export class PostService {
  public static async getPostSummaryList(): Promise<IPostSummaryList> {
    const response: Response = await nonAbortablefetch(
      `${url}posts/`,
      HttpMethod.GET,
      undefined,
      new Headers({ Accept: 'application/json' })
    );

    const postSummariesListResource: IPostSummaryResourceList = await response.json();

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
    const response: Response = await nonAbortablefetch(
      `${url}posts/${objectID}/`,
      HttpMethod.GET,
      undefined,
      new Headers({ Accept: 'application/json' })
    );

    return await response.json();
  }
}
