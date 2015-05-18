var WebappMainView = Backbone.View.extend({

	template: _.template( $('#chartTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'change', this.render);

	},

	render: function() {

		this.$el.html( this.template({ data: this.collection.toJSON() }) );

		return this;
	}


});