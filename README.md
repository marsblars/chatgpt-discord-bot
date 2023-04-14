# DiscordGPT - Dockerized Chatbot for Discord

DiscordGPT is a chatbot built using OpenAI's GPT-3.5 architecture that is designed to interact with users on Discord. This repository contains the Dockerfile and necessary files to run the bot inside a Docker container.

## Prerequisites

To use DiscordGPT, you need to have:

- A Discord account and server where you have permission to add bots
- An OpenAI API key for GPT-3.5 with a non-zero balance
- Docker installed on your system
### Creating Discord Bot
To make a Discord bot and add it to your server, you can follow these steps:

1. Create a Discord account or log in to your existing account.

2. Go to the Discord Developer Portal website and create a new application by clicking on the `New Application` button.

3. Give your application a name and click on the `Create` button.

4. Go to the `Bot` section and click on the `Add Bot` button to create a new bot.

5. Customize the bot's display name and profile picture if you want.

6. Click on the `Copy` button under the `TOKEN` section to copy the bot's token. Keep this token secret and do not share it with anyone.

7. Add your bot to your Discord server by going to the `OAuth2` section of your bot's application page and selecting the `bot` scope. Then, choose the permissions you want to give your bot and copy the generated URL.
   * only permision to send messages is necessary
8. Open the generated URL in a web browser and select the server where you want to add your bot. Click on the `Authorize` button to add the bot to your server.









## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/marsblars/discordgpt.git
   ```
2. Navigate to the cloned repository:
   ```bash
   cd discordgpt
   ```
3. Rename the .env-examle.txt to just .env
   ```bash
   mv .env-examle.txt .env
   ```
5. Fill in the required env variables in the .env file
   ```bash
   nano .env
   ```
4. Run the Docker container using Docker Compose:
   ```bash
   docker compose up -d
   ```
   
##Contributing
If you find any bugs or issues with the bot, feel free to open an issue in this repository. Pull requests are also welcome.

##License
This project is licensed under the MIT License
