meteor-issue-2033
https://github.com/meteor/meteor/issues/2033
 
seems like the issue is occuring in Publish/Subscribe where : 

mongo $or operation on an expression which is trying to match null array values within an empty array of a collection


steps to replicate : 

1 git clone https://github.com/davluzius/meteor-issue-2033.git

2 cd meteor-issue-2033/

3 meteor

4 open browser navigate to : 
http://localhost:3000



This issue depends on the state of data, so I do one insert there with an empty array inside my collection.  What might throw people off is if the array is not yet a property of the collection, the exception is not thrown.  Also, if the value of the array is almost always ensured to be non-null, e.g. in the case of user data "username", a value that should probably never be null, but in testing and dev, the state of this data could very easily be null.  that's what happened to me, so I wound up resetting my database quite a bit, but didn't really know what the issue was.


