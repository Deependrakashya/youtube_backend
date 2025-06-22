export const DB_NAME = "youtube";
export const homeMessage = ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to My REST API</title>
      <style>
        body {
          background: #0f172a;
          color: #f8fafc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          color: #38bdf8;
        }
        h5 {
          font-weight: 400;
          font-size: 1.2rem;
          color: #e2e8f0;
        }
        a {
          color: #22d3ee;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
        .card {
          background: #1e293b;
          padding: 20px;
          margin: 30px auto;
          border-radius: 12px;
          max-width: 600px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hey There 👋🏻 !!</h1>
        <h5>Welcome to my first REST API Project</h5>
        <p>This project is built using <strong>Node.js</strong> and <strong>Express.js</strong>. You can test the available user routes using Postman.</p>
        <p>
          👉 Download the ready-to-import Postman collection:
          <br/><br/>
          <a href="/youtube_backend.postman_collection.json" download>
            📥 Download Postman Collection
          </a>
        </p>
        <p style="margin-top: 30px;">
          Try hitting endpoints like:
          <br/>
          <code>GET /api/v1/users</code> or <code>POST /api/v1/users</code>
        </p>
      </div>
    </body>
    </html>`;
