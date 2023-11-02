// Register Start
kullanicilar=[];
$(".reg").click(function (e) {
    e.preventDefault();
    let i_register = $(".i_register").val();
    let i_regPassword = $(".i_regPassword").val();
    let i_regPassword2 = $(".i_regPassword2").val();
    if (i_regPassword =="" || i_regPassword2 =="" || i_register =="") {
        $(".usermes").show();
        $(".usermes").text("Boş bırakılamaz!");
    }
    else if (i_regPassword==i_regPassword2){
        try {
            let obj = JSON.parse(localStorage.getItem("kullanıcılar"));
            for (let i = 0; i < obj.length; i++) {
                if (i_register == obj[i].kullanıcıAdı) {
                    cont=false
                    $(".usermes").text("Kayıtlı Kullanıcı");
                    $(".usermes").show();
                    break;
                }
                else{
                    cont=true
                }
            }
            if(cont==true){
                obj.push({kullanıcıAdı:i_register,şifre:i_regPassword});
                localStorage.setItem("kullanıcılar",JSON.stringify(obj));
                $(".usermes").text("Kayıt Oluşturuldu girişe yölendiriyosunuz");
                $(".usermes").show();
                setTimeout(function(){
                window.location.href="index.html"
            },3000);
            }
        } catch (error) {
            localStorage.setItem("kullanıcılar",JSON.stringify(kullanicilar));
            let obj = JSON.parse(localStorage.getItem("kullanıcılar"));
            obj.push({kullanıcıAdı:i_register,şifre:i_regPassword});
            localStorage.setItem("kullanıcılar",JSON.stringify(obj));
            $(".usermes").text("Kayıt Oluşturuldu girişe yölendiriyosunuz");
            $(".usermes").show();
            setTimeout(function(){
                window.location.href="index.html"
            },3000);
        }
    }
    else{
        $(".usermes").text("Şifreler eşit değil!");
        $(".usermes").show();
    }
});
// Register End

// Login Start
$(".okey").click(function (e) { 
    e.preventDefault();
    let i_login=$(".i_login").val();
    let i_loginpass=$(".i_loginpass").val();
    console.log(i_login);
    console.log(i_loginpass);
    if (i_login =="" || i_loginpass =="") {
        $(".loginmes").show();
        $(".loginmes").text("Boş bırakılamaz!");
    }
    else{
        let obj = JSON.parse(localStorage.getItem("kullanıcılar"));
        for (let i = 0; i < obj.length; i++) {
            if (i_login == obj[i].kullanıcıAdı && i_loginpass == obj[i].şifre) {
                contlogin=false
                setTimeout(function(){
                    window.location.href="process.html"
                },1000);
                break;
            }
            else{
                contlogin=true
            }
        }
        if(contlogin==true){
            $(".loginmes").text("Hatalı Kulanıcı veya Şifre");
            $(".loginmes").show();
        } 
    }    
});
// Login End

//Process start
if(localStorage.length==0){
    localStorage.setItem("bakiye","5000");
}
else{
    for( i=0; i<localStorage.length; i++){
        if(localStorage.key(i)=="bakiye"){
            break;
        }
        else{
            localStorage.setItem("bakiye","5000");
        }
        } 
    }

let bakiye = Number(localStorage.getItem("bakiye"));    
$(".balance").text(`Güncel Bakiyeniz: ${bakiye} ₺`);
    
$(".process").click(function (e) { 
    e.preventDefault();
    let select_op = $("#select_op").val();
    let range_process = Number($(".range_process").val());
    if(select_op=="paracek"){
        if(range_process%10 == 0){
            if(range_process>0 && range_process<=bakiye){
                mess=true
                bakiye = Number(localStorage.getItem("bakiye"));
                let totalprocess= (bakiye-range_process);
                localStorage.setItem("bakiye",totalprocess);
                $(".balance").text(`Güncel Bakiyeniz: ${totalprocess} ₺`);
            }
            else if(range_process==""){
                mess=false
                $(".process_mes").text("Boş Bırakılamaz!");
            }
            else if(range_process<=0){
                mess=false
                $(".process_mes").text("Hatalı Miktar!");
            }
            else{
                mess=false
                $(".process_mes").text("Yetersiz Bakiye");
            }
        }
        else{
            mess=false
            $(".process_mes").text("10 ve 10'un katları giriniz!");
        }
        if(mess==true){
            $(".process_mes").hide();
        }
        else{
            $(".process_mes").show();
        }
       
    }
    else if(select_op=="parayatır"){
     if(range_process%5==0 && range_process>0){
        mess=true
        bakiye = Number(localStorage.getItem("bakiye"));
        let totalprocess = bakiye+range_process;
        localStorage.setItem("bakiye",totalprocess);
        $(".balance").text(`Güncel Bakiyeniz: ${totalprocess} ₺`);
     }
     else if(range_process==""){
        mess=false
        $(".process_mes").text("Boş bırakılamaz!");
     }
     else if(range_process<0){
         mess=false
         $(".process_mes").text("Hatalı miktar!");
     }
     else{
        mess=false
        $(".process_mes").text("5 ve 5'in katları giriniz!");
     }
     if(mess==true){
        $(".process_mes").hide();
     }
     else{
        $(".process_mes").show();
     }
    }
});