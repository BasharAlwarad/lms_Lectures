<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../styles/styles.css" />
<title>OOP in JavaScript</title>
</head>

<body>
<header class="header">
<h1><b>OOP</b> (Object Oriented Programming) in JavaScript</h1>
</header>

<nav class="nav">
<ul class="nav__list">
<li><a href="#VCS">VCS</a></li>
<li><a href="#SettingUpGit">Setting Up Git</a></li>
<li><a href="#GitBasics">Git Basics</a></li>
<li><a href="#GitCollaboration">Git Collaboration</a></li>
<li><a href="#GitHubIntro">GitHub Intro</a></li>
</ul>
</nav>

<main class="main">
<section>
<strong id="VCS">Why VCS? (Version Control System)</strong>
<ul>
<li>

### Why VCS?

- Track changes to code.
- Facilitate collaboration among developers working on the same project.
- Enable easy rollback to previous versions.
- Maintain code quality through code reviews.
- Provide a backup mechanism for project files.

</li>
</ul>
</section>
<section>
<strong id="SettingUpGit">Setting Up Git</strong>
<ul>
<li>

### git init

- Create a folder (Directory) on your Desktop and name it OurProject for example.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop
$ mkdir OurProject
```

- Move ( cd ) into the new directory OurProject.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop
$ cd OurProject/

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject
$
```

Notice that there is nothing after /OurProject which means it dos'nt have .git file.

- use git init command to add .git folder tou OurProject folder.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject
$ git init
Initialized empty Git repository in C:/Users/beelw/OneDrive/Desktop/OurProject/.git/

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
```

Notice that there is <b>(master)</b> after /OurProject which means it has .git file,
and the name of the current branch is master.

- Start laying out the project by adding files to it.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ touch index.html styles.css index.js
```

</li>
</ul>
</section>

<section>
<strong id="GitBasics">Basic flow  of using GIt:</strong>
<ul>
<li>

### git add

- Now Start laying out the project by adding files to it.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ touch index.html styles.css index.js
```

- Git will track changes made to everything.
  <br/> we can see the status of the repository with <b> git status </b> command.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        index.js
        styles.css

nothing added to commit but untracked files present (use "git add" to track)
```

- Sofar all the changes have been tracked but there is no record of them in the Git folder.
- We need to use <b> git add </b> to start tracking those changes.
- We can chose which changes to add by using <b> git add </b> and the names of the files.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git add index.html styles.css
```

- Or add all changes by using <b> git add </b> and a dot <b>•</b> which means everything

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git add .
```

- Lets check the <b> status</b> of the repo now.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html
        new file:   index.js
        new file:   styles.css
```

</li>
<li>

### git commit

- Everything was added to track but the action of adding has no date, no name, and no order.
- <b>git commit</b> can fix this by adding a message that describes what we did.
- <b>git commit -m “message” </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git commit -m "creating main layout"
[master (root-commit) 08ff702] creating main layout

 3 files changed, 12 insertions(+)
 create mode 100644 index.html
 create mode 100644 index.js
 create mode 100644 styles.css
```

- Lets check the <b> status</b> of the repo now.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master
nothing to commit, working tree clean
```

- That means everything were added and committed.
- Let's make sure by using <b>git log</b> This command will show us all the changes made in our project with their respective dates, messages, and authors.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git log
commit 08ff702179bc4cfdbad04b917e755a4df85337f4 (HEAD -> master)
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 10:13:43 2024 +0200

    creating main layout
```

1. Commit Hash (SHA-1): 08ff702179bc4cfdbad04b917e755a4df85337f4
2. Branch: master (HEAD points to the latest commit in the master branch)
3. Author: Bashar Alwarad (yourEmail@gmail.com)
4. Date: Mon Apr 1 10:13:43 2024 +0200
5. Commit Message: "creating main layout"

- You might notice that in OurProject folder there is only three files and no .git folder.
  <br> This is because ever folder that starts with a dot <b>•</b> is hidden by default.
  <br> To see it use <b> ls -la </b> in the terminal which will show everything including hidden folders.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ ls -la
