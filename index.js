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

const [location] = program.args;

const root = process.env.INIT_CWD;

console.log(location);
console.log(root);
