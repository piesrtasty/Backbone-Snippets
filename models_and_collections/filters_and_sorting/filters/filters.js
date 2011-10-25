/* To filter a Backbone.Collection, like with Rails named scopes, define functions on your
 collections that filter by your criteria, using the "select" function from Underscore.js, and
 return new instances of the collection class. A first implementation might look as follows...*/

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: '/tasks',
	
	complete: function()	{
		
	}
	
});