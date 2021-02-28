---
title: Debian/Ubuntu Üzerine Jenkins Kurulumu Nasıl Yapılır?
date: __
---

# Debian/Ubuntu Üzerine Jenkins Kurulumu Nasıl Yapılır?

## Jenkins Kurulumu Nasıl Yapılır?
Kuruluma başlamadan önce Jenkins hakkında ufak bilgi vermek gerekirse, Jenkins açık kaynaklı otomasyon sunucusu olarak geçen bir entegrasyon aracıdır. Bir diğer değişle projede yapılması gereken yapısal işlemleri – bunlar hata düzeltme, test etme gibi işlemler olabilir- otomatize eden “sürekli entegrasyon/bütünleme” (CI, Continous Integration) aracıdır.
Kuruluma başlarken Jenkins’in ön gereksinimlerinden bahsetmemiz doğru olacaktır. Öncelikle Jenkins Java ile geliştirilmiş bir araçtır. Bu yüzden öncelikle dökümantasyonunda belirtildiği üzere Java 8’e ihtiyacımız olacak. Yanı sıra en az 256 MB RAM – önerilen 1GB+ - , en az 1GB disk alanı – önerilen 50GB+ -  ön gereksinimler de bulunmakta.
Kurulumunu gerçekleştireceğimiz makine ubuntu olarak belirledik. Çeşitli platformlar üzerine kurulumu değişiklik gösterebilir.
Java 8’in kurulu olduğundan emin olduğumuzda terminal ekranında vereceğimiz ilk iki komut ile Jenkins paketini paket listemize dahil etmek olacak. 

```
wget -q -O - https: //pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add –
```

![1](/images/jenkins-kurulum/1.PNG)


Sonrasında
```
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
``` 

![2](/images/jenkins-kurulum/2.PNG)


komutları ile shell’e string içerindeki komutu yorumlatıyoruz.  Bundan sonraki adımda ise artık apt paket listesini güncelleyip Jenkins’i yüklemekte özgürüz. Sırasıyla 

```
sudo apt-get update
sudo apt-get install jenkins
```

![3](/images/jenkins-kurulum/3.PNG)

komutlarını terminale verdiğimizde terminal ekranındaki kurulum işlemimiz son bulacak. Sırada ise `http://127.0.0.1:8080/` adresi üzerinde son rötuşları yapmak var.

![4](/images/jenkins-kurulum/4.PNG)


Adrese girdiğimizde bizden parola bekleyen bir ekran bekliyor olacak. Buraya gireceğimiz parolayı 

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
komutu ile terminal ekranından hızlıca öğrenmek mümkün. Terminalden aldığımız çıktıyı parola olarak girdiğimizde bir sonraki adımda kurulum için önerilen mi yoksa özelleştirilmiş kurulum mu yapmak istediğimizi soran ekrana şuan için önerilen kurulumla devam etmek istediğimizi belirtiyoruz.

![5](/images/jenkins-kurulum/5.PNG)



Burada kurulumların tamamlanması için bir süre beklememiz gerekecek.

![6](/images/jenkins-kurulum/6.PNG)


Kurulum sonrasında ilk yönetici hesabını oluşturmamız bekleniyor olacak.

![7](/images/jenkins-kurulum/7.PNG)


Bitmeye bir kala Jenkins’in çalışması için URL olarak tercihimiz ne olacağı yönünde bir soruyla karşılaşıyoruz. İsteğimiz dahilinde dolduruyoruz. 

![8](/images/jenkins-kurulum/8.PNG)


Bu işlemlerden sonra Jenkins verdiğimiz URL üzerinde kullanıma hazır olarak bizi bekliyor olacak.

![9](/images/jenkins-kurulum/9.PNG)

<hr>

Kaynakça:

- [Jenkins User Documentation](https://www.jenkins.io/doc/)