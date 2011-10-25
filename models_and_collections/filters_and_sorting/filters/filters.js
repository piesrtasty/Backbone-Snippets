/* To filter a Backbone.Collection, like with Rails named scopes, define functions on your
 collections that filter by your criteria, using the "select" function from Underscore.js, and
 return new instances of the collection class. A first implementation might look as follows...*/

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	complete: function()	{
		var filteredTasks = this.select(function(tasks)	{
			return task.get('completed_at') !== null;
		});
		return new Tasks(filteredTasks);
	}
});

// Let's refactor this a bit. Ideally, the filter functions will reuse logic already
// defined in your model class ...

var Task = Backbone.Model.extend({
	isComplete: function()	{
		return this.get('completed_at') !== null;
	}
});

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	complete: function()	{
		var filteredTasks = this.select(function(task)	{
			return task.isComplete();
		});
		return new Tasks(filteredTasks);
	}
});