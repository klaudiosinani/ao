<h1 align="center">
  <img src="docs/media/logo.png" width="20%"><br/>Ao
</h1>

<h4 align="center">
  Elegant Microsoft To-Do desktop app
</h4>

<div align="center">
  <a href="https://github.com/klaussinani/ao">
    <img src="docs/media/list-navigation.gif" alt="Ao" width="93%">
  </a>
</div>

<p align="center">
  <a href="https://travis-ci.org/klaussinani/ao">
    <img alt="Build Status" src="https://travis-ci.org/klaussinani/ao.svg?branch=master">
  </a>
</p>


## Tanıtım

Ao [120'den fazla ](https://snapcraft.io/ao) ülkede kullanılan Microsoft To-Do uygulamasının açık kaynaklı, topluluk destekli ve resmi olmayan bir alternatifidir.

Dokümanı şu dilde okumak için tıklayın : [Alamnca](https://github.com/klaussinani/ao/blob/master/docs/i18n/readme.GER.md).

Projeyi [GitHub Sponsors](https://github.com/sponsors/klaussinani) üzerinden destekleyebilirsiniz.

[Katkı yönelgelerine](https://github.com/klaussinani/ao/blob/master/contributing.md#translating-documentation) ulaşarak diğer dillere çeviri için neler yapılması gerektiğini öğrenebilirsiniz.

[Gitter](https://gitter.im/klaussinani/ao) veya [Twitter](https://twitter.com/klaussinani) üzerinden proje hakkındaki görüşlerinizi paylaşabilirsinz.

Benzer uygulamaları [buradan](#related-apps) bulabilirsiniz.

## Öne Çıkan Özellikler

- Siyah, Koyu ve Sepya Temaları
- Kompakt ve Otomatik Gece Modları
- Yerel ve Küresel Özelleştirilebilir Klavye Kısayolları
- Listede Gezinme
- Ölçeklenebilir Arayüz
- Güncelleme Bildirimleri
- Çoklu Platform desteği

## İçindekiler

- [Tanıtım](#tanıtım)
- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [İçindekiler](#i̇çindekiler)
- [Kurulum](#kurulum)
    - [Github](#github)
    - [Snapcraft](#snapcraft)
    - [Homebrew](#homebrew)
    - [Not](#not)
- [Özellikler](#özellikler)
- [Klavye Kısayolları](#klavye-kısayolları)
  - [Yerel Kısayol Tuşları](#yerel-kısayol-tuşları)
  - [Küresel Kısayol Tuşları](#küresel-kısayol-tuşları)
- [Geliştirme](#geliştirme)
- [İlgili Uygulamalar](#i̇lgili-uygulamalar)
- [Takım](#takım)
- [Feragatname](#feragatname)
- [Lisans](#lisans)


## Kurulum

#### Github 

[Yayınlananlar](https://github.com/klaussinani/ao/releases/latest) page sayfasından size en uygun yükleyiciyi indirin.

#### Snapcraft

Ubuntu Linux kullanıcıları direkt olarak [`Snapcraft`](https://snapcraft.io/ao) ile kurulum yapabilirler.  `snap install ao`

#### Homebrew

Macos users kullanıcıları direkt olarak [`Homebrew Cask`](https://caskroom.github.io/) ile kurulum yapabilirler. `brew cask install ao`

#### Not

`Homebrew Cask` versiyonu en günceli olmayabilir. Eğer en son sürümü kullanmak istiyorsanız  [Github yayınlananlar sayfasını kullanın.](https://github.com/klaussinani/ao/releases/latest) page.

## Özellikler

Özelliklerin detayı için [anasayfayı](https://klaussinani.github.io/ao) ziyaret edin.

- Otomatik gece modu -  Tusk'ın ortamınıza uyum sağlamasına izin vermek için <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd> tuşlarına basın. 
- Siyah Tema -  <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd> Tuşlarına basarak aktif edin.
- Kompakt Mod - Moda girmek için pencereyi küçültün.
- Özel kısayol Tuşları - Herhangi bir kısayol tuşunu değiştirmek için `~/.ao.json` klasörüne gidin veya  <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd> tuşuna basın. Sıfırlamak için  `~/.ao.json` dosyasını silin & uygulamayı yeniden başlatın.
- Karanlık Tema - <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd> tuşlarına basarak etkinleştirin.
- Küresel Kısayol Tuşları - Aktive etmek için `File` > `Enable Global Shortcut Keys` yolunu kullanın.
- Listede Gezinme - Listede gezinme için  <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd> / <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd> tuşlarını kullanın ya da  <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd> tuşlarını kullanarak biirini seçin.
- Scalable Interface - Adjust the zooming factor by pressing <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd> or <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>.
- Sepya Teması - <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd> tuşlarına basarak etkinleştirin.
- Güncelleme Bildirimleri - Uygulamanın güncelleme kontrol sıklığını özelleştirin.

## Klavye Kısayolları


### Yerel Kısayol Tuşları

40'tan fazla yerel klavye kısayolu. Herhangi bir şeyi anında değiştirin.
<details>
<summary>Kullanılabilir tüm yerel klavye kısayollarını görüntüleyin</summary>

<br/>
Tanım                      | Kısayol Tuşları
-------------------------- | --------------------------
Otomatik Gece Modu         | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>N</kbd>
Son Tarih Ekle             | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>T</kbd>
Güne Yapılacaklar Ekle     | <kbd>Cmd/Ctrl</kbd> <kbd>K</kbd>
Tüm Yapılacaklar           | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>N</kbd>
Listeyi Sil                | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd>
Yapılacak olanı sil        | <kbd>Cmd/Ctrl</kbd> <kbd>D</kbd>
Kısayol Tuşlarını Ayarla   | <kbd>Cmd/Ctrl</kbd> <kbd>.</kbd>
Tüm Yapılmışları Gizle     | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>H</kbd>
Listeye geç                | <kbd>Cmd/Ctrl</kbd> <kbd>1</kbd> - <kbd>9</kbd>
Yazıyı büyüt               | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>=</kbd>
Yazıyı Küçült              | <kbd>Cmd/Ctrl</kbd> <kbd>-</kbd>
Sonraki Listeye Geç        | <kbd>Cmd/Ctrl</kbd> <kbd>Tab</kbd>
Yeni Liste                 | <kbd>Cmd/Ctrl</kbd> <kbd>L</kbd>
Yeni Yapılacak             | <kbd>Cmd/Ctrl</kbd> <kbd>N</kbd>
Listeyi yeniden adlandır   | <kbd>Cmd/Ctrl</kbd> <kbd>Y</kbd>
Yapılacağı yeniden adlandır| <kbd>Cmd/Ctrl</kbd> <kbd>T</kbd>
Yakınlaştırmayı Sıfırla    | <kbd>Cmd/Ctrl</kbd> <kbd>0</kbd>
Yapılacaklara dön          | <kbd>Esc</kbd>
Yapılacaklarda ara         | <kbd>Cmd/Ctrl</kbd> <kbd>F</kbd>
Her Zaman üstte            | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>
Hatırlatıcı Kur            | <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>E</kbd>
Çıkış Yap                  | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>Q</kbd>
Siyah Temayı Değiştir      | <kbd>Cmd/Ctrl</kbd> <kbd>B</kbd>
Koyu Temayı Değiştir       | <kbd>Cmd/Ctrl</kbd> <kbd>H</kbd>
Önemlileri Değiştir        | <kbd>Cmd/Ctrl</kbd> <kbd>I</kbd>
Günümü Değiştir            | <kbd>Cmd/Ctrl</kbd> <kbd>M</kbd>
Plananları Değiştir        | <kbd>Cmd/Ctrl</kbd> <kbd>P</kbd>
Sapya Temasını Değiştir    | <kbd>Cmd/Ctrl</kbd> <kbd>G</kbd>
Ayarları değiştir          | <kbd>Cmd/Ctrl</kbd> <kbd>,</kbd>
Kenarı Değiştir            | <kbd>Cmd/Ctrl</kbd> <kbd>O</kbd>
Görevleri Değiştir         | <kbd>Cmd/Ctrl</kbd> <kbd>J</kbd>
Pencere Menüsünü değiştir  | <kbd>Alt</kbd>

<br/>

</details>

### Küresel Kısayol Tuşları

Ao'ya işletim sisteminizin herhangi bir yerinden istediğiniz zaman erişin. Tüm genel kısayollar, yapılandırma dosyası (`~/.ao.json`) aracılığıyla kendi tercihlerinize uyacak şekilde özelleştirilebilir.


<details>
<summary>Bütün global kısayolları göster.</summary>

<br>

Tanım                      | Global Kısayollar
-------------------------- | --------------------------
Yeni yapılacak             | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>C</kbd>
Yapılacaklarda ara         | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>F</kbd>
Ao penceresi ayarla        | <kbd>Cmd/Ctrl</kbd> <kbd>Alt</kbd> <kbd>A</kbd>

<br/>

</details>

## Geliştirme

Projeye nasıl katkıda bulunacağınız hakkında daha fazla bilgi için lütfen [katkıda bulunma yönelgeleri](https://github.com/klaussinani/ao/blob/master/contributing.md) okuyun .

- Repoyu forklayın and makinenize klonlayın.
- Local fork'a gidin `cd ao`
- Proje bağımlılıklarını  `npm install` ya da `yarn install` komutları ile indirin 
-  Ao'yu  `npm start` ya da `yarn start` komutlarıyla geliştirici modunu çalıştırın.
- Hatalar için `npm test` ya da  `yarn test` komutlarını çalıştırın.
- Binary veya yükleyici oluşturmak için  `npm run release` ya da  `yarn release` komutları kullanılabilir.

## İlgili Uygulamalar

- [Tusk](https://github.com/klaussinani/tusk) -  İyileştirilmiş Evernote masaüstü uygulaması.
- [Taskbook](https://github.com/klaussinani/taskbook) -Komut satırı yaşam alanı için görevler, panolar ve notlar.


## Takım

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)
- Mario Sinani [(@mariosinani)](https://github.com/mariosinani)
- Athan Gkanos [(@athangkanos)](https://github.com/athangkanos)

## Feragatname

Ao resmi olmayan, açık kaynaklı, üçüncü taraf, topluluk odaklı, ücretsiz bir uygulamadır ve Microsoft ile herhangi bir bağlantısı yoktur.

## Lisans

[MIT](https://github.com/klaussinani/ao/blob/master/license.md)