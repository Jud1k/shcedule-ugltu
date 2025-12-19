#!/bin/bash

APP_NAME="telegram_bot"
PID_FILE="bot.pid"

echo "Stopping bot $APP_NAME..."

if [ ! -f "$PID_FILE" ]; then
    echo "File bot.pid not found. Probably, bot does not started"
    exit 1
fi

PID=$(cat "$PID_FILE")

if ps -p $PID > /dev/null 2>&1; then
    echo "Stoppind process with PID: $PID"
    kill -SIGTERM $PID
    sleep 5

    if ps -p $PID /dev/null 2>&1; then
        echo "Process does not stopped, sending SIGKILL..."
        kill -SIGKILL $PID
    fi
else
    echo "Process with PID: $PID not found"
fi

rm -f "$PID_FILE"
echo "Bot stopped"