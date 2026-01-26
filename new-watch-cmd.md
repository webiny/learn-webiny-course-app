Introducing the New Watch Command (Local AWS Lambda Development) (#4185external link)
anchor
Beta Feature
This is a beta feature, and we’re looking for feedback from the community. If you encounter any issues, please let us knowexternal link.

From the early days, in order to perform both backend and frontend development, Webiny users would use the webiny watch command. And while this command works fine when it comes to frontend development (Admin, public website), we’ve come to a conclusion that it’s not the best solution for backend development.

One of the reasons is the fact that, whenever a backend code change is made, the code needs to redeployed to AWS Lambda, which can take anywhere from 5 seconds, up to a minute, and even more. This can be a real productivity killer, especially when you’re working on a feature that requires a lot of backend changes. Another reason is the inability to properly debug the backend code, as the webiny watch command doesn’t provide a way to debug the code running in AWS Lambda.

To address these issues, we’ve been experimenting with a new approach, which we like to call Local AWS Lambda Development, and which we’re introducing in this release as a beta feature.

Essentially, this new feature allows you to run your AWS Lambda code locally, without the need to continuously deploy changes to AWS. This means that, whenever you make a change to your backend code, you can immediately see the results, without the need to wait for the code to be deployed to AWS Lambda. And not only that, you can also debug your code, as the code is running in your local environment.
