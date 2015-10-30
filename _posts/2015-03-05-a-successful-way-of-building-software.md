---
layout: post
title: A Successful Way Of Building Software
---

We've been developing Web Apps since 2008, at first, we were basically using  [Drupal](https://www.drupal.org/), which was completely replaced by [Django](https://www.djangoproject.com/) a couple of years later.

In this process of building Websites, we've learned so many things and have improved our process by automating tasks and not writing boilerplate code by hand, also, with the arrival of every new project we improve the things we weren't getting quite right in the previous one, the objective overall is to make projects easy to understand and minimize friction.

This is the average workflow we have when developing a new project.

### 1\. Understanding client's story and setting estimates

We start every project by listening to our clients carefully, taking notes, giving them suggestions on how to improve things, and generally laying the overall project idea. This process may take one or multiple sessions depending on its complexity.

Afterwards, we sit down with our team and estimate how much time it would take for us to produce this software, we do this by dividing the project into smaller sections and then dividing each section into [Jira issues](https://www.atlassian.com/software/jira) which is the software we use for managing projects.

![](http://axiacore.s3.amazonaws.com/inlines/jira-board.1425574971.jpg)

We have 5 main status a ticket can be at, the first is **To do** which just holds tickets that are pending, then, when a team member starts working on a ticket it is moved to **In progress** and to **Quality assurance** to be revised once it's finished.

After It passed QA it's ready to be reviewed by the product owner, which is a role played by one of our team members and then it's moved to **Done** once it's accepted.

A status we've added is **Stopped** which holds tickets that didn't passed QA and are to be fixed.

### 2. Defining entities and relationships

At this stage, we define models (Entities of the project) and how they're related. This is usually designed by our lead developer and discussed and improved with all backend developers involved in the project.We try to make everything very simple, and try not to have premature optimisation. Eventually we have to add model attributes and modify little things afterwards during the implementation.

![](http://axiacore.s3.amazonaws.com/inlines/models.1425645970.png)

### 3\. Coding, development workflow and deployment

Nowadays we use [Yeoman](http://yeoman.io/) and a [generator](https://github.com/AxiaCore/generator-django-axiacore) we built to scaffold the basic projects structure, preventing us from writing boilerplate code. Afterwards, we setup the project git repository with two main branches, `master` and `dev`, which represent production and development respectively.

Once that the repo is set up, other developers are ready to hack, so, each one clone the repo and create a branch with the `id` of the Jira ticket they want to work on.

![](http://axiacore.s3.amazonaws.com/inlines/Screen%20Shot%202015-03-05%20at%2012.13.03%20PM.1425575632.png)

#### Pull requests

We use [pull requests](https://www.atlassian.com/git/tutorials/making-a-pull-request/how-it-works) to integrate code into stagging and production servers and try them to be very concice and small in order to be easy to review and to spot errors quickly. With smaller pull requests, we've notices a faster flow bacause the person that review them won't have to spend 20 minutes on each one but rather 3 minutes or less.

#### Continuous integration

As we stated before, we use a staging server which is available on the web and is a representation of the `dev`. Every time a pull request pointing to `dev` is merged, this code is deployed to the staging server using [Bitbucket Hooks](https://confluence.atlassian.com/display/BITBUCKET/Manage+Bitbucket+hooks) and [Jenkins CI](http://jenkins-ci.org/).

![](http://axiacore.s3.amazonaws.com/inlines/hipchat.1425644091.png)

The deployment process is composed of two steps, first it runs django tests and secondly the code is deployed to the server if the tests pass. We're notified of all these steps on our [HipChat](https://www.hipchat.com/) company chat.

#### Sprints

For us iterating is a key to keep project manageable, therefore we rely on an agile development process where we have sprints. These days our sprints last two weeks as we realized that it allows us to complete functionalities that are more relevant which makes things easier for our QA team. This as opposed to the one week sprints we had before were the QA team had to test the single pieces of a certain process.

### 4\. Design, styling and front-end tooling

After the backend development process is finished, we start styling the the Web App. This may seem complex as styling a finished template looks harder than adding functionality to a styled interface, however, we've realized that by using some simple conventions, styling a working interface becomes easier. Basically the conventions we use are.

![](http://axiacore.s3.amazonaws.com/inlines/unstyled.1425644830.png)

*   Use a `js-` prefix to every markup element that is affected or bount to using JavaScript.
*   Keep markup as simple as possible.
*   Don't care about how the page looks when developing the first functionality.

![](http://axiacore.s3.amazonaws.com/inlines/styled.1425644897.png)

In this way we know we can move things around when adding styles without breaking something.

#### CSS/SASS/Compass

By defining a project pallet we start our styles structure, these pallet is a set of variables with the colors we'll use throughout the site. As a CSS preprocessor [Sass](http://sass-lang.com/) in conjunction to [Compass](http://compass-style.org/) which provides a convenient set of mixins.

#### Dependencies

[Bower](http://bower.io/) turned out to work very well for us, so we manage all front end dependencies using it. Also, we use [Gulp](http://gulpjs.com/) to compile assets, create tags using [Semver](http://semver.org/) and work in conjunction with [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

### 5\. QA and shipping

Before the site is ready for production, our QA team navigates it fully, finding where it breaks, so that we can fix this issues before deploying, then our client uses the site and have to approve everything is looking fine, then we move to production.

> Moving to production is just a merge into the master branch.

### Conclusion

Keeping things simple, automate as much as possible and learning from errors are key things to have in mind in order to make overall software development process easier.

### More reading

If you want to learn more about the things we went over, here there are some relevant links.

*   [BitBucket](http://bitbucket.org/)
*   [Jira](https://www.atlassian.com/software/jira)
*   [Jenkins](http://jenkins-ci.org/)
*   [Gulp](http://gulpjs.com/)
*   [Bower](http://bower.io)
*   [Django](https://www.djangoproject.com/)
*   [Semver](http://semver.org/)

*This article was originally published in [AxiaCore Blog](http://axiacore.com/blog/successful-way-building-software/).*
