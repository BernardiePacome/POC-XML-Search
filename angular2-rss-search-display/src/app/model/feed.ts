import {FeedEntry} from './feed-entry';

export interface Feed {
    title?: string;
    description?: string;
    publishDate?: Date;
    link?: string;
    items?: FeedEntry[];
}
