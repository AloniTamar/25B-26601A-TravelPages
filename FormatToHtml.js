const { location, intro, conclusion, attractions, rec_id } = $input.first().json;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${location} - Travel Guide</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 960px;
      margin: auto;
      padding: 40px 20px;
    }
    .header {
      background: #333;
      color: white;
      padding: 25px;
      font-size: 24px;
      border-radius: 8px;
      text-align: center;
    }
    .cards {
      display: flex;
      flex-wrap: nowrap;
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 10px;
    }
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      padding: 20px;
      width: 100%;
      max-width: 300px;
      flex: 1 1 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    .card h3 {
      margin: 10px 0 6px;
    }
    .card p {
      font-size: 0.95rem;
      color: #444;
    }
    .card a {
      margin-top: 12px;
      color: #007BFF;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      font-size: 16px;
      text-align: center;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">${intro}</div>
    <div class="cards">
      ${attractions.map(attr => `
        <div class="card">
          <img src="${attr.image_url}" alt="${attr.name}" />
          <h3>${attr.name}</h3>
          <p>${attr.description}</p>
          ${attr.coordinates ? `<a href="https://maps.google.com/?q=${attr.coordinates.lat},${attr.coordinates.lng}" target="_blank">View on Map</a>` : ''}
        </div>
      `).join('')}
    </div>
    <div class="footer">${conclusion}</div>
  </div>
</body>
</html>
`;

return [{ json: { rec_id, html } }];
