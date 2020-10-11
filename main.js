var danhSachSinhVien = new DanhSachSinhVien();
var Validate = new Validation();

//GetStorage();

SinhVien.prototype.TinhDTB = function(){
    this.DTB = ((Number(this.toan) + Number(this.ly) + Number(this.hoa))/3).toFixed(2);
}

SinhVien.prototype.XepLoaiHocTap = function(){
    if(this.DTB >= 0 && this.DTB < 5){
        this.XepLoai = "Yếu";
    }else if(this.DTB >= 5 && this.DTB < 7){
        this.XepLoai = "Trung Bình";
    }else if(this.DTB >= 7 && this.DTB < 8){
        this.XepLoai = "Khá"
    }else if(this.DTB >= 8 && this.DTB < 9){
        this.XepLoai = "Giỏi";
    }else{
        this.XepLoai = "Xuất Sắc";
    }
}

function DomID(id){
    var element = document.getElementById(id).value;
    return element;
}

function ThemSinhVien(){
    var masv = DomID("masv");
    var hoten = DomID("hoten");
    var cmnd = DomID("cmnd");
    var sdt = DomID("sdt");
    var email = DomID("email");
    var diemToan = DomID("toan");
    var diemLy = DomID("ly");
    var diemHoa = DomID("hoa");
    var loi = 0;
    if(KiemTraRong("masv", masv) == true){
        loi++;
    }
    if(KiemTraRong("hoten", hoten) == true){
        loi++;
    }
    if(KiemTraRong("cmnd", cmnd) == true){
        loi++;
    }

    if(Validate.KiemTraSDT(sdt) == true){
        document.getElementById("sdt").style.borderColor = "green";
    }else{
        loi++;
        document.getElementById("sdt").style.borderColor = "red";
    }

    if(Validate.KiemTraEmail(email) == true){
        document.getElementById("email").style.borderColor = "green";
    }else{
        loi++;
        document.getElementById("email").style.borderColor = "red";
    }

    if(Validate.KiemTraDauVaoRong(diemToan) == true || diemToan < 0 || diemToan > 10){
        loi++;
        document.getElementById("toan").style.borderColor = "red";
    }else{
        document.getElementById("toan").style.borderColor = "green";
    }

    if(Validate.KiemTraDauVaoRong(diemLy) == true || diemLy < 0 || diemLy > 10){
        loi++;
        document.getElementById("ly").style.borderColor = "red";
    }else{
        document.getElementById("ly").style.borderColor = "green";
    }

    if(Validate.KiemTraDauVaoRong(diemHoa) == true || diemHoa < 0 || diemHoa > 10){
        loi++;
        document.getElementById("hoa").style.borderColor = "red";
    }else{
        document.getElementById("hoa").style.borderColor = "green";
    }

    if(loi !== 0){
        return;
    }
    var sinhvien = new SinhVien(masv, hoten, cmnd, sdt, email, diemToan, diemLy, diemHoa);
    danhSachSinhVien.ThemSinhVien(sinhvien);
    sinhvien.TinhDTB();
    sinhvien.XepLoaiHocTap();
    CapNhatDSSV(danhSachSinhVien);
}

function KiemTraRong(ID, valueID){
    if(Validate.KiemTraDauVaoRong(valueID) == true){
        document.getElementById(ID).style.borderColor = "red";
        return true;
    }else{
        document.getElementById(ID).style.borderColor = "green";
        return false;
    }
}

function CapNhatDSSV(DanhSachSinhVien){
    var listSV = document.getElementById("tbodySinhVien");
    console.log(listSV);
    listSV.innerHTML = ""; // Xoá hết tất cả các <tr><td>..</td></tr> bên trong.
    for(var i = 0; i < DanhSachSinhVien.DSSV.length; i++){
        // lấy thông tin sinh viên từ mảng sinh viên
        var sv = DanhSachSinhVien.DSSV[i];
        // Tạo thẻ tr
        var trSinhVien = document.createElement("tr");
        trSinhVien.id = DanhSachSinhVien.DSSV[i].masv;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick", "ChinhSuaSinhVien('"+DanhSachSinhVien.DSSV[i].masv+"')") // Cài đặt onclick là 1 hàm. Thêm dấu '' để lấy chuỗi ra.
        // Tạo thẻ td và filter dữ liệu từ sinh viên
        var tdCheckBox = document.createElement("td"); //<td></td>
        var checkBox = document.createElement("input");
        checkBox.setAttribute("class","ckboxMaSV"); // gán class trong input là ckboxMaSV
        checkBox.setAttribute("type","checkbox"); // gán type trong input là ckboxMaSV
        checkBox.setAttribute("value",sv.masv); // gán value trong input là masv
        var tdMaSV = TaoTheTD("MaSV", sv.masv);
        var tdHoTen = TaoTheTD("HoTen", sv.hoten);
        var tdCMND = TaoTheTD("CMND", sv.cmnd);
        var tdSDT = TaoTheTD("SDT", sv.sdt);
        var tdEMAIL = TaoTheTD("Email", sv.email);
        var tdDTB = TaoTheTD("DTB", sv.DTB);
        var tdXepLoai = TaoTheTD("XEPLOAI", sv.XepLoai);
        // Append các td vào tr
        tdCheckBox.appendChild(checkBox);
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdSDT);
        trSinhVien.appendChild(tdEMAIL);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
        // Append các tr vào tbody
        listSV.appendChild(trSinhVien);
    }
}

