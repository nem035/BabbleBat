'use strict';
const app = require('express')();

// init
const { join: joinPaths } = require('path');
const appSetup = require(joinPaths(process.cwd(), 'app'))(app);

const port = app.get('port');
const host = app.get('host');

app.listen(port, () => {
    console.log(`BabbleBat is running on port ${port}`);
});