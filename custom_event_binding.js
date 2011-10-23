// BINDING TO CUSTOM EVENTS

// Situation: you want one view to change in response to another

// Consider an example with a table of users and a toggle control that filters the users to a particular gender

// GenderFilter is responsible for the filter conrol, and triggers an event with
// Backbone.Events.Prototype.trigger() when it changes. UsersTable observes this event, and filters its own
// collection in response.

GenderFilter = Backbone.View.extend({
	
	events: {
		"click .show-male" : "showMale",
		"click .show-female" : "showFemale",
		"click .show-both" : "showBoth",
	},
	
	showMale: function()	{
		this.trigger("changed", "male");
	}
	
	showFemale: function()	{
		this.trigger("changed", "female");
	}
	showBoth: function()	{
		this.trigger("changed", "both");
	}
	
});

UsersTable = Backbone.View.extend({
	
	initialize: function()	{
		this.filterView = new UserFilter();
		this.filterView.bind("changed", this.filterByGender);
	},
	
	filterByGender: function()	{
		this.filteredCollection = this.collection.byGender(gender);
	}
	
});

// UNBINDING CUSTOM EVENTS

// When view classes trigger (emit) events of their own other objects are the observer, and are responsible for
// cleaning up the event binding when they are disposed of.

// However, additionally, when the view itself is disposed of with leave(), it should clean up any event handlers
// bound on itself for events that it triggers.

// This is handled by invoking Backbone.Events.unbind():

var FilteringView = Backbone.View.extend({
	// snip ...

	events: {
		"click a.filter": "changeFilter"
	},
	
	changeFilter: function()	{
		if (someLogic())	{
			this.trigger("filtered", { some: options });
		}
	},
	
	leave: function()	{
		this.unbind(); // Clean up any event handlers bound on this view
		this.remove();
	}
	
	// snip ...
});
















