(function() {
    setupNextBackButtons();

    var levelButtons = $('.adv_btn');

    function setActiveByElement(button) {
        levelButtons.each(function() {
            $(this).removeClass('active').removeClass('bg-charlotte-gold');
        });
        $(button).addClass('active').addClass('bg-charlotte-gold');
        allowNextButton();
    }

    levelButtons.each(function() {
        $(this).click(function() {
            deleteAnswer('activity-planned-preset');
            storeAnswer('activity-level-code', this.dataset.code);
            setActiveByElement($(this));
        }.bind(this));
    });

    var activityLevelCode = getAnswer('activity-level-code');
    if (activityLevelCode) {
        levelButtons.each(function() {
            let currentButton = $(this);
            if (currentButton.attr('data-code') == activityLevelCode) {
                setActiveByElement(currentButton);
                disablePageInteractivity(); //scrolling can interfere with the hack
                
                setTimeout(function() {
                    // this is more or less a hack
                    window.location.href = '#slide' + currentButton.attr('data-index');
                }, 1000);

                enablePageInteractivity();
            }
        })
    }
})();