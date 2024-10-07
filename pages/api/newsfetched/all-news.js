import axios from 'axios';

const News = {
  defaultProps: {
    country: 'in', 
    pageSize: 12,   
    query: 'agriculture OR farming OR crops AND india',   
  },
};

export default async function handler(req, res) {
  try {
    const { page = 1, pageSize = News.defaultProps.pageSize, country = News.defaultProps.country, query = News.defaultProps.query } = req.query;

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

    const response = await axios.get(url);

    const articles = response.data.articles;
    const totalResults = response.data.totalResults;

    res.status(200).json({
      success: true,
      data: {
        articles,
        totalResults,
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: error.response?.data.message || 'Failed to fetch news',
    });
  }
}
