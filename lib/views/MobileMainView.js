var MobileMainView = Backbone.View.extend({

	template: _.template( $('#okregiSelectTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'sync', this.render);

	},

	events: {
		'change #okregiSelect': 'changeOkreg'
	},

	changeOkreg: function(e) {

		var $target = $(e.target);
		var value = $target.val();

		if(value == 0) {
			return;
		}

		var candidates = new CandidateCollection();
		var candidatesView = new CandidatesView({

			collection: candidates,

			el: this.$el.find('#candidatesListContainer')

		});
		candidates.fetch();

	},

	render: function() {

		this.$el.html( this.template({ data: this.collection.toJSON() }) );

		return this;
	}

});