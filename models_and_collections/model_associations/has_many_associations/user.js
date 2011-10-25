// Now, on the Backbone User model's initializer, let's call the setTasks function:

var User = Backbone.Model.extend({
	
	initialize: function()	{
		var tasks = new Tasks.reset(this.get('tasks'));
		this.setTasks(tasks);
	},
	
	setTasks: function()	{
		this.tasks = tasks
	}
	
});

// Note that we are setting the relation to an instance of the Tasks collection