/** Core fields shared by all feeds */
export interface FeedItem {
    title: string;          // <title>
    link: string;           // <link> / href
    description?: string;   // <description> / <media:description>
    thumbnail?: string; 
    feedType: FeedType; 
    published: Date,
    views?: string
  }
  
  /** YouTube <entry> with just the core + published */
  export class YouTubeFeedItem implements FeedItem {
    constructor(
      public title: string,            // <title>
      public link: string,             // <link href="…"/>
      public published: Date,       // <published>
      public feedType: FeedType,  
      public description?: string,     // <media:description>
      public thumbnail?: string, // <media:thumbnail url="…">
      public views?: string
    ) {}
  }
  
  /** Blog <item> with just the core + blog‑specifics */
  export class BlogFeedItem implements FeedItem {
    constructor(
      public title: string,            // <title>
      public link: string,             // <link>
      public published: Date,          // <pubDate>
      public feedType: FeedType,  
      public description?: string,     // <description>
      public thumbnail?: string, // (not typical in blogs, but kept for symmetry)
    ) {}
  }

  export enum FeedType {
    youtube = "youtube",
    blog = "blog"
  }
  