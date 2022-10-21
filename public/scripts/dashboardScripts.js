document.querySelectorAll('.accordion__button').forEach(button => {
    button.addEventListener("click", () => {
        const accordionContent = button.nextElementSibling;
        button.classList.toggle('accordion__button--active');
        if (button.classList.contains('accordion__button--active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.maxHeight = 0;
        };
    });
});

$(function() {
    const parseData = [];
    var fileName = "";
    function uploadDealcsv () {}; 
    /*------ Method for read uploded csv file ------*/
    uploadDealcsv.prototype.getCsv = function(e) {
        let input = document.getElementById('chartFile');
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var myFile = this.files[0];
                fileName = this.files[0].name;
                console.log(myFile, fileName)
                var reader = new FileReader();
                reader.addEventListener('load', function (e) {   
                    let csvdata = e.target.result; 
                    console.log(csvdata)
                    parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
                });
                reader.readAsBinaryString(myFile);
            }
        });
    }

    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {
        let newLinebrk = data.split("\n");
        for(let i = 0; i < newLinebrk.length; i++) {
            parseData.push(newLinebrk[i].split(","))
        }
    }

    var parseCsv = new uploadDealcsv();
    parseCsv.getCsv();  
    
    //SENT A POST METHODO TO THE SERVER ON CLICK
    $("#chart-upload").click(function() {
        const loader = document.getElementById('loader');
        const uploadButton = document.getElementById("chart-upload");
        const successMsg = document.getElementById("success-p");
        loader.style.display = "block";
        uploadButton.style.display = "none";
        parseData.shift();
        const customers = parseData.map(row => {
            return {
                name: row[0],
                email: row[1],
                datePurchased: row[2] 
            }
        })

        console.log(customers, "CUSTIGNIADNUENFUNBQEIOU")
        var values = {
                customers: customers,
                _csrf: $("#token").val()
            }
            //using AJAX to post the click
        $.ajax({
            type: 'POST',
            url: '/dashboard',
            data: {
                customers: JSON.stringify(customers),
                fileName: fileName,
                _csrf: $("#token").val()
            },
            success: function() {
                // console.log("SHUCKS")
                loader.style.display = "none";
                uploadButton.style.display = "block";
                successMsg.style.display = "block";
            },
            error: function() {
                console.log("Failed to send data - POST AJAX /DASHBOARD ");
            }
        })
    });
});



