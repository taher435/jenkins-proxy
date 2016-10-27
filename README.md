## Proxy for triggering Jenkins Build

Currently Bitbucket does not support basic Authorization in webhooks. Because of that it is not possible to trigger a jenkins build when you push a commit to Bitbucket.

To make this proxy works

1. Clone this repo : `git clone `
2. Set up following variables in config.json
   ```
   jenkins_url
   token
   user
   password
   ```

   You can find jenkins_url and token in the job configuration page on jenkins under "Build Trigger" section.
3. Host this proxy on your server with a live domain : `example.com`
4. Go Bitbucket repository and under Settings > Webhooks create a new webhhook using the URL : `http://www.example.com/trigger-build?project=<Your Jenkins Project Key>`    

Thats it! you are done. Now commit something and push your repo and your jenkins build should trigger automatically.