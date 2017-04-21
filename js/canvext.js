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
        this.canvas = $("<canvas/>")
            .addClass("canvext-canvas")
            .attr("width", options.width)
            .attr("height", options.height)
            .appendTo(this.element);
        this.context = this.canvas.get(0).getContext("2d");
    };

    Canvext.prototype.redraw = function(context, x, y){
        var self = this;
        $(this.element).find("input").each(function(){
            var posx = $(this).offset().left - self.canvas.offset().left;
            var posy = $(this).offset().top - self.canvas.offset().top;
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            context.clearRect(posx, posy, width, height);
            context.fillText($(this).val(), posx, posy + 20);
        });
    }
    Canvext.prototype.addInput = function(x, y){
        var input = $("<input/>").addClass("canvext-input").appendTo(this.element);
        input.css({
            left: x + this.canvas.offset().left,
            top: y + this.canvas.offset().top - 20
        });
        var self = this;
        input.on("keyup", function(){
            var canvas = self.canvas.get(0);
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
            console.log($(this));
            $(this).css({
                left: $(this).offset().left + $(window).width() 
                    - $.fn.canvext.window_width,
                top: $(this).offset().top + $(window).height() 
                    - $.fn.canvext.window_height
            });
        });
        $.fn.canvext.window_width = $(window).width(); 
        $.fn.canvext.window_height = $(window).height(); 
    });

    $.fn.canvext.settings = {
        
    };
})(window.canvext = window.canvext || {});
