---
title: K3OS'a Genel Bakış 
date: __
---

# K3OS’a genel bakış

## Nedir?
k3OS spesifik olarak k3s için tasarlanmış bir Linux dağıtımıdır. Kubernetes clusterlarının işletim sistemleriyle aralarında bulunan kurulum maliyetini ortadan kaldırarak minimize edilmiş bir dağıtım sunmayı amaçlayan bir dağıtımdır –kendi tabiriyle __“lightweight kubernetes”__- .
Ek olarak k3OS dağıtımı ön yükleme sonrasında kubectl ile yönetilebilme desteği sunmaktadır. 

Hızlı Başlangıç

Yaklaşık 450MB olan kurulum doyasının kurulumu öncesinde gereksinim olarak  Live install için en az 2GB RAM, local install yaparken ise 1GB RAM olarak belirlenmiştir. Kurulumu ve kullanımı gayet basit olan bu dağıtımda boot işlemi sırasında ilk adım olarak LiveCD & Installer kısmını seçiyoruz.

![1](/images/k3os/1.PNG)


Sonrasında bizleri k3OS geliştiricisi olan rancher logosu karşılıyor. Giriş yapmak için login girdisinin hemen üzerinde belirttiği gibi rancher kullanıcısı olarak giriş yapabilmekteyiz. 

![2](/images/k3os/2.PNG)


Kurulumu bu kadar basit olan k3OS’un sonrası ise kişilerin isteğine göre şekilleniyor. Kurulum sonrasında k3OS'u diske kaydetmek için veya server/agent olarak nodelarını ayarlamak için terminal ekranında

``` 
sudo os-config
```

komutunu kullanmamız ve karşımıza gelecek bir kaç adımı ihtiyaca göre cevaplamamız yeterli olacak.  Her zaman olduğu gibi bu nodeları da kubectl ile yönetmeniz mümkün. Örnek olarak Server Node’unu ayağa kaldırmak istediğimizi varsayarsak

![3](/images/k3os/3.PNG)

Sırasıyla

- Select Number ile işlem tipimizi disk üzerine kurulum yapmak olarak belirledik.
- cloud-init seçeneğinde k3OS’u cloud-init dosyası ile ayarlamak isteyip istemedğimizi belirledik. – Yabancı gelebilir, kendileri bir apayrı bir konudur. Şimdilik hayır diyerek geçiyoruz.-
- Makine içerisinde kullanıcıların SSH kullanarak GitHub erişimine şuan için hayır cevabı verdik.
- Parolamızı girdik.
- WiFi ayarlarını şuan için es geçtik.
- Çalıştırırken hangi sıfatla çalıştıracağımız sorusuna ise 1 ile server cevabını verdik.
- Son olarak diskimizin değişime uğrayacağı ve belirlediğimiz ayarlara göre tekrar şekilleneceği üzerine aldığımız uyarıyı kabul ediyoruz.

Bu işlemler sonrasında k3OS yeniden başlayacaktır. Başlangıç sonrası kubectl ile nodeumuzu kontrol edecek olursak muhtemel cevap şöyle olacak:

![5](/images/k3os/5.PNG)


<hr/>
Kaynakça:

- [K3OS](https://github.com/rancher/k3os#quick-start)