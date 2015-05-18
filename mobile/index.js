var candidates = new CandidateCollection([
	{
		'id': 1,
		'name': 'Komor'
	},
	{
		'id': 2,
		'name': 'Dupa'
	},
	{
		'id': 3,
		'name': 'Chuck'
	}
]);

var constituencies = new ConstituencyCollection([
	{
		'id': 1,
		'name': 'Kozia Wólka'
	},
	{
		'id': 2,
		'name': 'Kozia Dupa'
	}
]);


var mainView = new MobileMainView({

	collection: constituencies,
	el: $('#webapp-container')

});

mainView.render();