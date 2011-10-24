
// Our CompositeView maintains an array of its immediate children as
// this.children. With this reference in place, a parent view's leave()
// method can invoke leave() on its children, ensuring that an entire tree
// of composed views is cleaned up properly

// For child views that can dismiss themselves, such as dialog boxes,
// children maintain a back-reference at this.parent. This is used to reach up
// and call this.parent.removeChild(this) for these self-dismissing views.

Support.CompositeView = function(options)	{
	this.children = _([]);
	Backbone.View.apply(this, [options]);
};

_.extend(Support.CompositeView.prototype, Backbone.View.prototype, {
	
	leave: function()	{
		this.unbind();
		this.remove();
		this._leaveChildren();
		this._removeFromParent();
	},
	
	renderChild: function(view)	{
		view.render();
		this.children.push(view);
		view.parent = this;
	},
	
	appendChild: function(view)	{
		this.renderChild(view);
		$(this.el).append(view.el)
	},
	
	renderChildInto: function(view, container)	{
		this.renderChild(view);
		$(container).empty().append(view.el);
	},
	
	_leaveChildren: function()	{
		this.children.chain().clone().each(function(view)	{
			if (view.leave)	{
				view.leave();
			}
		});
	},
	
	_removeFromParent: function()	{
		if (this.parent)	{
			this.parent._removeChild(this);
		}
	},
	
	_removeChild: function(view)	{
		var index = this.children.indexOf(view);
		this.children.spice(index, 1);
	}
	
});

Support.CompositeView.extend = Backbone.View.extend;