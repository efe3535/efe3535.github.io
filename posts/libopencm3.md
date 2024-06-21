---
title: 'libopencm3 ile LED blink uygulaması'
date: '21 Haziran 2024'
img: '/nucleo.jpg'
---

Merhaba, bu yazıda libopencm3 ile LED blink uygulaması gerçekleştireceğiz. LED'i yakıp söndürmek için Cortex-M4'ün SysTick birimini kullanacağız.

Ben, geliştirme kartı olarak NUCLEO-F446RE kullandığım için bu kartta bulunan dahili LED'in GPIO pinine göre işlem yapacağım.
Bu kartta, dahili LED A portunun 5. pinine bağlı. Dolayısıyla GPIO port ve pinlerini buna göre ayarlayacağım.
\
\
Kütüphaneleri dahil ederek başlayalım.

```c
#include <libopencm3/stm32/rcc.h>
#include <libopencm3/stm32/gpio.h>
#include <libopencm3/cm3/nvic.h>
#include <libopencm3/cm3/systick.h>
```
` `  
` `  
| Header    |   İşlev  |
| :-----   | :-:|
| rcc.h     |  RCC fonksiyonları için.  |
| gpio.h    | LED'in kontrolü için. |
| nvic.h    |  SysTick kesmesinin prototipi için. |
| systick.h |   SysTick fonksiyonları için.   |

` `  
` `  
Önce mikrodenetleyicimi STM32F446RE için maksimum saat hızı olan 180MHz'e alıyorum.
```c
rcc_clock_setup_pll(&rcc_hse_8mhz_3v3[RCC_CLOCK_3V3_180MHZ]);
```

LED'i ve sayacı aktifleştirmek için RCC aracılığıyla GPIOA portunu açmamız ve SysTick özelliğini aktifleştirmek için SYSCFG'i başlatmamız gerekiyor.

```c
rcc_periph_clock_enable(RCC_GPIOA);
rcc_periph_clock_enable(RCC_SYSCFG);
```

Ardından, GPIO pinini aktifleştirmek için `gpio_mode_setup` fonksiyonunu kullanacağız.
```c
gpio_mode_setup(GPIOA, GPIO_MODE_OUTPUT, GPIO_PUPD_NONE, GPIO5);
```

SysTick'i aktifleştirmek için 180000'de reload yapmasını seçiyorum. Bu şu anlama geliyor. İşlemcim `180000000`Hz saat hızında, bunu 180000'e böldüğümde 1000 sonucunu elde ediyorum. Yani `sys_tick_handler` kesmesi her milisaniye tetikleniyor. Buradan da bir değişkeni arttırarak sistemin başlangıcından itibaren geçen milisaniyeleri sayabilirim.
```c
systick_set_reload(180000);
```

Saat kaynağı olarak da 180MHz'de çalışan AHB'yi seçiyorum. Ardından sayacı ve kesmeyi aktifleştiriyorum.
```c
systick_set_clocksource(STK_CSR_CLKSOURCE_AHB);
systick_counter_enable();
systick_interrupt_enable();
```

Şu anda kesme aktifleştirildi. Bu kesmeden yararlanmak için `sys_tick_handler` fonksiyonuna bir prototip oluşturmalıyım. En üstte, `millis` isminde bir volatile işaretsiz 32-bit integer oluşturacağım. Volatile ne demek ona da değinelim, bunu eklediğimizde C derleyicisine (bizim durumumuzda GCC) bu değişkenin değerinin kod müdahalesi olmadan değişebileceğini belirtiyoruz. Bizim durumumuzda da her kesmede bu değer değişmekte.
```c
volatile uint32_t millis = 0;
```

Kesmemde de bu değeri arttıracağım.
```c
void sys_tick_handler(void) {
	millis++;
}
```

Şimdi, kodumda oluşturacağım sonsuz bir döngüde `millis` değişkenini kullanabilirim. Mesela, `(millis % 1000) == 0` yani millis'in 1000 ile modu 0 olduğunda LED'i toggle edebilirim. Yani LED açıksa kapatır, kapalıysa açabilirim.

```c
while(1) {
  if((millis%1000)==0) {
    gpio_toggle(GPIOA, GPIO5);
  }
}
```

Tüm kodu da aşağıya bırakıyorum. Umarım yararlı olmuştur.

```c
#include <libopencm3/stm32/rcc.h>
#include <libopencm3/stm32/gpio.h>
#include <libopencm3/cm3/nvic.h>
#include <libopencm3/cm3/systick.h>

volatile uint32_t millis = 0;

void sys_tick_handler(void) {
	millis++;
}

int main(void)
{
  rcc_clock_setup_pll(&rcc_hse_8mhz_3v3[RCC_CLOCK_3V3_180MHZ]);
  rcc_periph_clock_enable(RCC_GPIOA);
  rcc_periph_clock_enable(RCC_SYSCFG);
  
  gpio_mode_setup(GPIOA, GPIO_MODE_OUTPUT, GPIO_PUPD_NONE, GPIO5);

  systick_set_reload(180000);
  systick_set_clocksource(STK_CSR_CLKSOURCE_AHB);
  systick_counter_enable();
  systick_interrupt_enable();

	while (1) {
		if((millis%1000)==0) {
      gpio_toggle(GPIOA, GPIO5);
    }
	}

	return 0;
}
```