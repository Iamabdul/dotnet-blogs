import { parseStringPromise } from "xml2js";
import { BlogFeedItem, FeedItem, FeedType, YouTubeFeedItem } from "./feed-item";
import { BLOG_FEEDS, YOUTUBE_FEEDS } from "./rss-sources";

export const getContent = () => {
  const getAllContent = async () => {
    const videoContent = await getVideoContent();
    const blogContent = await getBlogContent();
    return [...videoContent, ...blogContent];
  };

  const getVideoContent = async () => {
    const promises = YOUTUBE_FEEDS.map((feed) =>
      fetchAndDisplayRssFeed(feed.url, extractYoutubeFeedItems)
    );
    return (await Promise.all(promises)).flat();
  };

  const getBlogContent = async () => {
    const promises = BLOG_FEEDS.map((feed) =>
      fetchAndDisplayRssFeed(feed.url, extractBlogFeedItems)
    );
    return (await Promise.all(promises)).flat();
  };

  return {
    getAllContent,
    getVideoContent,
    getBlogContent,
  };
};

const fetchFeed = async (url: string) => {
  try {
    const response = await fetch(url, { next: { revalidate: 18000 } });
    return response.text();
  } catch (error) {
    console.error("Error fetching the RSS feed:", error);
    throw new Error("Failed to fetch RSS feed");
  }
};

const parseRssFeed = async (xml: string): Promise<any> => {
  try {
    const result = await parseStringPromise(xml);
    return result;
  } catch (error) {
    console.error("Error parsing the RSS feed:", error);
    throw new Error("Failed to parse RSS feed");
  }
};

const fetchAndDisplayRssFeed = async (
  url: string,
  extractFeedItems: (parsedData: any) => Promise<FeedItem[]>
): Promise<FeedItem[]> => {
  try {
    const xmlData = await fetchFeed(url);
    const parsedData = await parseRssFeed(xmlData);
    const feedItems = await extractFeedItems(parsedData);

    return feedItems;
  } catch (error) {
    console.error("Error during RSS feed processing:", error);
    throw error;
  }
};

const extractBlogFeedItems = async (
  parsedData: any
): Promise<BlogFeedItem[]> => {
  const items = parsedData.rss.channel[0].item.map(
    (item: any): BlogFeedItem => ({
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      description: item.description[0],
      feedType: FeedType.blog,
    })
  );

  return items;
};

const extractYoutubeFeedItems = async (
  /*
   {
    'media:title': [ 'Tuples in C# are awesome' ],
    'media:content': [ [Object] ],
    'media:thumbnail': [ [Object] ],
    'media:description': [ '' ],
    'media:community': [ [Object] ]
  }
  */
  parsedData: any
): Promise<YouTubeFeedItem[]> => {
  const items = parsedData.feed.entry.map(
    (item: any): YouTubeFeedItem => ({
      title: item.title[0],
      link: item.link[0],
      published: item.published[0],
      description: item['media:group'][0]['media:description'][0],
      thumbnail: item['media:group'][0]['media:thumbnail'][0]['$'].url,
      feedType: FeedType.youtube,
    })
  );

  return items;
};
