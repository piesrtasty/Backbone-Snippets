
var serialize = function(form)	{
	
	var elements = $('input, select, textarea', form);
	
	var serializer = function(attributes, element)	{
		var element = $(element);
		attributes[element.attr('name')] = element.val();
	};
	
	return _.inject(elements, serializer, []);
};

// Call as follows ...

var form = $('form');
var model = new MyApp.Models.User();
var attributes = serialize(form)
model.set(attributes)

// Downsides to this method...

// 1. Doesn't handle nested attributes
// 2. Doesn't handling typing...ala a JS date picker input => JS Date object
// 3. Will include any <input type="submit"> elements when constructing the attribute hash

// Conclusion: Use backbone-forms instead lol =)