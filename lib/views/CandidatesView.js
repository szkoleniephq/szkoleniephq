var CandidatesView = Backbone.View.extend({

	template: _.template( $('#candidatesListTpl').html() ),

	initialize: function() {

		this.listenTo(this.collection, 'sync', this.render);

	},

	events: {
		'click .js-save-votes': 'saveVotes'
	},

	saveVotes: function() {

		var inputs = this.$el.find('.candidate-input');
		var data = {
			candidateResult: []
		};

		var votesCollection = new VotesCollection();

		inputs.each(function(i) {

			var $item = $(inputs[i]);
			var obj = {
				candidateId: $item.attr('id'),
				constituencyId: $('#okregiSelect').val(),
				votes: parseInt($item.val(), 10)
			};

			votesCollection.add(obj);

		});

		console.log(votesCollection);
		votesCollection.save();

	},

	render: function() {

		this.$el.html( this.template({ data: this.collection.toJSON(), constituency: $('#okregiSelect option:selected').text() }) );

		return this;
	}

});