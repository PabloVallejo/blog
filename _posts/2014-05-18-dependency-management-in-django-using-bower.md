In today's web applications it's very common to use libraries and have several dependencies that are used in the front end of our projects. Usually we start by including jQuery and then, we keep adding more and more dependencies as we need. Every time we see more developers following best practices like assets minification and concatenation, often taking advantage of [Django pipeline](https://github.com/cyberdelia/django-pipeline), which makes it easy to have a list of files minified and merged into a single one.

One of the things that isn't quite used in the wild though is versioning front end dependencies in opposition with the way we version backend libraries and frameworks which is usually very specific.

![](http://axiacore.s3.amazonaws.com/inlines/bower-django-jenkins.1403618231.jpg)

Versioning front end dependencies can save us a lot of time in the process of update, keeping track of which of them are outdated and debugging quickly as we easily spot what version of each library we have. [Bower](http://bower.io/) from Twitter is a popular package manager that addresses most of these cases, it helps us to install, update and delete dependencies like **jQuery** and **Bootstrap** in an easy way. On the other hand allows us to have a list of installed packages which can be updated every time we install, update or remove a library.

### The Plan

In this article I want to show you how to use Bower in your Django projects, specifically we'll take a look at how to define the folders structure, how to setup Bower and get started with the basic commands. Also, we will look at how to setup  [Jenkins](http://jenkins-ci.org/) for deployments, and fetch front end packages on build. So, without further adieu, let's get started.

### Folder Structure

For the example project, we've created a simple files structure based on [AxiaCore's Django Project Template](https://github.com/AxiaCore/django-project-template). This template comes with an `app` folder in which we'll have all our assets. The example project can be downloaded from [GitHub](https://github.com/PabloVallejo/django-bower).

![](http://axiacore.s3.amazonaws.com/inlines/folder-structure.1403466092.png)

### Installing [NodeJS](http://nodejs.org/) and [Bower](http://bower.io/)

Install Node JS, from the [website](http://nodejs.org/), then issue this command to have bower globally installed.


{% highlight bash %}
$ npm install bower -g
{% endhighlight %}

The `-g` flag tells Node Package Manager ([NPM](https://www.npmjs.org/)) to install the package globally, so that it's available in all locations, not only in the current project.

### Bower.json

`bower.json` is the file that describe our project, here among other information, we have a list of all the libraries we are using. Everytime we install a new library, we can use pass the option `--save` with the install command and the library will be added to `bower.json`.

{% highlight json %}
{
  "name": "awesomeProject",
  "version": "0.1.0",
  "dependencies": {
    "jquery": "~2.1.1"
  }
}
{% endhighlight %}

### Specifying packages directory with `.bowerrc`

Using `.bowerrc` we can specify the folder in which dependencies are stores, by default all packages are saved in `bower_components`. This is particularly helpful in Django projects, as assets are most of the times not directly stored in the root folder.

{% highlight json %}
{
  "directory": "app/static/bower_components"
}
{% endhighlight %}

With this configuration, components will be saved under `app/static/bower_components` given that in this example we have all our assets in `app/static`, however, the location of the `assets` folder may vary from project to project.

### Using .gitignore

One of the nice things of using Bower is that we don't have to store project dependencies in our repository because these can be installed by each developer with running `bower install` within the project folder. Given that, we want to have git ignoring `bower_components` folder.

{% highlight ruby %}
# ...
# Ignore bower components.
bower_components
# ...
{% endhighlight %}

### Installing new dependencies

Now that we have Bower installed, let's add a couple of libraries to our project.

{% highlight bash %}
$ bower install jquery --save
$ bower install bootstrap --save
{% endhighlight %}

These commands will fetch jQuery and Bootstrap to our `bower_components` folder, we are passing the `--save` option, in order to have these libraries listed in `bower.json` for future use. Having all dependencies saved in `bower.json` is useful as other developers can clone the project and have all dependencies with just issuing `bower install` instead of writing one command per package.

Other useful command is `search` which shows all the packages in the Bower registry that match our query.

{% highlight bash %}
$ bower search underscore
{% endhighlight %}

![](http://axiacore.s3.amazonaws.com/inlines/bower-search.1403326913.png)

In order to use a package from the list, just install it with its name as seen in the search results.

**bower list** is another useful command that show all the packages that we have installed along with their version.

{% highlight bash %}
$ bower list
{% endhighlight %}

![](http://axiacore.s3.amazonaws.com/inlines/bower-list.1403466377.png)

### Including Packages In Project

Now that we have the packages, we can include them in our project.

**Using Django Assets Pipeline**

[Django Pipeline](https://github.com/cyberdelia/django-pipeline) is a nice library for concatenation and compression of assets, with it, we can list of our assets in a configuration file and call them from a template using a single tag. To use the libraries we just installed, go to `settings.py` and add the following lines to include Bootstrap styles and jQuery.

{% highlight python %}
# CSS Files.
PIPELINE_CSS = {
    # Project libraries.
    'libraries': {
        'source_filenames': (
            'bower_components/bootstrap/dist/css/bootstrap.css',
        ),
        # Compress passed libraries and have
        # the output in`css/libs.min.css`.
        'output_filename': 'css/libs.min.css',
    }
    # ...
}
# JavaScript files.
PIPELINE_JS = {
    # Project JavaScript libraries.
    'libraries': {
        'source_filenames': (
            'bower_components/jquery/dist/jquery.js',
        ),
        # Compress all passed files into `js/libs.min.js`.
        'output_filename': 'js/libs.min.js',
    }
    # ...
}
{% endhighlight %}

After this setup, you can go to the template in which you want to use the libraries and include them using `compressed_js` and `compressed_css` from [Django Pipeline](https://github.com/cyberdelia/django-pipeline).

{% highlight html %}
&lt;!-- compressed tags is created by Django Pipeline.  --&gt;
{\% load staticfiles compressed %\}
&lt;!-- Include CSS files --&gt;
{\% compressed_css 'libraries' %\}
&lt;!-- ... --&gt;
&lt;!-- Include JavaScript files --&gt;
{\% compressed_css 'libraries' %\}
{% endhighlight %}

`compressed_css` tag paints the `rel's` for all the styles we specified in settings.py `PIPELINE_CSS` and so does `compressed_js` with the ones in `PIPELINE_JS`. Note that the string we're passing to the tag is the set of files we want to use.

When in development, `compressed` tags will print markup to load each file using `link` or `script`, however, in production it will compress the assets and paint one single tag to load the compressed file with the concatenated assets.

### Using Bower With [Jenkins](http://jenkins-ci.org/)

> One of the things that prevents developers from using Bower is that there's not so many documentation on how to build and deploy projects that use  [NPM](https://www.npmjs.org/) using Jenkins, however, with a little configuration, we can have Jenkins building our projects and executing NPM commands.

[Jenkins](http://jenkins-ci.org/) is a [continuous integration](http://en.wikipedia.org/wiki/Continuous_integration) server that's very used in the [Django](https://www.djangoproject.com/) community. It allows to deploy applications, run tests, [linting](http://en.wikipedia.org/wiki/Lint_(software)) source code and more. We can also used it to run [NPM](https://www.npmjs.org/) commands and fetch our project assets from [Bower registry](http://bower.io/search/), so that we don't have to have them in our repository.

In order to run NPM with  [Jenkins](http://jenkins-ci.org/) we have to install [Node JS Plugins](https://wiki.jenkins-ci.org/display/JENKINS/NodeJS+Plugin), which helps us with the NodeJS setup. The preferred way of installing this plugin is via the Jenkins [Plugins Interface](https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins) which can be accessed by going to your Jenkins home and adding **/pluginManager** to the URL. Once there, in the `Available` tab we can search for **NodeJs Plugins** and install it.

**Jenkins.sh configuration.**

Within Jenkins build file `jenkins.sh`, we're going to tell it to install Bower and then the packages from `bower.json`.

{% highlight bash %}
# ...
# Keep NodeJS in the current workspace.

$ export npm_config_prefix=.npm/
$ export PATH=.npm/bin:$PATH

# Install bower.
$ npm install -g bower

# Install bower packages.
$ bower install
# ...
{% endhighlight %}

After adding the above lines to Jenkins build file, you can commit and push your project changes in order for it to be built, then Jenkins will take care of installing Bower and fetching needed packages.

### Conclusion

I personally have found [Bower](http://bower.io/) to be very helpful in my development workflow, it allows me to have dependencies organized and to manage them easily, installing, uninstalling and updating them with simple commands.

I hope you can start taking advantage of it and include it in your workflow, also, don't hesitate on telling us how you're using it!.

**Special thanks to Tuts Plus for their [article on bower](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774) and to Pascal Hartig's [Article](https://weluse.de/blog/continuous-deployment-with-yeoman-and-jenkins.html) on Jenkins integrations with NodeJs packages.**

*Get example code on GitHub: [View on GitHub](https://github.com/AxiaCore/django-bower).*

*This article was originally published in [AxiaCore Blog](http://axiacore.com/blog/effective-dependency-management-django-using-bower/).*
