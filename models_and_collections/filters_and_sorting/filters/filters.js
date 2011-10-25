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

// Going further, notice that there are actually two concerns in this function
// 1. The notion of filtering the collection
// 2. The specific filtering criteria (i.e. task.isComplete())

// Let's separate the two concerns here, and extract a filtered function...

var Task = Backbone.Model.extend({
	isComplete: function()	{
		return this.get('completed_at') !== null;
	}
});

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	complete: function()	{
		return this.filtered(function(task)	{
			return task.isComplete();
		});
	},
	
	filtered: function(criteriaFunction)	{
		return new Tasks(this.select(criteriaFunction));
	}
	
})

// Now we can extract this function into a reusable mixin, abstracting the Tasks
// collection class using this.constructor...

var FilterableCollectionMixin = {
	filtered: function(criteriaFunction)	{
		return new this.constructor(this.select(criteriaFunction))
	}
};

var Task = Backbone.Model.extend({
	isComplete: function()	{
		return this.get('completed_at') != null;
	}
});

var Tasks = Backbone.Collection.extend(_.extend({
	model: Task,
	url: '/tasks',
	
	complete: function()	{
		return this.filtered(function(task)	{
			return task.isComplete();
		});
	}
}, FilterableCollectionMixin));

/* PROPAGATING COLLECTION CHANGES */

// The FilterableCollectionMixin, as we've written it, will produce a filtered collection
// that does not update when the original collection is changed. To do so, bind to the
// change, add, and remove events on the source collection, reapply the filter function,
// and repopulate the filtered collection.

var FilterableCollectionMixin = {
	filtered: function(criteriaFunction)	{
		var sourceCollection = this;
		var filteredCollection = new this.constructor;
		
		var applyFilter = function()	{
			filteredCollection.reset(sourceCollection.select(criteriaFunction));
		};
		
		this.bind("change", applyFilter);
		this.bind("add", applyFilter);
		this.bind("remove", applyFilter);
		
		applyFilter();
		
		return filteredCollection;
		
	}
};























