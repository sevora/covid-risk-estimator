(function() {
    setupNextBackButtons();

    var maskSlider = $('#maskSlider');
    var maskSliderValue = $('#sliderValue');
    var maskButtons = $('.maskBtn');
    var maskCodeAnswer = getAnswer('mask-code');
    var maskPercentageAnswer = getAnswer('mask-percentage');

    function checkIfDone() {
        if (getAnswer('mask-code') && getAnswer('mask-percentage')) return true;
    }

    function setActiveByCode(code) {
        maskButtons.each(function() {
            if (this.dataset.code == code) {
                $(this).removeClass('bg-dirty-white').addClass('bg-beige');
            } else {
                $(this).addClass('bg-dirty-white').removeClass('bg-beige');
            }
        });
    }

    maskSlider.on('input', function() {
        let percentage = $(this).val() + '%';
        maskSliderValue.val(percentage);
        storeAnswer('mask-percentage', percentage);
        if (checkIfDone()) allowNextButton();
    });

    maskSliderValue.change(function() {
        let percentage = $(this).val();
        maskSlider.val(percentage.replace('%', ''))

    });

    maskButtons.each(function() {
        $(this).click(function(event) {
            var maskCode = this.dataset.code;
            storeAnswer('mask-name', this.dataset.name);
            storeAnswer('mask-code', maskCode);
            setActiveByCode(maskCode);
            if (checkIfDone()) allowNextButton();
        }.bind(this));
    });

    if (maskPercentageAnswer) {
        maskSlider.val(parseInt(maskPercentageAnswer.replace('%', '')));
        maskSliderValue.val(maskPercentageAnswer);
        console.log(maskPercentageAnswer)
    } else {
        // default values for this page
        maskSlider.val(50);
        maskSliderValue.val('50%');
        storeAnswer('mask-percentage', '50%');
    }

    if (maskCodeAnswer) setActiveByCode(maskCodeAnswer);
    if (checkIfDone()) allowNextButton();
})();
