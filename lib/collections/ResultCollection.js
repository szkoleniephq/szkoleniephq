ResultCollection = Backbone.Collection.extend({
	model: Result,
	
	initialize: function() {
		var url = window.location.protocol + "//" + window.location.host + '/';
		var socket = io.connect(url);
		var self = this;
		
		socket.on('result-sync', function(data) {
			console.log(data);
			self.set(data);
			self.trigger('change');
		});

	}
});