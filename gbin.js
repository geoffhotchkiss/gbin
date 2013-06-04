Saves = new Meteor.Collection("saves");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to gbin.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

	Template.bin.events({
		'click input' : function () {
			var dt = new Date()
			Saves.insert({stuff: $('#gbin-tosave').val(), 
										type: "userinput",
										time: Date.parse(dt)});
			$('#gbin-tosave').val("");
		}	
	});

	Template.bin.instructions = function () {
		return "enter yo shit:";
	};

	Template.bin.loggedIn = function() {
		return Meteor.user();
	}

	Template.saves.everything = function () {
		return Saves.find({}, {sort: {time: -1}});
	}

}

if (Meteor.isServer) {
  Meteor.startup(function () {
		/**
		if (Saves.find().count() === 0) {
			var stuffs = ["thing 1",
									  "thing 2",
									  "thing 3",
									  "thing 4"];

			for (var i = 0; i < stuffs.length; i++) {
				Saves.insert({stuff: stuffs[i], type: "text"});
			}
		}
		**/
    // code to run on server at startup
  });
}
