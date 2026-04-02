# Economy Bot

A simple Discord economy bot using Discord.js v14 and SQLite for persistent user balances.

## Features

- `/bal` — View your current coin balance
- `/work` — Earn a random amount of coins
- `/ping` — Verify the bot is responsive
- `/server` — Show server name and member count
- `/user` — Show information about the user who ran the command

## Project Structure

- `index.js` — Main bot entry point
- `deploy-commands.js` — Registers slash commands with a guild
- `config.json` — Stores the bot token, client ID, and guild ID
- `database.js` — SQLite database setup and prepared statements
- `commands/` — Command modules grouped by category
  - `economy/` — Economy-related slash commands
  - `utility/` — General utility slash commands

## Requirements

- Node.js 18+ (or compatible version for Discord.js v14)
- npm
- A Discord application with a bot token
- `GUILD_ID` for testing in a server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daza/personal/economyBot.git
   cd economyBot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `config.json`:

   ```json
   {
     "token": "YOUR_BOT_TOKEN",
     "clientId": "YOUR_CLIENT_ID",
     "guildId": "YOUR_GUILD_ID"
   }
   ```

   > Do not commit your bot token or sensitive configuration to version control.

## Register Slash Commands

Before running the bot, deploy the slash commands to your guild:

```bash
node deploy-commands.js
```

If the command registration succeeds, you will see a message like:

- `Started refreshing X application (/) commands.`
- `Successfully reloaded X application (/) commands.`

## Run the Bot

Start the bot with:

```bash
node index.js
```

You should see:

```text
Ready! Logged in as <bot username>
```

## Commands

### Economy

- `/bal` — Shows the user's balance from the SQLite database
- `/work` — Adds a random amount of coins (200–1000) to the user's balance and displays the updated total

### Utility

- `/ping` — Replies with `Pong!`
- `/server` — Replies with server name and member count
- `/user` — Replies with the invoking user's username and join date.

### Moderation

- `/ban` — Bans a specified user from the server (requires appropriate permissions)

## Database

The bot uses `better-sqlite3` and stores data in `bot.db`.

- `users` table fields:
  - `id` — Discord user ID
  - `username` — Discord username
  - `coins` — User balance
  - `created_at` — Timestamp when the user was added

## Notes

- Commands are automatically loaded from the `commands/` folder.
- New commands should export `data` and `execute` properties.
- `database.js` prepares reusable statements for performance.

## License

ISC
