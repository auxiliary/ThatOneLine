(function (canvext){
    $.fn.canvext = function(options){
        return this.each(function(){
            if (!$.data(this, "canvext")){
                $.data(this, "canvext", new Canvext(this, options));
            }
        });
    };

    function Canvext(element, options){
        this.element = element;
        var temp = $("<canvas/>")
            .addClass("canvext-canvas")
            .attr("width", options.width)
            .attr("height", options.height)
            .appendTo(this.element);
        this.canvas = temp.get(0);
        this.context = this.canvas.getContext("2d");
    };

    Canvext.prototype.redraw = function(context, x, y){
        var self = this;
        $(this.element).find("input").each(function(){
            var posx = $(this).offset().left - self.canvas.getBoundingClientRect().left;
            var posy = $(this).offset().top - self.canvas.getBoundingClientRect().top;
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            context.clearRect(posx, posy, width, height);
            context.fillText($(this).val(), posx, posy + 20);
        });
    }
    Canvext.prototype.addInput = function(x, y){
        var input = $("<input/>").addClass("canvext-input").appendTo(this.element);
        input.css({
            left: x + this.canvas.getBoundingClientRect().left,
            top: y + this.canvas.getBoundingClientRect().top - 20
        });

        input.attr("data-canvext-x", x);
        input.attr("data-canvext-y", y);

        var self = this;
        input.on("keyup", function(){
            var canvas = self.canvas;
            var context = canvas.getContext("2d");
            context.font = "20px courier new";
            self.redraw(context, x, y);
            //context.clearRect(0, 0, canvas.width, canvas.height);
            //context.fillText($(this).val(), x, y);
        });        

        input.on("select", function(){
        });

        input.focus();
    }

    $(window).resize(function(){
        $(".canvext-input").each(function(){
            var x = parseFloat($(this).attr("data-canvext-x")) 
                + $(this).parent().data("canvext").canvas.getBoundingClientRect().left;
            var y = parseFloat($(this).attr("data-canvext-y")) 
                + $(this).parent().data("canvext").canvas.getBoundingClientRect().top - 20;

            $(this).css({
                left: x, 
                top: y
            });
        });
        $.fn.canvext.window_width = $(window).width(); 
        $.fn.canvext.window_height = $(window).height(); 
    });

    $.fn.canvext.settings = {
        
    };
})(window.canvext = window.canvext || {});
