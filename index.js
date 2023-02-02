const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
let final2014 = fifaData.filter(e => (e.Year === 2014 && e.Stage==='Final'))
console.log(final2014[0]['Home Team Name'])
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(final2014[0]['Away Team Name'])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(final2014[0]['Home Team Goals'])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(final2014[0]['Away Team Goals'])
//(e) 2014 Dünya kupası finali kazananı*/
if (final2014[0]['Home Team Goals'] > final2014[0]['Away Team Goals']){
	console.log(`Kazanan ${final2014[0]['Home Team Name']}`)
} else {
	console.log(`Kazanan ${final2014[0]['Away Team Name']}`)
}


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	return data.filter(i=>i.Stage==='Final')
}
console.log(Finaller(fifaData))

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, cbFinaller) {
	let years = [];
	cbFinaller(arr).forEach(i=>years.push(i.Year));
	return years;
}
console.log(Yillar(fifaData,Finaller))


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data, cbFinaller) {
	// const kazananlar = [];
	// cbFinaller(data).forEach(i=>{
	// 	if(i['Home Team Goals'] > i['Away Team Goals']){
	// 		kazananlar.push(i['Home Team Name'])
	// 	} else {
	// 		kazananlar.push(i['Away Team Name'])
	// 	}
	// })

	let kazananlar = cbFinaller(data).map(i=>{
		if(i['Home Team Goals'] > i['Away Team Goals']){
			return i['Home Team Name']
		} else {
			return i['Away Team Name']
		}
	})
	return kazananlar;	
}
console.log(Kazananlar(fifaData,Finaller))



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cbFinaller, cbYillar, cbKazananlar) {

	return cbFinaller(data).map((item,index)=>{
		return `${cbYillar(data, cbFinaller)[index]} yılında, ${cbKazananlar(data, cbFinaller)[index]} dünya kupasını kazandı!`
	})

}
console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar))


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(arr) {
	let toplamGol = arr.reduce((total,item)=>{
		return total + item['Home Team Goals'] + item['Away Team Goals'];
	},0)
    return (toplamGol / arr.length).toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)))



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/


let initials = [];
let teams = []
Finaller(fifaData).forEach(i=>{
	if(!initials.includes(i["Home Team Initials"])){
		initials.push(i["Home Team Initials"]);
	}
	if(!initials.includes(i["Away Team Initials"])){
		initials.push(i["Away Team Initials"])
	}
})
Finaller(fifaData).forEach(i=>{
	if(!teams.includes(i["Home Team Name"])){
		teams.push(i["Home Team Name"]);
	}
	if(!teams.includes(i["Away Team Name"])){
		teams.push(i["Away Team Name"])
	}
})
console.log(initials)
console.log(teams)


function UlkelerinKazanmaSayilari(data,initials) {
	let kazananTakimlar = {};
	initials.forEach(i=>{               // initial : gol sayisi pairini kazanantakimlar objesine ekler
		kazananTakimlar[i] = 0;
	})
	Finaller(data).forEach((i)=>{
		if(i['Home Team Goals'] > i['Away Team Goals']){
			kazananTakimlar[i['Home Team Initials']]++
		} else {
			kazananTakimlar[i['Away Team Initials']]++		
		}
	})
	return kazananTakimlar;
}
// console.log(UlkelerinKazanmaSayilari(fifaData, initials))

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	let takimlar = {}
	teams.forEach(i=>{
		takimlar[i] = 0;
	})
	Finaller(data).forEach(i=>{
		takimlar[i['Home Team Name']] += i['Home Team Goals'];
		takimlar[i['Away Team Name']] += i['Away Team Goals'];
	})

	let enFazlaGol = 0;
	let enFazlaGolAtan = '';

	for(let key in takimlar){
		if(takimlar[key]>enFazlaGol){
			enFazlaGol = takimlar[key];
			enFazlaGolAtan = key;
		}
	}
	return enFazlaGolAtan;
}
console.log(EnCokGolAtan(fifaData))

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
	let takimlar = {};
	teams.forEach(i=>{
		takimlar[i] = 0;
	})
	Finaller(data).forEach(i=>{
		takimlar[i['Home Team Name']] += i['Away Team Goals']
		takimlar[i['Away Team Name']] += i['Home Team Goals']
	})

	let enFazlaYenenGol = 0;
	let enFazlaGolYiyenTakim = '';
	
	for(let key in takimlar){
		if(takimlar[key]>enFazlaYenenGol){
			enFazlaYenenGol = takimlar[key];
			enFazlaGolYiyenTakim = key
		}
	}

	return enFazlaGolYiyenTakim;
	
}
console.log(EnKotuDefans(fifaData))

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
