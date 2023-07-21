# train-res-api
 train reservation api for adayazilim
 
proje render.com üzerinden deploy edilmiştir.

aşağıdaki url'e postman gibi bir yazılım kullanarak post işlemlerini yapabilirsiniz.

https://train-res-api-huseyinsari.onrender.com/api/check_reservation

Örnek
input:
{
  "Tren": {
    "Ad": "Başkent Ekspres",
    "Vagonlar": [
      { "Ad": "Vagon 1", "Kapasite": 100, "DoluKoltukAdet": 68 },
      { "Ad": "Vagon 2", "Kapasite": 90, "DoluKoltukAdet": 80 },
      { "Ad": "Vagon 3", "Kapasite": 80, "DoluKoltukAdet": 80 },
      { "Ad": "Vagon 4", "Kapasite": 100, "DoluKoltukAdet": 60 }
    ]
  },
  "RezervasyonYapilacakKisiSayisi": 5,
  "KisilerFarkliVagonlaraYerlestirilebilir": false
}
output:
{
    "RezervasyonYapilabilir": true,
    "YerlesimAyrinti": [
        {
            "VagonAdi": "Vagon 4",
            "KisiSayisi": 5
        }
    ]
}
