# Test Builder – Drag & Drop Page Builder

Bu proje, kullanıcıların bir sayfa düzenini görsel olarak oluşturmasını sağlayan bir Drag & Drop Page Builder uygulamasıdır. Sağda elementlerin bulunduğu bir sidebar, solda ise canvas adı verilen yerleşim alanı bulunur. Kullanıcı sürükle-bırak yöntemi ile elementleri canvas üzerine yerleştirebilir, konumlandırabilir, boyutlandırabilir ve oluşturulan yapıyı JSON olarak dışa aktarabilir.

Proje, Next.js App Router, React ve TailwindCSS kullanılarak geliştirilmiştir;

**Live Project:** https://drag-drop-builder-ten.vercel.app/

## Projenin Amacı

* Canvas alanı üzerinde sürüklenebilir, yerleştirilebilir ve düzenlenebilir element yapısı oluşturmak
* Kullanıcının sürüklediği her element için pozisyon bilgilerini hesaplamak
* Collision (çakışma) tespiti yapmak
* Grid Snap desteği sağlamak
* Elementlerin yeniden boyutlandırılmasını sağlamak
* Persist edilebilir JSON formatında proje çıktısı sunmak
* Üretimde kullanılabilecek ölçeklenebilir, modüler bir frontend mimarisi kurmak

---

## Genel Özellikler

### Drag & Drop Sistemi

* Sidebar’dan canvas’a element sürükleme
* Kapsamlı drop pozisyonu hesaplama
* Scroll ve offset etkilerini doğru yönetme
* Drop sonrası elementin otomatik render edilmesi

### Element Yapısı

Uygulama 5 adet element türünü destekler:

* Header
* Footer
* Card
* Text Content
* Slider

Her element kendine ait bir klasör yapısında, bağımsız ve yeniden kullanılabilir şekilde geliştirilmiştir.

### Element Seçme, Taşıma ve Boyutlandırma

* Bir element seçildiğinde selection border görünür
* Mouse ile sürüklenerek yeni bir pozisyona taşınabilir
* Sağ-alt köşeden yeniden boyutlandırılabilir
* Boyutlandırma sırasında grid snap uygulanabilir
* Resize sürecinde aspect ratio korunur
* Taşıma ve resize sırasında collision kontrolü yapılır
* Collision oluştuğunda selection border ile kullanıcı bilgilendirilir
* İşlem tamamlandığında çakışma varsa element eski hâline döner (rollback)
* Sağ-üst köşeden element canvasdan kaldırılabilir

### Grid Sistemi

* Canvas üzerine kare grid çizgileri eklenmiştir
* Grid aktifken sürükleme ve boyutlandırma işlemleri grid’e oturur
* Grid show/hide ve grid snap toggle imkânı sağlanabilir

### Collision Detection

* Element başka bir elementin bounding box alanına girerse çakışma tespit edilir
* UI üzerinde kırmızı çerçeve ile gösterilir
* MouseUp anında çakışma varsa element geri alınır
* Drag ve resize boyunca sürekli güncellenecek şekilde tasarlanmıştır
* Tüm element tiplerinde kusursuz çalışır

### JSON Export Formatı

```
{
  "project": { ... },
  "canvas": { ... },
  "elements": [
    { "id": "elem_header_001", ... },
    { "id": "elem_card_001", ... }
  ],
  "metadata": { ... }
}
```

Ayrıca ID üretimi `elem_header_001`, `elem_card_002` formatında yapılmaktadır.

---

## Teknik Mimarisi

Proje component-based yaklaşımla geliştirilmiştir. Yapı:

```
/components
  /canvas
    Canvas.jsx
    ElementRenderer.jsx
  /elements
    /header
    /footer
    /card
    /text
    /slider
  /sidebar
    ElementItem.jsx
    Sidebar.jsx

/lib
  /dragEngine
    collision.js
    collisionCheck.js
    dragHandlers.js
    dropCalculator.js
  utils.js

/store
  useBuilderStore.js
```

### State Yönetimi (Zustand)

Tüm uygulama durumu tek bir store üzerinden yönetilir:

* elements
* selectedId
* draggingId
* dragOffsetX
* dragOffsetY
* resizeId
* resizeStartWidth
* resizeStartHeight
* resizeStartX
* resizeStartY
* resizeAspectRatio
* collisionId
* lastSafePosition (rollback için)
* grid ayarları

### Drag Engine

Drag işlemleri için tamamen custom bir engine yazılmıştır:

* Global mouse events
* Doğru offset hesaplama
* Dropzone çakışma hesaplama
* DataTransfer desteği

### Resize Engine

* Sağ-alt köşeden resize
* Aspect ratio koruma
* Grid snap desteği
* Çakışma kontrolü
* Rollback mekanizması

### Collision Engine

* Pixel bazlı bounding box collision
* Drag ve resize sırasında sürekli hesaplama
* Çarpışan elementin ID’sini store’a yazma
* UI üzerinde görsel bildirim
* Bırakılınca eski hâline dönme işlemi

---

## Kullanılan Teknolojiler

* Next.js App Router
* React
* Zustand (state management)
* TailwindCSS
* Lucide-React (icon set)
* Custom Drag & Drop Engine
* Custom Collision Detection
* Aspect Ratio Engine
* JSON Export Engine

---

## Kurulum

```
npm install
npm run dev
```

---

## Sonuç

Bu proje bir Drag & Drop Page Builder uygulamasının:

* Modüler
* Yeniden kullanılabilir
* Sürdürülebilir
* Teknik gereksinimlere tam uyumlu
* Profesyonel düzeyde UI/UX davranışlara sahip

bir örneğini sunmaktadır.
