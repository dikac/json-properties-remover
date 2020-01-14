#!/usr/bin/env node
'use strict';

const Fs = require('fs-extra');

// Arguments
const commander = require('commander');
const program = new commander.Command();

program.storeOptionsAsProperties(false);

program
    .command('location', 'package.json location')
    .parse(process.argv);


program.args = program.args.map(argument=>{

    if(['/','\\'].includes(argument)) {

        return '';
    }

    return argument;
});

let [location] = program.args;

if(!['/','\\'].includes(location[0])) {

    location = '/' + location;
}


const root = process.env.INIT_CWD;

let object = Fs.readJsonSync(root + location);
delete object.private;
Fs.writeJsonSync(root + location, object);