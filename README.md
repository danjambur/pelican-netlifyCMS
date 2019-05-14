# Pelican + netlify CMS

This is the basic Pelican starter site, with netlify CMS integrated.

## Getting Started

Clone this repository to your local machine, then download the relevant release of
the [netlify-git-api](https://github.com/netlify/netlify-git-api/releases) CLI tool.

CD into your new repo, and run:


Then open a new terminal, CD into your new repo and run:

```bash
virtualenv venv
.\venv\scripts\activate.bat
pip install -r requirements.txt
pelican --listen
```

This will run the site as-is.

If you have made changes to the content of the site, you will need to run;

```bash
pelican content
pelican --listen
```

This will regenerate the content based on the changes, and will restart the server.

It is also recommended to make sure to do a `git pull` often, as the set up of the application allows for 3rd-party repo access.
Essentially, when a change is made on the Netlify CMS, it generates new files within the repo directly. This is why you need to pull often.

Now navigate to [localhost:8000](http://localhost:8000/) to preview the site, and
to [localhost:8000/admin](http://localhost:8000/admin) to log into the CMS.

## Deploying to production

To deploy to production, make sure to push this repository to a Github repo you own.

Then go to [netlify](https://app.netlify.com) and start a new project. Pick your
new Github repository.

Fill out the build command and dist folder:

**Build command:** `make publish`
**Folder:** `/dist`

Now go to [the GitHub developer application screen](https://github.com/settings/developers)
and **register new application**.

### Register New application (on GitHub)
- **Application name**  Ex : Netlify CMS  
- **Homepage URL** Ex: https://foobar-1234.netlify.com
- **Authorization callback URL**  https://api.netlify.com/auth/done

Once you've setup the application, go back to netlify, navigate to the **Access** tab. Then
fill in your new Client ID and Client Secret in the Github Authentication Provider and check
the **Enable GitHub** box.

Now anybody with write access to your GitHub repository can log in at yoursite.netlify.com/admin
and use the CMS.

### How does this site work?

NetlifyCMS is used as a cms-as-a-service. It is free and open source to use, and very easy to customise using the `config.yml` you can find within the `/admin` folder.

When an article / page is created within NetlifyCMS, it is pushed to the repo.