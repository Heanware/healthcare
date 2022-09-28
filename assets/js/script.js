const videoBeforeAnimation = 300,
    numbersBeforeAnimation = 500,
    $window = $(window);

let windowWidth = $window.outerWidth(),
    numbersAnimated = false;

class Slider {

    $images;
    $descriptions;
    $activeImage;
    $slideNumber;
    isChangingSlide = false;

    constructor($images, $descriptions, $controls) {
        this.$images = $images.find(".healthcare__slider--image");
        this.$descriptions = $descriptions.find(".healthcare__slider--info-description");
        this.$descriptions.first().addClass("description-active");
        this.$activeImage = this.$images.first();
        this.$activeImage.addClass("image-active");

        let thisSlider = this,
            $arrowPrev = $controls.find(".healthcare__slider--info-controls-prev"),
            $arrowNext = $controls.find(".healthcare__slider--info-controls-next");

        this.$slideNumber = $controls.find(".js-slides-counter");
        this.$slideNumber.text((this.$activeImage.index() + 1).toString().padStart(2, "0"));

        $arrowPrev.on("click", function () {
            if (!thisSlider.isChangingSlide) {
                thisSlider.blockControls();
                thisSlider.prev();
                thisSlider.afterChange("image-active-right");
            }
        });

        $arrowNext.on("click", function () {
            if (!thisSlider.isChangingSlide) {
                thisSlider.blockControls();
                thisSlider.next();
                thisSlider.afterChange("image-active");
            }
        });
    }

    afterChange($class) {
        this.$images.removeClass("image-active image-active-right");
        this.$activeImage.addClass($class);
        this.$descriptions.removeClass("description-active");
        this.$descriptions.eq(this.$activeImage.index()).addClass("description-active");
        this.$slideNumber.text((this.$activeImage.index() + 1).toString().padStart(2, "0"));
    }

    next() {
        let $next = this.$activeImage.next();
        if ($next.length > 0) {
            this.$activeImage = $next;
        } else {
            this.$activeImage = this.$images.first();
        }
    }

    prev() {
        let $prev = this.$activeImage.prev();
        if ($prev.length > 0) {
            this.$activeImage = $prev;
        } else {
            this.$activeImage = this.$images.last();
        }
    }

    blockControls() {
        let thisSlider = this;
        thisSlider.isChangingSlide = true;
        setTimeout(function () {
            thisSlider.isChangingSlide = false;
        }, 1000);
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
                $video.css("max-width", "");
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
});