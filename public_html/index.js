/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function showData() {
//    alert("red");
    var token = " ";
    var dbname = "crimeRecords";
    var relationName = "criminalData";
    var recordNumber = document.getElementById("criminalId").value;
    var jsonStr = {
        criminalId: recordNumber
    };
    var reqString = createGETRequest(token, dbname, relationName, JSON.stringify(jsonStr));
    alert(reqString);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(reqString,
            "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});

    var data = JSON.stringify(resultObj);

    var res = data.split("\"");
    var criminalIdContainer = document.getElementById("criminalid");
    criminalIdContainer.innerHTML = res[10].replace("\\", "");

    var nameContainer = document.getElementById("name");
    nameContainer.innerHTML = res[22].replace("\\", "");

    var ageContainer = document.getElementById("age");
    ageContainer.innerHTML = res[26].replace("\\", "");

    var contactContainer = document.getElementById("contact");
    contactContainer.innerHTML = res[18].replace("\\", "");

    var addressContainer = document.getElementById("address");
    addressContainer.innerHTML = res[6].replace("\\", "");

    var dobContainer = document.getElementById("dob");
    dobContainer.innerHTML = res[14].replaceAll("\\", "");

    var underContainer = document.getElementById("undersection");
    underContainer.innerHTML = res[30].replace("\\", "");

}



function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}

function validateAndGetFormData() {

    var criminalId = document.getElementById("inputCriminalId").value;
    var name = document.getElementById("inputName").value;
    var age = document.getElementById("inputAge").value;
    var contact = document.getElementById("inputContact").value;
    var address = document.getElementById("inputAddress").value;
    var dob = document.getElementById("inputDob").value;
    var section = document.getElementById("inputSection").value;

    var jsonStrObj = {
        criminalId: criminalId,
        name: name,
        age: age,
        contact: contact,
        address: address,
        dob: dob,
        underSection: section
    };
    return JSON.stringify(jsonStrObj);
}

function registerCandidate() {

    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(" ",
            jsonStr, "crimeRecords", "criminalData");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    alert("INSERTED " + JSON.stringify(resultObj));
}

function updateData() {
    var token = " ";
    var dbname = "crimeRecords";
    var relationName = "criminalData";
    var criminalId = document.getElementById("inputCriminalId").value;
    var name = document.getElementById("inputName").value;
    var age = document.getElementById("inputAge").value;
    var contact = document.getElementById("inputContact").value;
    var address = document.getElementById("inputAddress").value;
    var dob = document.getElementById("inputDob").value;
    var section = document.getElementById("inputSection").value;
    var jsonObj = {
        name: name,
        age: age,
        contact: contact,
        address: address,
        dob: dob,
        underSection: section
    };
    var reqString = createUPDATERecordRequest(token, JSON.stringify(jsonObj), dbname, relationName, criminalId-100000+2);
    alert(reqString);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(reqString,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultObj));

}