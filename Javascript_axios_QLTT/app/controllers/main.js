var userServices = new UserServices();
var check = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function clear() {
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "1";

  getEle("loaiNgonNgu").value = "1";
  getEle("MoTa").value = "";

  getEle("tbTaikhoan").innerHTML = "";
  getEle("tbTaikhoan").className = "";
  getEle("tbTen").innerHTML = "";
  getEle("tbTen").className = "";
  getEle("tbPass").innerHTML = "";
  getEle("tbPass").className = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbEmail").className = "";
  getEle("tbHinhAnh").innerHTML = "";
  getEle("tbHinhAnh").className = "";
  getEle("tbLoaiND").innerHTML = "";
  getEle("tbLoaiND").className = "";
  getEle("tbloaiNN").innerHTML = "";
  getEle("tbloaiNN").className = "";
  getEle("tbmoTa").innerHTML = "";
  getEle("tbmoTa").className = "";
}

function getData() {
  userServices
    .getListApi()
    .then(function (result) {
      renderList(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
getData();

function renderList(list) {
  var contentHTML = "";

  list.forEach(function (user, index) {
    contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
             
             
              
                
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaUser(${
                      user.id
                    })">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaUser(${
                      user.id
                    })">Xóa</button>
                </td>
            <tr>
        `;
  });

  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  getEle("TaiKhoan").disabled = false;
  clear();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm User";

  var footer =
    '<button class="btn btn-success" onclick="addUser()">Thêm</button>';
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Thêm sản phẩm
 */
function kiemTraTrung(input, divID, mess) {
  var status = true;
  userServices
    .getListApi()
    .then(function (result) {
      result.data.forEach(function (user) {
        if (input === user.taiKhoan) {
          status = false;
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });

  if (status) {
    getEle(divID).innerHTML = "";
    getEle(divID).className = "";
    return true;
  }

  getEle(divID).innerHTML = mess;
  getEle(divID).className = "alert alert-danger";
  getEle(divID).style.width = "100%";
  return false;
}

function addUser() {
  /**
   * Dom lấy value từ các thẻ input
   */

  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  //   console.log(taiKhoan);
  //   console.log(hoTen);
  //   console.log(taiKhoan);

  var isValid = true;

  isValid &= kiemTraTrung(taiKhoan, "tbTaikhoan", "tai khoan đã tồn tại");
  isValid &= check.kiemTraRong(
    taiKhoan,
    "tbTaikhoan",
    "Tai khoan không được rỗng"
  );

  isValid &=
    check.kiemTraRong(hoTen, "tbTen", "Họ tên không được rỗng") &&
    check.kiemtrachuoi(hoTen, "tbTen", "Tên không được chứa số");

  isValid &= check.kiemtramatkhau(
    matKhau,
    "tbPass",
    "Mật khẩu không đúng định dạng"
  );

  isValid &= check.kiemtraemail(email, "tbEmail", "Email không đúng định dạng");

  isValid &= check.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "hình ảnh không được để trống"
  );

  isValid &= check.kiemtrakhoahoc(
    "loaiNguoiDung",
    "tbLoaiND",
    "Chưa chọn loại người dùng"
  );

  isValid &= check.kiemtrakhoahoc(
    "loaiNgonNgu",
    "tbloaiNN",
    "Chưa chọn loại ngôn ngữ"
  );

  isValid &= check.kiemTraRong(moTa, "tbmoTa", "Mô tả không được để trống");
  isValid &= check.kiemTraDoDai(moTa, "MoTa", "Không nhập quá 60 ký tự", 0, 60);

  var user = new User(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  if (isValid) {
    userServices
      .addApi(user)
      .then(function (result) {
        //Tắt modal
        document.getElementsByClassName("close")[0].click();
        //làm mới lại dữ liệu
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * Xóa sản phẩm
 */
function xoaUser(id) {
  userServices
    .deleteApi(id)
    .then(function () {
      getData();
      alert("xóa thành công!");
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Sửa sản phẩm
 */
function suaUser(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa";

  var footer = `<button class="btn btn-success" onclick="capNhat(${id})">Cập nhật</button>`;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  userServices
    .getByIdApi(id)
    .then(function (result) {
      //Show thông tin ra các thẻ input
      clear();
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;

      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Cập nhật sản phẩm
 */
function capNhat(id) {
  var taiKhoan = getEle("TaiKhoan").value;

  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  isValid &=
    check.kiemTraRong(hoTen, "tbTen", "Họ tên không được rỗng") &&
    check.kiemtrachuoi(hoTen, "tbTen", "Tên không được chứa số");

  // isValid &= check.kiemtrachuoi(hoTen, "tbTen", "Tên không được chứa số");

  isValid &= check.kiemtramatkhau(
    matKhau,
    "tbPass",
    "Mật khẩu không đúng định dạng"
  );

  isValid &= check.kiemtraemail(email, "tbEmail", "Email không đúng định dạng");

  isValid &= check.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "hình ảnh không được để trống"
  );

  isValid &= check.kiemtrakhoahoc(
    "loaiNguoiDung",
    "tbLoaiND",
    "Chưa chọn loại người dùng"
  );

  isValid &= check.kiemtrakhoahoc(
    "loaiNgonNgu",
    "tbloaiNN",
    "Chưa chọn loại ngôn ngữ"
  );

  isValid &= check.kiemTraRong(moTa, "tbmoTa", "Mô tả không được để trống");
  isValid &= check.kiemTraDoDai(moTa, "MoTa", "Không nhập quá 60 ký tự", 0, 60);

  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  if (isValid) {
    userServices
      .updateApi(user)
      .then(function (result) {
        alert("Cập nhật thành công");
        //tắt modal
        document.getElementsByClassName("close")[0].click();
        //làm mới lại data
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
