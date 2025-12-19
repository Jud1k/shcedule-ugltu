#!/bin/bash

APP_NAME="telegram_bot"
LOG_FILE="bot.log"
PID_FILE="bot.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "Bot already started with PID: $PID"
        exit 1
    fi 
    rm "$PID_FILE"
fi 

nohup uv run python -u -m bot.main > "$LOG_FILE" 2>&1 &
BOT_PID=$!

echo $BOT_PID > "$PID_FILE"
echo "Bot started with PID: $BOT_PID"
echo "Logs writing in: $LOG_FILE"