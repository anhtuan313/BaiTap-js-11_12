// function getEle(id) {
//   return document.getElementById(id);
// }

function Validation() {
  // this.getEle = function (id) {
  //   return document.getElementById(id);
  // };

  this.kiemTraRong = function (input, divID, mess) {
    if (input === "") {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    } else {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    }
  };
  this.kiemTraDoDai = function (input, divID, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      getEle(divID).style.width = "100%";
      return true;
    }
    getEle(divID).innerHTML = mess;
    getEle(divID).className = "alert alert-danger";
    getEle(divID).style.width = "100%";
    return false;
  };
  this.kiemTraLuong = function (input, divID, mess, min, max) {
    if (input >= min && input <= max) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    }
    getEle(divID).innerHTML = mess;
    getEle(divID).className = "alert alert-danger";
    getEle(divID).style.width = "100%";
    return false;
  };

  this.kiemtrachuoi = function (input, divID, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    }
  };
  this.kiemtraemail = function (input, divID, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    }
  };
  this.kiemtramatkhau = function (input, divID, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(letter)) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    }
  };
  this.kiemtrangaysinh = function (input, divID, mess) {
    var letter = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (input.match(letter)) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    }
  };
  this.kiemtrakhoahoc = function (idSelect, divID, mess) {
    if (getEle(idSelect).selectedIndex != 0) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    }
    getEle(divID).innerHTML = mess;
    getEle(divID).className = "alert alert-danger";
    getEle(divID).style.width = "100%";

    return false;
  };
  this.kiemtradiem = function (input, divID, mess) {
    var letter = /^[0-9]+$/;
    if (input.match(letter)) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).className = "alert alert-danger";
      getEle(divID).style.width = "100%";
      return false;
    }
  };

  this.kiemtraTaiKhoan = function (input, divID, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].account === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divID).innerHTML = "";
      getEle(divID).className = "";
      return true;
    }

    getEle(divID).innerHTML = mess;
    getEle(divID).className = "alert alert-danger";
    getEle(divID).style.width = "100%";
    return false;
  };
}
