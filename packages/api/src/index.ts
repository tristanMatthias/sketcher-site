import API from '@tmatthias/boilerplate-api';
// import pm2 from 'pm2';
// import path from 'path';


API.server({
  skipDatabase: true
});


// import express from 'express';
// const app = express();
// app.use((_req, res) => res.send('fuck you'));
// app.listen(process.env.PORT || 9999);


// pm2.start({
//   script: path.resolve(__dirname, '../../extractor/server.py'),
//   interpreter: 'python3'
// }, e => {
//   if (e) throw e;
// });


// process.stdin.resume(); // so the program will not close instantly

// function exitHandler(options: any, exitCode: any) {
//   if (options.cleanup) pm2.stop(pid, () curl> { });
//   if (exitCode || exitCode === 0) console.log(exitCode);
//   if (options.exit) process.exit();
// }

// // do something when app is closing
// process.on('exit', exitHandler.bind(null, { cleanup: true }));

// // catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
// process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// // catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
