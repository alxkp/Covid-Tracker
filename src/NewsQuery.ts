import NewsObject from "./NewsObject";

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Array<NewsObject>;
}
