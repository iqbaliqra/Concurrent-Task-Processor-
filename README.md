# Concurrent Task Processor

This Node.js project processes an array of asynchronous tasks **concurrently**, with a **dynamic concurrency limit** that adjusts based on time or conditions.

## 🚀 Features

- Dynamically adjusts how many tasks run at once (concurrency).
- Logs the number of concurrent tasks running.
- Returns task results **in order**, even though they finish at different times.
- Stops all tasks if one fails (no retry mechanism yet).

## 📁 File Overview

- `task.js`: Main file that defines and runs the concurrent task processor.
- `processTasksWithDynamicConcurrency`: The core async function handling the task queue.

## 🛠️ Technologies Used

- Node.js (ES6+)
- JavaScript Promises
- `console.log` for live logging

## 📦 How to Run

1. Make sure you have **Node.js installed**.
2. Clone this project or extract the `.rar` archive.
3. In your terminal:

```bash
node task.js
