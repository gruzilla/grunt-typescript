///<reference path="../typings/typescript.d.ts" />
///<reference path="../typings/node.d.ts" />
///<reference path="../typings/grunt.d.ts" />
///<reference path="../typings/bluebird.d.ts" />
var gts = require("./modules/task");
var Promise = require("bluebird");
var compiler = require("./modules/compiler");
function startup(grunt) {
    grunt.registerMultiTask("typescript", "Compile typescript to javascript.", function () {
        var that = this, done = that.async(), promises = that.files.map(function (gruntFile) {
            var task = new gts.Task(grunt, that.options({}), gruntFile);
            return compiler.execute(task);
        });
        Promise.all(promises).then(function () {
            done();
        }).catch(function () {
            done(false);
        });
    });
}
module.exports = startup;
