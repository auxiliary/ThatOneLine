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
        this.settings = $.extend({}, $.fn.canvext.settings, options);
        var temp = $("<canvas/>")
            .addClass("canvext-canvas")
            .attr("width", options.width)
            .attr("height", options.height)
            .appendTo(this.element);
        this.canvas = temp.get(0);
        this.context = this.canvas.getContext("2d");
        this.context.textBaseline = "top";
        this.draw_input_callbacks = {};
    };

    Canvext.prototype.drawInput = function(context, text, x, y, text_height)
    {
        context.fillText(text, x, y);    
    }

    Canvext.prototype.redraw = function(){
        var context = this.context;
        var self = this;
        $(this.element).find("input").each(function(){
            var posx = $(this).offset().left - self.canvas.getBoundingClientRect().left;
            var posy = $(this).offset().top - self.canvas.getBoundingClientRect().top;
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            context.clearRect(posx, posy, width, height);

            var callback_id = $(this).attr("data-canvext-id");
            var text_height = parseFloat($(this).attr("data-canvext-text-height"));
            if (callback_id == -1)
                self.drawInput(context, $(this).val(), posx, posy, text_height);
            else
                self.draw_input_callbacks[callback_id](context, $(this).val(), posx, posy, text_height);
        });
    }

    Canvext.prototype.addInput = function(x, y, text_height, id, fdraw){
        if (typeof(id) == 'undefined')
        {
            id = -1;
            fdraw = this.drawInput;
        }
        else
        {
            this.draw_input_callbacks[id] = fdraw;
        }

        if (typeof(text_height) == 'undefined')
        {
            text_height = this.settings.text_height; // Default text-height value
        }
        
        var input = $("<input/>").addClass("canvext-input").appendTo(this.element);
        input.css({
            left: x + this.canvas.getBoundingClientRect().left,
            top: y + this.canvas.getBoundingClientRect().top 
                - text_height,
            fontSize: text_height + 'px'
        });

        input.attr("data-canvext-x", x);
        input.attr("data-canvext-y", y);
        input.attr("data-canvext-id", id);
        input.attr("data-canvext-text-height", text_height);

        var self = this;
        input.on("keyup", function(){
            var canvas = self.canvas;
            var context = canvas.getContext("2d");
            self.redraw();
        });        

        input.on("blur", function(){
            $(this).css({
                opacity: 0.0 
            });
        });

        input.on("focus", function(){
            $(this).css({
                opacity: 0.1
            });
        });

        input.focus();

        return input.get(0);
    }

    $(window).resize(function(){
        $(".canvext-input").each(function(){
            var can = $(this).parent().data("canvext");
            var x = parseFloat($(this).attr("data-canvext-x")) 
                + $(this).parent().data("canvext").canvas.getBoundingClientRect().left;
            var y = parseFloat($(this).attr("data-canvext-y")) 
                + $(this).parent().data("canvext")
                .canvas.getBoundingClientRect().top 
                - parseFloat($(this).attr("data-canvext-text-height"));

            $(this).css({
                left: x, 
                top: y
            });
        });
        $.fn.canvext.window_width = $(window).width(); 
        $.fn.canvext.window_height = $(window).height(); 
    });

    $.fn.canvext.settings = {
        text_height: 20,
    };
})(window.canvext = window.canvext || {});
