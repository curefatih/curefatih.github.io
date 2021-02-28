---
title: Jwt standardı nedir?
date: __
---

# JWT Standardı Nedir? 

JWT, JSON Web Token’in kısaltması ve adından da anlaşılacağı üzere bir
tokendir. Bir IETF standartı olan bu token ile genellikle kullanıcı
kimlikleme ya da doğrulama ve güvenli veri alışverişi sağlama
konularında sıklıkla tercih edilmektedir.

JWT yapısına değinecek olursak; gövdesinde Header, Payload ve Verify
Signature kısımlarını içerir. Her bir kısım arasında nokta ile ayrılan
bir yapısı vardır. Bir JWT üretmek istediğimizde HMAC algoritması ile
secret key ya da public/private key çüftlerini RSA veya ECDSA kullanarak
imzalamamızı JWT mümkün kılıyor.

Örnek bir JWT gösterildiği şekildedir.

![JWTStructure](/images/JWTStructure.png)

JWT oluşturma yönünde yapının nasıl olacağını gösterelim.

Header kısmında verinin tipinin “JWT” olduğunu ve hangi algoritma ile
MACed yani encrpyt edildiğini/edileceğini belirtir.

> MAC: Message Authentication Code

```json
{
  “typ”: “JWT”,
  “alg”: “HS256
}
```

> Bu yapıya JOSE Header denilmektedir.

## JOSE Header

> For a JWT object, the members of the JSON object represented by the
> JOSE Header describe the cryptographic operations applied to the JWT
> and optionally, additional properties of the JWT. Depending upon
> whether the JWT is a JWS or JWE, the corresponding rules for the JOSE
> Header values apply.
> This specification further specifies the use of the following Header
> Parameters in both the cases where the JWT is a JWS and where it is a
> JWE.


JOSE Header: JWT üzerinde JSON objesinin hangi kriptografik tanımlar
ve ek özelliklerle birlikte niteleneceği bir başlık ile belirlenir ve bu
başlığa JOSE Header denir

Header kısmının JWT parçası bu json parçasının base64URL ile encode
edilmesiyle elde edilir.

Payload kısmına gelecek olursak, bu kısımda dikkat edilmesi gereken ufak
bir nüans var. JWT standartdında önceden belirlenmiş alanlar
bulunmaktadır ve bu alanların mantıklı olarak kullanılmasında fayda
olacaktır. Fayda olacaktır diyoruz çünkü bu alanların kullanımı zorunlu
değildir, sadece kullanılması tavsiye edilmektedir. Bu alanlara örnek
olarak: jti (JWT id), iat (issued at), nbf (not before) verilebilir.
Toplamda yedi adet alan bu şekilde ön tanımlıdır.
[*Buradan*](https://tools.ietf.org/html/rfc7519#section-4.1)
incelemenizde fayda olacaktır. Tanımın dışına çıkmamak adına bu
alanların dışında kalan alanı dilediğimiz gibi kullanmak geliştiriciye
kalmıştır. Örnek bir Payload yapısı şekildeki gibi olacaktır.

```json
{
  “sub”: “1234567”,
  “name”: “John Doe”,
  “admin”: true
}
```

Payload kısmı Header kısmı ile aynı şekilde Base64URL ile encode edilip
görseldeki orta kısma yerleşecek.

###  JWT Signature (JWT İmzası)

JWT nin son alanı olan “Signature” alanını oluşturmak için encode
edilmiş başlık ve payload, secret key bulunmalıdır. Bu verilerin
bulunduğu taktirde hangi algoritmanın kullanılacağı başlık üzerinden
alınarak imza oluşturulur.

\*\*\*Algoritmanın “none” olarak belirlendiği JWT’ler “unsecured”
JWT’lere örnektir. Bunun gibi birkaç [*güvensiz
JWT*](https://tools.ietf.org/html/rfc7519#section-6) örneği daha vardır.

Tüm bu alanların Base64URL çıktıları aralarında nokta bulunacak şekilde
bir araya getirilmesi ile JWT elde edilir.

JWT’nin yapısı ve az da olsa nasıl elde edildiği hakkında bilgi vermeye
çalıştık. Şimdi bir kimlik doğrulama örneğini inceleyecek olursak;

Session kullanımı yönünden karşılaştıralım. Öncelikle session yapısının
genellikle server tarafında session bilgisini bir şekilde saklaması
gerektiğini biliyoruz. JWT’de ise sadece sizin server tarafınızın
bildiği bir “secret” olduğunu düşünün ve JWT elde ederken veriyi bu
secret ile birlikte server tarafı imzalıyor. Bu örneği bir sözleşmeye
benzetecek olursak JWT üzerindeki bilgileriniz sözleşmenin kendisi ve
bir arkadaşınız da bu sözleşmeyi okuyabiliyor ancak altında bulunan imza
sizin imzanız bunu unutmamak gerek. İmzanız size has olduğu için sadece
sizin yordamınızla yapıldığında ortaya öyle bir imza çıkıyor. Bu
bakımdan imza atış yordamınız ise “secret” oluyor. Bir başkası gelip
sözleşmenizin birebir aynısını başka bir kağıda yazsa bile altına sizin
gibi imza atamayacağı için geçersiz bir sözleşme oluyor. Aynı şekilde
server tarafında karşı taraftan gelen JWT’ye bakıp sizin imzanız
olmadığını kontrol edip herhangi bir yönde karar vermek de size kalmış
oluyor.


<hr>

Kaynakça:

- [RFC7519](https://tools.ietf.org/html/rfc7519#section-5)
- [Pros and cons in using JWT (JSON Web Tokens) by Rahul Golwalkar](https://medium.com/@rahulgolwalkar/pros-and-cons-in-using-jwt-json-web-tokens-196ac6d41fb4)
- [jwt.io](jwt.io)
- [JSON Web Token (JWT) advantages/disadvantages over Cookies](https://stackoverflow.com/questions/27666810/json-web-token-jwt-advantages-disadvantages-over-cookies)