total 17
drwxr-xr-x 1 beelw 197609   0 Apr  1 09:13 ./
drwxr-xr-x 1 beelw 197609   0 Mar 31 17:22 ../
drwxr-xr-x 1 beelw 197609   0 Apr  1 10:15 .git/
-rw-r--r-- 1 beelw 197609 312 Apr  1 09:21 index.html
-rw-r--r-- 1 beelw 197609   0 Apr  1 09:13 index.js
-rw-r--r-- 1 beelw 197609   0 Apr  1 09:13 styles.css
```

- Important note: All git commands start with <b>git</b> sofar we learned

1.  <b>git init</b> initialize a new repository
2.  <b>git add</b> stage file contents to be committed
3.  <b>git status</b> show the working tree status
4.  <b>git commit</b> record changes to the repository
5.  <b>git log</b> display history of commits

- commands that do'nt start with <b>git</b> are terminal commands such as

1. <b>mkdir OurProject</b> create a directory named OurProject
2. <b>touch index.html</b> create an empty file named index.html
3. <b>ls -la</b> list everything including hidden ones
</li>
<li>

### more about git commit

- The next logical step is to add structure to index.html, and styles.css files.
- Use <b>git status</b> after the new additions.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
        modified:   styles.css

no changes added to commit (use "git add" and/or "git commit -a")
```

- we need the staging are so we can chose what to add how to describe the addition.

- eventually we need to add everything but we also need to label every step differently

1. let's add the index.html only and then see the status

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git add index.html

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   styles.css
```

2. now let's commit to the staging are only the new addition on index.html only and see the status.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git commit -m "adding structure to html"
[master 3819401] adding structure to html
 1 file changed, 5 insertions(+)

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   styles.css

no changes added to commit (use "git add" and/or "git commit -a")
```

3. now when using <b>git log</b> we will find two snapshots of the flow

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git log
commit 381940113998760f6276f04506b9d636256ea3df (HEAD -> master)
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 11:39:47 2024 +0200

    adding structure to html

commit 08ff702179bc4cfdbad04b917e755a4df85337f4
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 10:13:43 2024 +0200

    creating main layout
```

4. if we did the same to the additions on styles.css <br>
   note: we can give many commands at the same time: <br>
   <b>git add styles.css; git commit -m "adding structure to css"</b> <br>
   Or: <br>
   <b>git commit -am "adding structure to css"</b> to add and commit everything

5. by using <b>git log</b> we can notice the evolution of our project in three commits.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git log
commit 2f5616b4617a29c19ce365de88ea0de187c18fc3 (HEAD -> master)
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 11:41:14 2024 +0200

    adding structure to css

commit 381940113998760f6276f04506b9d636256ea3df
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 11:39:47 2024 +0200

    adding structure to html

commit 08ff702179bc4cfdbad04b917e755a4df85337f4
Author: Bashar Alwarad <yourEmail@gmail.com>
Date:   Mon Apr 1 10:13:43 2024 +0200

    creating main layout
```

6. What if i want to go back to the original shape of OurProject before making any changes?
   <br>we can use <b>git checkout 08ff702179bc4cfdbad04b917e755a4df85337f4</b>
   <br><b>08ff702179bc4cfdbad04b917e755a4df85337f4</b> is the commit hash or a reference
   <br>Now you will be in <b>detached HEAD</b>
   <br>you can go back to master brach by using <b>git switch -</b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git checkout 08ff702179bc4cfdbad04b917e755a4df85337f4
Note: switching to '08ff702179bc4cfdbad04b917e755a4df85337f4'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 08ff702 creating main layout

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject ((08ff702...))
```

</li>
</ul>
</section>

<section>
<strong id="GitCollaboration">Git in a team collaboration project</strong>
<ul>
<li>

### Using git to branch

- for now we only have one version of OurProject that has three commits.
  <br> although we can move through our changes using <b> git log </b> and <b> git show </b>, it would be nice if we could work on different versions of OurProject simultaneously.

- By branching we can:

  1. protect the master branch.
  2. work on features separately from bug fixes.
  3. share our changes with others.

- since the word master is considered politically incorrect by many, there was a new movement to call the original branch main instead.
  <br> let's change the name of master branch to main by using <b> git branch -M main </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (master)
$ git branch -M main

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (main)
$
```

- In a team-work flow the main branch should be protected.
  1. the branch main is what users see on the internet, so it should always contain the latest stable release.
  2. we need another branch to test our changes and experiment on let's call dev.
  3. we can create an exact copy/version/branch from main by using
     <br> <b> git checkout -b dev </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (main)
$ git checkout -b dev
Switched to a new branch 'dev'

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (dev)
$
```

4. we are in dev now so all new changes will be added to dev not to main.
   <br> we can list all our branches by typing <b>git branch</b>.

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (dev)
$ git branch
* dev
  main

```

