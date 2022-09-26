const videoBeforeAnimation = 300,
    $window = $(window);

let windowWidth = $window.outerWidth(),
    numbersAnimated = false;

$(function () {
    let $videoWrappers = $(".js-wider"),
        scrollBarWidth = window.innerWidth - $window.width(),
        $numbers = $(".js-number"),
        $factsBottomBorder = $(".healthcare__facts").offset().top - 500;

    console.log($factsBottomBorder);

    $window.on("scroll", function () {
        let scroll = $(this).scrollTop();

        $videoWrappers.each(function () {
            let $videoWrapper = $(this),
                offset = $videoWrapper.offset().top,
                width = windowWidth - scrollBarWidth,
                $video = $videoWrapper.find("video");
            if (scroll > offset - videoBeforeAnimation) {
                $video.css("max-width", width + "px");
            } else {
                $video.css("max-width", "calc(100vw - 120px)");
            }
        });
        if (scroll >= $factsBottomBorder && !numbersAnimated) {
            animateNumbers();
        }
    });

    function animateNumbers() {
        numbersAnimated = true;
        $numbers.each(function () {
            let $this = $(this);
            $this.easy_number_animate({
                start_value: 0,
                end_value: $this.data("number"),
                duration: 800,
                delimiter: '',
                after: function () {
                    let text;
                    if ($this.data("after")) {
                        text = $this.text() + $this.data("after");
                    } else if ($this.data("before")) {
                        text = $this.data("before") + $this.text();
                    }
                    $this.text(text);
                }
            });
        });
    }
})
;