const raw = $json.choices?.[0]?.message?.content;

if (!raw) throw new Error("No response from Groq");

// --- Balanced brace extractor ---
function extractBalancedJSON(text) {
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (text[i] === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        return text.slice(start, i + 1);
      }
    }
  }
  return null;
}

const jsonString = extractBalancedJSON(raw);
if (!jsonString) throw new Error("Could not extract JSON from Groq output.");

let parsed;
try {
  parsed = JSON.parse(jsonString);
} catch (e) {
  throw new Error("Groq output is not valid JSON: " + e.message);
}

// Optional record ID
const rec_id = $('Get Pending Requests').first().json['Record ID'];

// Return attractions enriched with metadata
return parsed.attractions.map(attraction => ({
  json: {
    ...attraction,
    city: parsed.location,
    searchQuery: `${attraction.name} ${parsed.location}`,
    rec_id
  }
}));
