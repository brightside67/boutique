# @boscoonline

## Текущая реализация

Используется flexbox модель, которая в данный момент имеет поддержку до 92% на caniuse.

Текущая позволяет создавать гибкие интерфейсы с помощью

```css
order: [numb];
flex-grow: [numb];
```

В данный момент, если удалить любой из aside блоков, то контент растянтся на освободившуюся ширину.

## Другие варианты реализации

Использование модели float@display-inline-block

```css
float: left;
display: inline-block;
width: [numb]%;
```

Подходит в качестве фоллбэка для старых браузеров, не поддерживающих flexbox модель.
Сложная в поддержке, тяжело создавать гибкие интерфейсы.

Проблема марджин коллапса из-за флоатов решается через

```css
display: inline-block;
height: auto;
```

для родителя, чтобы не использовать [clear]

### Другие варианты

1. Tables - мимо кассы, подходит только для верстки писем, современный интерфейс на таблицах не создашь

2. CSS Grids - слабая подержка на caniuse, когда нибудь станет новым стандартом вместо флексбокса.

3. Позиционирование - способ для мазохистов, но работает, обычно в связке с calc()

```css
position: absolute;
width: calc(100% - 60px);
```
