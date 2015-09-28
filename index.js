var seneca = require('seneca')();
var _ = require('lodash');

var dbOptions = {
  host: '127.0.0.1',
  port: 27017
};

seneca.use('mongo-store$test', _.assign(dbOptions, {name: 'test', map:{'test/-/-':'*'}}));
seneca.use('mongo-store$test2', _.assign(dbOptions, {name: 'test2', map:{'test2/-/-':'*'}}));

seneca.ready(function() {
    var person = seneca.make$('test', null, 'person');
    person.name = 'Fred';
    person.age = 17;
    person.save$(function(err, person) {
      if(err) console.error("Error saving person", err);
      else {
        console.log("Person saved", person);
      }
    });

    var person2 = seneca.make('test2', null, 'person');
    person2.name = 'Elizabeth';
    person2.age = 27;
    person2.save$(function(err, person2) {
      if(err) console.error("Error saving person2", err);
      else {
        console.log("Person2 saved", person2);
      }
    });

});
