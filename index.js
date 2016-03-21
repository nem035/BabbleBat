'use strict';
const app = require('express')();

// init
const { join: joinPaths } = require('path');
const { ioServer } = require(joinPaths(process.cwd(), 'app'))(app);

const port = app.get('port');

ioServer.listen(port, () => {
    console.log(`BabbleBat is listening on ${port}`);
});