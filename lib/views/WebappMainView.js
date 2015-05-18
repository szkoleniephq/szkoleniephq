var WebappMainView = Backbone.View.extend({

	template: _.template( $('#chartTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'change', this.render);

	},

	render: function() {

		var data = this.collection.toJSON();
		var sum = 0;
		
		_.forEach(data, function(model) {
			sum += model.value;
		});
		
		if (sum == 0) {
			sum = 1;
		}
		
		_.forEach(data, function(model) {
			model.percent = 100 * model.value / sum;
		});
				
		this.$el.html( this.template({ data: data }) );

		return this;
	}


});