const childProcess = require('child_process');

const itemsPerWorker = process.argv[2] || 2500000;
const itemsPerInsert = process.argv[3] || 1000;
const workers = { ended: 0 };
const workerCount = 4;

const time = Date.now();

for (let i = 0; i < workerCount; i++) {
  workers[i] = childProcess.spawn('npm', ['run', 'seed-mysql-spawn', itemsPerWorker * i, itemsPerWorker, itemsPerInsert]);
  console.log(`worker${i} spawned`);
}

workers[0].on('close', code => {
  console.log(`worker0 process exited with code ${code}`);
  workers.ended++

  if (workers.ended === workerCount) {
    console.log((Date.now() - time) / 1000 + 's');
    process.exit();
  }
});

workers[1].on('close', code => {
  console.log(`worker1 process exited with code ${code}`);
  workers.ended++

  if (workers.ended === workerCount) {
    console.log((Date.now() - time) / 1000 + 's');
    process.exit();
  }
});

workers[2].on('close', code => {
  console.log(`worker2 process exited with code ${code}`);
  workers.ended++

  if (workers.ended === workerCount) {
    console.log((Date.now() - time) / 1000 + 's');
    process.exit();
  }
});

workers[3].on('close', code => {
  console.log(`worker3 process exited with code ${code}`);
  workers.ended++

  if (workers.ended === workerCount) {
    console.log((Date.now() - time) / 1000 + 's');
    process.exit();
  }
});
