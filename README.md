meteor-issue-2033
 
 
seems like the issue is : 

mongo $or operation on an expression which is trying to match null or undefined array values within an empty array

steps to replicate : 

1 git clone https://github.com/davluzius/meteor-issue-2033.git
2 cd meteor-issue-2033/
3 meteor

4 open browser navigate to : 
http://localhost:3000

if run again , clear the data : 
5 meteor reset 



