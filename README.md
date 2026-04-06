# Economy Bot

A feature-rich Discord economy bot built with **Discord.js v14** and **SQLite** for persistent user data management. Includes economy systems, RPG shopping mechanics, and moderation tools.

## 🎯 Features

### Economy System
- **`/bal`** — View your current coin balance
- **`/work`** — Earn coins (10-100) on a cooldown period
- **`/transfer`** — Send coins to other users
- **`/leaderboard`** — View the top richest users

### RPG & Shop System
- **`/shop`** — Browse available items in the shop
- **`/buy`** — Purchase items from the shop
- **`/inventory`** — Check your owned items

### Moderation Tools
- **`/ban`** — Ban a member from the server with optional reason
- **`/kick`** — Remove a member from the server
- **`/addItems`** — Add items to the shop (admin only)

### Utility Commands
- **`/ping`** — Check bot connectivity and latency
- **`/server`** — Display server information (name, member count)
- **`/user`** — View user profile information (username, join date)

## 📁 Project Structure

```
economyBot/
├── index.js                    # Main bot entry point & command handler
├── deploy-commands.js          # Slash command registration script
├── database.js                 # SQLite database setup & queries
├── config.json                 # Bot configuration (token, IDs)
├── package.json                # Project dependencies
├── discloud.config             # Deployment configuration
├── README.md                   # This file
├── todo.md                     # Development roadmap
│
├── commands/
│   ├── economy/                # Economy system commands
│   │   ├── bal.js             # Balance display
│   │   ├── work.js            # Earn coins
│   │   ├── transfer.js        # Send coins to users
│   │   └── leaderboard.js     # Top users list
│   │
│   ├── rpg/                    # RPG & shop commands
│   │   ├── shop.js            # View shop items
│   │   ├── buy.js             # Purchase items
│   │   └── inventory.js       # View owned items
│   │
│   ├── moderation/             # Moderation commands
│   │   ├── ban.js             # Ban users
│   │   ├── kick.js            # Kick users
│   │   └── addItems.js        # Add shop items
│   │
│   └── utility/                # General utility commands
│       ├── ping.js            # Bot latency check
│       ├── server.js          # Server information
│       └── user.js            # User information
```

## 📋 Requirements

- **Node.js** 18+ (required for Discord.js v14)
- **npm** or npm-compatible package manager
- A Discord application with bot token
- Server ID (Guild ID) for development testing
- Basic understanding of Discord bot configuration

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/daza/personal/economyBot.git
cd economyBot
npm install
```

### 2. Configure the Bot

Edit `config.json` with your bot credentials:

```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "clientId": "YOUR_CLIENT_ID_HERE",
  "guildId": "YOUR_GUILD_ID_HERE"
}
```

> **⚠️ Security:** Never commit `config.json` with your bot token to version control. Add it to `.gitignore`.

### 3. Register Slash Commands

Deploy commands to Discord before running the bot:

```bash
node deploy-commands.js
```

**Expected output:**
```
Started refreshing X application (/) commands.
Successfully reloaded X application (/) commands.
```

### 4. Start the Bot

```bash
node index.js
```

**Expected output:**
```
Ready! Logged in as YourBotUsername#0000
```

## 💻 Command Reference

### Economy Commands

| Command | Description | Cooldown |
|---------|-------------|----------|
| `/bal` | Display your current coin balance | None |
| `/work` | Earn coins (10-100 range) | 30 minutes |
| `/transfer <user> <amount>` | Send coins to another user | None |
| `/leaderboard` | View top 10 richest users | None |

### RPG & Shop Commands

| Command | Description | Cooldown |
|---------|-------------|----------|
| `/shop` | Browse available items | None |
| `/buy` | Purchase an item from the shop | None |
| `/inventory` | Check your owned items | None |

### Moderation Commands

| Command | Description | Requirement |
|---------|-------------|-------------|
| `/ban <user> [reason]` | Ban a user from the server | Ban Members permission |
| `/kick <user> [reason]` | Kick a user from the server | Kick Members permission |
| `/addItems` | Add items to the shop | Admin permission |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check bot responsiveness and latency |
| `/server` | Display server information |
| `/user` | Show your profile information |

## 📊 Database

The bot uses **SQLite** (via `better-sqlite3`) with the following structure:

### Users Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | TEXT | Discord user ID (primary key) |
| `username` | TEXT | Discord username |
| `coins` | INTEGER | Current coin balance |
| `created_at` | TIMESTAMP | Account creation timestamp |

### Features
- Persistent user data across bot restarts
- Fast query performance with prepared statements
- Transaction support for safe money transfers
- Inventory tracking for RPG items

## 🔧 Architecture

### Command Handler
- Commands are automatically discovered from the `commands/` directory
- Each command exports `data` (slash command definition) and `execute` (handler function)
- Supports cooldown management for rate limiting
- Middleware for permission validation

### Database Layer
- Centralized database operations in `database.js`
- Prepared statements for all queries
- Connection pooling via `better-sqlite3`
- Type-safe parameter binding

### Discord Integration
- Discord.js v14 with Slash Commands API
- Guild-scoped command registration via `deploy-commands.js`
- Interaction handling with error tracking
- User permission validation for moderation commands

## 📦 Dependencies

- **discord.js** (^14.26.0) — Discord bot framework
- **better-sqlite3** (^12.8.0) — SQLite database driver

See `package.json` for full dependency information.

## 🛠 Development

### Adding a New Command

1. Create a new file in the appropriate `commands/<category>/` folder:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5, // Optional: cooldown in seconds
    data: new SlashCommandBuilder()
        .setName('yourcommand')
        .setDescription('Command description'),
    async execute(interaction) {
        await interaction.reply('Command executed!');
    }
};
```

2. Register commands:
```bash
node deploy-commands.js
```

3. Restart the bot

### Code Style
- Use async/await for Discord interactions
- Validate all user inputs
- Handle errors gracefully with user feedback
- Keep command logic modular and testable

## 📝 License

ISC License — See `package.json` for details

## 👤 Author

**daza** — [GitHub](https://github.com/daza)

---

**Happy bot development!** 🎉 For updates and roadmap, check [todo.md](todo.md).
