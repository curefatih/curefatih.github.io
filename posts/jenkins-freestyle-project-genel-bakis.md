---
title: Jenkins Freestyle Project'e Genel Bir Bakış
date: __
---

# Jenkins Freestyle Project'e Genel Bir Bakış


Daha önce kurulumunu ve ufak bir tanıtımı yaptığımız Jenkins’in bu yazısında Jenkins’i CI olarak öne çıkaran önemli parçalarından birisi olan “Freestyle project” tanımı üzerinde duracağız. Freestyle project’i anlatmaya geçmeden Jenkins üzerinde buna benzer, ancak tam anlamıyla aynı olmayan, üzerlerinde ufak nüanslar bulunan birkaç “item” tipinin daha olduğunu belirtmekte fayda var. Biz bu yazımızda freestyle project üzerine duracağız.

## Freestyle project nedir?

**Freestyle project** Jenkins’in tanımıyla gece gündüz demeden tekrarlı bir şekilde yığın işlemlerini yaptırabildiğimiz bir görevdir. Örnek verecek olursak, freestyle ile bir test çalıştırabilir, veri karşılaştırması yapabilir, rapor gönderebilir, bir paket oluşturabiliriz. Bunların yanı sıra, daha fazlasını Shell script ve Windows batch script çalıştırabilmemize olanak sağlamasıyla karşılayabiliriz.

## Freestyle project nasıl oluşturulur?
Örnek olarak bir freestyle project oluşturacak olursak, ilk yapmamız gereken, Jenkins arayüzüne giriş yapmak ve ardından sol menü yönlendirmesiyle **“New Item”** kısmına gitmek. Burada freestyle project’imize bir isim vererek alt menüden freestyle project seçeneğine gitmemiz gerekecek. Bu aşamaları sırasıyla görsellerle destekleyecek olursak:

- Jenkins arayüzüne giriş yapıyoruz. _Eğer kurulum sırasında arayüzün adresini değiştirmemiş ve yerel makinede kullanıyor isek bu adres http://localhost:8080/ olacaktır._

![Jenkins_Login](/images/jenkins-freestyle-project/Jenkins_Login.png)

- Sol menüden “New Item” bölümüne gidiyoruz. Burada alternatif olarak **“create new jobs”** seçeneğini de kullanabiliriz.

![Jenkins_Menu](/images/jenkins-freestyle-project/Jenkins_Menu.png)

- İsimlendirme yaptıktan sonra **Freestyle project**‘i seçerek ilerliyoruz.

![Jenkins_New_Item-768x383](/images/jenkins-freestyle-project/Jenkins_New_Item-768x383.png)


Buraya kadar freestyle project oluşturmak için ayak işlerini yapmış bulunduk. Bundan sonra, artık yapılandırma ile uğraşmamız gerekecek.

Yapılandırmanın içine çok fazla dalmadan bahsedecek olursak, burada;

- Freestyle project’in genel ayarlarını yapabilir,
- Kaynak dosyalarının yönetimi sağlayabilir,
- Build etmesi için trigger belirleyebilir,
- Çevre bileşenlerini yönetebilir,
- “Build nasıl olacak?” sorusuna cevap verebilir,
- Build’den sonra ne yapılacağını belirleyebiliriz.
- Biz örneği kısa tutmak için basit bir uygulama gerçekleştireceğiz.

Örnek projemizin kaynağının github üzerinde bir proje olduğunu belirtelim. Projeyi kullanmak için yapılandırma kısmındaki ***Source Code Management***‘tan _“Git”_ seçeneğini seçip açılan alt menüde ilgili alanları doldurmamız gerekiyor.

![Jenkins_source_code_management-768x304](/images/jenkins-freestyle-project/Jenkins_source_code_management-768x304.png)


_Proje repo’nuz gizli ise **credentials** kısmını doldurmanız gerekecek._

Daha sonra, örneğimiz için build kısmından **“Add build step”** diyerek açılan menüden “Execute shell” diyoruz. Açılan yazı alanına, shell içerisinde çalıştırılacak komutu yazıyoruz. Biz örnek projemizde, hali hazırda var olan ve Jenkins için kullandığımız, Java kullandığımız için –_farklı bir kurulumla uğraşmamak ve kafa karıştırmamak adına böyle düşündük_- projemizin içerisinde bulunan TestClass isimli .java uzantılı dosyamızı önce derleyecek ve sonra çalıştıracak olan shell komutunu yazıyoruz. Program çalıştığında “Hello world” yazısını konsol çıktısı olarak göreceğiz.

![Jenkins_build_shell-1024x258](/images/jenkins-freestyle-project/Jenkins_build_shell-1024x258.png)


Tüm bu işlemlerimizi tamamladıktan sonra sol alt köşeden freestyle project’imizi kaydediyoruz.

Yönlendirildiğimiz sayfa üzerinde yaptığımız işlemleri denemek için sol tarafta bulunan menüden **“Build now”** seçeneğine tıklıyoruz. “Her seferinde ‘build now’ diyeceksem ne anlamı var?” diye sormadan önce unutmamak gerekir ki bu örnek için herhangi bir build trigger belirlemediğimiz için bu işlemi yapıyoruz. Ayrıca bir trigger belirlesek bile bunu kullanmamızda herhangi bir sakınca olmayacaktır.

![Jenkins-Build-Now](/images/jenkins-freestyle-project/Jenkins-Build-Now.png)


_Build now_ dedikten sonra, hemen altında _Build History_ penceresinde yeni bir build belirdiğini farkedeceksiniz.

![Jenkins_build_history](/images/jenkins-freestyle-project/Jenkins_build_history.png)


_#1_ ‘in üzerine tıklayıp build işlemine gittiğimizde build hakkında bilgi edinebiliyoruz. Açılan sayfanın sol menüsündeki **“Console Output”** ise konsol ekranında neler olup bittiğini görebilmemize olanak sağlıyor.

![Jenkins_Console_Output-768x310](/images/jenkins-freestyle-project/Jenkins_Console_Output-768x310.png)


Gördüğünüz üzere Jenkins bizim yerimize TestClass dosyamızı derleyip çalıştırdığında “Hello world” çıktısını verdi. Ayrıca beklenmeyen bir çıktı aldığınız durumlarda hata kontrolü için de kullanabilirsiniz.

Sonuç olarak, bir ekran üzerinden kontrol edebileceğimiz bir yapıyı basit de olsa oluşturmuş olduk. Bu ve buna benzer konularda Jenkins veya muadili bir araç kullanmak projenizi çeşitli monotonluklardan kurtardığı gibi projenizin asıl kısmına odaklanmanıza yardımcı olacaktır.

Şimdilik bu yazımızın sonuna geldik. Başka bir yazıda tekrar görüşmek üzere. İyi okumalar.

<hr>

Kaynakça:

- [How to Create a New Build Job in Jenkins Freestyle Project](https://www.guru99.com/create-builds-jenkins-freestyle-project.html)