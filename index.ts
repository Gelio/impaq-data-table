/// <reference path="./typings/main.d.ts" />

// Declare require
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

require('angular');

angular.module('app', [])
    .controller('AppCtrl', $scope => {
        $scope.text = "Hi!";
    });
