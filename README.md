# World Cup Sweep

You know what a <a href="https://en.wikipedia.org/wiki/Sweepstakes">Sweeps</a> is. This app has the basic workings for running a sweep, although it misses the most important part, the collecting and distribution of money.

It's a javascript app, built with <a href="https://angularjs.org/">AngularJS</a> framework, with help from <a href="http://getbootstrap.com/">Bootstrap</a> and <a href="http://html5boilerplate.com/">HTML5 Boilerplate</a>. The backend is a MySQL database, and there is some PHP and SQL to glue the thing together.

This is version 1 of the app and I've only implemented the the bare bones required to get a sweep working. I'm not sure I'd even use it myself, with friends. Nevertheless, it was a fun experiment and I learned a lot.

The main difficulty I came across, once I'd figured out enough about Angular to a simple app up and running, was the asynchronous nature of web applications. I kept bumping into 'race condition' type problems while trying to keep the app model in sync with the database. I still don't have a clue how well it would handle multiple users picking teams simultaneously.