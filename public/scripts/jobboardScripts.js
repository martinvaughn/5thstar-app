$(function() {

    //THe first Job ITEM on the overflow div always starts marked as whit background!
    var firstJobItem = document.getElementsByClassName("job-basic-info").item(0);
    $(firstJobItem).css("background-color", "#ffffff");

    //Set the values for the jobs detaisl
    $(".job-basic-info").click(function() {
        // Get the Information
        var title = $(this).find('h3.title').text();
        var company_name = $(this).find('h3.company_name').text();
        var candidate_required_location = $(this).find('span.candidate_required_location').text();
        var job_type = $(this).find('span.job_type').text();
        var description = $(this).find('div.description').text();
        var url = $(this).find('#url').text();
        var id = $(this).find('#id').text();

        //Set the Information
        $("#jobTitle").html(title);
        $("#jobCompany").html(company_name);
        $("#jobLocation").html(candidate_required_location);
        $("#jobDescription").html(description);
        $("#JobType").html(job_type);
        $("#JobURL").attr('href', url);
        $('#jobID').val(id);

        //The clicked div get a background color marked
        $(".job-basic-info").css("background-color", "#F6F6F8")
        $(this).css("background-color", "#ffffff");
    });

    //SENT A POST METHODO TO THE SERVER ON CLICK
    $("#buttonSave").click(function() {

        //Get the JobID
        var values = {
                job_id: $.trim($("#jobID").val()),
                _csrf: $("#token").val()
            }
            //using AJAX to post the click
        $.ajax({
            type: 'POST',
            url: '/saved',
            data: values,
            error: function() {
                console.log("Fail to sent data - POST AJAX /SAVED ");
            }
        });

        setTimeout(function() {
            //Update the had so it can count the jobs saved!
            $.get('/updatedNavCount', function(data) {
                $('#logged-in-nav').html(data);
            })
        }, 500)

    });
})