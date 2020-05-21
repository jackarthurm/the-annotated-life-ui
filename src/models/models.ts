import { iso8601DateString, uuidString } from './types';

export interface IPost {
  uuid: uuidString;
  title: string;
  body: string;
  pubDate: iso8601DateString;
  footer: string;
}

export interface IPostSummary extends IPost {
  uuid: uuidString;
  title: string;
  body: string;
  pubDate: iso8601DateString;
}

export interface IPostSummaryList {
  posts: Array<IPostSummary>;
}
