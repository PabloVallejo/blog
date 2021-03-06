---
layout: post
title: Hosting Your Site on Github Using Jekyll
---


Some days ago I decided to create my personal site, I was thinking
on what CMS should I use for it and given that most of the times I try to adopt new technologies
when I get into a new project, I decided to use something new for me this time.

![image](/assets/img/jekyll-1.jpg)

Since I had been working a lot with [WordPress](http://wordpress.org), I decided that this time I would try [Jekyll](http://jekyllrb.com), which seems very popular, simple and can be hosted for free on [GitHub](https://github.com).

The process of setting up the site was pretty straightforward, so was setting up a custom domain for it.
Now, I will go over the setup a little bit.


####Creating a GitHub Page

GitHub Pages are websites that have their source code hosted in a GitHub repository, they allow
to use HTML, CSS, JavaScript and also have support for [Jekyll](http://jekyllrb.com) which is a static publishing
platform.

You have two options to setup a GitHub page, the first option, named **Project Page** is intended for pages that
belong to a specific project, that is, for example when you created a repository for your plugin and you want it to have
a page in which you can show demos, detailed documentation, pictures and the like. In this case, in order to have a page
for it, you have to create in the project's repository a branch called **gh-pages** where you will have your `index.html` and which will be the root of the page.

The second option, named **User/Organization page** is intended for personal and organization pages, in this case, you
have to create a repository named `your-username.github.io` and place the content for your site in the
**master** branch of that repository. Given this, if you create **Project page** called let's say *snacky*, the URL for it will be
`http://your-username.github.io/snacky`. On the other hand, if you create a **User/organization page** it will be
available at `http://you-username.github.io`.

#### Setting up Jekyll
[Jekyll](http://jekyllrb.com) comes with several features like: Templates, Posts,
Markdown, Permalinks Structure, Categories, Tags and others, which make it easy to publish content.
Also, I enjoy the fact that you can write posts from your favorite code editor and have them on GitHub after a simple commit.

Since [Jekyll](http://jekyllrb.com) is a ruby gem, you have to have [Ruby](http://www.ruby-lang.org/) installed to run it.
Download [Ruby](http://www.ruby-lang.org/en/downloads/) for your operating system and after you have it installed, install jekyll from the command line.

{% highlight bash %}
$ gem install jekyll
$ gem install rdiscount
{% endhighlight %}

After you have Jekyll installed, you can download the [starting point site](https://github.com/PabloVallejo/Jekyll-Bootstrap) which
is a boilerplate with Bootstrap included which will help you with the setup.

The structure of the basic site includes layouts, posts and folders to store assets.

{% highlight bash %}
.
|-- _config.yml
|-- _layouts
|    |-- default.html
|-- _posts
|    |-- 2013-05-16-getting-started.md
|-- _site
|-- css
|-- js
|-- index.html

{% endhighlight %}

The configuration file **config.yml** is intended to specify global configuration options
for the site, like permalink structure, regeneration, timezone and the like.

{% highlight yaml %}
# config.yml
auto: true
permalink: /:year/:month/:day/:title
{% endhighlight %}

After you have downloaded the basic site, you are ready to run jekyll. Note that the `_site` directory
is the result of the build Jekyll does with the site files, so you don't have to modify it.
Change directory to the folder you downloaded the files into, open the command line and start the Jekyll server by typing the following command.

{% highlight bash %}
$ jekyll --server
{% endhighlight %}

After doind so, you will get an output more or less like this:

{% highlight bash %}
Configuration from C:/mysite/_config.yml
Auto-regenerating enabled: C:/mysite -> C:/m
[2013-05-15 20:34:22] regeneration: 59 files changed
[2013-05-15 20:34:22] INFO  WEBrick 1.3.1
[2013-05-15 20:34:22] INFO  ruby 1.9.3 (2013-02-22) [i386-mingw32]
[2013-05-15 20:34:23] INFO  WEBrick::HTTPServer#start: pid=4444 port=4000
{% endhighlight %}


By default, Jekyll server runs at `http://localhost:4000`, so you can open the browser
and take a look at your site.

After your site is running, you can play around with it, add some CSS, customizing the layouts and
things like that in order to have it ready to be deployed to GitHub.

####Publishing the site on GitHub

In order to deploy the site to GitHub, just create a repoitory for
it and checkout the proper branch for your type of page, **Project Page**: `gh-pages` or **User/Organization page**: `master`. Then set the upstream of the repository to point to the one you created on GitHub.


**User/organization setup**

{% highlight bash %}
$ git remote add origin https://github.com/your-username/your-username.github.io.git
# Creates a remote named "origin" pointing at your GitHub repository

$ git push origin master
# Sends your commits in the "master" branch to GitHub

{% endhighlight %}

**Project page setup**

{% highlight bash %}
$ git remote add origin https://github.com/your-username/your-project.git
# Creates a remote named "origin" pointing at your GitHub repository

$ git push origin gh-pages
# Sends your commits in the "gh-pages" branch to GitHub

{% endhighlight %}

After doing this, you may have to wait up to 10 minutes to reach your site at the respective URL.

Jekyll sites don't need any special setup in order to be generated once they are on GitHub,
since GitHub will do the generation process right after every commit. So, if you create a post or make lets say a layout change and
commit it to GitHub, it will be on your live site automatically.


#### Conclusion

Now you have a basic understanding of how to setup a Jekyll site.
If you want to learn more about the technologies we went over, following there are
some resources that may be helpful for you.

* [Jekyll Documentation](http://jekyllrb.com/docs/home/).
* [Markdown Technology](http://daringfireball.net/projects/markdown/).
* [GitHub Help](https://help.github.com/).
