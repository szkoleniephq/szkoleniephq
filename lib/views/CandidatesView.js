var CandidatesView = Backbone.View.extend({

	template: _.template( $('#candidatesListTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'sync', this.render);

	},

	render: function() {

		this.$el.html( this.template({ data: this.collection.toJSON(), constituency: $('#okregiSelect option:selected').text() }) );

		return this;
	}

});