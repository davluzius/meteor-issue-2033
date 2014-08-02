/*

Trying to resolve Meteor Issue 2033 : 
https://github.com/meteor/meteor/issues/2033


I20140801-21:23:22.668(-7)? Exception in defer callback: Error: failed to copy newResults into _published!
I20140801-21:23:22.731(-7)?     at Error (<anonymous>)
I20140801-21:23:22.731(-7)?     at _.extend._publishNewResults (packages/mongo-livedata/oplog_observe_driver.js:785)
I20140801-21:23:22.731(-7)?     at _.extend._runQuery (packages/mongo-livedata/oplog_observe_driver.js:668)
I20140801-21:23:22.732(-7)?     at _.extend._runInitialQuery (packages/mongo-livedata/oplog_observe_driver.js:583)
I20140801-21:23:22.732(-7)?     at packages/mongo-livedata/oplog_observe_driver.js:164
I20140801-21:23:22.732(-7)?     at packages/mongo-livedata/oplog_observe_driver.js:16
I20140801-21:23:22.732(-7)?     at _.extend.withValue (packages/meteor/dynamics_nodejs.js:56)
I20140801-21:23:22.732(-7)?     at packages/meteor/timers.js:6
I20140801-21:23:22.732(-7)?     at runWithEnvironment (packages/meteor/dynamics_nodejs.js:108)

Notes : 

seems like the issue is : 

mongo $or operation on an expression which is trying to match null array values 



In the issue thread, people were experiencing the issue upon logout with mongo operations using "this.userId",
upon logout those publish functions seem to be invoked, but at the time of logout the "this.userId"  value is null


"ok" below just means the exception was not thrown

*/


MyCollection = new Meteor.Collection("MyCollection");
var myDocument = {
  name : "my document" , 
  items : []
}
//MyCollection.insert( myDocument );


if (Meteor.isClient) {

 Meteor.subscribe("MyCollection");

}



if (Meteor.isServer) {

  Meteor.publish("MyCollection", function () {

    //return MyCollection.find( {}, { "items._id" : 33  } );   // ok
    //return MyCollection.find( {}, { "nonProperty._id" : 33 } );   // ok
    //return MyCollection.find( {}, { "nonProperty._id" : null } );   // ok
    //return MyCollection.find( { $or: [ { name:"myName" } ] } ); // ok
    //return MyCollection.find( { $or: [ { "nonProperty._id" : null } ] } );  // ok 
    //return MyCollection.find( { $or: [ { "emptyItems._id" : null } ] } ); // Exception in defer callback: Error: failed to copy newResults into _published!
    //return MyCollection.find( { $or: [ { name:"myName" }, { "items._id" : null } ] } ); // Exception in defer callback: Error: failed to copy newResults into _published!
    //return MyCollection.find( { $or: [ { name:"myName" }, { "items._id" : 12 } ] } ); // ok
    //return MyCollection.find( { $or: [ { name:"myName" }, { "items._id" : 33 } ] } ); // ok
    
    //return MyCollection.find( { $or: [ { "items._id" : null } ] } ); // Exception in defer callback: Error: failed to copy newResults into _published!
    return MyCollection.find( { $or: [ { "items._id" : undefined } ] } ); // Exception in defer callback: Error: failed to copy newResults into _published!

});



}


