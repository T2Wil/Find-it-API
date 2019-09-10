/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import Search from '../models/Search';

const storage = new Search();

export const getSuggestions = async (req, res) => {
  const searchReq = req.params.q;
  const { latitude } = req.params;
  const { longitude } = req.params;

  const alikeCities = await storage.retrieveMatchingCities(searchReq, latitude, longitude);
  res.status(200).json({
    suggestions: alikeCities,
  });
};
