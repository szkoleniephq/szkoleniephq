var ConstituencyCollection = Backbone.Collection.extend({
	url: '/constituencies',
	model: Constituency
});