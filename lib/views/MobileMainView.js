var MobileMainView = Backbone.View.extend({

	template: _.template( $('#okregiSelectTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'change', this.render);

	},

	events: {
		'change #okregiSelect': 'changeOkreg'
	},

	changeOkreg: function(e) {

		var $target = $(e.target);
		var value = $target.val();

		var candidatesTpl = _.template( $('#candidatesListTpl').html() );

		$('#candidatesListContainer').html( candidatesTpl({data: candidates.toJSON(), constituency: $('#okregiSelect option:selected').text() }) );

	},

	render: function() {

		this.$el.html( this.template({ data: this.collection.toJSON() }) );

		return this;
	}


});