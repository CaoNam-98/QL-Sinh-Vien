
function XepLoaiHocTap(DTB){
    if(DTB >= 0 && DTB < 5){
        return "Yếu";
    }else if(DTB >= 5 && DTB < 7){
        return "Trung Bình";
    }else if(DTB >= 7 && DTB < 8){
        return "Khá"
    }else if(DTB >= 8 && DTB < 9){
        return "Giỏi";
    }else{
        return "Xuất Sắc";
    }
}

function DanhSachSinhVien(){
    this.DSSV = [];

    this.ThemSinhVien = function(svThem){
        this.DSSV.push(svThem);
    }

    this.XoaSinhVien = function(svXoa){
        for(var i = 0; i < svXoa.length; i++){
            for(var j = 0; j < this.DSSV.length; j++){
                if(svXoa[i] == this.DSSV[j].masv){
                    this.DSSV.splice(j,1);
                }
            }
        }
    }


    this.TimKiemSV = function(timkiemsv){
        var SearchDSSV = new DanhSachSinhVien();
        for(var i = 0; i < this.DSSV.length; i++){
            if(this.DSSV[i].hoten.toLowerCase().trim().search(timkiemsv.toLowerCase().trim()) != -1){
                SearchDSSV.ThemSinhVien(danhSachSinhVien.DSSV[i]);
            }
        }
        return SearchDSSV;
    }

    this.Search = function(masv){
        for (var i = 0; i < this.DSSV.length; i++){
            if(this.DSSV[i].masv === masv){
                return this.DSSV[i];
            }
        }
        return -1;
    }

    this.CapNhatSinhVien = function(sinhvien){
        for(var i = 0; i < this.DSSV.length; i++){
            if(this.DSSV[i].masv === sinhvien.masv){
                this.DSSV[i].hoten = sinhvien.hoten;
                this.DSSV[i].cmnd = sinhvien.cmnd;
                this.DSSV[i].sdt = sinhvien.sdt;
                this.DSSV[i].email = sinhvien.email;
                this.DSSV[i].toan = sinhvien.toan;
                this.DSSV[i].ly = sinhvien.ly;
                this.DSSV[i].hoa = sinhvien.hoa;
                var DTB = ((Number(sinhvien.toan) + Number(sinhvien.ly) + Number(sinhvien.hoa))/3).toFixed(2);
                this.DSSV[i].DTB = DTB;
                this.DSSV[i].XepLoai = XepLoaiHocTap(DTB);
            }
        }
    }
}