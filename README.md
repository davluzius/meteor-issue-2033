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


