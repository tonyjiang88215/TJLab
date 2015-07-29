/**
 * Created by tonyjiang on 15/7/6.
 */
var APP = {
    Models : {} ,
    Views : {},
    Controllers : {},
    Collections : {},
    initialize : function(){
        console.log("step1");
        var router = new this.Routes();
        Backbone.history.start();
    }
};

APP.Models.Hello = Backbone.Model.extend({
    url : function(){
        return '/api';
    },
    initialize : function(){
        this.set({'message' : 'hello world'});
    }
});

APP.Views.Hello = Backbone.View.extend({
   el : $('body'),
    template : _.template("<span>tj</span>"),

    initialize : function(options){
        this.options = options;
        this.bind('change' , this.render);
        this.model = this.options.model;
    },

    render : function(){
        console.log("dsadsa");
        $(this.el).html("112233");
        return this;
    }
});

APP.Routes = Backbone.Router.extend({
    routes : {
        "" : "index",
        "!/hello" : "hello",
        "*error" : "error"
    },

    index : function(){
        console.log('get in index');
    },

    hello : function(){
        console.log('get in hello');
        var helloModel = new APP.Models.Hello();

        helloModel.fetch({
            fetch : function(model){
                var helloView = new APP.Views.Hello({model : model});
                helloView.trigger('change');
            }
        })

    },

    error : function(){
        console.log("get in error");
    }

});

APP.initialize();