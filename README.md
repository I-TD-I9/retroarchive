# RetroArchive

A full-stack web app for tracking retro games. Sign in with Google, search the RAWG database, and build a personal list of games with ratings and notes

**Deployed app:** [https://retroarchive.onrender.com](https://retroarchive.onrender.com)

## Getting Started

1. Clone the repository and navigate to the project directory. Add environment variables for the backend and frontend:
    - Create a `.env` file in the `express-backend` directory with the following content:
      ```
      DATABASE_URL='YOUR_DATABASE_URL_HERE'
      CLIENT_BASE_URL='http://localhost:5173'
      clientID='client-id-from-google-console'
      clientSecret='client-secret-from-google-console'
      RAWG_API_KEY='your-rawg-api-key'
      ```
    - Create a `.env` file in the `react-frontend-client` directory with the following content:
      ```
      VITE_API_URL=http://localhost:3000/api
      ```

2. Install dependencies for both the backend and frontend:
    - For the backend:
      ```bash
      cd express-backend
      npm install
      ```
    - For the frontend:
      ```bash
      cd react-frontend-client
      npm install
      ```

3. Start the backend server:
    ```bash
    cd express-backend
    node server.js
    ```

4. In a separate terminal, start the frontend development server:
    ```bash
    cd react-frontend-client
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Reflection

### Design Choices

I used React with Vite for the fast dev loop and component-driven UI. The backend follows a route → controller → model split so only the model touches Postgres or external APIs. Data lives in Postgres on Neon across two tables, `users` and `archive`, with a composite `UNIQUE (user_id, game_id)` constraint keeping each user's list duplicate-free.

### Challenges

Getting the app to work on Render was by far the hardest part. The deployment had a chain of issues. OAuth failing over the proxy's HTTP forwarding, post-login redirects pointing back to localhost, and missing env vars...

### Learning Outcomes

I learned how an OAuth flow moves through a system end-to-end and why server-side secrets must stay out of the client bundle.

### Future Work

With more time I'd add pagination and server-side caching of RAWG responses, sort and filter options on My List, public profile pages for sharing lists, and a hardened production session config.
