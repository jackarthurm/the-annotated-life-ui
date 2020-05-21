import { urlString, uuidString, iso8601DateString } from './types';

interface IResource {
  object_id: uuidString;
  object_url: urlString;
}

interface IResourceList {}

export interface IAuthor extends IResource {
  name: string;
  media_url: urlString;
  organisation_name: string;
  organisation_url: urlString;
}

export interface IReferenceResource extends IResource {
  description: string;
  post_url: urlString;
  post_id: uuidString;
}

export interface ITagResource extends IResource {
  value: string;
  post_url: urlString;
  post_id: uuidString;
}

export interface IPostSummaryResource extends IResource {
  title_text: string;
  date_published: iso8601DateString;
  date_written: iso8601DateString;
  summary_text: string;
  footer_text: string;
  author_url: urlString;
  author_id: uuidString;
  tags: Array<string>;
}

export interface IPostResource extends IPostSummaryResource {
  body_text: string;
  references: Array<string>;
}

export interface IPostSummaryResourceList extends IResourceList {
  posts: Array<IPostSummaryResource>;
}
