var shoot = document.getElementById("shoot");
var ogrenciler = ["Ahmet Efe", "Azra", "Bilgesu", "Burak", "Cafer", "Cagatay", "Defne", "Deniz", "Dogukan", "Eda", "Elif Sulo","Elif", "Ece", "Fatih", "Melis", "Nihat", "Selenay", "Su Diyar", "Yusuf", "Arda", "Onurkan", "Ege", "Fatma", "Berrak", "Cem", "Muhammet Emir", "Maan Martu"];

shoot.addEventListener("click", ()=>{
	var katil = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];
	var maktul = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];
	alert(`Katiller sizi! Al iste, ${katil} ${maktul} arkadasinizi oldurdu.`);
});
