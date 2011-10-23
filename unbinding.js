// Unbinding using just a leave() function

var SomeCollectionView = Backbone.View.extend({
	
	initialize: function()	{
		this.bindings = [];
		this.bindTo(this.collection, "change", this.render);
	},
	
	leave: function()	{
		this.collection.unbind("change", this.render);
		this.remove()
	}
	
	// snip ...
	
})


// Keep track of bind() calls to unbind more easily

var SomeCollectionView = Backbone.View.extend({
	
	initialize: function()	{
		this.bindings = []
		this.bindTo(this.collection, "change", this.render);
	},
	
	leave: function()	{
		this.unbindFromAll();
		this.remove()
	},
	
	bindTo: function(source, event, callback)	{
		source.bind(event, callback, this);
		this.bindings.push({ source: source, event: event, callback: callback });
	},
	
	unbindFromAll: function()	{
		_.each(this.bindings, functiom(binding)	{
			binding.source.unbind(binding.event, binding.callback)
		});
		this.bindings = [];
	}
	
});