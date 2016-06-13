# Impaq data table #

This is an Angular app that implements a simple data table, that enables users to modify existing content. Data is fetched from the DB (API endpoint).
It also supported deletion of rows and multiple row editing.

There should also be unit tests and database mocks for testing purposes.

This repository is a recruitment task project given by IMPAQ. 

## Installation ##

To install this repository you simply need to execute `npm install`.


## Usage ##

 * `npm run start` - runs webpack on [localhost:8080](http://localhost:8008) with livereload
 * `npm run build` - builds the dist bundle file to be able to run without webpack
 * `npm run test` - runs Karma unit tests specified in \*.spec.ts files
 
## Other information ##

In the specification I didn't see any use for *findAll* and *find* methods on the WebService, so even though they are implemented and should work, are not used.

Data is fetched from *users.json* only at the beginning. Editing and saving is executed properly.

This project includes unit tests, as well as database mock tests with the use of *ngMock* and *$httpBackend* service.


## Author ##

This project was created entirely by [Grzegorz Rozdzialik](http://voreny.bitbucket.org/).