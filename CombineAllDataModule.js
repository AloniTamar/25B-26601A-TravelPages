const rec_id = $input.first().json.rec_id
const groqItems = $('Parse Groq').all();
const imageItems = $('Parse Images Paths').all();

const location = groqItems[0]?.json?.city || '';
const intro = `Top travel recommendations for ${location}`;
const conclusion = `Enjoy your time in ${location}!`;

const attractions = groqItems.map((item, index) => {
  return {
    name: item.json.name || '',
    description: item.json.description || '',
    coordinates: item.json.coordinates || null,
    image_url: imageItems[index]?.json?.image_url || ''
  };
});

return [
  {
    json: {
      rec_id,
      location,
      intro,
      attractions,
      conclusion
    }
  }
];
