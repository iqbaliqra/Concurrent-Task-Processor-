function RandomTaskList(getConcurrency) {
const taskList = [];
for (let i = 0; i < getConcurrency; i++) {
const task = {
id: i,
name: `Task ${i}`,
duration: Math.floor(Math.random() * 3000) + 1000,
status: "pending",
};
taskList.push(task);
}
return taskList;
}

async function DConcurrency(taskList, getConcurrency) {
let currentIndex = 0;
let activeTasks = 0;
const results = [];

return new Promise((resolveAll, rejectAll) => {
function logConcurrency() {
console.log("Current Concurrency:", activeTasks);
}

function runNext() {
if (currentIndex >= taskList.length && activeTasks === 0) {
resolveAll(results);
return;
}

while (activeTasks < getConcurrency && currentIndex < taskList.length) {
const task = taskList[currentIndex];
const taskId = currentIndex;
currentIndex++;
activeTasks++;
logConcurrency();

try {
new Promise((resolve) => {
setTimeout(() => {
task.status = "done";
console.log(`${task.name} completed in ${task.duration}ms`);
resolve(task);
}, task.duration);
})
.then((result) => {
results[taskId] = result;
})
.catch((err) => {
results[taskId] = { error: err.message };
})
.finally(() => {
activeTasks--;
logConcurrency();
runNext();
});
} catch (error) {
console.error("Unexpected error:", error);
activeTasks--;
runNext();
}
}
}

runNext();
});
}

const getConcurrency = 3;
const taskList = RandomTaskList(10);

DConcurrency(taskList, getConcurrency).then((results) => {
console.log("All tasks completed");
console.log(results);
});
