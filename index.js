#!/usr/bin/env node
'use strict';

const Fs = require('fs-extra');
const DotProp = require('dot-prop');
// Arguments
const commander = require('commander');
const program = new commander.Command();

program.storeOptionsAsProperties(false);

program
    .command('location', 'package.json location')
    .command('[properties...]', 'properties in dot notation')
    .parse(process.argv);


program.args = program.args.map(argument=>{

    if(['/','\\'].includes(argument)) {

        return '';
    }

    return argument;
});

let [location, ...properties] = program.args;

if(!['/','\\'].includes(location[0])) {

    location = '/' + location;
}

const root = process.env.INIT_CWD;

let object = Fs.readJsonSync(root + location);

for(let propery of properties) {

    DotProp.delete(object, propery);
}
let json = JSON.stringify(object, undefined, 4);
Fs.writeFileSync(root + location, json);