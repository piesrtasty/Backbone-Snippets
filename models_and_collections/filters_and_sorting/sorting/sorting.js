/* SORTING */

// The simplest way to sort a Backbone.Collection is to define a "comparator"
// function. This functionality is built it...

var Tasks = Backbone.Collection.extend({
	model: Tasl,
	url: '/tasks',
	
	comparator: function(task)	{
		return task.dueDate;
	}
});

// If you'd like to provide more than one sort order on your collection, you
// can use an approach similar to the 'filtered' function mentioned before,
// and return a new Backbone.Collection whose "comparator" is overridden. Call
// "sort" to update the ordering on the new collection:

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	comparator: function(task)	{
		return task.dueDate;
	},
	
	byCreatedAt: function()	{
		var sortedCollection = new Tasks(this.models);
		sortedCollection.comparator = function(task)	{
			return task.createdAt;
		};
		sortedCollection.sort();
		return sortedCollection;
	}
});

// Similarily, you can extract the reusable concern to another function

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	comparator: function(task)	{
		return task.dueDate;
	},
	
	byCreatedAt: function()	{
		return this.sortedBy(function(task)	{
			return task.createdAt;
		});
	},
	
	byCompletedAt: function()	{
		return this.sortedBy(function(task)	{
			return task.completedAt;
		});
	},
	
	sortedBy: function(comparator)	{
		var sortedCollection = new Tasks(this.models)
		sortedCollection.comparator = comparator;
		sortedCollection.sort();
		return sortedCollection;
	}
	
});

// And then into another reusable mixin:

var SortableCollectionMixin = {
	
	sortedBy: function(comparator)	{
		var sortedCollection = new this.constructor(this.models)
		sortedCollection.comparator = comparator;
		sortedCollection.sort();
		return sortedCollection;
	}
	
};

var Tasks = Backbone.Collection.extend(_.extend({
	model: Task,
	url: '/tasks'
	
	comparator: function(task)	{
		return task.dueDate;
	},
	
	byCreatedAt: function()	{
		return this.sortedBy(function(task)	{
			return task.createdAt;
		});
	},
	
	byCompletedAt: function()	{
		return this.sortedBy(function(task)	{
			return task.completedAt;
		});
	}
	
}, SortableCollectionMixin));


// Just as with the FilterableCollectionMixin before, the SortableCollectionMixin
// should observe its source if updates are to propagate from one collection to
// another.

var SortableCollectionMixin = {
	
	sortedBy: function(comparator)	{
		var sourceCollection = this;
		var sortedCollection = new this.constructor;
		sortedCollection.comparator = comparator;
		
		var applySort = function()	{
			sortedCollection.reset(sourceCollection.models);
			sortedCollection.sort();
		};
		
		this.bind("change", applySort);
		this.bind("add", applySort);
		this.bind("remove", applySort);
	
		applySort();
		
		return sortedCollection;
	
	}

};













