const videoBeforeAnimation = 300,
    numbersBeforeAnimation = 500,
    $window = $(window);

let windowWidth = $window.outerWidth(),
    numbersAnimated = false;

class Slider {

    $images;
    $descriptions;
    $activeImage;


    constructor($images, $descriptions, $controls) {
        this.$images = $images.find(".healthcare__slider--image");
        this.$descriptions = $descriptions.find(".healthcare__slider--info-description");
        let $first = this.$images.first();
        $first.addClass("image-active");
        this.$descriptions.first().addClass("description-active");
        this.$activeImage = $first;
        let thisSlider = this;
        $controls.find(".healthcare__slider--info-controls-prev").on("click", function () {
            thisSlider.prev();
        });
        $controls.find(".healthcare__slider--info-controls-next").on("click", function () {
            thisSlider.next();
        });

    }

    next() {
        this.$images.removeClass("image-active");
        if (this.$activeImage.next().length > 0) {
            this.$activeImage = this.$activeImage.next();
        } else {
            this.$activeImage = this.$images.first();
        }
        this.$activeImage.addClass("image-active");
        this.$descriptions.removeClass("description-active");
        this.$descriptions.eq(this.$activeImage.index()).addClass("description-active");
    }

    prev() {
        if (this.$activeImage.prev().length > 0) {
            this.$activeImage = this.$activeImage.prev();
        } else {
            this.$activeImage = this.$images.last();
        }
        this.$activeImage.addClass("image-active");
        this.$descriptions.removeClass("description-active");
        this.$descriptions.eq(this.$activeImage.index()).addClass("description-active");
    }

}


$(function () {
    let $videoWrappers = $(".js-wider"),
        scrollBarWidth = window.innerWidth - $window.width(),
        $numbers = $(".js-number"),
        $factsAnimationBreakpoint = $(".healthcare__facts").offset().top - numbersBeforeAnimation,
        $sliders = $(".js-slider");

    $sliders.each(function () {
        $this = $(this);
        new Slider(
            $this.find(".healthcare__slider--images"),
            $this.find(".healthcare__slider--info-descriptions"),
            $this.find(".healthcare__slider--info-controls")
        );
    })


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

        if (scroll >= $factsAnimationBreakpoint && !numbersAnimated) {
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