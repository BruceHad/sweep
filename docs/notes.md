# Basic Structure

Competition (e.g. world cup).

Each Competition has a list of Teams.

A Group is a group of Users connected with a Competition. There can be many Groups, each connected to one Competition.

There can be many Users, each connected to one or more Groups.

Each user selects one or more teams, per Group, randomly from the Competition.

# URLs and Routing

Want to make it as easy as possible to send people to the right place. So the URL should contain the Competition and the Group ids. This should propagate down to the navigation so the users don't have to jump up and down through the hierarchy.

That means the Ids should be fairly random (not just incremented integers), to make it difficult to accidentally move between competitions.

There also needs to be some verification, that means a user must sign in to view a page, and won't be able to view a page they aren't specifically allowed to.

No need for passwords for now, trust the users to enter their own user name.

# Login/Register

Login from the Navigation Bar or Register.

The Registration page lets you register your user details, and join a Group. The Group should be set by the URL, if present.
(You can also edit your details and upload a photo).
# Choose Teams

Teams are chosen randomly. The competition has a set limit, maximum number of teams a person can choose. The defaults to one but can be raised.
All a user has to do, is hit a button. The app will cycle through the list of teams that haven't already been picked, and select one at random. That team is now assigned to that users, in that group. A user can continue picking until the maximum is reached, or all teams are picked.
# Progress

Each team's status in the competition can be updated. This will therefore be displayed on the Groups progress page. Basically showing who is still in the competition.

# Maintenance

Pages are available to

1. Maintain the teams status in a competition.
2. Set up new Groups.
