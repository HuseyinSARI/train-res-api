const express = require('express');
const app = express();
const PORT = 3000;

function rezervasyonYap(tren, kisiSayisi, farkliVagonlaraYerlestirilebilir) {
  const vagonDolulukKapasitesi = 0.7;
  let uygunVagonlar = [];

  if (farkliVagonlaraYerlestirilebilir) {
    uygunVagonlar = tren.Vagonlar.filter(vagon => ((vagon.DoluKoltukAdet / vagon.Kapasite) <= vagonDolulukKapasitesi));
  } else {
    uygunVagonlar = tren.Vagonlar.filter(vagon => (((vagon.DoluKoltukAdet + kisiSayisi) / vagon.Kapasite) <= vagonDolulukKapasitesi));
  }

  if (uygunVagonlar.length === 0) {
    return {
      RezervasyonYapilabilir: false,
      YerlesimAyrinti: []
    };
  }

  const rezervasyonlar = [];

  if (farkliVagonlaraYerlestirilebilir) {
    let kalanKisiler = kisiSayisi;
    for (const vagon of uygunVagonlar) {
      const uygunKoltukSayisi = Math.floor(vagon.Kapasite * vagonDolulukKapasitesi) - vagon.DoluKoltukAdet;
      const buVagonaYerlesenKisiler = Math.min(kalanKisiler, uygunKoltukSayisi);
      rezervasyonlar.push({ VagonAdi: vagon.Ad, KisiSayisi: buVagonaYerlesenKisiler });
      kalanKisiler -= buVagonaYerlesenKisiler;

      if (kalanKisiler === 0) break;
    }
    // farklı vagonlara yerleştirme işleminden sonra hala açıkta kişi kaldıysa
    if (kalanKisiler > 0) {
      return {
        RezervasyonYapilabilir: false,
        YerlesimAyrinti: []
      };
    }
  } else {
    const secilenVagon = uygunVagonlar[0];
    rezervasyonlar.push({ VagonAdi: secilenVagon.Ad, KisiSayisi: kisiSayisi });
  }

  return {
    RezervasyonYapilabilir: true,
    YerlesimAyrinti: rezervasyonlar
  };
}

app.use(express.json());

app.post('/api/check_reservation', (req, res) => {
  const { Tren, RezervasyonYapilacakKisiSayisi, KisilerFarkliVagonlaraYerlestirilebilir } = req.body;

  if (!Tren || !RezervasyonYapilacakKisiSayisi || typeof RezervasyonYapilacakKisiSayisi !== 'number') {
    return res.status(400).json({ hata: 'Geçersiz istek.' });
  }

  const rezervasyonDurumu = rezervasyonYap(Tren, RezervasyonYapilacakKisiSayisi, KisilerFarkliVagonlaraYerlestirilebilir);
  res.json(rezervasyonDurumu);
});

app.listen(PORT, () => {
  console.log(`Tren rezervasyonu API'si ${PORT} portunda çalışıyor.`);
});