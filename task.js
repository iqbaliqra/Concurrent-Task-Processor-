async function processTasksWithDynamicConcurrency(taskList, getConcurrency) {
  const results = [];
  let currentIndex = 0;
  let activeTasks = 0;
  let resolveAll;
  let rejectAll;

  const allDone = new Promise((resolve, reject) => {
    resolveAll = resolve;
    rejectAll = reject;
  });

  function logConcurrency() {
    console.log(`[Concurrency: ${activeTasks}/${getConcurrency()}]`);
  }

  async function processNext() {
    if (currentIndex >= taskList.length && activeTasks === 0) {
      resolveAll();
      return;
    }

    while (activeTasks < getConcurrency() && currentIndex < taskList.length) {
      const taskIndex = currentIndex++;
      const task = taskList[taskIndex];

      activeTasks++;
      logConcurrency();
      try {
        const result = await task();
        results[taskIndex] = result;
      } catch (error) {
        rejectAll(error);
        return;
      } finally {
        activeTasks--;
        logConcurrency();
      }

      processNext();
    }
  }

  processNext();

  await allDone;
  return results;
}

async function init() {
  const numberOfTasks = 20;
  const taskList = [...Array(numberOfTasks)].map((_, i) => {
    const taskName = [...Array(~~(Math.random() * 10 + 3))]
      .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
      .join('');
    
    return async () => {
      console.log(`Starting task ${i}: ${taskName}`);
      await new Promise(resolve => 
        setTimeout(resolve, Math.random() * 2000 + 500)
      );
      console.log(`Finished task ${i}: ${taskName}`);
      return `Result of ${taskName}`;
    };
  });

  function getCurrentConcurrency() {
    const now = new Date();
    const hours = now.getHours();
    return (hours >= 9 && hours < 17) ? 3 : 10;
  }

  console.log('Starting task processing...');
  console.log(`Initial concurrency limit: ${getCurrentConcurrency()}`);
  const results = await processTasksWithDynamicConcurrency(
    taskList,
    getCurrentConcurrency
  );
  console.log('All tasks completed:', results);
}

init().catch(console.error);