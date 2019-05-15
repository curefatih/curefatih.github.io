---
title: Process Management
date: __
---

# Process Management

> Process is the execuion of a program that performs the actions specified in that program.

(https://www.guru99.com/process-management-pcb.html)

Bir süreç program için tanımlanmmış ve porgrama ait spesifik aksiyonaları ele alan çalışan program bütünüdür.
İşletim sistemi yardımı ile süreçler oluşturulabilir, çalışma zamanı belilenebilir ve sonlandırılabilir.
Bir süreç kendi altında çalışan başka süreçler oluşturabilir. Özel olarak `child process` olarak adlandırılırlar.

Processler PCB(Process Control Block) ile koalyca kontrol edilebilirler. PCB bir veri yapısı olarak tanımlanmıştır.
PCB veri yapısı üzerinde sürece ait `process id` , `priority` , `state` , `CPU registers` gibi sürece ait bilgiler tutulur.

## Process Management

Süreç yönetimi kavramı ile süreçlerin oluşturulması, çalışma zamanının belirlenmesi, sonlandırılması ve dead lock gibi durum kontrolleri yapılması amaçlanır.
Yanı sıra kaynak tahisisi gibi operasyonlarla da ilgilenir.

## Process Architecture

* Stack: Stack ile geçici veriler depolanır. Bunlar fonksiyon parametreleri, return değerleri, ve lokal değişkenler olabilir.
* Heap: Heap ile hafıza tahsisi sağlanır.
* Data: Değişkenleri içerir.
* Text: Anlık aktiviteyi tutmak için kullanılır. Program Counter tarafından temsil edilir.

## Process Control Blocks

Daha önce de belirttiğimiz gibi bir veri yapısıdır ve işletim sistemi tarafından her bir süreç için tahsis edilir.
Sürecin izlenmesi için önemlidir.

## States of Process

Sürece ait durumlar sırasıyla:

- `New`: Yeni oluşturulmuş ya da oluşturulmakta olan süreç
- `Ready`: Oluşturulduktan sonra sürecin taşındığı durumdur. İşlenmeye hazır olduğunu belirtir.
- `Run`: Anlık olarak çalışmakta olan süreçtir. (CPU'da çalışmakta)
- `Wait` or `Block`:  Süreç I/O erişimi için istek attığında
- `Complete` or `Terminated`: İşlenmesi bitmiş süreçtir.
- `Suspended Ready`: Ready kuyruğunun dolu olduğu durumda `suspended` olarak durum değiştirir.
- `Suspended Block`: I/O benzeri bir operasyonun bitmesini bekleyen süreçlerdir.

---

#### Referanslar:

- [Process Management in Operating System: PCB in OS](https://www.guru99.com/process-management-pcb.html)
- [Introduction of Process Management](https://www.geeksforgeeks.org/introduction-of-process-management/)
