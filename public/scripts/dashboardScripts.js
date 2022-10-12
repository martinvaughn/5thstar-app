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

(function() {
    const parseData = [];
    var fileName = "";
    function uploadDealcsv () {}; 

    /*------ Method for read uploded csv file ------*/
        uploadDealcsv.prototype.getCsv = function(e) {
        
            let input = document.getElementById('chartFile');
            input.addEventListener('change', function() {

            if (this.files && this.files[0]) {

                var myFile = this.files[0];
                // console.log(this.files[0].name)
                fileName = this.files[0].name;
                var reader = new FileReader();
                
                reader.addEventListener('load', function (e) {
                    
                    let csvdata = e.target.result; 
                    parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
                });
                
                reader.readAsBinaryString(myFile);
            }
        });
    }

    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        // let parsedata = [];

        let newLinebrk = data.split("\n");
        for(let i = 0; i < newLinebrk.length; i++) {

            parseData.push(newLinebrk[i].split(","))
        }

        console.log(parseData, "THIS IS ME PARSE DATA");
    }

    var parseCsv = new uploadDealcsv();
    parseCsv.getCsv();

    
    
    //SENT A POST METHODO TO THE SERVER ON CLICK
    $("#chartUpload").click(function() {
        
        parseData.shift();
        const customers = parseData.map(row => {
            return {
                name: row[0],
                email: row[1],
                datePurchase: row[2] 
            }
        })
        //Get the JobID
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
            error: function() {
                console.log("Fail to sent data - POST AJAX /DASHBOARD ");
            }
        });
    });
})

