var constituencies = new ConstituencyCollection();
var mainView = new MobileMainView({

	collection: constituencies,

	el: $('#webapp-container')

});

constituencies.fetch();