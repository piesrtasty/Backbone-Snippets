// This means that when Backbone calls fetch() for a Task model, it will include the name and email
// of the associated user nested within the task JSON representation. Something like...

{
	"title"			: "Buy more Cheeseburgers",
	"due_date"	: "2011-03-04",
	"user"   		: {
									"name" 	: "Luke Hamilton",
									"email" : "lukemhamilton@gmail.com"
								}
}

// Now that we receive user data with the task's JSON representation, let's tell our Backbone User model
// to store the User object. We do that on the task's initializer. Here's a first cut ...

var Task = Backbone.Model.extend({

	initialize: function()	{
		this.user = new User(this.get('user'));
	}

});

// We can make a couple of improvement on the above. 

// 1. You'll soon realize you might be setting the user outside of the initialize method alone.

// 2. The initializer should check whether there is user data in the first place. 

// To address the first concern, let's create a setter for the object. Backbone provides a handy function called
// "has" that returns true or false depending on whether the provicded attribute is set for the object:

var Task = Backbone.Model.extend({

	initialize: function()	{
		if (this.has('user'))	{
			this.setUser(new User(this.get('user')));
		}
	},

	setUser: function(user)	{
		this.user = user;
	}

});

// The final setup allows for a nice clean interface to a task's user, by accessing the task property of the user instance

var task = Task.fetch(1);
console.log(task.get('title') + ' is being worked on by ' + task.user.get('name'));
