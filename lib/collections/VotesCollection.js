var VotesCollection = Backbone.Collection.extend({

	model: Votes,

	url: '/saveResult',

	save: function(options) {

		Backbone.sync('create', this, options);

	}

});