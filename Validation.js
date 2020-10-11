function Validation(){
    this.KiemTraDauVaoRong = function(value){
        if(value.trim() == ""){
            return true;
        }
        return false;
    }

    this.KiemTraEmail = function(value){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase()); // true or false
    }

    this.KiemTraSDT = function(value){
        var re = /^\d+$/;
        if(re.test(value) && value.length >=10)
        {
            return true;
        }
        return false;
    }
}