5. Let's make some changes
6. add them <b> git add . </b>
7. commit them <b> git commit -m "some message" </b>
8. we can see the difference between the two branches by using
   - <b> git diff main dev </b>
   - <b> git diff --name-only main dev </b>
   - <b> git diff --stat main dev </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (dev)
$ git diff --stat main dev
 index.html | 9 ++++++++-
 styles.css | 8 ++++++++
 2 files changed, 16 insertions(+), 1 deletion(-)
```

9.  Now there are some additions in dev that do not exists in main.
    - we can add them by:
    - first jumping back to main <b> git checkout main </b>
    - then merging dev into main <b> git merge dev </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (main)
$ git merge dev
Updating 2f5616b..7137b37
Fast-forward
 index.html | 9 ++++++++-
 styles.css | 8 ++++++++
 2 files changed, 16 insertions(+), 1 deletion(-)
```

</li>
</ul>
</section>

<section>
<strong id="GitHubIntro">GitHub  Intro</strong>
<ul>
<li>

### Creating a repository:

1. Everything we have done up to now is on our local machine.

   - We need to divide the work and share it with others.
   - we need a sever that hosts OurProject and allow other team members to share their code with us.
   - GitHub is a great example for that among others

2. After creating an account on GitHub https://github.com/

3. Create a repository and name it OurProject then you can copy the code provided below with tow options

4. if your project does not have a .git profile

```js
echo "# OurProject" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/BasharAlwarad/OurProject.git
git push -u origin main
```

4. if your project has a .git profile

```js
git remote add origin https://github.com/BasharAlwarad/OurProject.git
git branch -M main
git push -u origin main
```

4. after executing the previous command lines CL all the changes on main will be pushed to Github repo by using <b> git push </b>
   - refresh you Github page to see the difference.
   - now you have only main on GitHub so we need to push dev as well.
   - move to dev then use <b> git push --set-upstream origin dev </b>
   - remember dev is for merging and testing and main is the final product or what the user sees on the net

</li>
<li>

### Team Work:

1. To enable others to work wit you first you need to invite them from settings/collaborators.
2. Once they accepted the invitation, They will be able to clone your repo using
   <br><b>git clone https://github.com/BasharAlwarad/OurProject.git</b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop
$ git clone https://github.com/BasharAlwarad/OurProject.git
Cloning into 'OurProject'...
remote: Enumerating objects: 14, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 14 (delta 4), reused 14 (delta 4), pack-reused 0
Receiving objects: 100% (14/14), done.
Resolving deltas: 100% (4/4), done.
```

3. after cloning make sure to cd into the downloaded folder OurProject

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop
$ cd OurProject/

beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (main)
```

4. now as a team member you're not allowed to add any changes to main our dev
   - <b>git checkout dev</b> first move to dev
   - that will download dev even if it's still not in you machine

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (main)
$ git checkout dev
Switched to a new branch 'dev'
branch 'dev' set up to track 'origin/dev'.
```

5. then create your own branch-feature and start working on it.
   for example:
   <br> <b>git checkout -b feature/footer</b>
   <br> add some changes to the footer
   <br> <b>git commit -am "adding to footer"</b>
   <br> <b>git push --set-upstream origin feature/footer</b>

   - notice that we are branching out fromm dev not from main
   - Other developers will be doing the same on their branches
   - Other developers will be doing the same on their branches

6. example of another developer will be:
   <br> <b>git checkout -b feature/main</b> NOTE: branching from dev
   <br> add some changes to the main
   <br> <b>git commit -am "adding to main"</b>
   <br> <b>git push --set-upstream origin feature/main</b>

7. Because we have now many developers working on the project , we need to merge all these features together.
   - since you were working on the footer, let's say you finish with it.
   - go to github and create <b> PR </b> pull request. this will allow you to merge footer in to dev.
   - compare your branch with the dev branch and solve merge conflicts if there are any
   - after successfully merging all dev branches on the other developers machines will be behind so the need to updated by simply checking out to dev and then use
     <br> <b>git pull </b>

```js
beelw@DESKTOP-ITF6E48 MINGW64 ~/OneDrive/Desktop/OurProject (dev)
$ git pull
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (1/1), 903 bytes | 56.00 KiB/s, done.
From https://github.com/BasharAlwarad/OurProject
   7137b37..8ac93eb  dev        -> origin/dev
Updating 7137b37..8ac93eb
Fast-forward
 index.html | 9 ++++++++-
 1 file changed, 8 insertions(+), 1 deletion(-)
```

8. Note if you're initiated a node package in your project make sure to install all dependencies again using npm i or yarn.

</li>
</ul>
</section>
</main>
</body>
</html>