function TaoTheTD(className, value){
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function SetStorage(){
    // Chuyển đổi mảng danh sách sinh viên thành chuỗi json
    var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    // Rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}

function GetStorage(){
    // lấy ra chuỗi Json là mảng danhSachSinhVien thông qua tên DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    var MangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhSachSinhVien.DSSV = MangDSSV;
    CapNhatDSSV(danhSachSinhVien);
}

function XoaSinhVien(){
    var listCheckBox = document.getElementsByClassName("ckboxMaSV"); // trả về 1 mảng để lấy độ dài
    console.log(listCheckBox);
    var listSinhVienXoa = [];
    for (var i = 0; i < listCheckBox.length; i++){
       
        if(listCheckBox[i].checked){ // Kiểm tra xem nó có được chọn để xoá hay không.
            listSinhVienXoa.push(listCheckBox[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(listSinhVienXoa);
    CapNhatDSSV(danhSachSinhVien);
}

function TimKiemSinhVien(){
    var tuKhoa = document.getElementById("tukhoa").value;
    var List = danhSachSinhVien.TimKiemSV(tuKhoa);
    CapNhatDSSV(List);
}

function ChinhSuaSinhVien(searchmasv){
    var SinhVienTimKiem = danhSachSinhVien.Search(searchmasv);
    if(SinhVienTimKiem != -1){
        document.getElementById("masv").value = SinhVienTimKiem.masv;
        document.getElementById("hoten").value = SinhVienTimKiem.hoten;
        document.getElementById("cmnd").value = SinhVienTimKiem.cmnd;
        document.getElementById("sdt").value = SinhVienTimKiem.sdt;
        document.getElementById("email").value = SinhVienTimKiem.email;
        document.getElementById("toan").value = SinhVienTimKiem.toan;
        document.getElementById("ly").value = SinhVienTimKiem.ly;
        document.getElementById("hoa").value = SinhVienTimKiem.hoa;
    }
}

function LuuThongTin(){
    var masv = DomID("masv");
    var hoten = DomID("hoten");
    var cmnd = DomID("cmnd");
    var sdt = DomID("sdt");
    var email = DomID("email");
    var diemToan = DomID("toan");
    var diemLy = DomID("ly");
    var diemHoa = DomID("hoa");
    var loi = 0;
    if(KiemTraRong("masv", masv) == true){
        loi++;
    }
    if(KiemTraRong("hoten", hoten) == true){
        loi++;
    }
    if(KiemTraRong("cmnd", cmnd) == true){
        loi++;
    }

    if(Validate.KiemTraSDT(sdt) == true){
        document.getElementById("sdt").style.borderColor = "green";
    }else{
        loi++;
        document.getElementById("sdt").style.borderColor = "red";
    }

    if(Validate.KiemTraEmail(email) == true){
        document.getElementById("email").style.borderColor = "green";
    }else{
        loi++;
        document.getElementById("email").style.borderColor = "red";
    }

    if(Validate.KiemTraDauVaoRong(diemToan) == true || diemToan < 0 || diemToan > 10){
        loi++;
        document.getElementById("toan").style.borderColor = "red";
    }else{
        document.getElementById("toan").style.borderColor = "green";
    }

    if(Validate.KiemTraDauVaoRong(diemLy) == true || diemLy < 0 || diemLy > 10){
        loi++;
        document.getElementById("ly").style.borderColor = "red";
    }else{
        document.getElementById("ly").style.borderColor = "green";
    }

    if(Validate.KiemTraDauVaoRong(diemHoa) == true || diemHoa < 0 || diemHoa > 10){
        loi++;
        document.getElementById("hoa").style.borderColor = "red";
    }else{
        document.getElementById("hoa").style.borderColor = "green";
    }

    if(loi !== 0){
        return;
    }
    var sinhvienUpdate = new SinhVien(masv, hoten, cmnd, sdt, email, diemToan, diemLy, diemHoa);
    danhSachSinhVien.CapNhatSinhVien(sinhvienUpdate);
    CapNhatDSSV(danhSachSinhVien);
}