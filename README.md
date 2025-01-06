# OAuth 2.0 Client Dashboard

## Overview

OAuth 2.0 Client Dashboard is a user-friendly portal designed to handle OAuth 2.0 authorization for third-party applications. It allows users to authenticate and authorize access to their resources securely, providing necessary scopes and tokens to external applications.

This client connects with an OAuth 2.0 authorization server to provide smooth and efficient integration with various third-party services, ensuring secure authentication and authorization processes.

## Features

- Secure OAuth 2.0 authentication and authorization flow.
- User interface for managing OAuth consent and scope approvals.
- Ability to manage multiple third-party applications and their access to user data.
- View detailed permissions granted to each connected application.
- Supports token issuance, including access tokens and refresh tokens.

## Installation

### Prerequisites

Ensure you have the following tools installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- A running OAuth 2.0 authorization server

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/IvanZuev1996/oauth-frontend.git
   cd oauth-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables for OAuth server:
   - `OAUTH_SERVER_URL`: The URL of your OAuth 2.0 authorization server.
   - `CLIENT_ID`: The URL of your OAuth 2.0 authorization server.
4. Start the development server::
   ```bash
   npm run dev
   ```
5. Visit the application in your browser at http://localhost:3020
