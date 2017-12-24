#!/usr/bin/env node

import * as cli from '../lib/cli';
import * as util from '../lib/util';
import {consts} from '../lib/consts';
import {argv} from 'optimist';

var extra = argv._;

if (extra && extra.length) {
	showHelp();
} else {
	if(argv['help']){
		showHelp();
	} else {
		cli.default();
	}
}

function showHelp() {
	var HELP_LOGIN = consts.HELP_LOGIN;
	for (var i = 0; i < HELP_LOGIN.length; i++) {
		util.log(HELP_LOGIN[i]);
	}
}