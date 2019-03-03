const childProcess = require('child_process');
const mongoose = require('mongoose');

const Listing = require('./schema.js');

const itemsPerWorker = process.argv[2] || 5000000;
const itemsPerInsert = process.argv[3] || 1000;
const workers = { ended: 0 };
const workerCount = 2;

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true })
  .then(async () => {
    await Listing.deleteMany({});

    const time = Date.now();

    for (let i = 0; i < workerCount; i++) {
      workers[i] = childProcess.spawn('npm', ['run', 'seed-mongo-spawn', itemsPerWorker * i, itemsPerWorker, itemsPerInsert]);
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
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
