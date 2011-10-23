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