jQuery.noConflict();
jQuery(document).ready(function ($) {
    var scoreElement = $("#score");
    var scoreCount = 0;
    scoreElement.text(scoreCount);

    //https://gist.github.com/jtsternberg/c272d7de5b967cec2d3d
    var is_colliding = function ($div1, $div2) {
        // Div 1 data
        var d1_offset = $div1.offset();
        var d1_height = $div1.outerHeight(true);
        var d1_width = $div1.outerWidth(true);
        var d1_distance_from_top = d1_offset.top + d1_height;
        var d1_distance_from_left = d1_offset.left + d1_width;

        // Div 2 data
        var d2_offset = $div2.offset();
        var d2_height = $div2.outerHeight(true);
        var d2_width = $div2.outerWidth(true);
        var d2_distance_from_top = d2_offset.top + d2_height;
        var d2_distance_from_left = d2_offset.left + d2_width;

        var not_colliding = (d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

        // Return whether it IS colliding
        return !not_colliding;
    };


    function removeUpClass() {
        $(".diamond1").removeClass("diamond1-fadeOut");
        $("#runner").removeClass("bounce-runner");
    }

    function play() {
        $("#myModal").removeClass("left");
        //document.getElementById("myModal").style.display = "none";
        document.getElementById("bg-audio").play();
        $("#multi-background").css("animation-play-state", "running");
        $("#runner").css("animation-play-state", "running");
        $(".diamond1").css("animation-play-state", "running");
    }

    function pause() {
        document.getElementById("bg-audio").pause();
        $("#multi-background").css("animation-play-state", "paused");
        $("#runner").css("animation-play-state", "paused");
        $(".diamond1").css("animation-play-state", "paused");
    }

    //Play button click
    $("#play").click(function () {
        play();
    });

    //Pause button click
    $("#pause").click(function () {
        pause();
    });

    //Restart button click
    $("#restart").click(function () {
        scoreCount = 0;
        scoreElement.text(scoreCount);
        document.getElementById("bg-audio").play();
        $("#multi-background").css("animation-play-state", "running");
        $("#runner").css("animation-play-state", "running");
        $(".diamond1").css("animation-play-state", "running");    
        $("#myModal").removeClass("left");
    });

    //How to Play
    $("#howtoplay").click(function () {
        $("#myModal").addClass("left");
        $(".game-over").html("<label>Use Arrow Up and Arrow Down Key to play.</label><label>Click on PLAY Button to play</label>");
    });

    function gameOver() {
        $(".game-over").html(" <label>You Won!!</label><label> Click on RESTART Button to play again</label>")
    }



    //Key down and up events 
    document.addEventListener("keydown", function (event) {
        //event.preventDefault();
        const key = event.key;
        if (key === "ArrowUp") {
            $("#runner").addClass("bounce-runner");
            var is_colid = is_colliding($("#runner"), $(".diamond1"))
            //var is_colid = is_colliding($(".diamond1"), $("#runner"));
            if (is_colid === true) {
                $(".diamond1").addClass("diamond1-fadeOut");
                scoreCount = scoreCount + 1;
                scoreElement.text(scoreCount);
                if (scoreCount === 10) {     
                    scoreCount = 0;
                    scoreElement.text(scoreCount);
                    $("#myModal").addClass("left");
                    gameOver();
                    pause();
                  
                }
            }
            setTimeout(removeUpClass, 1000);
        }
        if (key === "ArrowDown") {
            $(".diamond1").removeClass("diamond1-fadeOut");
            $("#runner").removeClass("bounce-runner");
        }
    });
});