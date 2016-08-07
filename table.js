

$(document).ready(function() {
    test();
});

function test(){
    $("#list_badges").simpletable({
        getURL : function(){
            return "https://reqres.in/api/users";
        },
        dataFormatter : function(dataraw){
            return dataraw.data;
        },
        deleteURL : function(idPrime){
           return "https://reqres.in/api/users/"+idPrime;
        },
        editURL : function(idPrime){
            return "https://reqres.in/api/users/"+idPrime;
        },
        addURL : function(idPrime){
            return "https://reqres.in/api/users";
        },
        customRenderView : {
            avatar : function(rowNum, idPrime, dataValue){
                //src='"+ badgeAccess.getBadgeImage(appId,idPrime) +"'
                return "<img class='text-center' src='"+dataValue+"' alt='your image' />";
            }
        },
        customRenderEdit : {
            avatar : function(rowNum, idPrime, dataValue){
                return "<input type=\"file\" name=\"pic\" id=\"avatarimg\" accept=\"image/*\">";
            }
        },
        customSave : {
            avatar : function(rowNum, idPrime){
                var photo = document.getElementById("avatarimg");
                // the file is the first element in the files property
                var file = photo.files[0];

                console.log(file);
                return file;
            }
        },
        format : "json"
    });
}