(function (markode){
    $.fn.markode = function(options){
        return this.each(function(){
            if (!$.data(this, "markode")){
                $.data(this, "markode", new Markode(this, options));
            }
        });
    }

    /*
     * The Markode constructor
     */
    function Markode(element, options){
        this.element = element;
        this.settings = $.extend({}, $.fn.markode.settings, options);
        this.can = $(this.element).canvext({
            width: 600,
            height: 400
        });
        this.selection_start = this.selection_end = -1;
        this.styles = [];
        var self = this; // We need self throught the constructor

        /* 
         * Create the main input on the Canvas
         */
        this.main_input = this.can.data("canvext").addInput(
            self.settings.input_x, 
            self.settings.input_y, 
            20,
            function(context, text, x, y, text_height, input_element){
                self.drawInput(context, text, x, y, text_height, input_element); 
            }
        );

        $(document).on("click", function(ev){
            if ($(ev.target).hasClass("markode-annotate-btn"))
            { 
                var markode = $(".canvext").data("markode"); 
                if (markode.selection_start != markode.selection_end)
                {
                    markode.annotate();
                    setReadonly(markode.main_input);
                    hideAnnotateButton(markode.main_input); // Get the button out of the way
                }    
            }
        });

        /*
         * The select event handler
         */
        $(this.main_input).on("select", function(e){
            if (e.target.selectionStart != e.target.selectionEnd)
            {
                hideAnnotateButton(self.main_input);
                self.selection_start = e.target.selectionStart;
                self.selection_end = e.target.selectionEnd;
                var text = $(this).val();
                var context = $(self.can).data("canvext").context;
                var start_x = context.measureText(text.substring(0, self.selection_start)).width;
                var halfway_x = context.measureText(text.substring(self.selection_start, self.selection_end)).width / 2.0;
                var btn_offset = (start_x + halfway_x) - $(this).outerWidth() / 2.0;
                showAnnotateButton(self.main_input, btn_offset);
            }
        });
        $(this.main_input).on("click", function(e){
            if (e.target.selectionStart == e.target.selectionEnd)
            {
                self.selection_start = self.selection_end = -1;
                hideAnnotateButton(self.main_input);
            }
        });

        // Set up event listeners for the share and clear buttons
        $("#btn-share").on("click", function(){
            var canvas = Tools.trim(self.can.data("canvext").canvas);
            var image = canvas.toDataURL("image/png");
            $.ajax({
                url: 'handler.php',
                method: "POST",
                data: {"img": image, "save": true},
                success: function(results){
                    var url = buildSharingURL(results);
                    $("#clipboard").val(url);
                    document.querySelector('#clipboard').select();
                }
            });
        });

        $("#btn-clear").on("click", function(){
            location.reload();
        });
    }

    function buildSharingURL(id)
    {
        var url = "http://" + window.location.hostname + "/canvext/image/" + id;
        return url;
    }

    function setReadonly(input)
    {
        $(input).attr("readOnly", true);
    }

    function showAnnotateButton(input, offset_x)
    {
        /*
         * Set up the tipso button
         */
        $(input).tipso({
            tooltipHover: true,
            background: '#111111',
            position: 'bottom',
            width: 30,
            speed: 200,
            manageShowHide: false
        });
        $(input).tipso('update', 'content', '<i class="markode-annotate-btn fa fa-pencil-square-o" aria-hidden="true"></i>');
        $(input).tipso('update', 'offsetX', offset_x);
        $(input).tipso('show');
    }

    function hideAnnotateButton(input)
    {
        $(input).tipso('hide', true); 
        $(input).tipso('destroy'); 
    }

    Markode.prototype.annotate = function()
    {
        var context = $(this.can).data("canvext").context;
        var start = this.selection_start;
        var end = this.selection_end;
        var text = $(this.main_input).val();
        var style = [start, end, 
            this.settings.colors[this.styles.length], null];
        var font_size = 15;
        if (start != end)
        {
            var start_x = context.measureText(text.substring(0, start)).width;
            var halfway_x = context.measureText(text.substring(start, end)).width / 2.0;

            var x = start_x + halfway_x + this.settings.input_x;
            var line_start_y = font_size + this.settings.input_y + this.settings.line_offset_y;
            var line_end_y = line_start_y + this.styles.length * this.settings.annotation_y_height;

            var self = this;
            var input = $(this.can)
                .data("canvext")
                .addInput(x - 10, line_end_y + font_size, font_size, function(context, text, x, y, text_height, input_element){
                    var canvext = self.can.data("canvext");
                    var data_canvext_y = parseFloat($(input_element).attr("data-canvext-y"));
                    var input_y = data_canvext_y + canvext.canvas.getBoundingClientRect().top + $(window).scrollTop()
                        - canvext.settings.text_height;
                    $(input_element).css({ "top": input_y });

                    var default_font = context.font;
                    context.font = font_size.toString() + "px courier new";
                    context.fillText(text, x, data_canvext_y - canvext.settings.text_height);
                    context.font = default_font;
                }); 

            this.selection_start = this.selection_end = -1;
            style[3] = input;
            this.styles.push(style);

            this.can.data("canvext").redraw();
            this.can.data("canvext").redraw(); // Do another one so that the new calculated y gets set
        }
    }

    /*
     * Draws the main big input. Gets called all the time to redraw the whole thing.
     */
    Markode.prototype.drawInput = function(context, text, x, y, text_height, input_element)
    {
        var default_color = context.fillStyle;
        var default_font = context.font;
        context.font = text_height + "px courier new";
        var running_x = 0;
        this.styles = this.styles.sort(function(a, b){
            return a[0] <b[0];
        });
        for (var i = 0; i < text.length; i++)
        {
            var custom_color_used = false;
            for (var j in this.styles)
            {
                if (i >= this.styles[j][0] && i < this.styles[j][1])
                {
                    context.fillStyle = this.styles[j][2]; 
                    custom_color_used = true;
                } 
            } 

            context.fillText(text[i], x + running_x, y);
            running_x += context.measureText(text[i]).width;
            context.fillStyle = default_color;
        } 

        var style_counter = 0;
        for (var j in this.styles)
        {
            var start = this.styles[j][0];
            var end = this.styles[j][1];
            var start_x = context.measureText(text.substring(0, start)).width;
            var halfway_x = context.measureText(text.substring(start, end)).width / 2.0;
            var input = this.styles[j][3];

            var x = start_x + halfway_x + this.settings.input_x;
            var line_start_y = y + this.settings.input_y + this.settings.line_offset_y;
            var line_end_y = line_start_y + (style_counter + 1) * this.settings.annotation_y_height;

            $(input).attr("data-canvext-y", line_end_y);

            context.setLineDash([1, 3]);
            context.beginPath();
            context.moveTo(x, line_start_y);
            context.lineTo(x, line_end_y);
            style_counter++;
            context.stroke();
            
        }
    }

    $.fn.markode.settings = {
        colors: ['blue', 'red', 'green', 'orange', 'purple'],
        input_x: 10,
        input_y: 20,
        line_offset_y: 10,
        annotation_y_height: 30
    };
})(window.markode = window.markode || {});
