var results = new ResultCollection(/*[
	{
		'id': 1,
		'candidate': 'Komor',
		'value': 15
	},
	{
		'id': 2,
		'candidate': 'Dupa',
		'value': 20
	},
	{
		'id': 3,
		'candidate': 'Chuck',
		'value': 101
	}
]*/);

var mainView = new WebappMainView({

	collection: results,
	el: $('#webapp-container')

});

mainView.render();