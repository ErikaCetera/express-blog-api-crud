const postsList = require('../data');

const index = (req, res) => {
  const tags = []; 

  for (let i = 0; i < postsList.length; i++) {
    const postTags = postsList[i].tags; // 
    for (let j = 0; j < postTags.length; j++) {
      const curTag = postTags[j];
      if (!tags.includes(curTag)) {
        tags.push(curTag);
      }
    }
  }

  res.json({
    tags,
    totale: tags.length
  });
};

module.exports = {
  index
}