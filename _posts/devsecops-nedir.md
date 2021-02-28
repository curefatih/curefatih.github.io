---
title: DevSecOps Nedir?
date: __
---

# DevSecOps Nedir?

DevSecOps tanım olarak literatüre neredeyse yeni eklemiş bir kavram olmakla birlikte DevOps’un güvenlik sıkıntılarını gidermek için tanımlanmış yeni bir uygulama tarzıdır denebilir. DevSecOps uygulamanın yaşam döngüsüne güvenlik alanını dahil etmektedir.

Neden var olduğu konusuna değinmeden önce DevOps nedir diye soracak olursak, DevOps __“sistem geliştirme yaşam döngüsünü kısaltmayı ve yüksek yazılım kalitesiyle sürekli teslimat sağlamayı amaçlayan yazılım geliştirme ve bilgi teknolojisi işlemlerini birleştiren bir dizi uygulama[1]”__  olarak tanımlanmıştır. Bu tanım genel tanım olsa da DevOps’un kesin çizgilerinin olmadığını söylemek doğru olacaktır. 

Var olma sebebine gelecek olursak, DevOps’un bu tanıma yakın yaklaşımları sırasında oluşan güvenlik zafiyetleri ve bunun getirmiş olduğu her türlü maddiyattır. Çoğu zaman en son aşamaya bırakılan güvenlik konusu uygulamanın işleyişini yavaşlatmakla birlikte kimi zaman uygulamanın yeniden yapılanmasıyla sonuçlanmaktadır. Bu ve bunun gibi sonuçların ortaya çıkmasını engellmek amacıyla DevOps sürecine güvenlik kısmının entegre edilebileceği düşünülmüş ve bunun üzerine DevSecOps yaklaşımı ortaya çıkmıştır.

![devsecops](/images/devsecops/devsecops.png)


### Bu kültürün ne gibi faydaları var?

Öncelikle yapılan bir araştırma üzerinden konuşacak olursak  2017 EMA raporuna göre SecOps kültürünün DevOps ve diğer geliştirme ortamları üzerine olan birlikte hareketinin en iyi iki sonucunun daha iyi yatırım getirisine sahip olduğuna ve operasyonel olarak gelişmeyi sağladığı gözlenmiştir.

Bunların yanı sıra DevSecOps yaklaşımı birlikte çalışmanın verimliliğini artırırken aynı zamanda kod kalitesinde artış sağlamakta, hızlı ve güvenli kod sürümlerini ortaya çıkarmakta rol oynamaktadır.

### DevSecOps Nasıl Çalışır?

Genel anlamda DevSecOps, DevOps çatısına güvenliğin entegre edilmesiyle elde edilebilecek bir kültür yapısıdır. Tipik bir iş akışına bakacak olursak:

- Versiyon kontrol sistemi dahilinde geliştirme yapılır.
- Uygulama üzerindeki değişiklikleri bir başka kişi değişiklik gösterilen kısmın güvenlik zafiyetleri bulundurabileceğini, kod kalitesinin nasıl olacağını ve oluşabilecek bugları göz önünde bulundurarak analiz eder.
- Uygulama güvenlik konfigürasyonları dahilinde deploy edilir.
- Deploy edilen uygulama test otomasyonu ile back-end, UI, entegrasyon, ve güvenlik alanlarında test edilir.
- Uygulama testi geçme durumunda uygulama production ortamına alınır.
- Production ortamındaki uygulama çeşitli monitoring uygulamaları ve güvenlik yazılımlarıyla gözlem altında tutulur. 

Görsel üzerinde gösterecek olursak şekildeki gibi bir yapı ortaya çıkacaktır.

![devsecops_workflow](/images/devsecops/workflow.png)


Burada dikkat edilmesi gereken nokta çoğu DevOps yaklaşımından farklı olarak “security” adımlarının neredeyse her adımdan sonra ya bir yapılandırma olarak ya da bit güvenlik testi olarak araya giriyor olmasıdır. 

Aynı zamanda bu güvenlik adımları çoğu test göreviyle birlikte bulunduğu için iş akışının yönünü tersine çevirebileceği unutulmamalıdır. Bu durumun pozitif ve negatif yanlarının bulunacağını göz önünde bulundurulmalıdır. İyi planlanmamış test ve güvenlik yapılandırmaları DevSecOps yaklaşımından beklendiği üzere “maliyeti düşürmek” yerine artıracağı bir gerçektir.

DevSecOps yaklaşımı, bir başka değişle DeSecOps kültürü, için gelecek yazılarımızda görüşmek üzere. 